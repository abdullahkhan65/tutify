"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain, Zap, Trophy, BarChart3, BookOpen, MessageSquare,
  ChevronRight, Star, ArrowRight, CheckCircle2, Sparkles,
  Flame, Target, Users, Shield
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" } }),
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-900/50">T</div>
            <span className="text-lg font-bold text-gradient-purple">Tutify</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button variant="gradient" size="sm">
                Get Started Free <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Mesh gradient background */}
        <div className="absolute inset-0 bg-mesh-gradient opacity-60" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-teal-700/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <Badge variant="purple" className="mb-6 inline-flex gap-1.5 px-4 py-1.5 text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              Built for FSc, Matric & O/A Level students
            </Badge>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6"
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
          >
            Your AI Professor
            <br />
            <span className="text-gradient">Who Actually Cares</span>
            <br />
            If You Pass
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
          >
            Curriculum-aligned AI tutor that knows your BISE board syllabus, remembers your weak topics,
            simulates real exam questions, and won&apos;t let you fail.
            <span className="text-foreground font-medium"> Available at 2am. No judgment.</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
            initial="hidden" animate="visible" custom={3} variants={fadeUp}
          >
            <Link href="/signup">
              <Button variant="gradient" size="xl" className="gap-2 shadow-xl shadow-purple-900/40">
                Start Learning Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="glass" size="xl">
                See How It Works
              </Button>
            </a>
          </motion.div>

          <motion.p
            className="text-xs text-muted-foreground"
            initial="hidden" animate="visible" custom={4} variants={fadeUp}
          >
            No credit card required • 5 free sessions daily • FSc, Matric, O/A Level
          </motion.p>

          {/* Social proof */}
          <motion.div
            className="flex items-center justify-center gap-6 mt-10 flex-wrap"
            initial="hidden" animate="visible" custom={5} variants={fadeUp}
          >
            {["Punjab Board", "Sindh Board", "KPK Board", "Federal Board", "O Level", "A Level"].map((b) => (
              <span key={b} className="text-xs text-muted-foreground border border-border/50 px-3 py-1 rounded-full">{b}</span>
            ))}
          </motion.div>
        </div>

        {/* Hero Interface Preview */}
        <motion.div
          className="relative max-w-5xl mx-auto mt-20"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
        >
          <div className="glass-strong rounded-3xl border border-purple-500/20 overflow-hidden shadow-2xl shadow-purple-900/30">
            {/* Mock toolbar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-card/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-lg">Newton&apos;s Laws of Motion — Physics FSc Part 1</span>
              </div>
              <Badge variant="teal" className="text-xs">Live Session</Badge>
            </div>

            {/* Mock chat interface */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Left: Chat */}
              <div className="p-6 border-r border-border/30 space-y-4">
                {/* AI message */}
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 animate-float">
                    AI
                  </div>
                  <div className="flex-1">
                    <div className="bg-secondary/80 rounded-2xl rounded-tl-sm p-3 text-sm text-foreground/90 leading-relaxed">
                      Think of Newton&apos;s First Law like a sleeping student. They won&apos;t wake up unless you <span className="text-purple-300 font-semibold">disturb them</span> (apply a force). This is <span className="text-purple-300 font-semibold">inertia</span>!
                      <br /><br />
                      Formally: <span className="font-mono text-purple-200 text-xs bg-purple-900/30 px-1.5 py-0.5 rounded">Every object continues in its state of rest or uniform motion unless acted upon by a net external force</span>
                    </div>
                  </div>
                </div>

                {/* User message */}
                <div className="flex gap-3 justify-end">
                  <div className="bg-purple-600/30 border border-purple-500/20 rounded-2xl rounded-tr-sm p-3 text-sm max-w-[80%]">
                    What about the second law?
                  </div>
                </div>

                {/* AI typing */}
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 professor-speaking">
                    AI
                  </div>
                  <div className="bg-secondary/80 rounded-2xl rounded-tl-sm px-4 py-3 text-muted-foreground text-sm">
                    <span className="typing-dots">Explaining</span>
                  </div>
                </div>
              </div>

              {/* Right: Whiteboard */}
              <div className="p-6 space-y-4 bg-card/30">
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-purple-400" />
                  Smart Whiteboard
                </div>

                {/* Equation block */}
                <div className="bg-purple-900/20 border border-purple-500/20 rounded-xl p-4">
                  <div className="text-xs text-purple-400 mb-2 font-medium">Newton&apos;s Second Law</div>
                  <div className="font-mono text-center text-xl text-purple-200">F = ma</div>
                  <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <div>F = Net Force (Newtons)</div>
                    <div>m = Mass (kg)</div>
                    <div>a = Acceleration (m/s²)</div>
                  </div>
                </div>

                {/* Key terms */}
                <div>
                  <div className="text-xs text-muted-foreground mb-2">Key Terms</div>
                  <div className="flex flex-wrap gap-2">
                    {["Inertia", "Net Force", "Acceleration", "Mass", "Newton"].map(t => (
                      <span key={t} className="text-xs bg-secondary border border-border px-2 py-1 rounded-lg text-foreground/80 cursor-pointer hover:border-purple-500/50 hover:text-purple-300 transition-colors">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Test yourself */}
                <div className="bg-teal-900/20 border border-teal-500/20 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-teal-400">Ready to test yourself?</div>
                    <div className="text-xs text-muted-foreground">5 BISE-style MCQs generated</div>
                  </div>
                  <div className="w-8 h-8 bg-teal-600/30 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-teal-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom input bar */}
            <div className="p-4 border-t border-border/50 bg-card/50 flex items-center gap-3">
              <div className="flex-1 bg-secondary rounded-xl px-4 py-2.5 text-sm text-muted-foreground">
                Ask your professor anything...
              </div>
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Why Tutify Section */}
      <section className="py-24 px-4" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="purple" className="mb-4">Why Students Choose Tutify</Badge>
            <h2 className="text-4xl font-bold mb-4">
              ChatGPT is free.
              <span className="text-gradient"> So why Tutify?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Because ChatGPT doesn&apos;t know BISE Punjab 2024 exam patterns. Tutify does.
            </p>
          </div>

          {/* Comparison table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="glass rounded-2xl p-6 border border-red-500/20">
              <div className="text-red-400 font-semibold mb-4 flex items-center gap-2">
                <span className="text-lg">❌</span> Generic AI (ChatGPT)
              </div>
              <div className="space-y-3">
                {[
                  "Generic world knowledge",
                  "No memory between chats",
                  "No curriculum structure",
                  "No exam simulation",
                  "No progress tracking",
                  "English only",
                  "Doesn't know BISE patterns",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-400 text-xs">✗</span>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-6 border border-purple-500/30 bg-purple-900/10">
              <div className="text-purple-400 font-semibold mb-4 flex items-center gap-2">
                <span className="text-lg">✅</span> Tutify AI Professor
              </div>
              <div className="space-y-3">
                {[
                  "BISE board syllabus (chapter-by-chapter)",
                  "Remembers every session & mistake",
                  "Guided topic paths by chapter",
                  "BISE-style MCQ exam simulation",
                  "XP, streaks, score prediction",
                  "Urdu + English bilingual",
                  "2024 exam pattern aware",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                color: "text-purple-400",
                bg: "bg-purple-900/20 border-purple-500/20",
                title: "Adaptive AI Professor",
                desc: "Detects confusion, simplifies automatically. Three personalities: Friendly, Strict, Exam Coach.",
              },
              {
                icon: Zap,
                color: "text-teal-400",
                bg: "bg-teal-900/20 border-teal-500/20",
                title: "Smart Whiteboard",
                desc: "Math renders beautifully with LaTeX. Diagrams auto-generated. Click any term for instant explanation.",
              },
              {
                icon: Target,
                color: "text-orange-400",
                bg: "bg-orange-900/20 border-orange-500/20",
                title: "Exam Mode",
                desc: "BISE-style MCQs generated after every lesson. Timed mode, score tracking, detailed explanations.",
              },
              {
                icon: BarChart3,
                color: "text-blue-400",
                bg: "bg-blue-900/20 border-blue-500/20",
                title: "Score Predictor",
                desc: "Based on your test performance: 'You are on track for 78% in Physics. To reach 85%, improve Optics.'",
              },
              {
                icon: Flame,
                color: "text-red-400",
                bg: "bg-red-900/20 border-red-500/20",
                title: "Gamification",
                desc: "XP, levels, daily streaks, badges. The same reason you play games — but for studying.",
              },
              {
                icon: BookOpen,
                color: "text-green-400",
                bg: "bg-green-900/20 border-green-500/20",
                title: "Past Papers (2015–2024)",
                desc: "Curated BISE past paper questions. 'This question appeared 4 times in the last 5 years.'",
              },
            ].map(({ icon: Icon, color, bg, title, desc }) => (
              <motion.div
                key={title}
                className={`glass rounded-2xl p-6 border ${bg} hover:scale-[1.02] transition-transform cursor-default`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className={`w-10 h-10 rounded-xl ${bg} border flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" id="how-it-works">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="purple" className="mb-4">How It Works</Badge>
          <h2 className="text-4xl font-bold mb-4">
            From signup to <span className="text-gradient">studying in 60 seconds</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { step: "01", title: "Set up your profile", desc: "Tell us your board (Punjab/Sindh/KPK), class (FSc/Matric), subjects, and exam date." },
              { step: "02", title: "Pick a topic & learn", desc: "Your AI professor explains step-by-step with beautiful math rendering and diagrams on the whiteboard." },
              { step: "03", title: "Test & track progress", desc: "Take BISE-style MCQs, see your weak areas, and watch your score prediction improve." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <div className="text-6xl font-black text-gradient opacity-40 mb-4">{step}</div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="teal" className="mb-4">Pricing</Badge>
            <h2 className="text-4xl font-bold mb-4">
              10x cheaper than <span className="text-gradient">an academy</span>
            </h2>
            <p className="text-muted-foreground">Academy charges Rs. 5,000/month per subject. Tutify covers all subjects.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Free",
                price: "Rs. 0",
                period: "forever",
                desc: "Start learning today",
                features: ["5 sessions per day", "2 subjects", "Basic AI chat", "Progress tracking"],
                cta: "Get Started Free",
                href: "/signup",
                highlight: false,
                variant: "outline" as const,
              },
              {
                name: "Basic",
                price: "Rs. 499",
                period: "/month",
                desc: "For serious students",
                features: ["Unlimited sessions", "All 8 subjects", "Exam mode (MCQs)", "Session history", "Weak area tracking", "Bilingual (Urdu/English)"],
                cta: "Start Basic — Rs. 499",
                href: "/signup?plan=basic",
                highlight: true,
                variant: "gradient" as const,
              },
              {
                name: "Pro",
                price: "Rs. 1,499",
                period: "/month",
                desc: "For top scorers",
                features: ["Everything in Basic", "Voice interaction", "Study planner", "Parent dashboard", "Score predictor PDF", "Past papers (2015–2024)", "Priority support"],
                cta: "Start Pro — Rs. 1,499",
                href: "/signup?plan=pro",
                highlight: false,
                variant: "teal" as const,
              },
            ].map(({ name, price, period, desc, features, cta, href, highlight, variant }) => (
              <div
                key={name}
                className={`relative rounded-2xl p-6 border ${highlight ? "border-purple-500/50 bg-purple-900/10" : "border-border bg-card"}`}
              >
                {highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="purple" className="px-4 py-1 text-xs font-semibold">Most Popular</Badge>
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
                    <div key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link href={href}>
                  <Button variant={variant} className="w-full">{cta}</Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 inline mr-1.5 mb-0.5" />
            School plan available — Rs. 15,000/month for 50 students.{" "}
            <a href="mailto:hello@tutify.pk" className="text-purple-400 hover:underline">Contact us</a>
          </div>
        </div>
      </section>

      {/* Testimonial / Stats section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: "8", label: "Subjects covered", icon: BookOpen },
              { value: "4", label: "Supported boards", icon: Shield },
              { value: "24/7", label: "Always available", icon: Zap },
              { value: "0 PKR", label: "To get started", icon: Star },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="glass rounded-2xl p-5 text-center border border-border">
                <Icon className="w-5 h-5 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gradient-purple mb-1">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-strong rounded-3xl border border-purple-500/20 p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
            <div className="relative">
              <div className="text-5xl mb-4">🎓</div>
              <h2 className="text-4xl font-bold mb-4">
                Your board exam is in{" "}
                <span className="text-gradient">a few months.</span>
              </h2>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                A student who uses Tutify for 30 minutes every day will revise their entire
                FSc syllabus 3 times before the board exam. Start tonight.
              </p>
              <Link href="/signup">
                <Button variant="gradient" size="xl" className="gap-2 shadow-2xl shadow-purple-900/50">
                  <Users className="w-5 h-5" />
                  Start Free — No Credit Card Needed
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-4">
                Free account includes 5 sessions/day. Upgrade anytime for Rs. 499/month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center text-white font-bold text-xs">T</div>
            <span className="font-bold text-gradient-purple">Tutify</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Built for Pakistani students who want to score 85%+ on their board exams.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="mailto:hello@tutify.pk" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
