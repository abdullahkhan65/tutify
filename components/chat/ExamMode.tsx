"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { CheckCircle2, XCircle, Trophy, Target, Clock, ArrowRight, RotateCcw, X } from "lucide-react";
import { cn, getScoreColor } from "@/lib/utils";

interface MCQOption {
  id: string;
  text: string;
}

interface MCQQuestion {
  id: number;
  question: string;
  options: MCQOption[];
  correct: string;
  explanation: string;
}

interface ExamModeProps {
  topicName: string;
  subjectSlug: string;
  onClose: () => void;
  onComplete?: (score: number) => void;
}

export default function ExamMode({ topicName, subjectSlug, onClose, onComplete }: ExamModeProps) {
  const [phase, setPhase] = useState<"loading" | "intro" | "active" | "results">("intro");
  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<{ correct: boolean; answer: string }[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [questionTime, setQuestionTime] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");

  async function startExam() {
    setPhase("loading");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "exam",
          topic: topicName,
          subject: subjectSlug,
          difficulty,
          count: 5,
          messages: [],
        }),
      });

      if (!response.ok) {
        toast.error("Failed to generate questions. Please try again.");
        setPhase("intro");
        return;
      }

      const data = await response.json();
      if (!data.questions?.length) {
        toast.error("Could not generate questions. Try again.");
        setPhase("intro");
        return;
      }

      setQuestions(data.questions);
      setCurrentIndex(0);
      setAnswers([]);
      setStartTime(Date.now());
      setPhase("active");
    } catch {
      toast.error("Something went wrong. Please try again.");
      setPhase("intro");
    }
  }

  function handleAnswer(optionId: string) {
    if (selectedAnswer || showExplanation) return;
    const elapsed = questionTime ? (Date.now() - questionTime) / 1000 : 0;
    setSelectedAnswer(optionId);
    setShowExplanation(true);
    const isCorrect = optionId === questions[currentIndex].correct;
    setAnswers((prev) => [...prev, { correct: isCorrect, answer: optionId }]);
    setQuestionTime(null);
    if (!isCorrect) {
      // Small haptic feedback via color flash — handled by CSS
    }
  }

  function nextQuestion() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setQuestionTime(Date.now());
    } else {
      finishExam();
    }
  }

  async function finishExam() {
    const score = Math.round((answers.filter((a) => a.correct).length / questions.length) * 100);
    const totalTime = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;

    // Save test to DB
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const db = supabase as any;
      const { data: test } = await db
        .from("tests")
        .insert({
          user_id: user.id,
          topic_name: topicName,
          subject_slug: subjectSlug,
          score,
          total_questions: questions.length,
          correct_answers: answers.filter((a) => a.correct).length,
          time_taken_seconds: totalTime,
          mode: "practice",
        })
        .select("id")
        .single();

      if (test) {
        await db.from("test_questions").insert(
          questions.map((q, i) => ({
            test_id: test.id,
            question_text: q.question,
            options: q.options,
            correct_answer: q.correct,
            user_answer: answers[i]?.answer || null,
            is_correct: answers[i]?.correct || false,
            explanation: q.explanation,
            order_index: i,
          }))
        );
      }

      // Award XP
      await db.rpc("increment_user_xp", { p_user_id: user.id, p_amount: score >= 80 ? 50 : 20 }).catch(() => {});
    }

    setPhase("results");
    onComplete?.(score);
  }

  const currentQuestion = questions[currentIndex];
  const score = answers.length > 0
    ? Math.round((answers.filter((a) => a.correct).length / answers.length) * 100)
    : 0;
  const finalScore = Math.round((answers.filter((a) => a.correct).length / questions.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl"
      >
        <div className="glass-strong rounded-2xl border border-border overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-teal-900/30 border border-teal-500/30 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <div className="font-semibold text-sm">Exam Mode</div>
                <div className="text-xs text-muted-foreground truncate max-w-48">{topicName}</div>
              </div>
            </div>
            {phase === "active" && (
              <div className="flex items-center gap-3">
                <div className="text-xs text-muted-foreground">
                  {currentIndex + 1} / {questions.length}
                </div>
                {/* Progress dots */}
                <div className="flex gap-1">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-2 h-2 rounded-full transition-colors",
                        i < answers.length
                          ? answers[i].correct ? "bg-green-400" : "bg-red-400"
                          : i === currentIndex
                          ? "bg-purple-400"
                          : "bg-border"
                      )}
                    />
                  ))}
                </div>
              </div>
            )}
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground ml-2">
              <X className="w-5 h-5" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {/* Intro */}
            {phase === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 space-y-5"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <h2 className="text-lg font-bold mb-1">Ready to test yourself?</h2>
                  <p className="text-sm text-muted-foreground">
                    5 BISE-style MCQs on <span className="text-foreground font-medium">{topicName}</span>
                  </p>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-2 font-medium">Difficulty Level</div>
                  <div className="grid grid-cols-3 gap-2">
                    {(["easy", "medium", "hard"] as const).map((d) => (
                      <button
                        key={d}
                        onClick={() => setDifficulty(d)}
                        className={cn(
                          "py-2.5 rounded-xl border text-sm font-medium capitalize transition-all",
                          difficulty === d
                            ? d === "easy" ? "border-green-500 bg-green-900/20 text-green-400"
                              : d === "medium" ? "border-yellow-500 bg-yellow-900/20 text-yellow-400"
                              : "border-red-500 bg-red-900/20 text-red-400"
                            : "border-border bg-secondary/50 text-muted-foreground hover:border-border/80"
                        )}
                      >
                        {d === "easy" ? "Easy" : d === "medium" ? "Medium" : "Hard"}
                      </button>
                    ))}
                  </div>
                </div>

                <Button variant="teal" className="w-full gap-2" size="lg" onClick={startExam}>
                  <Target className="w-4 h-4" />
                  Start 5-Question Exam
                </Button>
              </motion.div>
            )}

            {/* Loading */}
            {phase === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-12 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-900/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Target className="w-6 h-6 text-teal-400" />
                </div>
                <p className="text-sm text-muted-foreground">Generating BISE-style questions...</p>
              </motion.div>
            )}

            {/* Active exam */}
            {phase === "active" && currentQuestion && (
              <motion.div
                key={`q-${currentIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="p-6 space-y-5"
              >
                <div className="font-medium text-sm leading-relaxed">
                  <span className="text-teal-400 font-bold mr-2">Q{currentIndex + 1}.</span>
                  {currentQuestion.question}
                </div>

                <div className="space-y-2.5">
                  {currentQuestion.options.map((option) => {
                    const isSelected = selectedAnswer === option.id;
                    const isCorrect = option.id === currentQuestion.correct;
                    const showResult = showExplanation;

                    return (
                      <button
                        key={option.id}
                        onClick={() => handleAnswer(option.id)}
                        disabled={showExplanation}
                        className={cn(
                          "w-full text-left flex items-center gap-3 p-3.5 rounded-xl border transition-all text-sm",
                          !showResult && "hover:border-purple-500/50 hover:bg-purple-900/10",
                          showResult && isCorrect && "border-green-500 bg-green-900/15",
                          showResult && isSelected && !isCorrect && "border-red-500 bg-red-900/15",
                          !showResult && !isSelected && "border-border bg-secondary/50",
                          !showResult && isSelected && "border-purple-500 bg-purple-900/20"
                        )}
                      >
                        <div className={cn(
                          "w-6 h-6 rounded-lg border flex items-center justify-center text-xs font-bold flex-shrink-0",
                          showResult && isCorrect ? "bg-green-500 border-green-500 text-white"
                            : showResult && isSelected && !isCorrect ? "bg-red-500 border-red-500 text-white"
                            : isSelected ? "bg-purple-600 border-purple-500 text-white"
                            : "border-border text-muted-foreground"
                        )}>
                          {option.id}
                        </div>
                        <span className={cn(
                          showResult && isCorrect ? "text-green-300"
                            : showResult && isSelected && !isCorrect ? "text-red-300"
                            : "text-foreground/80"
                        )}>
                          {option.text}
                        </span>
                        {showResult && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-green-400 ml-auto flex-shrink-0" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-red-400 ml-auto flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "rounded-xl p-4 border text-sm",
                      answers[currentIndex]?.correct
                        ? "bg-green-900/15 border-green-500/20"
                        : "bg-orange-900/15 border-orange-500/20"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2 font-medium">
                      {answers[currentIndex]?.correct ? (
                        <><CheckCircle2 className="w-4 h-4 text-green-400" /><span className="text-green-400">Correct!</span></>
                      ) : (
                        <><XCircle className="w-4 h-4 text-orange-400" /><span className="text-orange-400">Incorrect</span></>
                      )}
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </motion.div>
                )}

                {showExplanation && (
                  <Button
                    variant="gradient"
                    className="w-full gap-2"
                    onClick={nextQuestion}
                  >
                    {currentIndex < questions.length - 1 ? (
                      <>Next Question <ArrowRight className="w-4 h-4" /></>
                    ) : (
                      <>See Results <Trophy className="w-4 h-4" /></>
                    )}
                  </Button>
                )}
              </motion.div>
            )}

            {/* Results */}
            {phase === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 text-center space-y-4"
              >
                <div className="text-5xl font-black">
                  {finalScore >= 80 ? "🏆" : finalScore >= 60 ? "📚" : "💪"}
                </div>
                <div>
                  <div className={cn("text-4xl font-black mb-1", getScoreColor(finalScore))}>
                    {finalScore}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {answers.filter((a) => a.correct).length} out of {questions.length} correct
                  </div>
                </div>

                <div className={cn(
                  "rounded-xl p-4 border text-sm",
                  finalScore >= 80 ? "bg-green-900/15 border-green-500/20 text-green-300"
                    : finalScore >= 60 ? "bg-yellow-900/15 border-yellow-500/20 text-yellow-300"
                    : "bg-red-900/15 border-red-500/20 text-red-300"
                )}>
                  {finalScore >= 80
                    ? "Excellent! You have a strong grip on this topic. Keep it up!"
                    : finalScore >= 60
                    ? "Good effort! Review the explanations for the questions you got wrong."
                    : `You need more practice on ${topicName}. Let's go back and revise!`}
                </div>

                {/* Per-question breakdown */}
                <div className="grid grid-cols-5 gap-2 my-2">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-2 rounded-full",
                        answers[i]?.correct ? "bg-green-400" : "bg-red-400"
                      )}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 gap-2" onClick={() => { setPhase("intro"); setAnswers([]); }}>
                    <RotateCcw className="w-4 h-4" /> Try Again
                  </Button>
                  <Button variant="gradient" className="flex-1 gap-2" onClick={onClose}>
                    Continue Learning <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
