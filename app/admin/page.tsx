import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, Target, TrendingUp, Activity } from "lucide-react";
import { formatRelativeDate } from "@/lib/utils";
import AdminCharts from "./AdminCharts";
import type { Profile } from "@/types/supabase";

export default async function AdminPage() {
  const supabase = await createClient();

  const today = new Date().toISOString().split("T")[0];
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [
    totalUsersResult,
    todaySignupsResult,
    todaySessionsResult,
    totalSessionsResult,
    recentUsersResult,
    totalTestsResult,
    paidUsersResult,
    recentSessionsResult,
  ] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id", { count: "exact", head: true }).gte("created_at", `${today}T00:00:00Z`),
    supabase.from("sessions").select("id", { count: "exact", head: true }).gte("started_at", `${today}T00:00:00Z`),
    supabase.from("sessions").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id, name, email, plan, board, class_level, created_at, streak_count, xp").order("created_at", { ascending: false }).limit(8),
    supabase.from("tests").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id", { count: "exact", head: true }).neq("plan", "free"),
    supabase.from("sessions").select("id, topic_name, subject_slug, started_at, profiles(name, email)").order("started_at", { ascending: false }).limit(10),
  ]);

  const stats = [
    {
      label: "Total Users",
      value: totalUsersResult.count || 0,
      icon: Users,
      color: "text-purple-400",
      bg: "bg-purple-900/15 border-purple-500/20",
      sub: `+${todaySignupsResult.count || 0} today`,
    },
    {
      label: "Sessions Today",
      value: todaySessionsResult.count || 0,
      icon: MessageSquare,
      color: "text-teal-400",
      bg: "bg-teal-900/15 border-teal-500/20",
      sub: `${totalSessionsResult.count || 0} total`,
    },
    {
      label: "Tests Completed",
      value: totalTestsResult.count || 0,
      icon: Target,
      color: "text-orange-400",
      bg: "bg-orange-900/15 border-orange-500/20",
      sub: "All time",
    },
    {
      label: "Paid Users",
      value: paidUsersResult.count || 0,
      icon: TrendingUp,
      color: "text-green-400",
      bg: "bg-green-900/15 border-green-500/20",
      sub: `${totalUsersResult.count ? Math.round(((paidUsersResult.count || 0) / totalUsersResult.count) * 100) : 0}% conversion`,
    },
  ];

  const recentUsers = (recentUsersResult.data || []) as Profile[];
  const recentSessions = (recentSessionsResult.data || []) as Array<{
    id: string;
    topic_name?: string | null;
    subject_slug?: string | null;
    started_at: string;
    profiles?: { name?: string | null; email?: string | null } | null;
  }>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Overview</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {new Date().toLocaleDateString("en-PK", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg, sub }) => (
          <Card key={label} className={`border ${bg}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <div className="text-3xl font-bold">{value.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">{sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AdminCharts />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent users */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              Recent Signups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentUsers.length > 0 ? recentUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {(user.name || user.email)?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{user.name || "Unknown"}</div>
                    <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge
                      variant={user.plan === "free" ? "secondary" : "success"}
                      className="text-xs capitalize"
                    >
                      {user.plan}
                    </Badge>
                    <div className="text-xs text-muted-foreground">{formatRelativeDate(user.created_at)}</div>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground text-center py-4">No users yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-400" />
              Live Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSessions.length > 0 ? recentSessions.map((session: {
                id: string;
                topic_name?: string | null;
                subject_slug?: string | null;
                started_at: string;
                profiles?: { name?: string | null; email?: string | null } | null;
              }) => (
                <div key={session.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-900/20 border border-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{session.topic_name || "General Study"}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {(session.profiles as { name?: string; email?: string } | null)?.name || "Unknown"}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground flex-shrink-0">
                    {formatRelativeDate(session.started_at)}
                  </div>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground text-center py-4">No sessions yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
