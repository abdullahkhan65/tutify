import { createClient } from "@/lib/supabase/server";
import ContentClient from "./ContentClient";

export default async function AdminContentPage() {
  const supabase = await createClient();
  const db = supabase as any;

  const { data: questions } = await db
    .from("past_paper_questions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return <ContentClient questions={questions || []} />;
}
