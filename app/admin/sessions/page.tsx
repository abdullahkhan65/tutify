import { createClient } from "@/lib/supabase/server";
import { MessageSquare, Clock, User, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function timeAgo(date: string) {
  const diff = (Date.now() - new Date(date).getTime()) / 1000;
  if (diff < 60) return `${Math.round(diff)}s ago`;
  if (diff < 3600) return `${Math.round(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.round(diff / 3600)}h ago`;
  return `${Math.round(diff / 86400)}d ago`;
}

export default async function AdminSessionsPage() {
  const supabase = await createClient();
  const db = supabase as any;

  const { data: sessions } = await db
    .from("chat_sessions")
    .select(`
      id,
      topic_name,
      subject_slug,
      message_count,
      summary,
      started_at,
      last_message_at,
      profiles (
        name,
        email
      )
    `)
    .order("last_message_at", { ascending: false })
    .limit(50);

  const { data: recentTests } = await db
    .from("tests")
    .select(`
      id,
      topic_name,
      subject_slug,
      score,
      total_questions,
      correct_answers,
      time_taken_seconds,
      created_at,
      profiles (
        name,
        email
      )
    `)
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-400" /> Sessions
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">Recent chat sessions and exam attempts</p>
      </div>

      {/* Chat Sessions */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Chat Sessions ({(sessions || []).length})
        </h2>
        <div className="space-y-2">
          {(!sessions || sessions.length === 0) && (
            <div className="text-center py-10 text-muted-foreground text-sm glass-strong rounded-2xl border border-border">
              No sessions yet
            </div>
          )}
          {(sessions || []).map((s: any) => (
            <div key={s.id} className="glass-strong rounded-xl border border-border p-4 flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-blue-900/30 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm">{s.topic_name || "General Chat"}</span>
                  {s.subject_slug && (
                    <Badge variant="outline" className="text-xs capitalize">
                      {s.subject_slug.replace(/_/g, " ")}
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {s.message_count || 0} messages
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {s.profiles?.name || s.profiles?.email || "Unknown"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {s.last_message_at ? timeAgo(s.last_message_at) : "—"}
                  </span>
                </div>
                {s.summary && (
                  <p className="text-xs text-muted-foreground mt-1.5 line-clamp-1">{s.summary}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Tests */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Recent Exam Attempts ({(recentTests || []).length})
        </h2>
        <div className="space-y-2">
          {(!recentTests || recentTests.length === 0) && (
            <div className="text-center py-10 text-muted-foreground text-sm glass-strong rounded-2xl border border-border">
              No tests yet
            </div>
          )}
          {(recentTests || []).map((t: any) => {
            const pct = t.score ?? 0;
            const color = pct >= 80 ? "text-green-400" : pct >= 60 ? "text-yellow-400" : "text-red-400";
            const bg = pct >= 80 ? "bg-green-900/20 border-green-500/20" : pct >= 60 ? "bg-yellow-900/20 border-yellow-500/20" : "bg-red-900/20 border-red-500/20";
            return (
              <div key={t.id} className="glass-strong rounded-xl border border-border p-4 flex items-start gap-4">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${bg}`}>
                  <span className={`text-xs font-black ${color}`}>{pct}%</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm">{t.topic_name || "Practice Test"}</span>
                    {t.subject_slug && (
                      <Badge variant="outline" className="text-xs capitalize">
                        {t.subject_slug.replace(/_/g, " ")}
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {t.correct_answers}/{t.total_questions} correct
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {t.profiles?.name || t.profiles?.email || "Unknown"}
                    </span>
                    {t.time_taken_seconds && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {Math.round(t.time_taken_seconds / 60)}m {t.time_taken_seconds % 60}s
                      </span>
                    )}
                    <span>{t.created_at ? timeAgo(t.created_at) : "—"}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
