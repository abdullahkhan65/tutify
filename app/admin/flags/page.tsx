import { createClient } from "@/lib/supabase/server";
import FeatureFlagsClient from "./FeatureFlagsClient";

export default async function FeatureFlagsPage() {
  const supabase = await createClient();
  const { data: flags } = await supabase
    .from("feature_flags")
    .select("*")
    .order("key");

  return <FeatureFlagsClient flags={flags || []} />;
}
