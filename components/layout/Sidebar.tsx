"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, MessageSquare, BookOpen, BarChart3,
  Settings, LogOut, Flame, Zap, Trophy, ChevronRight
} from "lucide-react";
import type { Profile } from "@/types/supabase";

interface SidebarProps {
  profile: Profile | null;
  collapsed?: boolean;
}

const NAV_ITEMS = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/chat", icon: MessageSquare, label: "Study" },
  { href: "/topics", icon: BookOpen, label: "Topics" },
  { href: "/progress", icon: BarChart3, label: "Progress" },
];

export default function Sidebar({ profile, collapsed }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const xpToNextLevel = profile ? (profile.level * profile.level * 100) : 100;
  const xpProgress = profile ? Math.min((profile.xp / xpToNextLevel) * 100, 100) : 0;

  return (
    <aside className={cn(
      "flex flex-col h-full bg-card/30 border-r border-border/50",
      collapsed ? "w-16" : "w-60"
    )}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-border/50">
        <div className="w-8 h-8 rounded-lg bg-[#c9ff47] flex items-center justify-center font-black text-sm text-black flex-shrink-0" style={{ boxShadow: "0 0 12px rgba(185,255,70,0.4)" }}>
          T
        </div>
        {!collapsed && (
          <div className="flex items-center gap-1.5">
            <span className="font-black text-white tracking-tight">Taleem</span>
            <span className="text-xs text-white/30 font-medium">تعلیم</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href}>
              <motion.div
                whileHover={{ x: 2 }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                  isActive
                    ? "bg-purple-900/30 text-purple-300 border border-purple-500/30"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className={cn("w-4 h-4 flex-shrink-0", isActive && "text-purple-400")} />
                {!collapsed && <span>{label}</span>}
                {!collapsed && isActive && (
                  <ChevronRight className="w-3.5 h-3.5 ml-auto text-purple-400" />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User stats */}
      {!collapsed && profile && (
        <div className="px-3 pb-3">
          <div className="glass rounded-xl p-3 border border-border/50 mb-3">
            {/* Streak & XP */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-semibold">{profile.streak_count} day streak</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-semibold">{profile.xp} XP</span>
              </div>
            </div>

            {/* XP progress bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-xs text-muted-foreground">Level {profile.level}</span>
                </div>
                <span className="text-xs text-muted-foreground">{profile.xp}/{xpToNextLevel} XP</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-600 to-violet-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Plan badge */}
          {profile.plan === "free" && (
            <Link href="/pricing">
              <div className="bg-gradient-to-r from-purple-900/30 to-violet-900/30 border border-purple-500/20 rounded-xl p-3 hover:border-purple-500/40 transition-colors cursor-pointer mb-3">
                <div className="text-xs font-medium text-purple-300 mb-0.5">Free Plan</div>
                <div className="text-xs text-muted-foreground">Upgrade for unlimited sessions</div>
                <div className="text-xs text-purple-400 mt-1 font-medium">Upgrade → Rs. 499/mo</div>
              </div>
            </Link>
          )}
        </div>
      )}

      {/* Bottom actions */}
      <div className="px-3 pb-4 border-t border-border/50 pt-3 space-y-1">
        <Link href="/settings">
          <div className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
          )}>
            <Settings className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>Settings</span>}
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
