"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type { FeatureFlag } from "@/types/supabase";
import { Badge } from "@/components/ui/badge";

export default function FeatureFlagsClient({ flags }: { flags: FeatureFlag[] }) {
  const [localFlags, setLocalFlags] = useState(flags);
  const [toggling, setToggling] = useState<string | null>(null);

  async function toggleFlag(id: string, currentValue: boolean) {
    setToggling(id);
    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from("feature_flags")
      .update({ is_enabled: !currentValue, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update flag");
    } else {
      setLocalFlags((prev) =>
        prev.map((f) => (f.id === id ? { ...f, is_enabled: !currentValue } : f))
      );
      toast.success(`Feature ${!currentValue ? "enabled" : "disabled"}`);
    }
    setToggling(null);
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Feature Flags</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Toggle features on/off without redeployment
        </p>
      </div>

      <div className="space-y-3">
        {localFlags.map((flag) => (
          <div
            key={flag.id}
            className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-medium text-sm">{flag.name || flag.key}</span>
                <Badge variant={flag.is_enabled ? "success" : "secondary"} className="text-xs">
                  {flag.is_enabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">{flag.description}</div>
              <div className="text-xs text-muted-foreground mt-0.5 font-mono">{flag.key}</div>
            </div>

            {/* Toggle switch */}
            <button
              onClick={() => toggleFlag(flag.id, flag.is_enabled)}
              disabled={toggling === flag.id}
              className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                flag.is_enabled ? "bg-purple-600" : "bg-secondary border border-border"
              } disabled:opacity-50`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  flag.is_enabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}

        {localFlags.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No feature flags found.</p>
            <p className="text-xs mt-1">Run the SQL schema to seed default flags.</p>
          </div>
        )}
      </div>
    </div>
  );
}
