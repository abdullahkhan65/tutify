import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { findTopicById } from "@/lib/curriculum";
import TopicDetail from "@/components/topics/TopicDetail";

export default async function TopicPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = await params;
  const found = findTopicById(topicId);
  if (!found) notFound();

  const { topic, chapter, subject, subjectKey } = found;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const db = supabase as any;

  const [progressResult, testsResult] = await Promise.all([
    db
      .from("user_progress")
      .select("mastery_score, sessions_count, last_studied_at")
      .eq("user_id", user.id)
      .eq("topic_id", topicId)
      .maybeSingle(),
    db
      .from("tests")
      .select("id, score, total_questions, correct_answers, completed_at, test_questions(id, is_correct, order_index)")
      .eq("user_id", user.id)
      .eq("topic_name", topic.title)
      .order("completed_at", { ascending: false })
      .limit(5),
  ]);

  return (
    <TopicDetail
      topic={topic}
      chapter={chapter}
      subject={subject}
      subjectKey={subjectKey}
      progress={progressResult.data ?? null}
      recentTests={testsResult.data ?? []}
    />
  );
}
