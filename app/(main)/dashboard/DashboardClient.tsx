"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubjectIcon } from "@/components/ui/SubjectIcon";
import { CURRICULUM, SUBJECTS } from "@/lib/curriculum";
import { getDaysUntilExam, formatRelativeDate, getScoreColor, cn } from "@/lib/utils";
import type { Profile, Session, Test, UserProgress } from "@/types/supabase";
import {
  Flame, Zap, Trophy, Target, BookOpen, Clock, ChevronRight,
  TrendingUp, Star, ArrowRight, Sparkles, Calendar, AlertCircle
} from "lucide-react";

interface DashboardClientProps {
  profile: Profile | null;
  recentSessions: Session[];
  recentTests: Test[];
  progress: UserProgress[];
}

export default function DashboardClient({ profile, recentSessions, recentTests, progress }: DashboardClientProps) {
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  const daysUntilExam = getDaysUntilExam(profile?.exam_date || null);
  const userName = profile?.name?.split(" ")[0] || "Student";

  const userSubjects = (profile?.subjects || ["physics", "chemistry", "mathematics"]).slice(0, 4);

  // Get curriculum for a subject
  function getSubjectCurriculum(subjectId: string) {
    const keys = Object.keys(CURRICULUM).filter((k) => k.startsWith(subjectId.replace("mathematics", "math")));
    return keys.length > 0 ? CURRICULUM[keys[0]] : null;
  }

  const currentSubjectData = activeSubject ? getSubjectCurriculum(activeSubject) : null;

  const progressMap = progress.reduce((acc, p) => {
    acc[p.topic_id] = p;
    return acc;
  }, {} as Record<string, UserProgress>);

  // Overall mastery average
  const masteryAvg = progress.length > 0
    ? Math.round(progress.reduce((sum, p) => sum + p.mastery_score, 0) / progress.length)
    : 0;

  const totalStudyTime = recentSessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0);
  const avgTestScore = recentTests.length > 0
    ? Math.round(recentTests.reduce((sum, t) => sum + (t.score || 0), 0) / recentTests.length)
    : 0;

  const subjectInfo = SUBJECTS.find((s) => s.id === activeSubject);
  const displayedSubject = activeSubject || userSubjects[0];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              Assalam o Alaikum, {userName}
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              {daysUntilExam !== null
                ? `${daysUntilExam} days until your board exam — keep pushing!`
                : "Set your exam date to track your countdown"}
            </p>
          </div>
          <Link href="/chat">
            <Button variant="gradient" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Start Learning
            </Button>
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Flame,
              color: "text-orange-400",
              bg: "bg-orange-900/15 border-orange-500/20",
              value: `${profile?.streak_count || 0}`,
              label: "Day Streak",
              sub: profile?.streak_count ? "Keep it going!" : "Start today",
            },
            {
              icon: Zap,
              color: "text-yellow-400",
              bg: "bg-yellow-900/15 border-yellow-500/20",
              value: `${profile?.xp || 0}`,
              label: "XP Earned",
              sub: `Level ${profile?.level || 1}`,
            },
            {
              icon: Target,
              color: "text-teal-400",
              bg: "bg-teal-900/15 border-teal-500/20",
              value: avgTestScore > 0 ? `${avgTestScore}%` : "—",
              label: "Avg Test Score",
              sub: recentTests.length > 0 ? `${recentTests.length} tests taken` : "No tests yet",
            },
            {
              icon: Trophy,
              color: "text-purple-400",
              bg: "bg-purple-900/15 border-purple-500/20",
              value: `${masteryAvg}%`,
              label: "Mastery",
              sub: `${progress.length} topics`,
            },
          ].map(({ icon: Icon, color, bg, value, label, sub }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`glass rounded-2xl p-4 border ${bg}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Exam countdown banner */}
        {daysUntilExam !== null && daysUntilExam <= 60 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-900/20 to-violet-900/20 border border-purple-500/20 rounded-2xl p-4 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-900/30 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">
                Board exam in <span className="text-gradient-purple text-base font-black">{daysUntilExam}</span> days
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Study 2 topics per day to cover your full syllabus before the exam.
              </div>
            </div>
            <Link href="/chat">
              <Button variant="gradient" size="sm" className="flex-shrink-0 gap-1.5">
                Study Now <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Topic Navigator — 2/3 width */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                    Topics
                  </CardTitle>
                  <Link href="/topics">
                    <Button variant="ghost" size="sm" className="text-xs gap-1">
                      All topics <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>

                {/* Subject tabs */}
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {userSubjects.map((subjectId) => {
                    const subInfo = SUBJECTS.find((s) => s.id === subjectId);
                    if (!subInfo) return null;
                    const isActive = (activeSubject || userSubjects[0]) === subjectId;
                    return (
                      <button
                        key={subjectId}
                        onClick={() => setActiveSubject(subjectId)}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0",
                          isActive
                            ? "bg-purple-900/30 text-purple-300 border border-purple-500/30"
                            : "text-muted-foreground border border-border hover:text-foreground"
                        )}
                      >
                        <SubjectIcon subjectId={subInfo.id} className="text-purple-300" /> {subInfo.label}
                      </button>
                    );
                  })}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {currentSubjectData ? (
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {currentSubjectData.chapters.map((chapter) => (
                      <div key={chapter.id}>
                        <div className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wider">
                          {chapter.title}
                        </div>
                        <div className="space-y-1.5">
                          {chapter.topics.map((topic) => {
                            const prog = progressMap[topic.id];
                            const mastery = prog?.mastery_score || 0;
                            const diffColor = topic.difficulty === "easy" ? "text-green-400" : topic.difficulty === "hard" ? "text-red-400" : "text-yellow-400";

                            return (
                              <Link
                                key={topic.id}
                                href={`/chat?topicId=${topic.id}&topic=${encodeURIComponent(topic.title)}&subject=${displayedSubject}`}
                              >
                                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-border hover:border-purple-500/40 hover:bg-purple-900/10 transition-all group cursor-pointer">
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium truncate group-hover:text-purple-300 transition-colors">
                                      {topic.title}
                                    </div>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span className={cn("text-xs font-medium capitalize", diffColor)}>
                                        {topic.difficulty}
                                      </span>
                                      <span className="text-xs text-muted-foreground">·</span>
                                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {topic.estimatedMinutes}m
                                      </span>
                                    </div>
                                  </div>

                                  {/* Mastery indicator */}
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    {mastery > 0 && (
                                      <div className="flex items-center gap-1">
                                        <div className="w-12 h-1.5 bg-secondary rounded-full overflow-hidden">
                                          <div
                                            className="h-full bg-gradient-to-r from-purple-600 to-violet-500 rounded-full"
                                            style={{ width: `${mastery}%` }}
                                          />
                                        </div>
                                        <span className={cn("text-xs", getScoreColor(mastery))}>{mastery}%</span>
                                      </div>
                                    )}
                                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-purple-400 transition-colors" />
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No curriculum data for this subject yet</p>
                    <p className="text-xs text-muted-foreground mt-1">You can still chat with your professor!</p>
                    <Link href="/chat">
                      <Button variant="ghost" size="sm" className="mt-3">
                        Start studying
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Recent sessions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-400" />
                  Recent Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {recentSessions.length > 0 ? (
                  <div className="space-y-2">
                    {recentSessions.slice(0, 4).map((session) => (
                      <div key={session.id} className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-purple-900/30 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium truncate">{session.topic_name || "Study Session"}</div>
                          <div className="text-xs text-muted-foreground">{formatRelativeDate(session.started_at)}</div>
                        </div>
                        <Link href={`/chat?topic=${encodeURIComponent(session.topic_name || "")}&subject=${session.subject_slug || ""}`}>
                          <Button variant="ghost" size="icon-sm" className="flex-shrink-0">
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-xs text-muted-foreground">No sessions yet</p>
                    <Link href="/chat">
                      <Button variant="ghost" size="sm" className="mt-2 text-xs">Start your first session</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent tests */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="w-4 h-4 text-teal-400" />
                  Recent Tests
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {recentTests.length > 0 ? (
                  <div className="space-y-2">
                    {recentTests.slice(0, 4).map((test) => (
                      <div key={test.id} className="flex items-center gap-2.5">
                        <div className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold",
                          (test.score || 0) >= 80 ? "bg-green-900/30 text-green-400" : (test.score || 0) >= 60 ? "bg-yellow-900/30 text-yellow-400" : "bg-red-900/30 text-red-400"
                        )}>
                          {test.score}%
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium truncate">{test.topic_name || "Practice Test"}</div>
                          <div className="text-xs text-muted-foreground">
                            {test.correct_answers}/{test.total_questions} correct
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Target className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">No tests yet</p>
                    <p className="text-xs text-muted-foreground">Click &quot;Test Me&quot; in any chat to start</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick actions */}
            <div className="space-y-2">
              <Link href="/chat">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border hover:border-purple-500/40 hover:bg-purple-900/10 transition-all group cursor-pointer">
                  <div className="w-8 h-8 bg-purple-900/30 border border-purple-500/30 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium group-hover:text-purple-300">Ask AI Professor</div>
                    <div className="text-xs text-muted-foreground">Start a free-form session</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-purple-400" />
                </div>
              </Link>

              {profile?.plan === "free" && (
                <Link href="/pricing">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-purple-500/20 bg-purple-900/10 hover:border-purple-500/40 transition-all group cursor-pointer">
                    <div className="w-8 h-8 bg-purple-900/30 border border-purple-500/30 rounded-lg flex items-center justify-center">
                      <Star className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-purple-300">Upgrade to Basic</div>
                      <div className="text-xs text-muted-foreground">Rs. 499/mo — unlimited sessions</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-purple-400" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
