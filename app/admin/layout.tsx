import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { LayoutDashboard, Users, BookOpen, BarChart3, Settings, Flag, MessageSquare } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profileData } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  const profile = profileData as { is_admin: boolean } | null;
  if (!profile?.is_admin) redirect("/dashboard");

  const NAV = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/content", label: "Content", icon: BookOpen },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/sessions", label: "Sessions", icon: MessageSquare },
    { href: "/admin/flags", label: "Feature Flags", icon: Flag },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside className="w-56 flex-shrink-0 bg-card/30 border-r border-border/50 flex flex-col">
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-border/50">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center text-white font-bold text-sm">T</div>
          <div>
            <div className="font-bold text-sm text-gradient-purple">Taleem</div>
            <div className="text-xs text-muted-foreground">Admin Panel</div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}>
              <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
                <Icon className="w-4 h-4" />
                {label}
              </div>
            </Link>
          ))}
        </nav>
        <div className="px-3 pb-4 border-t border-border/50 pt-3">
          <Link href="/dashboard">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-muted-foreground hover:text-foreground transition-colors">
              ← Back to app
            </div>
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
