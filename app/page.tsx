"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Calendar,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Flame,
  Heart,
  MapPin,
  MessageSquare,
  Play,
  Shield,
  Sparkles,
  Swords,
  Target,
  Timer,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" },
  }),
};

function AnimatedCounter({
  end,
  duration = 1800,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [duration, end, inView]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const STUDENT_SIGNALS = [
  "Koi boring lecture nahi. Pucho, interrupt karo, dobara pucho, full scene halal.",
  "Board-style questions right after learning. Lock in karo, phir thora flex bhi banta hai.",
  "Weak-topic rescue before boards tumhari tension ka free fire start karein.",
];

const PARENT_SIGNALS = [
  "Weekly progress reports, not vague reassurance.",
  "See consistency, weak areas, and score trajectory.",
  "Built for outcomes without micromanaging your child.",
];

const LIVE_MODULES = [
  {
    title: "AI Professor Chat",
    desc: "Curriculum-aware explanations with step-by-step teaching and bilingual support.",
    icon: Brain,
    accent: "from-sky-500/30 to-cyan-400/10",
  },
  {
    title: "Smart Whiteboard",
    desc: "Equations, derivations, diagrams, and key terms rendered visually instead of plain text.",
    icon: Zap,
    accent: "from-lime-400/20 to-emerald-400/10",
  },
  {
    title: "Exam Practice",
    desc: "BISE-style MCQs and performance breakdowns so students know what they missed and why.",
    icon: Target,
    accent: "from-orange-400/20 to-red-400/10",
  },
  {
    title: "Topic Hub",
    desc: "Subject-wise learning paths with progress, difficulty, study time, and next-step clarity.",
    icon: BookOpen,
    accent: "from-fuchsia-500/20 to-pink-500/10",
  },
];

const STUDENT_ACTIONS = [
  {
    title: "Yaar Is Topic Ko Bachao",
    subtitle: "Weak topic pakra gaya. Ab isko seedha karte hain.",
    tone: "border-red-500/20 bg-red-500/8 text-red-300",
  },
  {
    title: "15-Minute Jigar Sprint",
    subtitle: "Quick win before dimagh 17 tabs aur 3 reels khol de",
    tone: "border-lime-400/20 bg-lime-400/8 text-lime-300",
  },
  {
    title: "Sach Bata, Boards Mein Kya Aana Hai?",
    subtitle: "High-yield revision mode, no andaza committee needed",
    tone: "border-sky-500/20 bg-sky-500/8 text-sky-300",
  },
];

const SHUGAL_MODES = [
  { label: "Seedha Samjhao", desc: "No extra sauce, bas clear parhai" },
  { label: "Thora Shugal", desc: "Relatable examples, halki masti" },
  { label: "Bachao Yaar", desc: "Crash mode for panic revision" },
];

const SHUGAL_STATUS = [
  "Scene on hai",
  "Aaj full tayyari mood",
  "Thora cooked, magar recover ho raha hai",
  "Parhai ka nasha, reels ka fasana",
];

const EXPERIENCE_PANELS = [
  {
    key: "learn",
    title: "Feels like a study companion",
    desc: "Students should land on a dashboard that feels alive: streak heat, today's mission, inside jokes, and rescue plans that feel made for them.",
    icon: Sparkles,
    bullets: ["Quick-start actions", "Playful but useful prompts", "Energy without chaos"],
  },
  {
    key: "compete",
    title: "Makes progress visible",
    desc: "Gen Z responds to visible momentum. Mastery maps, streak motion, challenge cards, and little 'you cooked' moments should be obvious.",
    icon: Flame,
    bullets: ["Animated mastery bars", "Duel-ready score cards", "Exam countdown urgency"],
  },
  {
    key: "trust",
    title: "Keeps parents in the loop",
    desc: "Parents need fewer flashy moments and more confidence. The system should surface trend lines, effort, and risk early.",
    icon: Heart,
    bullets: ["Weekly report cards", "Calm parent mode", "Readiness + consistency insights"],
  },
];

const ROADMAP = [
  {
    phase: "Now",
    title: "Core learning engine",
    date: "Live in April 2026",
    status: "live" as const,
    items: ["AI professor chat", "Topic hub", "Exam mode", "Progress tracking"],
  },
  {
    phase: "Next",
    title: "Depth features",
    date: "May to June 2026",
    status: "building" as const,
    items: ["Photo doubt solver", "Past paper mode", "Weakness engine", "Daily review loops"],
  },
  {
    phase: "Soon",
    title: "Social study layer",
    date: "June to July 2026",
    status: "planned" as const,
    items: ["Study groups", "Duel mode", "Focus rooms", "Leaderboards"],
  },
  {
    phase: "Growth",
    title: "Parent and planning tools",
    date: "July onward",
    status: "planned" as const,
    items: ["AI study planner", "Predicted score", "Parent dashboard", "WhatsApp support"],
  },
];

function RoadmapCard({
  phase,
  isOpen,
  onToggle,
}: {
  phase: (typeof ROADMAP)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const statusTone = {
    live: "border-emerald-500/30 bg-emerald-500/8 text-emerald-300",
    building: "border-sky-500/30 bg-sky-500/8 text-sky-300",
    planned: "border-white/10 bg-white/5 text-white/70",
  }[phase.status];

  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all",
        isOpen && "border-sky-400/30 bg-white/[0.07]"
      )}
    >
      <button className="flex w-full items-center gap-4 text-left" onClick={onToggle}>
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge className="border-white/10 bg-white/5 text-white/60">{phase.phase}</Badge>
            <Badge className={cn("border", statusTone)}>
              {phase.status === "live" ? "Live" : phase.status === "building" ? "Building" : "Planned"}
            </Badge>
          </div>
          <div className="text-lg font-semibold text-white">{phase.title}</div>
          <div className="mt-1 flex items-center gap-2 text-sm text-white/55">
            <Calendar className="h-4 w-4" />
            {phase.date}
          </div>
        </div>
        <ChevronDown className={cn("h-4 w-4 text-white/50 transition-transform", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="overflow-hidden"
          >
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {phase.items.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-2xl border border-white/8 bg-black/10 px-3 py-2 text-sm text-white/70">
                  <CheckCircle2 className="h-4 w-4 text-sky-300" />
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

export default function LandingPage() {
  const [audience, setAudience] = useState<"student" | "parent">("student");
  const [openPhase, setOpenPhase] = useState(0);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#07111f] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(132,204,22,0.12),_transparent_24%),linear-gradient(180deg,_#07111f_0%,_#081423_45%,_#050b14_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:72px_72px]" />

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07111f]/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-cyan-400 to-lime-300 text-sm font-black text-slate-950 shadow-[0_12px_40px_rgba(56,189,248,0.25)]">
              T
            </div>
            <div>
              <div className="text-lg font-black tracking-tight">Taleem</div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-white/40">Parhai ka scene, board exams ka system</div>
            </div>
          </div>

          <div className="hidden items-center gap-6 text-sm text-white/60 md:flex">
            <a href="#experience" className="hover:text-white">Experience</a>
            <a href="#live" className="hover:text-white">What&apos;s Live</a>
            <a href="#parents" className="hover:text-white">For Parents</a>
            <a href="#roadmap" className="hover:text-white">Roadmap</a>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-white/80 hover:bg-white/10 hover:text-white">
                Sign in
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-sky-400 via-cyan-400 to-lime-300 text-slate-950 shadow-[0_14px_40px_rgba(56,189,248,0.28)] hover:opacity-95"
              >
                Start free
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative px-4 pb-20 pt-28 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-center">
            <Badge className="border-sky-400/20 bg-sky-400/10 px-4 py-1 text-sky-200">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              Built for Pakistani board students, stressed group chats, and the parents paying for results
            </Badge>
          </div>

          <motion.div initial="hidden" animate="visible" className="mx-auto max-w-4xl text-center">
            <motion.div custom={0} variants={fadeUp} className="mb-8 flex justify-center">
              <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
                {(["student", "parent"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setAudience(mode)}
                    className={cn(
                      "rounded-[14px] px-5 py-2.5 text-sm font-semibold transition-all",
                      audience === mode
                        ? "bg-white text-slate-950 shadow-lg"
                        : "text-white/65 hover:text-white"
                    )}
                  >
                    {mode === "student" ? "Student mode" : "Parent mode"}
                  </button>
                ))}
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={audience}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
              >
                <motion.h1
                  custom={1}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
                >
                  {audience === "student" ? (
                    <>
                      Studying for boards
                      <br />
                      should feel like
                      <br />
                      <span className="bg-gradient-to-r from-sky-300 via-cyan-300 to-lime-300 bg-clip-text text-transparent">
                        a proper comeback arc, na ke azaab.
                      </span>
                    </>
                  ) : (
                    <>
                      See how your child is
                      <br />
                      actually progressing
                      <br />
                      <span className="bg-gradient-to-r from-lime-200 via-cyan-200 to-sky-300 bg-clip-text text-transparent">
                        without hovering over them.
                      </span>
                    </>
                  )}
                </motion.h1>

                <motion.p
                  custom={2}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/68 sm:text-xl"
                >
                  {audience === "student"
                    ? "Taleem is a curriculum-aware AI study space for FSc and Matric students: learn fast, test yourself instantly, fix weak topics before they become jump scares, aur parhai ka scene thora less painful banao. Thora scene on, thora tension off, full shugal with actual results."
                    : "Taleem gives students a 24/7 board-aligned AI tutor, and gives parents a calm view of consistency, weak areas, and readiness so support feels informed instead of intrusive."}
                </motion.p>

                <motion.div
                  custom={3}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                  <Link href="/signup">
                    <Button
                      size="xl"
                      className="bg-gradient-to-r from-sky-400 via-cyan-400 to-lime-300 text-slate-950 shadow-[0_18px_50px_rgba(56,189,248,0.3)] hover:opacity-95"
                    >
                      {audience === "student" ? "Start learning free" : "Create account for my child"}
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <a href="#live">
                    <Button variant="glass" size="xl" className="border border-white/10 bg-white/5 text-white hover:bg-white/10">
                      <Play className="h-4 w-4" />
                      Explore what&apos;s live
                    </Button>
                  </a>
                </motion.div>

                <motion.div
                  custom={4}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="mt-8 flex flex-wrap items-center justify-center gap-2"
                >
                  {(audience === "student" ? STUDENT_SIGNALS : PARENT_SIGNALS).map((signal) => (
                    <div key={signal} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65">
                      {signal}
                    </div>
                  ))}
                </motion.div>

                {audience === "student" && (
                  <motion.div
                    custom={5}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="mt-6 flex flex-wrap items-center justify-center gap-3"
                  >
                    {SHUGAL_MODES.map((mode) => (
                      <div key={mode.label} className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-left">
                        <div className="text-sm font-semibold text-white">{mode.label}</div>
                        <div className="mt-1 text-xs text-white/50">{mode.desc}</div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.22, duration: 0.6, ease: "easeOut" }}
            className="mx-auto mt-16 max-w-6xl"
          >
            <div className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
              <div className="overflow-hidden rounded-[32px] border border-sky-400/20 bg-[linear-gradient(180deg,rgba(10,17,32,0.92),rgba(7,12,22,0.98))] shadow-[0_30px_80px_rgba(3,7,18,0.5)]">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-rose-400/70" />
                      <div className="h-3 w-3 rounded-full bg-amber-400/70" />
                      <div className="h-3 w-3 rounded-full bg-lime-300/80" />
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                      Physics · Newton&apos;s Laws · Live session
                    </div>
                  </div>
                  <Badge className="border-lime-300/20 bg-lime-300/10 text-lime-200">Board-ready mode, shugal-friendly</Badge>
                </div>

                <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-white">AI Professor</div>
                        <div className="text-xs text-white/45">Friendly mode · Urdu/English switch · zero aura loss · full tameez</div>
                      </div>
                      <div className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs text-sky-200">
                        Scene garam hai
                      </div>
                    </div>

                    <div className="space-y-3">
                      <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-[85%] rounded-[22px] rounded-tl-md bg-white/8 px-4 py-3 text-sm leading-relaxed text-white/80"
                      >
                        Think of inertia like your Sunday nap. It keeps going unless someone ya amma ka awaaz system vibe ruin na kar de. Seedhi baat, no fazool scene. I&apos;ll explain it the exact way board answers want too.
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="ml-auto max-w-[74%] rounded-[22px] rounded-tr-md border border-sky-400/20 bg-sky-400/10 px-4 py-3 text-sm text-sky-50"
                      >
                        Bet. Board wali definition do, phir aik MCQ bhi maaro. Zyada filmy mat ho.
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-[85%] rounded-[22px] rounded-tl-md bg-white/8 px-4 py-3 text-sm leading-relaxed text-white/75"
                      >
                        Board definition saved. I&apos;ll test you right after the explanation so it actually sticks and doesn&apos;t evaporate after 4 minutes. Full parhai, thora shugal, zero fazool lambi kahani.
                        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-lime-200/80">
                          <span className="h-2 w-2 rounded-full bg-lime-300 animate-pulse" />
                          board examiner ko pasand aayega
                        </div>
                      </motion.div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {["Yaar bilkul zero se samjhao", "Real-life wala scene do", "Derivation kholo", "Test lo, beizzati softly"].map((item) => (
                        <button
                          key={item}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/65 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 bg-white/[0.03] p-5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
                      <Zap className="h-4 w-4 text-sky-300" />
                      Smart whiteboard, no bakwaas mode
                    </div>

                    <div className="rounded-[24px] border border-sky-400/20 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),transparent_45%),rgba(255,255,255,0.04)] p-5">
                      <div className="mb-2 text-xs text-sky-200/80">Second law</div>
                      <div className="text-center font-mono text-4xl font-black tracking-tight text-white">F = ma</div>
                      <div className="mt-4 grid gap-2 text-sm text-white/55 sm:grid-cols-3">
                        <div className="rounded-2xl border border-white/8 bg-black/10 p-3">F = net force</div>
                        <div className="rounded-2xl border border-white/8 bg-black/10 p-3">m = mass</div>
                        <div className="rounded-2xl border border-white/8 bg-black/10 p-3">a = acceleration</div>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[24px] border border-lime-300/20 bg-lime-300/8 p-4">
                        <div className="text-xs text-lime-200/80">Exam mode</div>
                        <div className="mt-2 text-base font-semibold text-white">5 MCQs ready. Halka sa dhulai, magar pyar se.</div>
                        <div className="mt-1 text-sm text-white/60">Instant feedback, weak-area logging, no chupke se emotional damage</div>
                      </div>
                      <div className="rounded-[24px] border border-fuchsia-400/20 bg-fuchsia-400/8 p-4">
                        <div className="text-xs text-fuchsia-200/80">Camera doubt solving</div>
                        <div className="mt-2 text-base font-semibold text-white">Upload the academic jump scare</div>
                        <div className="mt-1 text-sm text-white/60">Textbook, notes, blurry snap, ya woh handwritten azaab</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-[24px] border border-white/10 bg-black/15 px-4 py-3">
                      <Camera className="h-5 w-5 text-white/35" />
                      <div className="flex-1 text-sm text-white/45">Jo sawal dimaagh kha raha hai na, woh yahan phenko...</div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-lime-300 text-slate-950">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[30px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">Aaj ka scene</div>
                      <div className="text-xs text-white/45">Tiny chaos, clear goals, zero academic doomscrolling. Bas kaam ki baat.</div>
                    </div>
                    <Badge className="border-orange-400/20 bg-orange-400/10 text-orange-200">42 days left. Ab hawa tight.</Badge>
                  </div>
                  <div className="space-y-3">
                    {STUDENT_ACTIONS.map((action) => (
                      <button
                        key={action.title}
                        className={cn(
                          "w-full rounded-[22px] border px-4 py-3 text-left transition-transform hover:-translate-y-0.5",
                          action.tone
                        )}
                      >
                        <div className="font-semibold text-white">{action.title}</div>
                        <div className="mt-1 text-sm">{action.subtitle}</div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {SHUGAL_STATUS.map((status) => (
                      <div key={status} className="rounded-full border border-white/10 bg-black/15 px-3 py-1.5 text-xs text-white/60">
                        {status}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[30px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">Momentum tracker</div>
                      <div className="text-xs text-white/45">Proof that tum bilkul gaye guzray nahi ho, bas thora sa system chahiye</div>
                    </div>
                    <Flame className="h-5 w-5 text-orange-300" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Josh", value: "12", tone: "text-orange-200" },
                      { label: "XP", value: "480", tone: "text-sky-200" },
                      { label: "Tayyari", value: "74%", tone: "text-lime-200" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-[22px] border border-white/10 bg-black/10 p-4 text-center">
                        <div className={cn("text-2xl font-black", item.tone)}>{item.value}</div>
                        <div className="mt-1 text-xs text-white/45">{item.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-[22px] border border-white/10 bg-black/10 p-4">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-white/65">Physics tayyari meter</span>
                      <span className="font-semibold text-sky-200">81%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/8">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "81%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-lime-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-[30px] border border-emerald-400/15 bg-[linear-gradient(180deg,rgba(16,185,129,0.08),rgba(255,255,255,0.04))] p-5">
                  <div className="mb-2 text-sm font-semibold text-white">Parent snapshot</div>
                  <div className="text-sm leading-relaxed text-white/60">
                    A second visual mode can switch from high-energy student UI to calmer reporting for parents.
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-[20px] border border-white/10 bg-black/10 p-3">
                      <div className="text-xs text-white/45">Hours studied</div>
                      <div className="mt-1 text-xl font-bold text-white">6.5h</div>
                    </div>
                    <div className="rounded-[20px] border border-white/10 bg-black/10 p-3">
                      <div className="text-xs text-white/45">Predicted score</div>
                      <div className="mt-1 text-xl font-bold text-white">73%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-2">
            {["Punjab Board", "Sindh Board", "KPK Board", "Federal Board"].map((board) => (
              <div key={board} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/55">
                <MapPin className="h-3.5 w-3.5" />
                {board}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {[
            { value: 200, suffix: "+", label: "topics mapped", icon: BookOpen, tone: "text-sky-200" },
            { value: 4, suffix: "", label: "boards supported", icon: Shield, tone: "text-lime-200" },
            { value: 24, suffix: "/7", label: "AI learning support", icon: Brain, tone: "text-cyan-200" },
            { value: 499, suffix: " PKR", label: "starting price vision", icon: BarChart3, tone: "text-orange-200" },
          ].map(({ value, suffix, label, icon: Icon, tone }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[28px] border border-white/10 bg-white/5 p-5 text-center backdrop-blur-xl"
            >
              <Icon className={cn("mx-auto mb-3 h-5 w-5", tone)} />
              <div className={cn("text-3xl font-black", tone)}>
                <AnimatedCounter end={value} suffix={suffix} />
              </div>
              <div className="mt-1 text-sm text-white/45">{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="experience" className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Badge className="border-sky-400/20 bg-sky-400/10 text-sky-200">Revamp direction, thora desi spice</Badge>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              A better experience for students
              <br />
              and a calmer one for parents.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/62">
              The product is already useful. The redesign should make that usefulness feel immediate, emotional, and easy to trust.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {EXPERIENCE_PANELS.map((panel, index) => {
              const Icon = panel.icon;
              return (
                <motion.div
                  key={panel.key}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/10">
                    <Icon className="h-5 w-5 text-sky-200" />
                  </div>
                  <h3 className="text-2xl font-bold">{panel.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{panel.desc}</p>
                  <div className="mt-5 space-y-2">
                    {panel.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-center gap-2 text-sm text-white/72">
                        <CheckCircle2 className="h-4 w-4 text-lime-200" />
                        {bullet}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="live" className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Badge className="border-lime-300/20 bg-lime-300/10 text-lime-200">What&apos;s live today</Badge>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Keep the cool factor,
                <br />
                but anchor it in real utility.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
              These modules already make the product valuable. The redesign should present them as an integrated study system, not a scattered feature list.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {LIVE_MODULES.map((module, index) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                  <div className={cn("absolute inset-0 opacity-70 bg-gradient-to-br", module.accent)} />
                  <div className="relative">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">{module.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/68">{module.desc}</p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/80">
                      Explore module
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(6,14,25,0.95),rgba(11,24,35,0.95))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:p-8">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Badge className="border-orange-400/20 bg-orange-400/10 text-orange-200">Interactive ideas</Badge>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Motion should guide attention,
                <br />
                not just decorate the page.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-white/58 sm:text-base">
              These are the interaction patterns that fit this brand best: educational, energetic, and still usable on mobile.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: TrendingUp, title: "Animated mastery map", desc: "Topic nodes pulse as progress improves and weak areas glow for rescue." },
              { icon: Swords, title: "Duel cards", desc: "Head-to-head score bars, rematch CTA, and shareable win states." },
              { icon: Timer, title: "Sprint launchers", desc: "One-tap 15-minute focus sessions with countdown urgency and completion rewards." },
              { icon: Users, title: "Parent mode switch", desc: "Same product, calmer hierarchy: trends, reports, readiness, and alerts." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/15">
                    <Icon className="h-5 w-5 text-orange-200" />
                  </div>
                  <div className="text-lg font-semibold">{item.title}</div>
                  <div className="mt-2 text-sm leading-relaxed text-white/58">{item.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="parents" className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200">For parents</Badge>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Make the product exciting
                <br />
                for students and reassuring
                <br />
                for families.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/62">
                Parents do not need the same interface students do. Give them a quieter surface with clear signals: effort, improvement, weak areas, and whether intervention is needed.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Weekly summaries with study hours, tests, and progress trend",
                  "Subject readiness with risk flags before exam season",
                  "Encouraging language that supports rather than polices",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-white/72">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-200" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/signup">
                  <Button variant="teal" size="lg">
                    <Heart className="h-4 w-4" />
                    Create account for my child
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-[34px] border border-emerald-400/18 bg-[linear-gradient(180deg,rgba(16,185,129,0.08),rgba(255,255,255,0.04))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">Ahmad Khan · FSc Part 2</div>
                  <div className="text-xs text-white/45">Parent summary · Apr 14 to Apr 20, 2026</div>
                </div>
                <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200">Calm parent mode</Badge>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Study hours", value: "6.5h" },
                  { label: "Tests taken", value: "8" },
                  { label: "Avg score", value: "72%" },
                ].map((item) => (
                  <div key={item.label} className="rounded-[22px] border border-white/10 bg-black/10 p-4 text-center">
                    <div className="text-xl font-black text-white">{item.value}</div>
                    <div className="mt-1 text-xs text-white/45">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[26px] border border-white/10 bg-black/10 p-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="text-white/70">Overall exam readiness</span>
                  <span className="font-semibold text-emerald-200">73%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "73%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-300"
                  />
                </div>
                <div className="mt-3 text-xs leading-relaxed text-white/50">
                  Consistent week overall. Chemistry is improving. Mathematics still needs attention before exams get closer.
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  { subject: "Physics", score: 78, trend: "+12%" },
                  { subject: "Chemistry", score: 65, trend: "+5%" },
                  { subject: "Mathematics", score: 55, trend: "-3%" },
                  { subject: "Biology", score: 82, trend: "+8%" },
                ].map((item) => (
                  <div key={item.subject}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-white/68">{item.subject}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-white">{item.score}%</span>
                        <span className={cn("text-xs", item.trend.startsWith("+") ? "text-emerald-200" : "text-red-300")}>
                          {item.trend}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/8">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          item.score >= 75 ? "bg-emerald-300" : item.score >= 60 ? "bg-amber-300" : "bg-rose-300"
                        )}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="roadmap" className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Badge className="border-white/10 bg-white/5 text-white/70">Roadmap</Badge>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                The story gets stronger
                <br />
                as the product grows.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-white/58 sm:text-base">
              The key is to make upcoming features feel like the natural evolution of the study system: more depth, more accountability, more confidence.
            </p>
          </div>

          <div className="grid gap-4">
            {ROADMAP.map((phase, index) => (
              <RoadmapCard
                key={phase.title}
                phase={phase}
                isOpen={openPhase === index}
                onToggle={() => setOpenPhase(openPhase === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 pt-6 sm:px-6">
        <div className="mx-auto max-w-5xl rounded-[36px] border border-sky-400/20 bg-[linear-gradient(135deg,rgba(56,189,248,0.16),rgba(132,204,22,0.1),rgba(255,255,255,0.04))] p-8 text-center shadow-[0_30px_90px_rgba(8,15,30,0.45)] sm:p-12">
          <div className="mx-auto max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.34em] text-white/50">Built for boards. Designed for motivation.</div>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              A sharper brand, stronger motion,
              <br />
              and clearer value for both audiences.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/68">
              This version reframes Taleem as a study operating system instead of a generic AI tool, while making space for a quieter parent experience inside the same product.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button
                  size="xl"
                  className="bg-slate-950 text-white shadow-[0_20px_50px_rgba(2,6,23,0.35)] hover:bg-slate-900"
                >
                  Start free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <a href="#parents">
                <Button variant="glass" size="xl" className="border border-white/15 bg-white/8 text-white hover:bg-white/12">
                  See parent mode
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
