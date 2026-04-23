"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MessageSquare, Target, BookOpen, CheckCircle2, Circle, ChevronRight, Trophy, Clock, BarChart2, ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, getScoreColor, getMasteryLabel, formatRelativeDate } from "@/lib/utils";
import ExamMode from "@/components/chat/ExamMode";
import type { CurriculumTopic, CurriculumChapter, CurriculumSubject } from "@/lib/curriculum";

interface TestQuestion {
  id: string;
  is_correct: boolean | null;
  order_index: number | null;
}

interface TopicTest {
  id: string;
  score: number | null;
  total_questions: number | null;
  correct_answers: number | null;
  completed_at: string;
  test_questions: TestQuestion[];
}

interface UserProgress {
  mastery_score: number;
  sessions_count: number;
  last_studied_at: string | null;
}

interface Props {
  topic: CurriculumTopic;
  chapter: CurriculumChapter;
  subject: CurriculumSubject;
  subjectKey: string;
  progress: UserProgress | null;
  recentTests: TopicTest[];
}

const DIFFICULTY_COLORS = {
  easy: "text-green-400 bg-green-900/20 border-green-500/30",
  medium: "text-yellow-400 bg-yellow-900/20 border-yellow-500/30",
  hard: "text-red-400 bg-red-900/20 border-red-500/30",
};

export default function TopicDetail({ topic, chapter, subject, subjectKey, progress, recentTests }: Props) {
  const router = useRouter();
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [showExam, setShowExam] = useState(false);
  const storageKey = `taleem_checklist_${topic.id}`;
  const legacyStorageKey = `tutify_checklist_${topic.id}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey) || localStorage.getItem(legacyStorageKey);
      if (saved) {
        setChecked(new Set(JSON.parse(saved)));
        if (!localStorage.getItem(storageKey)) localStorage.setItem(storageKey, saved);
      }
    } catch {}
  }, [legacyStorageKey, storageKey]);

  function toggleConcept(concept: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(concept) ? next.delete(concept) : next.add(concept);
      try { localStorage.setItem(storageKey, JSON.stringify([...next])); } catch {}
      return next;
    });
  }

  const mastery = progress?.mastery_score ?? 0;
  const masteryColor = mastery >= 80 ? "bg-green-500" : mastery >= 50 ? "bg-yellow-500" : "bg-purple-500";
  const bestScore = recentTests.length > 0
    ? Math.max(...recentTests.map((t) => t.score ?? 0))
    : null;
  const checkedCount = topic.keyConcepts.filter((c) => checked.has(c)).length;

  return (
    <>
      {showExam && (
        <ExamMode
          topicName={topic.title}
          subjectSlug={subjectKey}
          onClose={() => setShowExam(false)}
          onComplete={() => setShowExam(false)}
        />
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">

          {/* Back + breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Topics
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground/60 truncate">{subject.name}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground/60 truncate hidden sm:block">{chapter.title.replace(/^Chapter \d+: /, "")}</span>
          </div>

          {/* Hero header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-2xl border border-border p-6"
          >
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 border"
                style={{ background: `${subject.color}22`, borderColor: `${subject.color}44` }}
              >
                {subject.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold leading-tight">{topic.title}</h1>
                <p className="text-sm text-muted-foreground mt-0.5">{topic.description}</p>
                <div className="flex items-center gap-2 flex-wrap mt-2">
                  <Badge className={cn("text-xs border capitalize", DIFFICULTY_COLORS[topic.difficulty])}>
                    {topic.difficulty}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {topic.estimatedMinutes}m
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Zap className="w-3 h-3 text-purple-400" /> {mastery}% mastery
                  </span>
                </div>

                {/* Mastery progress bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Mastery Progress</span>
                    <span className={cn("text-xs font-medium", getScoreColor(mastery))}>
                      {getMasteryLabel(mastery)}
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className={cn("h-full rounded-full", masteryColor)}
                      initial={{ width: 0 }}
                      animate={{ width: `${mastery}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
              <Button
                variant="gradient"
                className="gap-2 h-11"
                onClick={() => router.push(`/chat?topicId=${topic.id}&topic=${encodeURIComponent(topic.title)}&subject=${subjectKey}`)}
              >
                <MessageSquare className="w-4 h-4" />
                Learn with AI
              </Button>
              <Button
                variant="teal"
                className="gap-2 h-11"
                onClick={() => setShowExam(true)}
              >
                <Target className="w-4 h-4" />
                Practice Test
              </Button>
              <Button
                variant="outline"
                className="gap-2 h-11"
                onClick={() => router.push(`/chat?topicId=${topic.id}&topic=${encodeURIComponent(topic.title + " — Past Papers")}&subject=${subjectKey}`)}
              >
                <BookOpen className="w-4 h-4" />
                Past Papers
              </Button>
            </div>
          </motion.div>

          {/* Checklist + Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Study Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl border border-border p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  Study Checklist
                </h2>
                <span className="text-xs text-muted-foreground">
                  {checkedCount}/{topic.keyConcepts.length} done
                </span>
              </div>

              {/* Mini progress */}
              <div className="h-1 bg-secondary rounded-full mb-4 overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${topic.keyConcepts.length > 0 ? (checkedCount / topic.keyConcepts.length) * 100 : 0}%` }}
                />
              </div>

              <div className="space-y-2">
                {topic.keyConcepts.map((concept) => {
                  const isDone = checked.has(concept);
                  return (
                    <button
                      key={concept}
                      onClick={() => toggleConcept(concept)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all text-sm",
                        isDone
                          ? "border-green-500/30 bg-green-900/10 text-green-300"
                          : "border-border bg-secondary/30 text-foreground/80 hover:border-purple-500/30 hover:bg-purple-900/5"
                      )}
                    >
                      {isDone
                        ? <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                        : <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                      <span className={cn("capitalize", isDone && "line-through opacity-70")}>{concept}</span>
                    </button>
                  );
                })}
              </div>

              {checkedCount === topic.keyConcepts.length && topic.keyConcepts.length > 0 && (
                <div className="mt-3 text-center text-xs text-green-400 font-medium">
                  🎉 All concepts covered! Take the test to confirm your mastery.
                </div>
              )}
            </motion.div>

            {/* Your Stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="glass rounded-2xl border border-border p-5"
            >
              <h2 className="text-sm font-semibold flex items-center gap-2 mb-4">
                <BarChart2 className="w-4 h-4 text-teal-400" />
                Your Stats
              </h2>

              <div className="space-y-3">
                {[
                  {
                    label: "Mastery Level",
                    value: getMasteryLabel(mastery),
                    color: getScoreColor(mastery),
                  },
                  {
                    label: "Mastery Score",
                    value: mastery > 0 ? `${mastery}%` : "Not started",
                    color: getScoreColor(mastery),
                  },
                  {
                    label: "Study Sessions",
                    value: progress?.sessions_count ?? 0,
                    color: "text-foreground",
                  },
                  {
                    label: "Tests Taken",
                    value: recentTests.length,
                    color: "text-foreground",
                  },
                  {
                    label: "Best Score",
                    value: bestScore != null ? `${bestScore}%` : "No tests yet",
                    color: bestScore != null ? getScoreColor(bestScore) : "text-muted-foreground",
                  },
                  {
                    label: "Last Studied",
                    value: progress?.last_studied_at
                      ? formatRelativeDate(progress.last_studied_at)
                      : "Never",
                    color: "text-muted-foreground",
                  },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                    <span className="text-xs text-muted-foreground">{label}</span>
                    <span className={cn("text-xs font-semibold", color)}>{value}</span>
                  </div>
                ))}
              </div>

              {mastery === 0 && (
                <div className="mt-4 p-3 rounded-xl bg-purple-900/15 border border-purple-500/20 text-xs text-purple-300 text-center">
                  Start a study session or take a test to track your mastery!
                </div>
              )}
            </motion.div>
          </div>

          {/* Recent Test History */}
          {recentTests.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl border border-border p-5"
            >
              <h2 className="text-sm font-semibold flex items-center gap-2 mb-4">
                <Trophy className="w-4 h-4 text-yellow-400" />
                Recent Tests on this Topic
              </h2>
              <div className="space-y-2">
                {recentTests.map((test) => {
                  const score = test.score ?? 0;
                  const questions = [...(test.test_questions || [])].sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
                  return (
                    <div key={test.id} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-secondary/20">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0",
                        score >= 80 ? "bg-green-900/30 text-green-400"
                          : score >= 60 ? "bg-yellow-900/30 text-yellow-400"
                          : "bg-red-900/30 text-red-400"
                      )}>
                        {score}%
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground">
                          {test.correct_answers}/{test.total_questions} correct · {formatRelativeDate(test.completed_at)}
                        </div>
                      </div>
                      {/* Dot breakdown */}
                      <div className="flex gap-1">
                        {questions.map((q, i) => (
                          <div
                            key={i}
                            className={cn("w-2.5 h-2.5 rounded-full", q.is_correct ? "bg-green-400" : "bg-red-400")}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Full history with question breakdowns is on the{" "}
                <button onClick={() => router.push("/progress")} className="text-purple-400 hover:underline">
                  Progress page
                </button>
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
