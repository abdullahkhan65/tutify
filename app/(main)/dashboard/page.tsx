import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [profileResult, sessionsResult, testsResult, progressResult] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("sessions").select("*").eq("user_id", user.id).order("started_at", { ascending: false }).limit(5),
    supabase.from("tests").select("*").eq("user_id", user.id).order("completed_at", { ascending: false }).limit(5),
    supabase.from("user_progress").select("*").eq("user_id", user.id),
  ]);

  return (
    <DashboardClient
      profile={profileResult.data}
      recentSessions={sessionsResult.data || []}
      recentTests={testsResult.data || []}
      progress={progressResult.data || []}
    />
  );
}
