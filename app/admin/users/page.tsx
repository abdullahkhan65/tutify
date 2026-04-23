import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { formatRelativeDate } from "@/lib/utils";
import { Flame } from "lucide-react";
import type { Profile } from "@/types/supabase";

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const { data: rawUsers } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);
  const users = (rawUsers || []) as Profile[];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-muted-foreground text-sm mt-0.5">{users?.length || 0} total users</p>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">User</th>
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">Board / Class</th>
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">Plan</th>
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">XP / Level</th>
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">Streak</th>
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {(users || []).map((user) => (
                <tr key={user.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {(user.name || user.email)?.[0]?.toUpperCase() || "?"}
                      </div>
                      <div>
                        <div className="font-medium">{user.name || "—"}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div className="capitalize">{user.board?.replace("_", " ") || "—"}</div>
                    <div className="text-xs">{user.class_level?.replace("_", " ") || "—"}</div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={user.plan === "free" ? "secondary" : user.plan === "pro" ? "purple" : "teal"}
                      className="capitalize text-xs"
                    >
                      {user.plan}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div>{user.xp} XP</div>
                    <div className="text-xs">Level {user.level}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      {user.streak_count}
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {formatRelativeDate(user.created_at)}
                  </td>
                </tr>
              ))}
              {(!users || users.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                    No users yet. Share the app to get your first students!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
