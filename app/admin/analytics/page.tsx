import { createClient } from "@/lib/supabase/server";
import { BarChart3, Users, MessageSquare, Target, TrendingUp, Award } from "lucide-react";
import AnalyticsCharts from "./AnalyticsCharts";

export default async function AdminAnalyticsPage() {
  const supabase = await createClient();
  const db = supabase as any;

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [
    { count: totalUsers },
    { count: activeUsers7d },
    { count: totalSessions },
    { count: totalTests },
    { data: recentUsers },
    { data: recentTests },
    { data: topSubjects },
  ] = await Promise.all([
    db.from("profiles").select("*", { count: "exact", head: true }),
    db.from("profiles").select("*", { count: "exact", head: true }).gte("last_active_date", sevenDaysAgo),
    db.from("chat_sessions").select("*", { count: "exact", head: true }),
    db.from("tests").select("*", { count: "exact", head: true }),
    db.from("profiles").select("id, created_at").gte("created_at", thirtyDaysAgo).order("created_at"),
    db.from("tests").select("score, subject_slug, created_at").gte("created_at", thirtyDaysAgo).order("created_at"),
    db.from("tests").select("subject_slug, score").gte("created_at", thirtyDaysAgo),
  ]);

  // Build daily signup chart data (last 14 days)
  const signupMap: Record<string, number> = {};
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const key = d.toISOString().slice(0, 10);
    signupMap[key] = 0;
  }
  (recentUsers || []).forEach((u: any) => {
    const key = u.created_at?.slice(0, 10);
    if (key && key in signupMap) signupMap[key]++;
  });
  const signupChartData = Object.entries(signupMap).map(([date, count]) => ({
    date: date.slice(5), // MM-DD
    count,
  }));

  // Build avg score by subject
  const subjectScores: Record<string, { total: number; count: number }> = {};
  (topSubjects || []).forEach((t: any) => {
    const slug = t.subject_slug || "unknown";
    if (!subjectScores[slug]) subjectScores[slug] = { total: 0, count: 0 };
    subjectScores[slug].total += t.score;
    subjectScores[slug].count++;
  });
  const subjectChartData = Object.entries(subjectScores).map(([slug, v]) => ({
    subject: slug.replace(/_fsc[12]|_matric[0-9]+/, "").replace(/_/g, " "),
    avgScore: Math.round(v.total / v.count),
    tests: v.count,
  }));

  // Daily test completions (last 14 days)
  const testMap: Record<string, number> = {};
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    testMap[d.toISOString().slice(0, 10)] = 0;
  }
  (recentTests || []).forEach((t: any) => {
    const key = t.created_at?.slice(0, 10);
    if (key && key in testMap) testMap[key]++;
  });
  const testChartData = Object.entries(testMap).map(([date, count]) => ({
    date: date.slice(5),
    count,
  }));

  const stats = [
    { label: "Total Users", value: totalUsers ?? 0, icon: Users, color: "text-purple-400", bg: "bg-purple-900/20 border-purple-500/20" },
    { label: "Active (7d)", value: activeUsers7d ?? 0, icon: TrendingUp, color: "text-teal-400", bg: "bg-teal-900/20 border-teal-500/20" },
    { label: "Total Sessions", value: totalSessions ?? 0, icon: MessageSquare, color: "text-blue-400", bg: "bg-blue-900/20 border-blue-500/20" },
    { label: "Tests Taken", value: totalTests ?? 0, icon: Target, color: "text-orange-400", bg: "bg-orange-900/20 border-orange-500/20" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-400" /> Analytics
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">Real-time data from your database</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className={`glass-strong rounded-2xl border p-4 ${s.bg}`}>
            <div className="flex items-center gap-2 mb-2">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <div className="text-2xl font-black">{s.value.toLocaleString()}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <AnalyticsCharts
        signupData={signupChartData}
        testData={testChartData}
        subjectData={subjectChartData}
      />
    </div>
  );
}
