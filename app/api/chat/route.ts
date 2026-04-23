import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { buildSystemPrompt, buildExamPrompt, getGeminiModel } from "@/lib/gemini";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { messages, sessionId, topicContext, mode = "chat" } = body;

    // Get user profile for personalization
    const { data: profileData } = await supabase
      .from("profiles")
      .select("board, class_level, subjects, language_pref, professor_personality, plan")
      .eq("id", user.id)
      .single();
    const profile = profileData as { board?: string; class_level?: string; subjects?: string[]; language_pref?: string; professor_personality?: string; plan?: string } | null;

    // Rate limiting: free users get limited daily sessions
    if (profile?.plan === "free") {
      const today = new Date().toISOString().split("T")[0];
      const { count } = await supabase
        .from("messages")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("created_at", `${today}T00:00:00Z`)
        .eq("role", "user");

      if ((count ?? 0) >= 25) {
        return NextResponse.json(
          { error: "Daily free limit reached. Upgrade to Basic for unlimited sessions." },
          { status: 429 }
        );
      }
    }

    const model = getGeminiModel("gemini-1.5-flash");

    // Exam mode: generate MCQs
    if (mode === "exam") {
      const { topic, subject, difficulty, count } = body;
      const examPrompt = buildExamPrompt(topic, subject, difficulty, count);

      const result = await model.generateContent(examPrompt);
      const text = result.response.text();

      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
      }

      const parsed = JSON.parse(jsonMatch[0]);
      return NextResponse.json(parsed);
    }

    // Normal chat with streaming
    const systemPrompt = buildSystemPrompt({
      personality: profile?.professor_personality || "friendly",
      board: profile?.board || "punjab",
      classLevel: profile?.class_level || "fsc_1",
      subjects: profile?.subjects || [],
      topicContext,
      language: profile?.language_pref || "english",
    });

    // Build conversation history for Gemini
    const history = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const lastMessage = messages[messages.length - 1];

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Understood! I'm ready to be your dedicated Tutify professor. I'll teach step-by-step, use proper LaTeX formatting for math, create diagrams when helpful, and focus on helping you ace your board exam. What would you like to learn today?" }] },
        ...history,
      ],
    });

    const streamResult = await chat.sendMessageStream(lastMessage.content);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;

    // Save user message to DB
    if (sessionId) {
      await db.from("messages").insert({
        session_id: sessionId,
        user_id: user.id,
        role: "user",
        content: lastMessage.content,
      });
    }

    // Stream the response
    const encoder = new TextEncoder();
    let fullResponse = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamResult.stream) {
            const text = chunk.text();
            fullResponse += text;
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
          }

          // Save assistant message to DB
          if (sessionId && fullResponse) {
            await db.from("messages").insert({
              session_id: sessionId,
              user_id: user.id,
              role: "assistant",
              content: fullResponse,
            });
            await db.rpc("increment_session_messages", { p_session_id: sessionId }).catch(() => {});
          }

          // Award XP for the session
          await db.rpc("increment_user_xp", { p_user_id: user.id, p_amount: 5 }).catch(() => {});

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          console.error("Stream error:", err);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "Stream interrupted" })}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
