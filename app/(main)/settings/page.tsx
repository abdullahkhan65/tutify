"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { BOARDS, CLASS_LEVELS, SUBJECTS } from "@/lib/curriculum";
import {
  User, BookOpen, Calendar, Globe, Brain, Shield, Save, LogOut, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Profile } from "@/types/supabase";

const PERSONALITIES = [
  { id: "friendly", label: "Friendly Professor", desc: "Warm, encouraging, uses analogies" },
  { id: "strict", label: "Strict Professor", desc: "Rigorous, no hand-holding" },
  { id: "exam_coach", label: "Exam Coach", desc: "Focused on BISE exam patterns" },
];

export default function SettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  // Form state
  const [name, setName] = useState("");
  const [board, setBoard] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [examDate, setExamDate] = useState("");
  const [targetScore, setTargetScore] = useState(80);
  const [language, setLanguage] = useState("english");
  const [personality, setPersonality] = useState("friendly");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (data) {
        const p = data as Profile;
        setProfile(p);
        setName(p.name || "");
        setBoard(p.board || "punjab");
        setClassLevel(p.class_level || "fsc_1");
        setSelectedSubjects(p.subjects || []);
        setExamDate(p.exam_date || "");
        setTargetScore(p.target_score || 80);
        setLanguage(p.language_pref || "english");
        setPersonality(p.professor_personality || "friendly");
      }
      setLoading(false);
    }
    load();
  }, [router]);

  function toggleSubject(subjectId: string) {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId) ? prev.filter((s) => s !== subjectId) : [...prev, subjectId]
    );
  }

  async function handleSave() {
    if (!profile) return;
    setSaving(true);
    const supabase = createClient();
    const db = supabase as any;
    const { error } = await db.from("profiles").update({
      name,
      board,
      class_level: classLevel,
      subjects: selectedSubjects,
      exam_date: examDate || null,
      target_score: targetScore,
      language_pref: language,
      professor_personality: personality,
    }).eq("id", profile.id);

    setSaving(false);
    if (error) {
      toast.error("Failed to save settings");
    } else {
      toast.success("Settings saved!");
    }
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const sections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "academic", label: "Academic", icon: BookOpen },
    { id: "preferences", label: "Preferences", icon: Brain },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your profile and learning preferences</p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar nav */}
          <div className="w-44 flex-shrink-0 space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left",
                  activeSection === s.id
                    ? "bg-purple-900/30 border border-purple-500/30 text-purple-300"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                <s.icon className="w-4 h-4 flex-shrink-0" />
                {s.label}
              </button>
            ))}
            <div className="pt-4 border-t border-border mt-4 space-y-1">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-900/10 transition-colors text-left"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Profile Section */}
            {activeSection === "profile" && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="glass-strong rounded-2xl border border-border p-5 space-y-4">
                  <h2 className="font-semibold flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-400" /> Profile Info
                  </h2>

                  <div className="space-y-1.5">
                    <label className="text-sm text-muted-foreground">Full Name</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm text-muted-foreground">Email</label>
                    <Input value={profile?.email || ""} disabled className="opacity-50 cursor-not-allowed" />
                    <p className="text-xs text-muted-foreground">Email cannot be changed here</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div>
                      <div className="text-sm font-medium">Plan</div>
                      <div className="text-xs text-muted-foreground capitalize">{profile?.plan || "free"}</div>
                    </div>
                    <Badge variant="outline" className="capitalize">{profile?.plan || "Free"}</Badge>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Academic Section */}
            {activeSection === "academic" && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {/* Board */}
                <div className="glass-strong rounded-2xl border border-border p-5 space-y-3">
                  <h2 className="font-semibold flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-teal-400" /> Board & Class
                  </h2>
                  <div className="space-y-1.5">
                    <label className="text-sm text-muted-foreground">Board</label>
                    <select
                      value={board}
                      onChange={(e) => setBoard(e.target.value)}
                      className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                    >
                      {BOARDS.map((b) => (
                        <option key={b.id} value={b.id}>{b.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm text-muted-foreground">Class Level</label>
                    <select
                      value={classLevel}
                      onChange={(e) => setClassLevel(e.target.value)}
                      className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                    >
                      {CLASS_LEVELS.map((c) => (
                        <option key={c.id} value={c.id}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subjects */}
                <div className="glass-strong rounded-2xl border border-border p-5 space-y-3">
                  <h2 className="font-semibold">Subjects</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {SUBJECTS.filter((s) => s.key).map((subject) => (
                      <button
                        key={subject.id}
                        onClick={() => toggleSubject(subject.id)}
                        className={cn(
                          "flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all text-left",
                          selectedSubjects.includes(subject.id)
                            ? "border-purple-500 bg-purple-900/20 text-purple-300"
                            : "border-border bg-secondary/50 text-muted-foreground hover:border-border/80"
                        )}
                      >
                        <span>{subject.icon}</span>
                        <span>{subject.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Exam date & target */}
                <div className="glass-strong rounded-2xl border border-border p-5 space-y-3">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-orange-400" /> Exam Goals
                  </h2>
                  <div className="space-y-1.5">
                    <label className="text-sm text-muted-foreground">Exam Date</label>
                    <Input
                      type="date"
                      value={examDate}
                      onChange={(e) => setExamDate(e.target.value)}
                      className="[color-scheme:dark]"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">Target Score</label>
                      <span className="text-sm font-bold text-purple-400">{targetScore}%</span>
                    </div>
                    <input
                      type="range"
                      min={50} max={100} step={5}
                      value={targetScore}
                      onChange={(e) => setTargetScore(Number(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>50%</span><span>75%</span><span>100%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Preferences Section */}
            {activeSection === "preferences" && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {/* Language */}
                <div className="glass-strong rounded-2xl border border-border p-5 space-y-3">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-400" /> Language
                  </h2>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "english", label: "English", flag: "🇬🇧" },
                      { id: "urdu", label: "اردو (Urdu)", flag: "🇵🇰" },
                    ].map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => setLanguage(lang.id)}
                        className={cn(
                          "flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all",
                          language === lang.id
                            ? "border-blue-500 bg-blue-900/20 text-blue-300"
                            : "border-border bg-secondary/50 text-muted-foreground hover:border-border/80"
                        )}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Professor Personality */}
                <div className="glass-strong rounded-2xl border border-border p-5 space-y-3">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-400" /> Professor Style
                  </h2>
                  <div className="space-y-2">
                    {PERSONALITIES.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPersonality(p.id)}
                        className={cn(
                          "w-full flex items-center justify-between p-3.5 rounded-xl border text-sm transition-all text-left",
                          personality === p.id
                            ? "border-purple-500 bg-purple-900/20"
                            : "border-border bg-secondary/50 hover:border-border/80"
                        )}
                      >
                        <div>
                          <div className={cn("font-medium", personality === p.id ? "text-purple-300" : "text-foreground")}>
                            {p.label}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">{p.desc}</div>
                        </div>
                        {personality === p.id && (
                          <div className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Save button */}
            <Button
              variant="gradient"
              className="w-full gap-2"
              onClick={handleSave}
              disabled={saving}
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
