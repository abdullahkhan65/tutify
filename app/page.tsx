"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain, Zap, Trophy, BarChart3, BookOpen, MessageSquare,
  ChevronRight, Star, ArrowRight, CheckCircle2, Sparkles,
  Flame, Target, Users, Shield, Camera, Clock, TrendingUp,
  GraduationCap, Heart, MapPin, Calendar,
  ChevronDown, Play, Lock, Rocket, Globe, Swords, Timer,
  UserPlus, MessageCircle, ListChecks, Award, Wifi
} from "lucide-react";
import { cn } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" } }),
};

function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const FEATURES_LIVE = [
  { label: "AI Professor (3 personalities)", live: true, icon: Brain },
  { label: "Smart Whiteboard with LaTeX math", live: true, icon: Zap },
  { label: "BISE-style Exam Mode (MCQs)", live: true, icon: Target },
  { label: "Topic Hub with study checklist", live: true, icon: CheckCircle2 },
  { label: "FSc Part 1 & 2 full curriculum", live: true, icon: BookOpen },
  { label: "Matric 9th & 10th curriculum", live: true, icon: BookOpen },
  { label: "Test history with question breakdown", live: true, icon: BarChart3 },
  { label: "Progress tracking + mastery score", live: true, icon: TrendingUp },
  { label: "XP, levels & streaks", live: true, icon: Flame },
  { label: "Mobile-first responsive design", live: true, icon: Globe },
  { label: "Bilingual (Urdu + English)", live: true, icon: Globe },
  { label: "Study Groups & Circles", live: false, icon: Users },
  { label: "Challenge / Duel Mode ⚔️", live: false, icon: Swords },
  { label: "Focus Rooms (virtual co-study)", live: false, icon: Timer },
  { label: "Community Q&A Board", live: false, icon: MessageCircle },
  { label: "Photo Doubt Solver", live: false, icon: Camera },
  { label: "Past Paper Mode (2015–2024)", live: false, icon: BookOpen },
  { label: "MDCAT / ECAT Prep", live: false, icon: GraduationCap },
  { label: "AI Study Planner", live: false, icon: Calendar },
  { label: "Predicted Board Score", live: false, icon: BarChart3 },
  { label: "Parent Dashboard", live: false, icon: Heart },
  { label: "WhatsApp Bot", live: false, icon: MessageSquare },
  { label: "School Portal (B2B)", live: false, icon: Users },
  { label: "Voice Tutor", live: false, icon: Play },
];

const COMPETITORS = [
  {
    name: "Tutify",
    highlight: true,
    rows: {
      "Pakistan BISE curriculum": "✅",
      "Real-time AI tutor": "✅",
      "Photo doubt solver": "Coming",
      "Past papers (BISE)": "✅",
      "Exam simulation": "✅",
      "Urdu support": "✅",
      "Parent dashboard": "Coming",
      "Price / month": "Rs. 499",
    },
  },
  {
    name: "Chegg",
    highlight: false,
    rows: {
      "Pakistan BISE curriculum": "❌",
      "Real-time AI tutor": "❌",
      "Photo doubt solver": "❌",
      "Past papers (BISE)": "❌",
      "Exam simulation": "❌",
      "Urdu support": "❌",
      "Parent dashboard": "❌",
      "Price / month": "Rs. 4,500",
    },
  },
  {
    name: "Khan Academy",
    highlight: false,
    rows: {
      "Pakistan BISE curriculum": "❌",
      "Real-time AI tutor": "Partial",
      "Photo doubt solver": "❌",
      "Past papers (BISE)": "❌",
      "Exam simulation": "Partial",
      "Urdu support": "❌",
      "Parent dashboard": "❌",
      "Price / month": "Free",
    },
  },
  {
    name: "Byju's",
    highlight: false,
    rows: {
      "Pakistan BISE curriculum": "❌",
      "Real-time AI tutor": "❌",
      "Photo doubt solver": "❌",
      "Past papers (BISE)": "❌",
      "Exam simulation": "Partial",
      "Urdu support": "❌",
      "Parent dashboard": "❌",
      "Price / month": "Rs. 3,000+",
    },
  },
];

const ROADMAP = [
  {
    phase: "Phase 1",
    title: "Core AI Tutor",
    date: "April 2026",
    status: "live" as const,
    color: "green",
    items: ["AI Professor with 3 personalities", "FSc + Matric full curriculum", "Exam mode MCQs", "Topic Hub with checklist", "Progress tracking", "Mobile-first design"],
  },
  {
    phase: "Phase 2",
    title: "Doubt Solving + Past Papers",
    date: "May–Jun 2026",
    status: "building" as const,
    color: "purple",
    items: ["Photo Doubt Solver (any subject)", "Past Paper Mode 2015–2024", "MDCAT / ECAT prep module", "Spaced repetition engine", "Daily streak reminders"],
  },
  {
    phase: "Phase 3",
    title: "Study Community",
    date: "Jun–Jul 2026",
    status: "planned" as const,
    color: "blue",
    items: ["Study Groups & Circles", "Challenge / Duel Mode ⚔️", "Focus Rooms (virtual co-study)", "Community Q&A board", "Shared milestones & group to-dos", "Social leaderboard + student profiles"],
  },
  {
    phase: "Phase 4",
    title: "AI Intelligence Layer",
    date: "Jul–Aug 2026",
    status: "planned" as const,
    color: "teal",
    items: ["AI Study Planner (day-by-day)", "Predicted Board Score", "AI Answer Grader (long questions)", "Exam Countdown Sprint Mode", "AI Revision Notes Generator"],
  },
  {
    phase: "Phase 5",
    title: "Growth & Parents",
    date: "Sep–Oct 2026",
    status: "planned" as const,
    color: "orange",
    items: ["Parent Dashboard + weekly reports", "WhatsApp Bot", "School & Academy Portal", "Flashcard system + Leaderboard"],
  },
  {
    phase: "Phase 6",
    title: "Platform",
    date: "Dec 2026",
    status: "planned" as const,
    color: "pink",
    items: ["Voice-first tutor mode", "O/A Level curriculum", "NTS/CSS prep", "Offline PWA mode", "Full Urdu UI (RTL)"],
  },
];

function RoadmapCard({ phase, onToggle, isOpen }: { phase: typeof ROADMAP[0]; onToggle: () => void; isOpen: boolean }) {
  const colorMap = {
    green: { badge: "bg-green-900/30 border-green-500/30 text-green-400", dot: "bg-green-400", line: "border-green-500/30" },
    purple: { badge: "bg-purple-900/30 border-purple-500/30 text-purple-400", dot: "bg-purple-400", line: "border-purple-500/30" },
    blue: { badge: "bg-blue-900/30 border-blue-500/30 text-blue-400", dot: "bg-blue-400", line: "border-blue-500/30" },
    teal: { badge: "bg-teal-900/30 border-teal-500/30 text-teal-400", dot: "bg-teal-400", line: "border-teal-500/30" },
    orange: { badge: "bg-orange-900/30 border-orange-500/30 text-orange-400", dot: "bg-orange-400", line: "border-orange-500/30" },
    pink: { badge: "bg-pink-900/30 border-pink-500/30 text-pink-400", dot: "bg-pink-400", line: "border-pink-500/30" },
  };
  const c = colorMap[phase.color as keyof typeof colorMap];

  return (
    <div className={cn("rounded-2xl border p-5 cursor-pointer transition-all", c.line, isOpen && "bg-white/[0.02]")} onClick={onToggle}>
      <div className="flex items-center gap-4">
        <div className={cn("w-3 h-3 rounded-full flex-shrink-0", c.dot, phase.status === "live" && "animate-pulse")} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">{phase.phase}</span>
            <span className="font-semibold text-sm">{phase.title}</span>
            <Badge className={cn("text-xs border", c.badge)}>
              {phase.status === "live" ? "🟢 Live" : phase.status === "building" ? "🔨 Building" : "📋 Planned"}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            <Calendar className="w-3 h-3" /> {phase.date}
          </div>
        </div>
        <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform flex-shrink-0", isOpen && "rotate-180")} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {phase.items.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  {phase.status === "live"
                    ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                    : <div className="w-3.5 h-3.5 rounded-full border border-border flex-shrink-0" />}
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CompetitorCell({ value }: { value: string }) {
  if (value === "✅") return <span className="text-green-400 font-bold text-base">✅</span>;
  if (value === "❌") return <span className="text-red-400/60 text-base">✗</span>;
  if (value === "Coming") return <Badge className="text-xs bg-purple-900/30 border-purple-500/30 text-purple-400 border">Coming</Badge>;
  if (value === "Partial") return <Badge className="text-xs bg-yellow-900/30 border-yellow-500/30 text-yellow-400 border">Partial</Badge>;
  return <span className="text-sm font-semibold">{value}</span>;
}

export default function LandingPage() {
  const [audience, setAudience] = useState<"student" | "parent">("student");
  const [openPhase, setOpenPhase] = useState<number>(0);
  const [commTab, setCommTab] = useState<"groups" | "duels" | "focus" | "leaderboard">("groups");

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-900/50">T</div>
            <span className="text-lg font-bold text-gradient-purple">Tutify</span>
            <Badge className="ml-1 text-xs bg-green-900/30 border-green-500/30 text-green-400 border hidden sm:inline-flex">Beta</Badge>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#whats-built" className="hover:text-foreground transition-colors">What's Live</a>
            <a href="#community" className="hover:text-foreground transition-colors">Community</a>
            <a href="#for-parents" className="hover:text-foreground transition-colors">For Parents</a>
            <a href="#roadmap" className="hover:text-foreground transition-colors">Roadmap</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link href="/signup">
              <Button variant="gradient" size="sm" className="gap-1.5">
                Start Free <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-700/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-teal-700/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-900/20 text-purple-300 text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Pakistan&apos;s first AI tutor built for BISE board exams
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            </div>
          </motion.div>

          {/* Audience toggle */}
          <motion.div initial="hidden" animate="visible" custom={0.5} variants={fadeUp} className="flex justify-center mb-8">
            <div className="flex items-center gap-1 p-1 rounded-xl border border-border bg-card">
              {(["student", "parent"] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => setAudience(a)}
                  className={cn(
                    "px-5 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                    audience === a ? "bg-purple-600 text-white shadow-lg" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {a === "student" ? "👨‍🎓 I'm a Student" : "👨‍👩‍👧 I'm a Parent"}
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {audience === "student" ? (
              <motion.div key="student" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
                  Your AI Professor
                  <br />
                  <span className="text-gradient">Who Actually Cares</span>
                  <br />
                  If You Pass
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                  BISE board-aligned AI tutor that knows your syllabus chapter by chapter, remembers your weak topics,
                  simulates real exam questions, and won&apos;t let you fail.{" "}
                  <span className="text-foreground font-medium">Available at 2am. No judgment.</span>
                </p>
              </motion.div>
            ) : (
              <motion.div key="parent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
                  Know Exactly How
                  <br />
                  <span className="text-gradient">Prepared Your Child Is</span>
                  <br />
                  For Board Exams
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                  Tutify gives your child a 24/7 AI professor for their BISE exams — and gives{" "}
                  <span className="text-foreground font-medium">you a weekly report</span> on exactly what they&apos;ve covered,
                  where they&apos;re weak, and what their predicted board score is.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link href="/signup">
              <Button variant="gradient" size="xl" className="gap-2 shadow-xl shadow-purple-900/40">
                {audience === "student" ? "Start Learning Free" : "Create Account for Your Child"}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="#whats-built">
              <Button variant="glass" size="xl" className="gap-2">
                <Play className="w-4 h-4" />
                See What&apos;s Live
              </Button>
            </a>
          </motion.div>

          <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp} className="flex items-center justify-center gap-2 flex-wrap">
            {["Punjab Board", "Sindh Board", "KPK Board", "Federal Board"].map((b) => (
              <span key={b} className="text-xs text-muted-foreground border border-border/50 px-3 py-1 rounded-full flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5" /> {b}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Hero mock UI */}
        <motion.div
          className="relative max-w-5xl mx-auto mt-20"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
        >
          <div className="glass-strong rounded-3xl border border-purple-500/20 overflow-hidden shadow-2xl shadow-purple-900/20">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-card/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-lg">Newton&apos;s Laws of Motion — Physics FSc Part 1</span>
              </div>
              <Badge className="text-xs bg-green-900/30 border-green-500/30 text-green-400 border">Live Session</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 border-r border-border/30 space-y-4">
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">AI</div>
                  <div className="bg-secondary/80 rounded-2xl rounded-tl-sm p-3 text-sm text-foreground/90 leading-relaxed">
                    Think of Newton&apos;s First Law like a sleeping student 😄 They won&apos;t wake up unless you{" "}
                    <span className="text-purple-300 font-semibold">disturb them</span> — that&apos;s <span className="text-purple-300 font-semibold">inertia!</span>
                    <br /><br />
                    <span className="font-mono text-xs text-purple-200 bg-purple-900/30 px-2 py-0.5 rounded">⭐ This definition appeared in BISE 2023</span>
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="bg-purple-600/30 border border-purple-500/20 rounded-2xl rounded-tr-sm p-3 text-sm max-w-[80%]">What about the second law?</div>
                </div>
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 professor-speaking">AI</div>
                  <div className="bg-secondary/80 rounded-2xl rounded-tl-sm px-4 py-3 text-muted-foreground text-sm">
                    <span className="typing-dots">Explaining</span>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4 bg-card/30">
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-purple-400" /> Smart Whiteboard
                </div>
                <div className="bg-purple-900/20 border border-purple-500/20 rounded-xl p-4">
                  <div className="text-xs text-purple-400 mb-2 font-medium">Newton&apos;s Second Law</div>
                  <div className="font-mono text-center text-2xl text-purple-200 font-bold">F = ma</div>
                  <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <div>F = Net Force (Newtons, N)</div>
                    <div>m = Mass (kilograms, kg)</div>
                    <div>a = Acceleration (m/s²)</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Inertia", "Net Force", "Acceleration", "Mass"].map((t) => (
                    <span key={t} className="text-xs bg-secondary border border-border px-2 py-1 rounded-lg text-foreground/80">{t}</span>
                  ))}
                </div>
                <div className="bg-teal-900/20 border border-teal-500/20 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-teal-400">Ready for a test?</div>
                    <div className="text-xs text-muted-foreground">5 BISE-style MCQs generated</div>
                  </div>
                  <Target className="w-5 h-5 text-teal-400" />
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-border/50 bg-card/50 flex items-center gap-3">
              <Camera className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 bg-secondary rounded-xl px-4 py-2.5 text-sm text-muted-foreground">Ask anything or upload a photo of your question...</div>
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center"><MessageSquare className="w-4 h-4 text-white" /></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats counter */}
      <section className="py-16 px-4 border-y border-border/30">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { end: 200, suffix: "+", label: "Topics covered", icon: BookOpen, color: "text-purple-400" },
            { end: 4, suffix: "", label: "Supported boards", icon: Shield, color: "text-teal-400" },
            { end: 16, suffix: "", label: "Subject modules", icon: Brain, color: "text-orange-400" },
            { end: 0, suffix: " PKR", label: "To get started", icon: Star, color: "text-green-400" },
          ].map(({ end, suffix, label, icon: Icon, color }) => (
            <motion.div
              key={label}
              className="glass rounded-2xl p-5 text-center border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Icon className={cn("w-5 h-5 mx-auto mb-3", color)} />
              <div className={cn("text-2xl font-black mb-1", color)}>
                <AnimatedCounter end={end} suffix={suffix} />
              </div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What's Built Today */}
      <section className="py-24 px-4" id="whats-built">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-green-900/30 border-green-500/30 text-green-400 border">What&apos;s Live Today</Badge>
            <h2 className="text-4xl font-bold mb-4">
              Built & shipped. <span className="text-gradient">Ready to use now.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything marked ✅ works in the app today. Coming soon features are already in development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURES_LIVE.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all",
                  f.live
                    ? "border-green-500/20 bg-green-900/5 hover:border-green-500/40"
                    : "border-border/50 bg-card/30 opacity-60"
                )}
              >
                {f.live
                  ? <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                  : <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                <span className={cn("text-sm", f.live ? "text-foreground" : "text-muted-foreground")}>
                  {f.label}
                </span>
                {!f.live && (
                  <Badge className="ml-auto text-xs bg-purple-900/30 border-purple-500/30 text-purple-400 border flex-shrink-0">Soon</Badge>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Journey */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-purple-900/4 to-transparent" id="how-it-works">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-900/30 border-purple-500/30 text-purple-400 border">The Student Journey</Badge>
            <h2 className="text-4xl font-bold mb-4">From zero to <span className="text-gradient">board exam ready</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1", icon: BookOpen, color: "purple", title: "Pick your topic",
                desc: "Browse 200+ topics organized by chapter. See your mastery, checklist, and what to study next.",
              },
              {
                step: "2", icon: Brain, color: "violet", title: "Learn with AI",
                desc: "Your professor explains step-by-step with real analogies, LaTeX math, and auto-generated diagrams.",
              },
              {
                step: "3", icon: Target, color: "teal", title: "Practice & test",
                desc: "BISE-style MCQs after every lesson. See exactly which questions you got wrong and why.",
              },
              {
                step: "4", icon: TrendingUp, color: "orange", title: "Track & predict",
                desc: "Watch your mastery grow. Get a predicted board score. See which topics still need work.",
              },
            ].map(({ step, icon: Icon, color, title, desc }) => (
              <motion.div
                key={step}
                className="relative text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Number(step) * 0.1 }}
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 border",
                  color === "purple" && "bg-purple-900/30 border-purple-500/30",
                  color === "violet" && "bg-violet-900/30 border-violet-500/30",
                  color === "teal" && "bg-teal-900/30 border-teal-500/30",
                  color === "orange" && "bg-orange-900/30 border-orange-500/30",
                )}>
                  <Icon className={cn(
                    "w-6 h-6",
                    color === "purple" && "text-purple-400",
                    color === "violet" && "text-violet-400",
                    color === "teal" && "text-teal-400",
                    color === "orange" && "text-orange-400",
                  )} />
                </div>
                <div className="text-4xl font-black text-gradient opacity-30 absolute -top-2 right-4">{step}</div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Parents */}
      <section className="py-24 px-4" id="for-parents">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-teal-900/30 border-teal-500/30 text-teal-400 border">For Parents</Badge>
              <h2 className="text-4xl font-bold mb-6">
                You&apos;re paying for the academy.
                <br />
                <span className="text-gradient">Do you know if it&apos;s working?</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Tutify costs less than one academy class and gives your child access to a personal AI professor 24/7.
                Every week, you&apos;ll get a clear picture of what they&apos;re studying, where they&apos;re struggling, and
                whether they&apos;re on track for their board exams.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Weekly progress report — no guessing",
                  "Predicted board score updated after every test",
                  "See exactly which topics need more work",
                  "10x cheaper than Rs. 5,000/month academy",
                  "Available at 10pm when academy is closed",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/signup">
                <Button variant="teal" size="lg" className="gap-2">
                  <Heart className="w-4 h-4" />
                  Create Account for My Child
                </Button>
              </Link>
            </div>

            {/* Mock parent dashboard */}
            <div className="glass-strong rounded-2xl border border-teal-500/20 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm">Ahmad Khan — FSc Part 2</div>
                  <div className="text-xs text-muted-foreground">Weekly Report · Apr 14–20</div>
                </div>
                <Badge className="text-xs bg-teal-900/30 border-teal-500/30 text-teal-400 border">Parent View</Badge>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Study Hours", value: "6.5h", color: "text-purple-400" },
                  { label: "Tests Taken", value: "8", color: "text-teal-400" },
                  { label: "Avg Score", value: "72%", color: "text-orange-400" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-secondary/50 rounded-xl p-3 text-center">
                    <div className={cn("text-lg font-bold", color)}>{value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-2 font-medium">Subject Mastery</div>
                <div className="space-y-2.5">
                  {[
                    { subject: "Physics", score: 78, change: "+12" },
                    { subject: "Chemistry", score: 65, change: "+5" },
                    { subject: "Mathematics", score: 55, change: "-3" },
                    { subject: "Biology", score: 82, change: "+8" },
                  ].map(({ subject, score, change }) => (
                    <div key={subject} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-20 flex-shrink-0">{subject}</span>
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full", score >= 75 ? "bg-green-500" : score >= 55 ? "bg-yellow-500" : "bg-red-500")}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold w-8 text-right">{score}%</span>
                      <span className={cn("text-xs w-8", change.startsWith("+") ? "text-green-400" : "text-red-400")}>{change}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-900/15 border border-orange-500/20 rounded-xl p-3">
                <div className="text-xs font-medium text-orange-400 mb-1">⚠️ Needs attention</div>
                <div className="text-xs text-muted-foreground">Mathematics score dropped. Weak in Integration. Recommend 2 sessions on Chapter 3.</div>
              </div>

              <div className="text-center">
                <Badge className="text-xs bg-purple-900/30 border-purple-500/30 text-purple-400 border">
                  Predicted Board Score: 73% → Target: 80%
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Community Section ── */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-blue-900/4 to-transparent" id="community">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-blue-900/30 border-blue-500/30 text-blue-400 border">Study Community</Badge>
            <h2 className="text-4xl font-bold mb-4">
              Study better together. <span className="text-gradient">Never fall behind alone.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Join study groups, challenge friends to duels, hold each other accountable in focus rooms,
              and climb leaderboards together. Social studying isn&apos;t cheating — it&apos;s the only way top scorers do it.
            </p>
          </div>

          {/* Tab bar */}
          <div className="flex justify-center mb-10">
            <div className="flex items-center gap-1 p-1 rounded-2xl border border-border bg-card/60 backdrop-blur flex-wrap justify-center">
              {([
                { key: "groups", label: "Study Groups", icon: Users },
                { key: "duels", label: "Challenges", icon: Swords },
                { key: "focus", label: "Focus Rooms", icon: Timer },
                { key: "leaderboard", label: "Leaderboard", icon: Trophy },
              ] as const).map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setCommTab(key)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                    commTab === key
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab panels */}
          <AnimatePresence mode="wait">

            {/* ── Study Groups ── */}
            {commTab === "groups" && (
              <motion.div key="groups" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-3">Find your study tribe</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Join public groups by board, class, and subject — or create a private circle for your school friends.
                    Share milestones, track who&apos;s ahead, and get AI-generated group study plans.
                  </p>
                  <div className="space-y-3 mb-6">
                    {[
                      { icon: Users, text: "Browse public groups by board & subject" },
                      { icon: ListChecks, text: "Shared milestones — group progress bar" },
                      { icon: Brain, text: "AI group insight: weakest topic this week" },
                      { icon: MessageCircle, text: "Group feed: achievements, announcements" },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-lg bg-blue-900/30 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-blue-400" />
                        </div>
                        {text}
                      </div>
                    ))}
                  </div>
                  <Badge className="bg-purple-900/30 border-purple-500/30 text-purple-400 border text-xs">Coming Jun 2026</Badge>
                </div>

                {/* Mock group UI */}
                <div className="glass-strong rounded-2xl border border-blue-500/20 p-5 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">Discover Groups</span>
                    <button className="text-xs text-blue-400 flex items-center gap-1"><UserPlus className="w-3.5 h-3.5" /> Create</button>
                  </div>
                  {[
                    { emoji: "⚡", name: "FSc Physics 2026 — Punjab", members: 847, subject: "Physics", active: true, joined: false },
                    { emoji: "🧪", name: "Chemistry Matric 10 — Karachi", members: 423, subject: "Chemistry", active: false, joined: true },
                    { emoji: "📐", name: "MDCAT Math Sprint 2026", members: 1204, subject: "Math", active: true, joined: false },
                    { emoji: "🔬", name: "Bio FSc2 Federal Board", members: 318, subject: "Biology", active: false, joined: false },
                  ].map((g) => (
                    <div key={g.name} className={cn("flex items-center gap-3 p-3 rounded-xl border transition-all", g.joined ? "border-blue-500/30 bg-blue-900/10" : "border-border/50 bg-card/30 hover:border-blue-500/20")}>
                      <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center text-xl flex-shrink-0">{g.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{g.name}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground">{g.members.toLocaleString()} members</span>
                          {g.active && <span className="flex items-center gap-1 text-xs text-green-400"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />Active</span>}
                        </div>
                      </div>
                      <button className={cn("text-xs px-3 py-1.5 rounded-lg font-medium flex-shrink-0", g.joined ? "bg-blue-900/30 text-blue-400 border border-blue-500/30" : "bg-secondary border border-border hover:border-blue-500/30 text-muted-foreground")}>
                        {g.joined ? "Joined ✓" : "Join"}
                      </button>
                    </div>
                  ))}

                  {/* Group milestone mock */}
                  <div className="mt-2 p-3 rounded-xl bg-card/50 border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-blue-400">⚡ FSc Physics — Group Milestone</span>
                      <span className="text-xs text-muted-foreground">Due May 15</span>
                    </div>
                    <div className="text-xs mb-2">Complete Chapter 4: Work &amp; Energy</div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-1.5">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "68%" }} />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span className="text-green-400">✓ Ahmad</span>
                      <span className="text-green-400">✓ Fatima</span>
                      <span className="text-yellow-400">⏳ Zainab</span>
                      <span className="text-muted-foreground">+4 more</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Challenges / Duels ── */}
            {commTab === "duels" && (
              <motion.div key="duels" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-3">Challenge your friends. <span className="text-gradient">Prove who's smarter.</span></h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Send a 5-question duel on any topic. Both of you answer the same AI-generated questions.
                    Winner gets XP. Loser gets a "Revenge?" button. The most shareable moment on Tutify.
                  </p>
                  <div className="space-y-3 mb-6">
                    {[
                      { icon: Swords, text: "Any topic, any subject — 5 questions" },
                      { icon: Clock, text: "Live score comparison after each question" },
                      { icon: Trophy, text: "Winner gets XP bonus + bragging rights" },
                      { icon: Flame, text: "Head-to-head record vs each friend" },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-lg bg-orange-900/30 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-orange-400" />
                        </div>
                        {text}
                      </div>
                    ))}
                  </div>
                  <Badge className="bg-purple-900/30 border-purple-500/30 text-purple-400 border text-xs">Coming Jun 2026</Badge>
                </div>

                {/* Mock duel UI */}
                <div className="glass-strong rounded-2xl border border-orange-500/20 p-5 space-y-4">
                  <div className="text-sm font-semibold flex items-center gap-2">
                    <Swords className="w-4 h-4 text-orange-400" /> Challenge Arena
                  </div>

                  {/* Active challenge */}
                  <div className="p-4 rounded-xl border border-orange-500/30 bg-orange-900/10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-orange-400 font-semibold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />LIVE DUEL</span>
                      <span className="text-xs text-muted-foreground">· Physics — Newton's Laws</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="text-center p-3 bg-purple-900/20 rounded-xl border border-purple-500/20">
                        <div className="text-2xl font-black text-purple-400">80%</div>
                        <div className="text-xs text-muted-foreground mt-1">You</div>
                        <div className="text-xs text-green-400 mt-1">↑ Winning</div>
                      </div>
                      <div className="text-center p-3 bg-secondary rounded-xl border border-border">
                        <div className="text-2xl font-black text-foreground/60">60%</div>
                        <div className="text-xs text-muted-foreground mt-1">Ahmad K.</div>
                        <div className="text-xs text-red-400 mt-1">Q4 of 5...</div>
                      </div>
                    </div>
                    <div className="flex gap-1 justify-center">
                      {[true, true, false, null, null].map((r, i) => (
                        <div key={i} className={cn("w-7 h-7 rounded-lg border text-xs flex items-center justify-center font-bold",
                          r === true ? "bg-green-900/30 border-green-500/30 text-green-400" :
                          r === false ? "bg-red-900/30 border-red-500/30 text-red-400" :
                          "bg-secondary border-border text-muted-foreground"
                        )}>
                          {r === true ? "✓" : r === false ? "✗" : i + 1}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Past duels */}
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground font-medium">Recent Duels</div>
                    {[
                      { opponent: "Fatima S.", topic: "Thermodynamics", you: 100, them: 80, won: true },
                      { opponent: "Usman R.", topic: "Waves & Sound", you: 60, them: 80, won: false },
                      { opponent: "Sara A.", topic: "Optics", you: 80, them: 80, won: false },
                    ].map((d) => (
                      <div key={d.opponent} className="flex items-center gap-3 p-2.5 rounded-xl border border-border/50 bg-card/30 text-sm">
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0",
                          d.won ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                        )}>{d.won ? "W" : "L"}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium truncate">vs {d.opponent}</div>
                          <div className="text-xs text-muted-foreground">{d.topic}</div>
                        </div>
                        <div className="text-xs font-semibold flex-shrink-0">{d.you}% <span className="text-muted-foreground font-normal">vs</span> {d.them}%</div>
                        <button className="text-xs text-orange-400 hover:underline flex-shrink-0">Rematch</button>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-2.5 rounded-xl border border-orange-500/30 bg-orange-900/10 text-orange-400 text-sm font-medium hover:bg-orange-900/20 transition-colors flex items-center justify-center gap-2">
                    <Swords className="w-4 h-4" /> Challenge a Friend
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Focus Rooms ── */}
            {commTab === "focus" && (
              <motion.div key="focus" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-3">Study together. <span className="text-gradient">Even when alone.</span></h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Join a live focus room and study alongside other students in silence. The Pomodoro timer keeps
                    everyone accountable. When it ends, share what you covered — logged automatically to your progress.
                  </p>
                  <div className="space-y-3 mb-6">
                    {[
                      { icon: Wifi, text: "Live participant count — 'You're not alone'" },
                      { icon: Timer, text: "Pomodoro timer: 25 min focus, 5 min break" },
                      { icon: MessageCircle, text: "No chat during focus — pure accountability" },
                      { icon: CheckCircle2, text: "Post-session check-in auto-logged to progress" },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-lg bg-teal-900/30 border border-teal-500/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-teal-400" />
                        </div>
                        {text}
                      </div>
                    ))}
                  </div>
                  <Badge className="bg-purple-900/30 border-purple-500/30 text-purple-400 border text-xs">Coming Jul 2026</Badge>
                </div>

                {/* Mock focus rooms UI */}
                <div className="glass-strong rounded-2xl border border-teal-500/20 p-5 space-y-3">
                  <div className="text-sm font-semibold flex items-center gap-2">
                    <Timer className="w-4 h-4 text-teal-400" /> Focus Rooms — Live Now
                  </div>
                  {[
                    { name: "Chemistry Sprint 🧪", students: 14, timer: "18:23", subject: "Chemistry", intensity: "high" },
                    { name: "Math Revision 📐", students: 7, timer: "04:12", subject: "Mathematics", intensity: "medium" },
                    { name: "Physics Night 🌙", students: 23, timer: "24:55", subject: "Physics", intensity: "high" },
                    { name: "Bio Diagrams 🔬", students: 5, timer: "11:30", subject: "Biology", intensity: "low" },
                  ].map((room) => (
                    <div key={room.name} className="flex items-center gap-3 p-3 rounded-xl border border-teal-500/20 bg-teal-900/5 hover:bg-teal-900/10 transition-colors">
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-teal-900/30 border border-teal-500/30 flex items-center justify-center">
                          <Timer className="w-4 h-4 text-teal-400" />
                        </div>
                        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-background animate-pulse" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{room.name}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-teal-400 font-mono">{room.timer} left</span>
                          <span className="text-xs text-muted-foreground">{room.students} studying</span>
                        </div>
                      </div>
                      <button className="text-xs text-teal-400 border border-teal-500/30 bg-teal-900/20 px-3 py-1.5 rounded-lg hover:bg-teal-900/40 transition-colors flex-shrink-0">
                        Join
                      </button>
                    </div>
                  ))}
                  <button className="w-full py-2.5 rounded-xl border border-dashed border-teal-500/30 text-teal-400 text-sm font-medium hover:bg-teal-900/10 transition-colors flex items-center justify-center gap-2">
                    <Timer className="w-4 h-4" /> Create New Room
                  </button>
                  <div className="text-center text-xs text-muted-foreground pt-1">
                    <span className="text-teal-400 font-semibold">49 students</span> studying on Tutify right now
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Leaderboard ── */}
            {commTab === "leaderboard" && (
              <motion.div key="leaderboard" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-3">Know where you stand. <span className="text-gradient">Then climb higher.</span></h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Weekly XP leaderboard within your friend group, school, city, board, and nationally.
                    Subject-specific rankings. Seasonal trophies. The board exam is competitive — practice being competitive.
                  </p>
                  <div className="space-y-3 mb-6">
                    {[
                      { icon: Users, text: "Friend group, school, city, national rankings" },
                      { icon: BookOpen, text: "Subject-specific: Top Physics scorer this week" },
                      { icon: Award, text: "Seasonal trophies: Pre-Board Sprint Champion" },
                      { icon: Flame, text: "Streak badges visible on public profiles" },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-lg bg-yellow-900/30 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-yellow-400" />
                        </div>
                        {text}
                      </div>
                    ))}
                  </div>
                  <Badge className="bg-purple-900/30 border-purple-500/30 text-purple-400 border text-xs">Coming Jul 2026</Badge>
                </div>

                {/* Mock leaderboard UI */}
                <div className="glass-strong rounded-2xl border border-yellow-500/20 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-400" /> Weekly Leaderboard
                    </div>
                    <div className="flex gap-1 text-xs">
                      {["Friends", "School", "Punjab"].map((scope, i) => (
                        <button key={scope} className={cn("px-2.5 py-1 rounded-lg", i === 0 ? "bg-yellow-900/30 text-yellow-400 border border-yellow-500/30" : "text-muted-foreground hover:text-foreground")}>
                          {scope}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { rank: 1, name: "Fatima S.", xp: 2840, subject: "Chemistry", streak: 21, you: false },
                      { rank: 2, name: "You 🎯", xp: 2510, subject: "Physics", streak: 14, you: true },
                      { rank: 3, name: "Ahmad K.", xp: 2390, subject: "Math", streak: 9, you: false },
                      { rank: 4, name: "Sara A.", xp: 1980, subject: "Biology", streak: 7, you: false },
                      { rank: 5, name: "Usman R.", xp: 1750, subject: "Physics", streak: 3, you: false },
                    ].map((entry) => (
                      <div key={entry.rank} className={cn("flex items-center gap-3 p-3 rounded-xl border",
                        entry.you ? "border-purple-500/40 bg-purple-900/15" : "border-border/50 bg-card/20"
                      )}>
                        <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0",
                          entry.rank === 1 ? "bg-yellow-500/20 text-yellow-400" :
                          entry.rank === 2 ? "bg-slate-500/20 text-slate-400" :
                          entry.rank === 3 ? "bg-orange-900/30 text-orange-400" :
                          "bg-secondary text-muted-foreground"
                        )}>
                          {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : entry.rank}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={cn("text-sm font-medium", entry.you && "text-purple-300")}>{entry.name}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-2">
                            <span>{entry.subject}</span>
                            <span className="text-orange-400 flex items-center gap-0.5"><Flame className="w-3 h-3" />{entry.streak}d</span>
                          </div>
                        </div>
                        <div className="text-sm font-bold text-yellow-400 flex-shrink-0">{entry.xp.toLocaleString()} XP</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center text-xs text-muted-foreground pt-1">
                    Resets every <span className="text-foreground">Monday at midnight</span> · Opt-in, privacy-respecting
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Community CTA strip */}
          <motion.div
            className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {[
              { emoji: "⚔️", title: "1 duel per day", desc: "keeps the forgetting away", color: "border-orange-500/20 bg-orange-900/5" },
              { emoji: "🔥", title: "Groups stay accountable", desc: "when milestones are public", color: "border-blue-500/20 bg-blue-900/5" },
              { emoji: "🏆", title: "Top scorers study together", desc: "not alone", color: "border-yellow-500/20 bg-yellow-900/5" },
            ].map(({ emoji, title, desc, color }) => (
              <div key={title} className={cn("rounded-2xl border p-5 text-center", color)}>
                <div className="text-3xl mb-2">{emoji}</div>
                <div className="font-semibold text-sm">{title}</div>
                <div className="text-xs text-muted-foreground mt-1">{desc}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Competition comparison */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-card/30 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-purple-900/30 border-purple-500/30 text-purple-400 border">Why Not the Others?</Badge>
            <h2 className="text-4xl font-bold mb-4">
              The gap is real. <span className="text-gradient">Nobody built this for Pakistan.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Chegg is for American students. Byju&apos;s is for Indian students. Khan Academy doesn&apos;t know what BISE Punjab wants.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-card/50">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium min-w-[180px]">Feature</th>
                  {COMPETITORS.map((c) => (
                    <th key={c.name} className={cn("px-4 py-3 text-center", c.highlight && "bg-purple-900/20 text-purple-300")}>
                      {c.highlight ? (
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-bold text-purple-300">{c.name}</span>
                          <Badge className="text-xs bg-green-900/30 border-green-500/30 text-green-400 border">You are here</Badge>
                        </div>
                      ) : (
                        <span className="font-medium text-muted-foreground">{c.name}</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(COMPETITORS[0].rows).map((row, i) => (
                  <tr key={row} className={cn("border-b border-border/50 hover:bg-white/[0.02]", i % 2 === 0 && "bg-card/20")}>
                    <td className="px-4 py-3 text-muted-foreground font-medium">{row}</td>
                    {COMPETITORS.map((c) => (
                      <td key={c.name} className={cn("px-4 py-3 text-center", c.highlight && "bg-purple-900/10")}>
                        <CompetitorCell value={c.rows[row as keyof typeof c.rows]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-24 px-4" id="roadmap">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-purple-900/30 border-purple-500/30 text-purple-400 border">Product Roadmap</Badge>
            <h2 className="text-4xl font-bold mb-4">
              Where we&apos;re headed. <span className="text-gradient">Honest timeline.</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Click any phase to see what&apos;s included. Green is already live. We ship every 2 weeks.
            </p>
          </div>

          <div className="space-y-3">
            {ROADMAP.map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <RoadmapCard
                  phase={phase}
                  isOpen={openPhase === i}
                  onToggle={() => setOpenPhase(openPhase === i ? -1 : i)}
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Live now</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-400" /> In development</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-border" /> Planned</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features deep dive */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-purple-900/4 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-900/30 border-purple-500/30 text-purple-400 border">What Makes Us Different</Badge>
            <h2 className="text-4xl font-bold mb-4">Built ground-up <span className="text-gradient">for Pakistani students</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Brain, color: "purple", title: "3 Professor Personalities", desc: "Friendly for beginners. Strict for focused revision. Exam Coach mode that drills exactly what BISE examiners want to see." },
              { icon: Zap, color: "teal", title: "Real Math — Not Plain Text", desc: "LaTeX renders beautifully. Diagrams auto-generate with Mermaid. Equations look exactly like textbooks." },
              { icon: Camera, color: "orange", title: "Photo Doubt Solver (Coming)", desc: "Snap any question — textbook, handwritten, past paper — and get a step-by-step solution. All subjects." },
              { icon: Target, color: "red", title: "BISE-Pattern MCQs", desc: "Questions generated to match actual board paper patterns. With explanations that teach, not just mark right/wrong." },
              { icon: BarChart3, color: "blue", title: "Mastery Per Topic", desc: "Every topic gets a mastery score. Weak areas are flagged. Coming: predicted board score based on BISE chapter weightage." },
              { icon: Heart, color: "pink", title: "Parent Visibility (Coming)", desc: "Weekly AI report for parents. Study hours, mastery trends, predicted score, exactly which topics need attention." },
            ].map(({ icon: Icon, color, title, desc }) => (
              <motion.div
                key={title}
                className={cn(
                  "glass rounded-2xl p-6 border hover:scale-[1.02] transition-transform cursor-default",
                  color === "purple" && "border-purple-500/20 hover:border-purple-500/40",
                  color === "teal" && "border-teal-500/20 hover:border-teal-500/40",
                  color === "orange" && "border-orange-500/20 hover:border-orange-500/40",
                  color === "red" && "border-red-500/20 hover:border-red-500/40",
                  color === "blue" && "border-blue-500/20 hover:border-blue-500/40",
                  color === "pink" && "border-pink-500/20 hover:border-pink-500/40",
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center mb-4 border",
                  color === "purple" && "bg-purple-900/30 border-purple-500/30",
                  color === "teal" && "bg-teal-900/30 border-teal-500/30",
                  color === "orange" && "bg-orange-900/30 border-orange-500/30",
                  color === "red" && "bg-red-900/30 border-red-500/30",
                  color === "blue" && "bg-blue-900/30 border-blue-500/30",
                  color === "pink" && "bg-pink-900/30 border-pink-500/30",
                )}>
                  <Icon className={cn(
                    "w-5 h-5",
                    color === "purple" && "text-purple-400",
                    color === "teal" && "text-teal-400",
                    color === "orange" && "text-orange-400",
                    color === "red" && "text-red-400",
                    color === "blue" && "text-blue-400",
                    color === "pink" && "text-pink-400",
                  )} />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-4" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-teal-900/30 border-teal-500/30 text-teal-400 border">Pricing</Badge>
            <h2 className="text-4xl font-bold mb-4">One academy class costs Rs. 5,000.<br /><span className="text-gradient">Tutify covers everything for Rs. 499.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Free", price: "Rs. 0", period: "forever", desc: "Explore the platform",
                features: ["5 sessions per day", "All subjects", "Basic AI chat", "Exam mode (3/day)", "Progress tracking"],
                cta: "Start Free", href: "/signup", highlight: false, variant: "outline" as const,
              },
              {
                name: "Basic", price: "Rs. 499", period: "/month", desc: "For serious students",
                features: ["Unlimited sessions", "All 16 subject modules", "Unlimited exam mode", "Full test history", "Weak area tracking", "Bilingual (Urdu/English)", "Photo Doubt Solver (when live)"],
                cta: "Start Basic", href: "/signup?plan=basic", highlight: true, variant: "gradient" as const,
              },
              {
                name: "Pro", price: "Rs. 1,499", period: "/month", desc: "For top scorers",
                features: ["Everything in Basic", "AI Study Planner", "Predicted board score", "Parent dashboard", "Past papers (2015–2024)", "MDCAT/ECAT prep", "Voice tutor mode", "Priority support"],
                cta: "Start Pro", href: "/signup?plan=pro", highlight: false, variant: "teal" as const,
              },
            ].map(({ name, price, period, desc, features, cta, href, highlight, variant }) => (
              <div key={name} className={cn("relative rounded-2xl p-6 border", highlight ? "border-purple-500/40 bg-purple-900/10" : "border-border bg-card")}>
                {highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="px-4 py-1 text-xs font-semibold bg-purple-600 text-white border-0">Most Popular</Badge>
                  </div>
                )}
                <div className="mb-6">
                  <div className="text-sm text-muted-foreground font-medium mb-1">{name}</div>
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-bold">{price}</span>
                    <span className="text-muted-foreground text-sm mb-1">{period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{desc}</p>
                </div>
                <div className="space-y-2.5 mb-8">
                  {features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link href={href}><Button variant={variant} className="w-full">{cta}</Button></Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 inline mr-1.5 mb-0.5" />
            School plan — Rs. 15,000/month for 50 students.{" "}
            <a href="mailto:hello@tutify.pk" className="text-purple-400 hover:underline">Contact us</a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-strong rounded-3xl border border-purple-500/20 p-12 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-700/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-700/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="text-5xl mb-4">🎓</div>
              <h2 className="text-4xl font-bold mb-4">
                Your board exam is <span className="text-gradient">a few months away.</span>
              </h2>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                A student who uses Tutify for 30 minutes a day will revise their entire FSc syllabus
                3 times before the board exam. Start tonight — it&apos;s free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button variant="gradient" size="xl" className="gap-2 shadow-2xl shadow-purple-900/40">
                    <Rocket className="w-5 h-5" />
                    Start Free — No Card Needed
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="glass" size="xl">Already have an account →</Button>
                </Link>
              </div>
              <p className="text-xs text-muted-foreground mt-6">
                FSc Part 1 · FSc Part 2 · Matric 9th · Matric 10th · Punjab · Sindh · KPK · Federal Board
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center text-white font-bold text-xs">T</div>
                <span className="font-bold text-gradient-purple">Tutify</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">Pakistan&apos;s AI-powered tutor for FSc, Matric, and board exam preparation.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              <div>
                <div className="font-medium mb-3">Product</div>
                <div className="space-y-2 text-muted-foreground">
                  <a href="#whats-built" className="block hover:text-foreground">What&apos;s Live</a>
                  <a href="#roadmap" className="block hover:text-foreground">Roadmap</a>
                  <a href="#pricing" className="block hover:text-foreground">Pricing</a>
                </div>
              </div>
              <div>
                <div className="font-medium mb-3">Users</div>
                <div className="space-y-2 text-muted-foreground">
                  <a href="#for-parents" className="block hover:text-foreground">For Parents</a>
                  <Link href="/signup" className="block hover:text-foreground">For Students</Link>
                  <a href="#community" className="block hover:text-foreground">Community</a>
                  <a href="mailto:hello@tutify.pk" className="block hover:text-foreground">Schools</a>
                </div>
              </div>
              <div>
                <div className="font-medium mb-3">Legal</div>
                <div className="space-y-2 text-muted-foreground">
                  <a href="#" className="block hover:text-foreground">Privacy</a>
                  <a href="#" className="block hover:text-foreground">Terms</a>
                  <a href="mailto:hello@tutify.pk" className="block hover:text-foreground">Contact</a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">© 2026 Tutify. Built in Pakistan, for Pakistan.</p>
            <div className="flex gap-3">
              {["Punjab Board", "Sindh Board", "KPK Board", "Federal Board"].map((b) => (
                <span key={b} className="text-xs text-muted-foreground">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
