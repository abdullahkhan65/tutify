"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, XCircle, Clock } from "lucide-react";
import { cn, getScoreColor, formatRelativeDate } from "@/lib/utils";

interface Option {
  id: string;
  text: string;
}

interface TestQuestion {
  id: string;
  question_text: string;
  options: Option[] | null;
  correct_answer: string | null;
  user_answer: string | null;
  is_correct: boolean | null;
  explanation: string | null;
  order_index: number | null;
}

export interface TestWithQuestions {
  id: string;
  topic_name: string | null;
  subject_slug: string | null;
  score: number | null;
  total_questions: number | null;
  correct_answers: number | null;
  time_taken_seconds: number | null;
  completed_at: string;
  test_questions: TestQuestion[];
}

export default function TestHistoryClient({ tests }: { tests: TestWithQuestions[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (tests.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-6">
        No tests yet. Click &quot;Test Me&quot; in any chat session!
      </p>
    );
  }

  return (
    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
      {tests.map((test) => {
        const score = test.score ?? 0;
        const isExpanded = expandedId === test.id;
        const questions = [...(test.test_questions || [])].sort(
          (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
        );

        return (
          <div key={test.id} className="border border-border rounded-xl overflow-hidden bg-card/30">
            {/* Summary row — clickable */}
            <button
              onClick={() => setExpandedId(isExpanded ? null : test.id)}
              className="w-full flex items-center gap-3 p-3.5 hover:bg-secondary/30 transition-colors text-left"
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0",
                score >= 80 ? "bg-green-900/30 text-green-400"
                  : score >= 60 ? "bg-yellow-900/30 text-yellow-400"
                  : "bg-red-900/30 text-red-400"
              )}>
                {score}%
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{test.topic_name || "Practice Test"}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-2 flex-wrap mt-0.5">
                  <span className={cn("font-medium", getScoreColor(score))}>
                    {test.correct_answers}/{test.total_questions} correct
                  </span>
                  {test.time_taken_seconds != null && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {Math.floor(test.time_taken_seconds / 60)}m {test.time_taken_seconds % 60}s
                    </span>
                  )}
                  <span>· {formatRelativeDate(test.completed_at)}</span>
                </div>
              </div>

              {/* Mini dot breakdown */}
              {questions.length > 0 && (
                <div className="hidden sm:flex gap-1 mr-1 flex-shrink-0">
                  {questions.map((q, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-2.5 h-2.5 rounded-full",
                        q.is_correct ? "bg-green-400" : "bg-red-400"
                      )}
                    />
                  ))}
                </div>
              )}

              {isExpanded
                ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
            </button>

            {/* Expanded per-question breakdown */}
            {isExpanded && (
              <div className="border-t border-border divide-y divide-border/40">
                {questions.length === 0 ? (
                  <p className="text-xs text-muted-foreground p-4 text-center">
                    Question details not available for this test.
                  </p>
                ) : questions.map((q, i) => {
                  const options = (q.options as Option[] | null) ?? [];
                  const userOpt = options.find((o) => o.id === q.user_answer);
                  const correctOpt = options.find((o) => o.id === q.correct_answer);

                  return (
                    <div key={q.id} className="p-4 space-y-2.5">
                      {/* Question */}
                      <div className="flex items-start gap-2">
                        {q.is_correct
                          ? <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          : <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />}
                        <span className="text-sm font-medium leading-snug">
                          <span className="text-muted-foreground mr-1.5 font-normal">Q{i + 1}.</span>
                          {q.question_text}
                        </span>
                      </div>

                      {/* Answers */}
                      <div className="pl-6 space-y-1.5 text-xs">
                        {!q.is_correct && userOpt && (
                          <div className="flex items-start gap-2">
                            <span className="text-red-400 font-semibold w-[90px] flex-shrink-0 pt-0.5">Your answer:</span>
                            <span className="text-red-300 bg-red-900/20 border border-red-500/20 rounded-lg px-2.5 py-1 leading-relaxed">
                              <span className="font-bold mr-1">{userOpt.id}.</span>{userOpt.text}
                            </span>
                          </div>
                        )}
                        {correctOpt && (
                          <div className="flex items-start gap-2">
                            <span className="text-green-400 font-semibold w-[90px] flex-shrink-0 pt-0.5">
                              {q.is_correct ? "Your answer:" : "Correct answer:"}
                            </span>
                            <span className="text-green-300 bg-green-900/20 border border-green-500/20 rounded-lg px-2.5 py-1 leading-relaxed">
                              <span className="font-bold mr-1">{correctOpt.id}.</span>{correctOpt.text}
                            </span>
                          </div>
                        )}

                        {/* Explanation */}
                        {q.explanation && (
                          <div className="mt-2 text-muted-foreground bg-secondary/40 rounded-lg p-2.5 leading-relaxed border border-border/50">
                            <span className="text-purple-400 font-semibold">Explanation: </span>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
