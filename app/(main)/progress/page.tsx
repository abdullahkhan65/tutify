import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Trophy, Clock } from "lucide-react";
import { getScoreColor, getMasteryLabel, formatRelativeDate, cn } from "@/lib/utils";
import type { UserProgress, Test } from "@/types/supabase";

export default async function ProgressPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [progressResult, testsResult, badgesResult] = await Promise.all([
    supabase.from("user_progress").select("*").eq("user_id", user.id).order("last_studied_at", { ascending: false }),
    supabase.from("tests").select("*").eq("user_id", user.id).order("completed_at", { ascending: false }).limit(20),
    supabase.from("user_badges").select("*, badges(*)").eq("user_id", user.id),
  ]);

  const progress = (progressResult.data || []) as UserProgress[];
  const tests = (testsResult.data || []) as Test[];
  const badges = (badgesResult.data || []) as Array<{ id: string; earned_at: string; badges: { name: string; description: string; icon: string } | null }>;

  const masteredCount = progress.filter((p) => p.mastery_score >= 80).length;
  const avgScore = tests.length > 0
    ? Math.round(tests.reduce((sum, t) => sum + (t.score || 0), 0) / tests.length)
    : 0;

  const weakTopics = progress
    .filter((p) => p.mastery_score > 0 && p.mastery_score < 60)
    .sort((a, b) => a.mastery_score - b.mastery_score)
    .slice(0, 5);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Your Progress</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Track your mastery, test scores, and achievements</p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Topics Studied", value: progress.length, icon: Target, color: "text-purple-400" },
            { label: "Mastered", value: masteredCount, icon: Trophy, color: "text-yellow-400" },
            { label: "Tests Taken", value: tests.length, icon: TrendingUp, color: "text-teal-400" },
            { label: "Avg Score", value: avgScore > 0 ? `${avgScore}%` : "—", icon: Clock, color: "text-orange-400" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="glass rounded-2xl p-4 border border-border">
              <Icon className={`w-4 h-4 ${color} mb-2`} />
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Topic mastery */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Topic Mastery</CardTitle>
            </CardHeader>
            <CardContent>
              {progress.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {progress.map((p) => (
                    <div key={p.id} className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{p.subject_slug || "Topic"}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                p.mastery_score >= 80 ? "bg-green-500"
                                  : p.mastery_score >= 50 ? "bg-yellow-500"
                                  : "bg-red-500"
                              )}
                              style={{ width: `${p.mastery_score}%` }}
                            />
                          </div>
                          <span className={cn("text-xs font-medium flex-shrink-0", getScoreColor(p.mastery_score))}>
                            {p.mastery_score}%
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant={p.mastery_score >= 80 ? "success" : p.mastery_score >= 50 ? "warning" : "destructive"}
                        className="text-xs flex-shrink-0"
                      >
                        {getMasteryLabel(p.mastery_score)}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-6">
                  No progress yet. Start studying to track mastery!
                </p>
              )}
            </CardContent>
          </Card>

          {/* Recent tests */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Test History</CardTitle>
            </CardHeader>
            <CardContent>
              {tests.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {tests.map((test) => (
                    <div key={test.id} className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0",
                        (test.score || 0) >= 80 ? "bg-green-900/30 text-green-400"
                          : (test.score || 0) >= 60 ? "bg-yellow-900/30 text-yellow-400"
                          : "bg-red-900/30 text-red-400"
                      )}>
                        {test.score}%
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{test.topic_name || "Practice Test"}</div>
                        <div className="text-xs text-muted-foreground">
                          {test.correct_answers}/{test.total_questions} correct · {formatRelativeDate(test.completed_at)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-6">
                  No tests yet. Click &quot;Test Me&quot; in any chat session!
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Weak areas */}
        {weakTopics.length > 0 && (
          <Card className="border-orange-500/20 bg-orange-900/5">
            <CardHeader>
              <CardTitle className="text-base text-orange-400 flex items-center gap-2">
                ⚠️ Weak Areas — Focus Here
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {weakTopics.map((topic) => (
                  <div key={topic.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-orange-500/20 bg-orange-900/10">
                    <div className="text-orange-400 font-bold text-sm">{topic.mastery_score}%</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{topic.subject_slug}</div>
                      <div className="text-xs text-muted-foreground">Needs revision</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Badges */}
        {badges.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {badges.map((ub) => {
                  const badge = ub.badges;
                  return (
                    <div key={ub.id} className="text-center p-3 rounded-xl border border-border bg-secondary/30">
                      <div className="text-3xl mb-1">{badge?.icon || "🏆"}</div>
                      <div className="text-xs font-medium">{badge?.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{badge?.description}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
