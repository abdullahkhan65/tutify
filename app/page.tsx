"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain, Zap, Trophy, BarChart3, BookOpen, MessageSquare,
  ArrowRight, CheckCircle2, Sparkles, Flame, Target, Users,
  Shield, Camera, GraduationCap, Heart, Calendar,
  ChevronDown, Rocket, Globe, Swords, Timer,
  UserPlus, MessageCircle, ListChecks, Award, Wifi, Star
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Animated counter ── */
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = end / (1800 / 16);
    const t = setInterval(() => {
      v += step;
      if (v >= end) { setN(end); clearInterval(t); }
      else setN(Math.floor(v));
    }, 16);
    return () => clearInterval(t);
  }, [inView, end]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

const ROADMAP = [
  { phase: "Phase 1", title: "Core AI Tutor", date: "April 2026", status: "live" as const, color: "amber", items: ["AI Ustaad with 3 personalities", "FSc + Matric full curriculum", "Exam mode MCQs", "Topic Hub with study checklist", "Progress & mastery tracking", "Mobile-first design"] },
  { phase: "Phase 2", title: "Doubt Solver + Past Papers", date: "May–Jun 2026", status: "building" as const, color: "purple", items: ["Photo Doubt Solver — any subject", "Past Paper Mode 2015–2024", "MDCAT / ECAT prep module", "Spaced repetition engine", "Daily streak system"] },
  { phase: "Phase 3", title: "Study Community", date: "Jun–Jul 2026", status: "planned" as const, color: "blue", items: ["Study Groups & Circles", "Challenge / Duel Mode ⚔️", "Focus Rooms (virtual co-study)", "Community Q&A board", "Shared milestones + group todos", "Social leaderboard"] },
  { phase: "Phase 4", title: "AI Intelligence", date: "Jul–Aug 2026", status: "planned" as const, color: "teal", items: ["AI Study Planner day-by-day", "Predicted Board Score", "AI Answer Grader (long questions)", "Exam Countdown Sprint Mode"] },
  { phase: "Phase 5", title: "Growth & Parents", date: "Sep–Oct 2026", status: "planned" as const, color: "orange", items: ["Parent Dashboard + weekly AI reports", "WhatsApp Bot", "School & Academy Portal"] },
  { phase: "Phase 6", title: "Platform", date: "Dec 2026", status: "planned" as const, color: "pink", items: ["Voice-first tutor", "O/A Level curriculum", "NTS/CSS prep", "Offline PWA"] },
];

const colorMap: Record<string, { dot: string; border: string; badge: string }> = {
  amber:  { dot: "bg-amber-400",   border: "border-amber-500/30",   badge: "bg-amber-900/30 text-amber-400 border-amber-500/30" },
  purple: { dot: "bg-purple-400",  border: "border-purple-500/30",  badge: "bg-purple-900/30 text-purple-400 border-purple-500/30" },
  blue:   { dot: "bg-blue-400",    border: "border-blue-500/30",    badge: "bg-blue-900/30 text-blue-400 border-blue-500/30" },
  teal:   { dot: "bg-teal-400",    border: "border-teal-500/30",    badge: "bg-teal-900/30 text-teal-400 border-teal-500/30" },
  orange: { dot: "bg-orange-400",  border: "border-orange-500/30",  badge: "bg-orange-900/30 text-orange-400 border-orange-500/30" },
  pink:   { dot: "bg-pink-400",    border: "border-pink-500/30",    badge: "bg-pink-900/30 text-pink-400 border-pink-500/30" },
};

const COMPETITORS = [
  { name: "Taleem", highlight: true, price: "Rs. 499", bise: "✅", ai: "✅", photo: "Soon", papers: "✅", exam: "✅", urdu: "✅", parent: "Soon" },
  { name: "Chegg", highlight: false, price: "Rs. 4,500", bise: "✗", ai: "✗", photo: "✗", papers: "✗", exam: "✗", urdu: "✗", parent: "✗" },
  { name: "Khan Academy", highlight: false, price: "Free", bise: "✗", ai: "Partial", photo: "✗", papers: "✗", exam: "Partial", urdu: "✗", parent: "✗" },
  { name: "Byju's", highlight: false, price: "Rs. 3,000+", bise: "✗", ai: "✗", photo: "✗", papers: "✗", exam: "Partial", urdu: "✗", parent: "✗" },
];

export default function LandingPage() {
  const [audience, setAudience] = useState<"student" | "parent">("student");
  const [openPhase, setOpenPhase] = useState(0);
  const [commTab, setCommTab] = useState<"groups" | "duels" | "focus" | "leaderboard">("groups");

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-amber-400/20 selection:text-amber-300">

      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 backdrop-blur-2xl bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center shadow-lg glow-amber">
              <span className="text-black font-black text-lg">T</span>
            </div>
            <span className="text-xl font-black tracking-tight">Taleem</span>
            <span className="hidden sm:block text-xs text-amber-400 font-bold tracking-widest uppercase ml-1 opacity-70">تعلیم</span>
          </div>

          <div className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {[["#features", "Features"], ["#community", "Community"], ["#for-parents", "Parents"], ["#roadmap", "Roadmap"], ["#pricing", "Pricing"]].map(([href, label]) => (
              <a key={href} href={href} className="hover:text-foreground transition-colors hover:text-amber-400">{label}</a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/login"><Button variant="ghost" size="sm" className="text-muted-foreground">Log in</Button></Link>
            <Link href="/signup">
              <Button size="sm" className="bg-amber-400 hover:bg-amber-500 text-black font-bold gap-1.5 shadow-lg glow-amber">
                Start Free <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Feature strip (replaces infinite carousel) ── */}
      <div className="pt-16 border-b border-white/5 bg-black/30 py-2.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 flex-wrap">
          {[
            { icon: Brain, label: "AI Ustaad" },
            { icon: BookOpen, label: "200+ Topics" },
            { icon: GraduationCap, label: "4 BISE Boards" },
            { icon: Target, label: "Exam Mode" },
            { icon: Globe, label: "Urdu + English" },
            { icon: Sparkles, label: "Free to Start" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/8 bg-white/3 text-xs text-muted-foreground">
              <Icon className="w-3 h-3 text-amber-400" />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative pt-14 pb-16 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-indigo-900/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-amber-400/4 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="flex justify-center pt-8 mb-10">
            <div className="flex items-center gap-1 p-1 rounded-full border border-white/10 bg-white/5 backdrop-blur">
              {(["student", "parent"] as const).map((a) => (
                <button key={a} onClick={() => setAudience(a)}
                  className={cn("px-5 py-2 rounded-full text-sm font-semibold transition-all",
                    audience === a ? "bg-amber-400 text-black shadow-lg" : "text-muted-foreground hover:text-foreground"
                  )}>
                  {a === "student" ? "👨‍🎓 Student" : "👨‍👩‍👧 Parent"}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {audience === "student" ? (
              <motion.div key="s" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-400/10 text-amber-400 text-xs font-bold mb-8 uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  Pakistan ka #1 AI tutor — bilkul free shuru karo 🇵🇰
                </div>
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-8">
                  <span className="block">Board exam?</span>
                  <span className="block text-amber-400">Sorted. 💀</span>
                </h1>
                <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                  BISE syllabus. AI Ustaad. Har topic explain, har MCQ practice, results dekho grow karte.
                  <span className="text-foreground"> 24/7. No judgment. Bilkul free.</span>
                </p>
              </motion.div>
            ) : (
              <motion.div key="p" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-400/10 text-purple-400 text-xs font-bold mb-8 uppercase tracking-widest">
                  <Heart className="w-3.5 h-3.5" />
                  For parents — know if your child is really prepared
                </div>
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-8">
                  <span className="block">Know if your</span>
                  <span className="block">child is really</span>
                  <span className="block text-amber-400">prepared.</span>
                </h1>
                <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                  Your child gets a 24/7 AI tutor for BISE board exams.
                  <span className="text-foreground"> You get a weekly report</span> — mastery scores, weak topics, predicted board score.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/signup">
              <Button size="lg" className="h-14 px-8 bg-amber-400 hover:bg-amber-500 text-black font-black text-base gap-2 shadow-2xl glow-amber rounded-2xl">
                {audience === "student" ? "Padhai shuru karo — Free!" : "My child needs this →"}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 font-semibold text-base">
                Dekho kya milta hai ↓
              </Button>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap">
            {["🇵🇰 Punjab Board", "Sindh Board", "KPK Board", "Federal Board", "O/A Level — soon"].map((b) => (
              <span key={b} className="text-xs text-muted-foreground border border-white/8 px-3 py-1.5 rounded-full bg-white/3">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hero product mock ── */}
      <motion.div
        className="relative max-w-5xl mx-auto mt-16 px-4"
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-amber-400/15 via-indigo-600/8 to-transparent blur-2xl" />
        <div className="relative rounded-3xl border border-white/10 bg-card/80 backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-black/30">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="flex-1 flex justify-center">
              <span className="text-xs text-muted-foreground bg-white/5 border border-white/8 px-4 py-1 rounded-lg">Newton&apos;s Laws of Motion — Physics FSc Part 1</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" /> Live
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 space-y-4 border-r border-white/5">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center font-black text-black text-sm flex-shrink-0 glow-amber">AI</div>
                <div className="flex-1 bg-white/5 border border-white/8 rounded-2xl rounded-tl-sm p-3.5 text-sm leading-relaxed">
                  Socho — Newton&apos;s First Law bilkul ek <span className="text-amber-400 font-bold">soye hue student</span> jaisi hai 😄
                  Jab tak koi disturb na kare, woh nahi uthega. Yeh hoti hai <span className="text-purple-300 font-bold">inertia!</span>
                  <br /><br />
                  <span className="inline-flex items-center gap-1.5 text-xs bg-amber-400/10 border border-amber-500/20 text-amber-400 px-2.5 py-1 rounded-lg">⭐ BISE 2023 mein aaya tha</span>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-indigo-600/20 border border-indigo-500/20 rounded-2xl rounded-tr-sm p-3.5 text-sm max-w-[75%]">Second law bhi batao!</div>
              </div>
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center font-black text-black text-sm flex-shrink-0 professor-speaking">AI</div>
                <div className="bg-white/5 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3 text-muted-foreground text-sm">
                  <span className="typing-dots">Explain kar raha hoon</span>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4 bg-black/20">
              <div className="text-xs text-amber-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-3.5 h-3.5" /> Smart Whiteboard
              </div>
              <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-2xl p-4">
                <div className="text-xs text-indigo-400 mb-3 font-bold">Newton&apos;s Second Law</div>
                <div className="font-mono text-center text-3xl text-indigo-200 font-black">F = ma</div>
                <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                  {[["F", "Net Force (Newtons, N)"], ["m", "Mass (kg)"], ["a", "Acceleration (m/s²)"]].map(([v, d]) => (
                    <div key={v} className="flex items-center gap-2"><span className="text-indigo-300 font-bold">{v}</span><span>=</span><span>{d}</span></div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Inertia", "Net Force", "Acceleration", "Mass"].map((t) => (
                  <span key={t} className="text-xs border border-white/10 bg-white/5 px-2.5 py-1 rounded-lg text-muted-foreground hover:text-amber-400 hover:border-amber-500/30 transition-colors cursor-pointer">{t}</span>
                ))}
              </div>
              <div className="bg-amber-400/10 border border-amber-500/20 rounded-2xl p-3.5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-amber-400">Test karo? 🎯</div>
                  <div className="text-xs text-muted-foreground">5 BISE-style MCQs ready</div>
                </div>
                <Target className="w-5 h-5 text-amber-400" />
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-white/5 bg-black/20 flex items-center gap-3">
            <Camera className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1 bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-muted-foreground">Photo upload karo ya kuch bhi pucho...</div>
            <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center glow-amber"><MessageSquare className="w-4 h-4 text-black" /></div>
          </div>
        </div>
      </motion.div>

      {/* ── Stats bento ── */}
      <section className="py-20 px-4 mt-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { end: 200, suffix: "+", label: "Topics covered", sub: "FSc + Matric + more", color: "amber" },
            { end: 16, suffix: "", label: "Subject modules", sub: "All 4 subjects × 4 levels", color: "purple" },
            { end: 4, suffix: "", label: "BISE Boards", sub: "Punjab, Sindh, KPK, Federal", color: "teal" },
            { end: 0, suffix: " PKR", label: "To get started", sub: "Bilkul free — seriously", color: "orange" },
          ].map(({ end, suffix, label, sub, color }) => (
            <motion.div key={label}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className={cn("rounded-2xl border p-5 bg-white/3 transition-colors",
                color === "amber"  && "border-amber-500/20 hover:border-amber-500/40",
                color === "purple" && "border-purple-500/20 hover:border-purple-500/40",
                color === "teal"   && "border-teal-500/20 hover:border-teal-500/40",
                color === "orange" && "border-orange-500/20 hover:border-orange-500/40",
              )}>
              <div className={cn("text-4xl font-black mb-1",
                color === "amber"  && "text-amber-400",
                color === "purple" && "text-purple-400",
                color === "teal"   && "text-teal-400",
                color === "orange" && "text-orange-400",
              )}><Counter end={end} suffix={suffix} /></div>
              <div className="font-bold text-sm">{label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features bento grid ── */}
      <section className="py-8 px-4" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-400/8 text-amber-400 text-xs font-bold mb-6 uppercase tracking-widest">
              <CheckCircle2 className="w-3.5 h-3.5" /> Live features — available right now
            </div>
            <h2 className="text-5xl sm:text-6xl font-black mb-4 leading-tight">
              Yeh sab <span className="text-amber-400">aaj live hai.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Sign up karo aur seconds mein use karo. Koi credit card nahi.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Brain,    color: "amber",  title: "AI Ustaad — 3 Personalities",  desc: "Friendly for beginners. Strict for revision. Exam Coach for BISE drills. Switch any time.", span: "lg:col-span-2", live: true },
              { icon: Target,   color: "purple", title: "Exam Mode MCQs",               desc: "BISE-pattern questions generated after every lesson. Timed. With detailed explanations.", span: "", live: true },
              { icon: Camera,   color: "orange", title: "Photo Doubt Solver",           desc: "Snap any question — textbook, handwritten, past paper. All subjects. Coming soon.", span: "", live: false },
              { icon: BarChart3,color: "teal",   title: "Mastery Tracking",             desc: "Per-topic mastery scores. Weak areas flagged. Study checklist per chapter.", span: "", live: true },
              { icon: BookOpen, color: "blue",   title: "200+ Topics, All Boards",      desc: "FSc Part 1&2, Matric 9th&10th, Physics Chemistry Math Biology — full BISE syllabus.", span: "lg:col-span-2", live: true },
              { icon: Flame,    color: "red",    title: "XP, Streaks & Levels",         desc: "Earn XP for every session. Keep your streak. Level up your profile.", span: "", live: true },
              { icon: Globe,    color: "purple", title: "Urdu + English Bilingual",     desc: "AI answers in the language you prefer. Roman Urdu, pure Urdu, or English.", span: "", live: true },
              { icon: Zap,      color: "amber",  title: "LaTeX Math & Diagrams",        desc: "Equations render beautifully. Auto-generated Mermaid diagrams for complex concepts.", span: "", live: true },
            ].map(({ icon: Icon, color, title, desc, span, live }) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className={cn("group relative rounded-2xl border p-6 bg-white/3 hover:bg-white/5 transition-all",
                  color === "amber"  && "border-amber-500/20 hover:border-amber-500/40",
                  color === "purple" && "border-purple-500/20 hover:border-purple-500/40",
                  color === "teal"   && "border-teal-500/20 hover:border-teal-500/40",
                  color === "orange" && "border-orange-500/20 hover:border-orange-500/40",
                  color === "blue"   && "border-blue-500/20 hover:border-blue-500/40",
                  color === "red"    && "border-red-500/20 hover:border-red-500/40",
                  span
                )}>
                {!live && <div className="absolute top-3 right-3"><Badge className="text-xs border bg-purple-900/40 text-purple-400 border-purple-500/30">Soon</Badge></div>}
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 border",
                  color === "amber"  && "bg-amber-900/30 border-amber-500/30",
                  color === "purple" && "bg-purple-900/30 border-purple-500/30",
                  color === "teal"   && "bg-teal-900/30 border-teal-500/30",
                  color === "orange" && "bg-orange-900/30 border-orange-500/30",
                  color === "blue"   && "bg-blue-900/30 border-blue-500/30",
                  color === "red"    && "bg-red-900/30 border-red-500/30",
                )}>
                  <Icon className={cn("w-5 h-5",
                    color === "amber"  && "text-amber-400",
                    color === "purple" && "text-purple-400",
                    color === "teal"   && "text-teal-400",
                    color === "orange" && "text-orange-400",
                    color === "blue"   && "text-blue-400",
                    color === "red"    && "text-red-400",
                  )} />
                </div>
                <h3 className="font-bold mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community ── */}
      <section className="py-24 px-4" id="community">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-400/8 text-blue-400 text-xs font-bold mb-6 uppercase tracking-widest">
              <Users className="w-3.5 h-3.5" /> Community — Coming Jun 2026
            </div>
            <h2 className="text-5xl sm:text-6xl font-black mb-4 leading-tight">
              Akele mat padho. <span className="text-amber-400">Saath padho.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Study groups, friend challenges, virtual focus rooms, leaderboards. Social studying hai toh result bhi social hoga.
            </p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="flex items-center gap-1 p-1.5 rounded-2xl border border-white/10 bg-white/5 flex-wrap justify-center">
              {([
                { key: "groups",      label: "Study Groups", icon: Users },
                { key: "duels",       label: "Duels ⚔️",    icon: Swords },
                { key: "focus",       label: "Focus Rooms",  icon: Timer },
                { key: "leaderboard", label: "Leaderboard",  icon: Trophy },
              ] as const).map(({ key, label, icon: Icon }) => (
                <button key={key} onClick={() => setCommTab(key)}
                  className={cn("flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all",
                    commTab === key ? "bg-amber-400 text-black shadow-lg" : "text-muted-foreground hover:text-foreground"
                  )}>
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {commTab === "groups" && (
              <motion.div key="g" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-3xl font-black mb-4">Apna study circle dhundho</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">Board, subject, class ke hisaab se public groups join karo — ya apne school friends ka private circle banao. Milestones share karo, dekho kaun aage hai.</p>
                  {[
                    { icon: Users,        text: "Browse groups by board & subject" },
                    { icon: ListChecks,   text: "Shared milestones — group progress bar" },
                    { icon: Brain,        text: "AI group insight: this week's weakest topic" },
                    { icon: MessageCircle,text: "Group feed: achievements & announcements" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-sm mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-900/30 border border-blue-500/20 flex items-center justify-center flex-shrink-0"><Icon className="w-4 h-4 text-blue-400" /></div>
                      {text}
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-blue-500/20 bg-white/3 p-5 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold">Discover Groups</span>
                    <button className="text-xs text-amber-400 flex items-center gap-1 font-semibold"><UserPlus className="w-3.5 h-3.5" /> Create</button>
                  </div>
                  {[
                    { emoji: "⚡", name: "FSc Physics 2026 — Punjab",     members: 847,  active: true,  joined: false },
                    { emoji: "🧪", name: "Chemistry Matric 10 — Karachi", members: 423,  active: false, joined: true  },
                    { emoji: "📐", name: "MDCAT Math Sprint 2026",         members: 1204, active: true,  joined: false },
                    { emoji: "🔬", name: "Bio FSc2 Federal Board",         members: 318,  active: false, joined: false },
                  ].map((g) => (
                    <div key={g.name} className={cn("flex items-center gap-3 p-3 rounded-xl border transition-all", g.joined ? "border-amber-500/30 bg-amber-900/10" : "border-white/8 bg-white/3 hover:border-blue-500/20")}>
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl flex-shrink-0">{g.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate">{g.name}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground">{g.members.toLocaleString()} members</span>
                          {g.active && <span className="flex items-center gap-1 text-xs text-amber-400"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />Active</span>}
                        </div>
                      </div>
                      <button className={cn("text-xs px-3 py-1.5 rounded-lg font-bold flex-shrink-0 border transition-all", g.joined ? "bg-amber-400/20 text-amber-400 border-amber-500/30" : "border-white/10 text-muted-foreground hover:border-blue-500/30 hover:text-foreground")}>{g.joined ? "Joined ✓" : "Join"}</button>
                    </div>
                  ))}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/8">
                    <div className="flex items-center justify-between mb-2"><span className="text-xs font-bold text-amber-400">⚡ FSc Physics — Group Milestone</span><span className="text-xs text-muted-foreground">Due May 15</span></div>
                    <div className="text-xs mb-2">Complete Chapter 4: Work &amp; Energy</div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-1.5"><div className="h-full bg-amber-400 rounded-full" style={{ width: "68%" }} /></div>
                    <div className="flex gap-2 text-xs">
                      <span className="text-amber-400">✓ Ahmad</span>
                      <span className="text-amber-400">✓ Fatima</span>
                      <span className="text-yellow-400">⏳ Zainab</span>
                      <span className="text-muted-foreground">+4 more</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {commTab === "duels" && (
              <motion.div key="d" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-3xl font-black mb-4">Dost ko challenge karo. <span className="text-amber-400">Prove it. ⚔️</span></h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">Kisi bhi topic pe 5-question duel bhejo. Dono same AI questions answer karo. Winner ko XP bonus. Loser ko &quot;Revenge?&quot; button. Sabse shareable cheez Taleem mein.</p>
                  {[
                    { icon: Swords, text: "Any topic, any subject — 5 questions" },
                    { icon: Trophy, text: "Winner gets XP + bragging rights" },
                    { icon: Flame,  text: "Head-to-head record vs every friend" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-sm mb-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-900/30 border border-orange-500/20 flex items-center justify-center flex-shrink-0"><Icon className="w-4 h-4 text-orange-400" /></div>
                      {text}
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-orange-500/20 bg-white/3 p-5 space-y-4">
                  <div className="font-bold text-sm flex items-center gap-2"><Swords className="w-4 h-4 text-orange-400" /> Challenge Arena</div>
                  <div className="p-4 rounded-xl border border-orange-500/30 bg-orange-900/10">
                    <div className="flex items-center gap-2 mb-3"><span className="text-xs text-orange-400 font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />LIVE DUEL</span><span className="text-xs text-muted-foreground">· Physics — Newton&apos;s Laws</span></div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="text-center p-3 bg-amber-400/10 rounded-xl border border-amber-500/20"><div className="text-3xl font-black text-amber-400">80%</div><div className="text-xs text-muted-foreground mt-1">You</div><div className="text-xs text-amber-400 font-bold mt-0.5">↑ Winning</div></div>
                      <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10"><div className="text-3xl font-black text-muted-foreground">60%</div><div className="text-xs text-muted-foreground mt-1">Ahmad K.</div><div className="text-xs text-red-400 mt-0.5">Q4 of 5...</div></div>
                    </div>
                    <div className="flex gap-1 justify-center">
                      {[true, true, false, null, null].map((r, i) => (
                        <div key={i} className={cn("w-8 h-8 rounded-lg border text-xs flex items-center justify-center font-black", r === true ? "bg-amber-900/30 border-amber-500/30 text-amber-400" : r === false ? "bg-red-900/30 border-red-500/30 text-red-400" : "bg-white/5 border-white/10 text-muted-foreground")}>{r === true ? "✓" : r === false ? "✗" : i + 1}</div>
                      ))}
                    </div>
                  </div>
                  {[
                    { opponent: "Fatima S.", topic: "Thermodynamics", you: 100, them: 80, won: true },
                    { opponent: "Usman R.",  topic: "Waves & Sound",  you: 60,  them: 80, won: false },
                  ].map((d) => (
                    <div key={d.opponent} className="flex items-center gap-3 p-2.5 rounded-xl border border-white/8 bg-white/3 text-sm">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0", d.won ? "bg-amber-900/30 text-amber-400" : "bg-red-900/30 text-red-400")}>{d.won ? "W" : "L"}</div>
                      <div className="flex-1 min-w-0"><div className="text-xs font-semibold">vs {d.opponent}</div><div className="text-xs text-muted-foreground">{d.topic}</div></div>
                      <div className="text-xs font-bold">{d.you}% <span className="text-muted-foreground font-normal">vs</span> {d.them}%</div>
                      <button className="text-xs text-orange-400 font-semibold hover:underline">Rematch</button>
                    </div>
                  ))}
                  <button className="w-full py-3 rounded-xl border border-orange-500/30 bg-orange-900/10 text-orange-400 text-sm font-bold hover:bg-orange-900/20 transition-colors flex items-center justify-center gap-2"><Swords className="w-4 h-4" /> Challenge a Friend</button>
                </div>
              </motion.div>
            )}

            {commTab === "focus" && (
              <motion.div key="f" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-3xl font-black mb-4">Saath padho. <span className="text-amber-400">Bina baat kiye.</span></h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">Live focus room join karo aur doosron ke saath silence mein padho. Pomodoro timer sab ko accountable rakhta hai. Session khatam hone pe check-in — automatically progress mein log.</p>
                  {[
                    { icon: Wifi,         text: "Live participant count — you're not alone" },
                    { icon: Timer,        text: "Pomodoro timer: 25 min focus, 5 min break" },
                    { icon: CheckCircle2, text: "Post-session check-in auto-logged to progress" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-sm mb-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-900/30 border border-teal-500/20 flex items-center justify-center flex-shrink-0"><Icon className="w-4 h-4 text-teal-400" /></div>
                      {text}
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-teal-500/20 bg-white/3 p-5 space-y-3">
                  <div className="font-bold text-sm flex items-center justify-between">
                    <span className="flex items-center gap-2"><Timer className="w-4 h-4 text-teal-400" /> Focus Rooms — Live</span>
                    <span className="text-amber-400 text-xs font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />49 studying</span>
                  </div>
                  {[
                    { name: "Chemistry Sprint 🧪", students: 14, timer: "18:23" },
                    { name: "Math Revision 📐",    students: 7,  timer: "04:12" },
                    { name: "Physics Night 🌙",    students: 23, timer: "24:55" },
                    { name: "Bio Diagrams 🔬",     students: 5,  timer: "11:30" },
                  ].map((room) => (
                    <div key={room.name} className="flex items-center gap-3 p-3 rounded-xl border border-teal-500/20 bg-teal-900/5 hover:bg-teal-900/10 transition-colors">
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-teal-900/30 border border-teal-500/30 flex items-center justify-center"><Timer className="w-4 h-4 text-teal-400" /></div>
                        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-background animate-pulse" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate">{room.name}</div>
                        <div className="flex items-center gap-2 mt-0.5"><span className="text-xs text-teal-400 font-mono font-bold">{room.timer} left</span><span className="text-xs text-muted-foreground">{room.students} studying</span></div>
                      </div>
                      <button className="text-xs text-teal-400 border border-teal-500/30 bg-teal-900/20 px-3 py-1.5 rounded-lg hover:bg-teal-900/40 font-bold flex-shrink-0">Join</button>
                    </div>
                  ))}
                  <button className="w-full py-2.5 rounded-xl border border-dashed border-teal-500/30 text-teal-400 text-sm font-bold hover:bg-teal-900/10 transition-colors flex items-center justify-center gap-2"><Timer className="w-4 h-4" /> Create New Room</button>
                </div>
              </motion.div>
            )}

            {commTab === "leaderboard" && (
              <motion.div key="l" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-3xl font-black mb-4">Dekho kahan ho. <span className="text-amber-400">Phir upar jao.</span></h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">Weekly XP leaderboard — friend group mein, school mein, city mein, nationally. Subject-specific rankings. Seasonal trophies. Board exam competitive hai — practice bhi honi chahiye.</p>
                  {[
                    { icon: Users,    text: "Friend group, school, city, national rankings" },
                    { icon: BookOpen, text: "Subject-specific: Top Physics scorer this week" },
                    { icon: Award,    text: "Seasonal trophies: Pre-Board Sprint Champion" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-sm mb-3">
                      <div className="w-8 h-8 rounded-lg bg-yellow-900/30 border border-yellow-500/20 flex items-center justify-center flex-shrink-0"><Icon className="w-4 h-4 text-yellow-400" /></div>
                      {text}
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-yellow-500/20 bg-white/3 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-400" /> Weekly Leaderboard</span>
                    <div className="flex gap-1 text-xs">
                      {["Friends", "School", "Punjab"].map((s, i) => (
                        <button key={s} className={cn("px-2.5 py-1 rounded-lg font-semibold", i === 0 ? "bg-yellow-900/30 text-yellow-400 border border-yellow-500/30" : "text-muted-foreground")}>{s}</button>
                      ))}
                    </div>
                  </div>
                  {[
                    { rank: 1, name: "Fatima S.", xp: 2840, streak: 21, you: false },
                    { rank: 2, name: "You 🎯",    xp: 2510, streak: 14, you: true  },
                    { rank: 3, name: "Ahmad K.",  xp: 2390, streak: 9,  you: false },
                    { rank: 4, name: "Sara A.",   xp: 1980, streak: 7,  you: false },
                    { rank: 5, name: "Usman R.",  xp: 1750, streak: 3,  you: false },
                  ].map((e) => (
                    <div key={e.rank} className={cn("flex items-center gap-3 p-3 rounded-xl border", e.you ? "border-amber-500/30 bg-amber-900/10" : "border-white/8 bg-white/3")}>
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0", e.rank === 1 ? "bg-yellow-500/20 text-yellow-400" : e.rank === 2 ? "bg-slate-500/20 text-slate-300" : e.rank === 3 ? "bg-orange-900/30 text-orange-400" : "bg-white/5 text-muted-foreground")}>
                        {e.rank === 1 ? "🥇" : e.rank === 2 ? "🥈" : e.rank === 3 ? "🥉" : e.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={cn("text-sm font-bold", e.you && "text-amber-400")}>{e.name}</div>
                        <div className="text-xs text-orange-400 flex items-center gap-1"><Flame className="w-3 h-3" />{e.streak}d streak</div>
                      </div>
                      <div className="text-sm font-black text-yellow-400">{e.xp.toLocaleString()} XP</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── For Parents ── */}
      <section className="py-24 px-4 border-y border-white/5 bg-white/[0.01]" id="for-parents">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-400/8 text-purple-400 text-xs font-bold mb-6 uppercase tracking-widest"><Heart className="w-3.5 h-3.5" /> For Parents</div>
            <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
              Rs. 5,000 academy ka koi proof nahi.
              <br /><span className="text-amber-400">Taleem mein hai.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">Har hafte aapko AI-generated report milega — kitna padha, kahan weak hai, board exam ka predicted score kya hai. Academy door ho sakta hai. Taleem kabhi nahi.</p>
            {["Weekly AI progress report — no guessing", "Predicted board score updated after every test", "See which topics need more attention", "10x cheaper than Rs. 5,000/month academy", "Available at 11pm when tutor is asleep"].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm mb-3"><CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" /><span>{item}</span></div>
            ))}
            <Link href="/signup" className="inline-block mt-2">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold gap-2 rounded-xl h-12 px-6"><Heart className="w-4 h-4" /> Sign up for my child</Button>
            </Link>
          </div>
          <div className="rounded-2xl border border-purple-500/20 bg-white/3 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div><div className="font-bold">Ahmad Khan — FSc Part 2</div><div className="text-xs text-muted-foreground">Weekly Report · Apr 14–20</div></div>
              <Badge className="text-xs border bg-purple-900/30 text-purple-400 border-purple-500/30">Parent View</Badge>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[{ v: "6.5h", l: "Study Hours", c: "text-amber-400" }, { v: "8", l: "Tests Taken", c: "text-teal-400" }, { v: "72%", l: "Avg Score", c: "text-orange-400" }].map(({ v, l, c }) => (
                <div key={l} className="bg-white/5 border border-white/8 rounded-xl p-3 text-center"><div className={cn("text-xl font-black", c)}>{v}</div><div className="text-xs text-muted-foreground mt-0.5">{l}</div></div>
              ))}
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-2 font-bold uppercase tracking-wider">Subject Mastery</div>
              <div className="space-y-2.5">
                {[{ s: "Physics", n: 78, ch: "+12" }, { s: "Chemistry", n: 65, ch: "+5" }, { s: "Mathematics", n: 55, ch: "-3" }, { s: "Biology", n: 82, ch: "+8" }].map(({ s, n, ch }) => (
                  <div key={s} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-20 flex-shrink-0">{s}</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden"><div className={cn("h-full rounded-full", n >= 75 ? "bg-amber-400" : n >= 55 ? "bg-yellow-500" : "bg-red-500")} style={{ width: `${n}%` }} /></div>
                    <span className="text-xs font-bold w-8 text-right">{n}%</span>
                    <span className={cn("text-xs w-8 font-semibold", ch.startsWith("+") ? "text-amber-400" : "text-red-400")}>{ch}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-orange-900/15 border border-orange-500/20 rounded-xl p-3"><div className="text-xs font-bold text-orange-400 mb-1">⚠️ Needs attention</div><div className="text-xs text-muted-foreground">Mathematics score dropped. Weak in Integration. 2 sessions on Chapter 3 recommended.</div></div>
            <div className="text-center"><Badge className="text-xs border bg-purple-900/30 text-purple-400 border-purple-500/30">Predicted Board Score: 73% → Target: 80%</Badge></div>
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-5xl font-black mb-4">Baaki sab <span className="text-amber-400">Pakistan ke liye nahi</span> bane.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Chegg American students ke liye hai. Byju&apos;s Indian ke liye. Taleem sirf tumhare liye — BISE, Urdu, Pakistan.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/8 bg-white/3">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left px-4 py-4 text-muted-foreground font-bold min-w-[160px]">Feature</th>
                  {COMPETITORS.map((c) => (
                    <th key={c.name} className={cn("px-4 py-4 text-center font-black", c.highlight && "bg-amber-400/8")}>
                      {c.highlight ? <span className="text-amber-400">{c.name}</span> : <span className="text-muted-foreground font-medium">{c.name}</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { key: "bise",   label: "Pakistan BISE Curriculum" },
                  { key: "ai",     label: "Real-time AI Tutor" },
                  { key: "photo",  label: "Photo Doubt Solver" },
                  { key: "papers", label: "BISE Past Papers" },
                  { key: "exam",   label: "Exam Simulation" },
                  { key: "urdu",   label: "Urdu Support" },
                  { key: "parent", label: "Parent Dashboard" },
                  { key: "price",  label: "Price / Month" },
                ].map(({ key, label }, i) => (
                  <tr key={key} className={cn("border-b border-white/5", i % 2 === 0 && "bg-white/[0.01]")}>
                    <td className="px-4 py-3 text-muted-foreground font-medium text-xs">{label}</td>
                    {COMPETITORS.map((c) => {
                      const val = c[key as keyof typeof c] as string;
                      return (
                        <td key={c.name} className={cn("px-4 py-3 text-center", c.highlight && "bg-amber-400/5")}>
                          {val === "✅" ? <span className="text-amber-400 text-base">✅</span>
                          : val === "✗" ? <span className="text-muted-foreground/40 text-base">✗</span>
                          : val === "Soon" ? <Badge className="text-xs border bg-purple-900/30 text-purple-400 border-purple-500/30">Soon</Badge>
                          : val === "Partial" ? <Badge className="text-xs border bg-yellow-900/30 text-yellow-400 border-yellow-500/30">Partial</Badge>
                          : <span className={cn("text-sm font-black", c.highlight && "text-amber-400")}>{val}</span>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Roadmap ── */}
      <section className="py-24 px-4 border-y border-white/5 bg-white/[0.01]" id="roadmap">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-400/8 text-amber-400 text-xs font-bold mb-6 uppercase tracking-widest"><Rocket className="w-3.5 h-3.5" /> Roadmap — honest</div>
            <h2 className="text-5xl font-black mb-4">Kahan ja rahe hain.<br /><span className="text-amber-400">Real timeline.</span></h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Click karo kisi bhi phase pe. Har 2 hafte mein ship karte hain.</p>
          </div>
          <div className="space-y-3">
            {ROADMAP.map((phase, i) => {
              const c = colorMap[phase.color];
              return (
                <motion.div key={phase.phase} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <div className={cn("rounded-2xl border p-5 cursor-pointer transition-all hover:bg-white/3", c.border, openPhase === i && "bg-white/3")} onClick={() => setOpenPhase(openPhase === i ? -1 : i)}>
                    <div className="flex items-center gap-4">
                      <div className={cn("w-3 h-3 rounded-full flex-shrink-0", c.dot, phase.status === "live" && "animate-pulse")} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-muted-foreground">{phase.phase}</span>
                          <span className="font-black text-sm">{phase.title}</span>
                          <Badge className={cn("text-xs border", c.badge)}>
                            {phase.status === "live" ? "🟢 Live" : phase.status === "building" ? "🔨 Building" : "📋 Planned"}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Calendar className="w-3 h-3" /> {phase.date}</div>
                      </div>
                      <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform flex-shrink-0", openPhase === i && "rotate-180")} />
                    </div>
                    <AnimatePresence>
                      {openPhase === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {phase.items.map((item) => (
                              <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                                {phase.status === "live" ? <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" /> : <div className="w-3.5 h-3.5 rounded-full border border-white/20 flex-shrink-0" />}
                                {item}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-8 text-center flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" /> Live</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-400" /> Building</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-white/20" /> Planned</span>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-24 px-4" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-5xl font-black mb-4">Academy: Rs. 5,000/subject.<br /><span className="text-amber-400">Taleem: Rs. 499. Sab kuch.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Free",  price: "Rs. 0",     period: "forever", tag: null,             features: ["5 sessions per day", "All subjects", "Exam mode (3/day)", "Progress tracking"],                                                                                              cta: "Shuru karo — Free",  href: "/signup",           style: "border-white/10 bg-white/3" },
              { name: "Basic", price: "Rs. 499",   period: "/month",  tag: "🔥 Most Popular", features: ["Unlimited sessions", "All 16 modules", "Unlimited exam mode", "Full test history", "Weak area tracking", "Bilingual AI", "Photo Doubt Solver (when live)"],                cta: "Basic shuru karo",   href: "/signup?plan=basic", style: "border-amber-500/40 bg-amber-400/5" },
              { name: "Pro",   price: "Rs. 1,499", period: "/month",  tag: null,             features: ["Everything in Basic", "AI Study Planner", "Predicted board score", "Parent dashboard", "Past papers 2015–2024", "MDCAT/ECAT prep", "Voice tutor", "Priority support"], cta: "Pro shuru karo",     href: "/signup?plan=pro",  style: "border-purple-500/30 bg-purple-900/8" },
            ].map(({ name, price, period, tag, features, cta, href, style }) => {
              const isBasic = name === "Basic";
              return (
                <div key={name} className={cn("relative rounded-2xl border p-6", style)}>
                  {tag && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-xs font-black px-4 py-1 rounded-full">{tag}</div>}
                  <div className="mb-6">
                    <div className="text-sm text-muted-foreground font-bold mb-2">{name}</div>
                    <div className="flex items-end gap-1"><span className="text-4xl font-black">{price}</span><span className="text-muted-foreground text-sm mb-1.5">{period}</span></div>
                  </div>
                  <div className="space-y-2.5 mb-8">
                    {features.map((f) => (
                      <div key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className={cn("w-4 h-4 flex-shrink-0 mt-0.5", isBasic ? "text-amber-400" : "text-teal-400")} />
                        {f}
                      </div>
                    ))}
                  </div>
                  <Link href={href}>
                    <Button className={cn("w-full font-bold rounded-xl h-11", isBasic ? "bg-amber-400 hover:bg-amber-500 text-black glow-amber" : "bg-white/10 hover:bg-white/15 text-foreground border border-white/10")}>{cta}</Button>
                  </Link>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8"><Shield className="w-4 h-4 inline mr-1 mb-0.5" /> School plan — Rs. 15,000/month for 50 students. <a href="mailto:hello@taleem.pk" className="text-amber-400 hover:underline">Contact us →</a></p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-3xl border border-amber-500/20 bg-white/3 p-14 overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-400/8 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="text-7xl mb-5">🎓</div>
              <h2 className="text-5xl sm:text-6xl font-black mb-5 leading-tight">
                Kal se nahi.<br /><span className="text-amber-400">Aaj se.</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">Roz 30 minute Taleem pe — aur board exam se pehle apna poora FSc syllabus 3 baar revise ho jaega. Bilkul free se shuru karo.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="h-14 px-8 bg-amber-400 hover:bg-amber-500 text-black font-black text-base gap-2 rounded-2xl glow-amber"><Rocket className="w-5 h-5" /> Free mein shuru karo 🇵🇰</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl border-white/10 bg-white/5 font-semibold">Pehle se account hai →</Button>
                </Link>
              </div>
              <p className="text-xs text-muted-foreground mt-6">FSc Part 1 · FSc Part 2 · Matric 9th · Matric 10th · Punjab · Sindh · KPK · Federal</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-12 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center glow-amber"><span className="text-black font-black text-base">T</span></div>
                <span className="text-xl font-black">Taleem</span>
                <span className="text-xs text-amber-400 font-bold tracking-widest uppercase opacity-70">تعلیم</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">Pakistan ka AI-powered tutor — FSc, Matric, aur board exam prep ke liye. 🇵🇰</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              <div><div className="font-bold mb-3 text-xs uppercase tracking-wider">Product</div><div className="space-y-2 text-muted-foreground">{[["#features", "Features"], ["#roadmap", "Roadmap"], ["#pricing", "Pricing"]].map(([h, l]) => <a key={l} href={h} className="block hover:text-foreground">{l}</a>)}</div></div>
              <div><div className="font-bold mb-3 text-xs uppercase tracking-wider">Users</div><div className="space-y-2 text-muted-foreground"><a href="#for-parents" className="block hover:text-foreground">For Parents</a><Link href="/signup" className="block hover:text-foreground">For Students</Link><a href="#community" className="block hover:text-foreground">Community</a><a href="mailto:hello@taleem.pk" className="block hover:text-foreground">Schools</a></div></div>
              <div><div className="font-bold mb-3 text-xs uppercase tracking-wider">Legal</div><div className="space-y-2 text-muted-foreground"><a href="#" className="block hover:text-foreground">Privacy</a><a href="#" className="block hover:text-foreground">Terms</a><a href="mailto:hello@taleem.pk" className="block hover:text-foreground">Contact</a></div></div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">© 2026 Taleem. Built in Pakistan 🇵🇰 for Pakistani students.</p>
            <div className="flex items-center gap-1 text-xs text-amber-400 font-bold"><Star className="w-3 h-3" /> تعلیم سب کے لیے</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
