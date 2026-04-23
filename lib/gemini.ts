import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const PROFESSOR_PERSONALITIES = {
  friendly: {
    name: "friendly",
    label: "Friendly Professor",
    instruction: "Be warm, encouraging, and patient. Use relatable analogies. Celebrate understanding.",
  },
  strict: {
    name: "strict",
    label: "Strict Professor",
    instruction: "Be precise, rigorous, and demanding. Push the student to think deeper. No hand-holding.",
  },
  exam_coach: {
    name: "exam_coach",
    label: "Exam Coach",
    instruction: "Focus entirely on exam preparation. Emphasize what BISE examiners look for. Drill key definitions and formulae.",
  },
};

export function buildSystemPrompt(options: {
  personality?: string;
  board?: string;
  classLevel?: string;
  subjects?: string[];
  topicContext?: string;
  language?: string;
}): string {
  const { personality = "friendly", board = "punjab", classLevel = "fsc_1", topicContext, language = "english" } = options;

  const personalityConfig = PROFESSOR_PERSONALITIES[personality as keyof typeof PROFESSOR_PERSONALITIES] || PROFESSOR_PERSONALITIES.friendly;

  const boardMap: Record<string, string> = {
    punjab: "BISE Punjab",
    sindh: "BISE Sindh",
    kpk: "BISE KPK",
    federal: "Federal Board",
    o_level: "Cambridge O Level",
    a_level: "Cambridge A Level",
  };

  const classMap: Record<string, string> = {
    matric_9: "Matric 9th Grade",
    matric_10: "Matric 10th Grade",
    fsc_1: "FSc Part 1 (11th Grade)",
    fsc_2: "FSc Part 2 (12th Grade)",
    o_level: "O Level",
    a_level: "A Level",
  };

  const languageInstruction =
    language === "urdu"
      ? "The student prefers Urdu explanations. Mix Urdu and English naturally (Roman Urdu is fine). Start with Urdu but include key technical terms in English."
      : "Explain in clear, simple English. Avoid overly academic language.";

  return `You are Tutify Professor — an expert AI tutor for Pakistani students.

STUDENT PROFILE:
- Board: ${boardMap[board] || board}
- Class: ${classMap[classLevel] || classLevel}
- Language: ${languageInstruction}

PERSONALITY: ${personalityConfig.instruction}

${topicContext ? `CURRENT TOPIC: ${topicContext}` : ""}

TEACHING METHODOLOGY:
1. Always begin with a real-world analogy before formal explanation
2. Break complex concepts into numbered steps
3. Use **bold** for ALL key terms and definitions (examiners look for these)
4. Format ALL mathematical equations using LaTeX:
   - Inline math: $equation$
   - Block/display math: $$equation$$
   - Example: The formula is $$F = ma$$ where $F$ is force in Newtons
5. When a diagram would help understanding, create a Mermaid diagram in a \`\`\`mermaid block
6. After explaining a concept, end with: "Does this make sense? Want me to try a different approach or give you a practice question?"
7. If student says "I don't understand" → immediately simplify with "Let me try a completely different approach..."
8. Keep responses focused — max 4 paragraphs before checking comprehension
9. Reference the ${boardMap[board] || "BISE"} syllabus and exam patterns
10. Bold the most important points that are likely to appear in board exams

FORMATTING RULES:
- Use ## for section headers
- Use numbered lists for steps/processes
- Use bullet points for properties/characteristics
- Always format math with LaTeX — never write equations in plain text
- Use \`\`\`mermaid for circuit diagrams, flowcharts, biological processes, etc.

EXAM AWARENESS:
- You know ${boardMap[board] || "BISE"} frequently tests: definitions, derivations, numerical problems, conceptual MCQs
- Highlight with ⭐ anything that has appeared in recent board exams
- When relevant, say: "This definition is extremely important for board exams" or "This derivation appeared in 2023"

TONE: ${personalityConfig.instruction}
Remember: You are not just answering questions. You are ensuring this student gets 85%+ on their board exam.`;
}

export function buildExamPrompt(topic: string, subject: string, difficulty: string = "medium", count: number = 5): string {
  return `Generate exactly ${count} multiple choice questions (MCQs) about "${topic}" in ${subject}.

The questions should be:
- ${difficulty === "easy" ? "Conceptual and definitional" : difficulty === "hard" ? "Application-based and numerical" : "Mixed conceptual and application"}
- Formatted EXACTLY as shown below (JSON only, no extra text)
- Based on BISE Punjab FSc syllabus patterns
- Each with 4 options (A, B, C, D)
- Include a clear explanation for the correct answer

Return ONLY valid JSON in this exact format:
{
  "questions": [
    {
      "id": 1,
      "question": "Question text here?",
      "options": [
        {"id": "A", "text": "Option A text"},
        {"id": "B", "text": "Option B text"},
        {"id": "C", "text": "Option C text"},
        {"id": "D", "text": "Option D text"}
      ],
      "correct": "A",
      "explanation": "Detailed explanation of why A is correct and why others are wrong."
    }
  ]
}`;
}

export function buildSessionSummaryPrompt(messages: { role: string; content: string }[]): string {
  const conversation = messages.slice(-10).map(m => `${m.role}: ${m.content}`).join("\n");
  return `Based on this tutoring conversation, generate a concise session summary.

CONVERSATION:
${conversation}

Return ONLY valid JSON:
{
  "summary": "2-3 sentence summary of what was covered",
  "key_points": ["point 1", "point 2", "point 3", "point 4", "point 5"],
  "concepts_covered": ["concept1", "concept2"],
  "suggested_next_topics": ["topic1", "topic2"]
}`;
}

export function getGeminiModel(modelName: string = "gemini-2.0-flash-lite") {
  return genAI.getGenerativeModel({
    model: modelName,
    safetySettings: [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ],
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 2048,
    },
  });
}
