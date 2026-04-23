"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/brand/BrandMark";
import { SubjectIcon } from "@/components/ui/SubjectIcon";
import { createClient } from "@/lib/supabase/client";
import { BOARDS, CLASS_LEVELS, SUBJECTS } from "@/lib/curriculum";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, CheckCircle2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Board", "Class", "Subjects", "Exam Date"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [board, setBoard] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [examDate, setExamDate] = useState("");
  const [saving, setSaving] = useState(false);

  const progress = ((step + 1) / steps.length) * 100;

  function toggleSubject(id: string) {
    setSubjects((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  async function handleFinish() {
    if (!examDate) {
      toast.error("Please set your exam date");
      return;
    }
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from("profiles")
      .update({
        board,
        class_level: classLevel,
        subjects,
        exam_date: examDate,
        onboarding_complete: true,
      })
      .eq("id", user.id);

    setSaving(false);
    if (error) {
      toast.error("Failed to save profile. Please try again.");
    } else {
      toast.success("Profile set up! Let's start learning.");
      router.push("/dashboard");
    }
  }

  function canProceed() {
    if (step === 0) return board !== "";
    if (step === 1) return classLevel !== "";
    if (step === 2) return subjects.length > 0;
    return true;
  }

  const filteredClasses = CLASS_LEVELS.filter(
    (c) => !board || c.board.includes(board)
  );

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-gradient opacity-40" />

      <div className="relative w-full max-w-lg">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <BrandMark compact />
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Step {step + 1} of {steps.length}</span>
            <span>{steps[step]}</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 to-violet-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((s, i) => (
              <div key={s} className={cn("text-xs transition-colors", i <= step ? "text-purple-400" : "text-muted-foreground")}>
                {i < step ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
              </div>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="glass-strong rounded-2xl border border-border p-8">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <h2 className="text-xl font-bold mb-1">Select your board</h2>
                <p className="text-muted-foreground text-sm mb-6">This helps us align content with your exact syllabus</p>
                <div className="space-y-2">
                  {BOARDS.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setBoard(b.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all",
                        board === b.id
                          ? "border-purple-500 bg-purple-900/20 text-foreground"
                          : "border-border bg-secondary/50 text-muted-foreground hover:border-border/80 hover:text-foreground"
                      )}
                    >
                      <span className="font-medium text-sm">{b.label}</span>
                      <div className="flex items-center gap-2">
                        {b.popular && <span className="text-xs bg-purple-900/30 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded-full">Popular</span>}
                        {board === b.id && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <h2 className="text-xl font-bold mb-1">Which class are you in?</h2>
                <p className="text-muted-foreground text-sm mb-6">We&apos;ll customize the curriculum to your class</p>
                <div className="space-y-2">
                  {filteredClasses.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setClassLevel(c.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all",
                        classLevel === c.id
                          ? "border-purple-500 bg-purple-900/20 text-foreground"
                          : "border-border bg-secondary/50 text-muted-foreground hover:border-border/80 hover:text-foreground"
                      )}
                    >
                      <span className="font-medium text-sm">{c.label}</span>
                      {classLevel === c.id && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <h2 className="text-xl font-bold mb-1">Pick your subjects</h2>
                <p className="text-muted-foreground text-sm mb-6">Select all subjects you need help with</p>
                <div className="grid grid-cols-2 gap-2">
                  {SUBJECTS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => toggleSubject(s.id)}
                      className={cn(
                        "flex items-center gap-2.5 p-3.5 rounded-xl border text-left transition-all",
                        subjects.includes(s.id)
                          ? "border-purple-500/70 bg-purple-900/20"
                          : "border-border bg-secondary/50 hover:border-border/80"
                      )}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-900/20">
                        <SubjectIcon subjectId={s.id} className="h-4.5 w-4.5 text-purple-300" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{s.label}</div>
                      </div>
                      {subjects.includes(s.id) && (
                        <CheckCircle2 className="w-4 h-4 text-purple-400 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
                {subjects.length > 0 && (
                  <p className="text-xs text-purple-400 mt-3 text-center">
                    {subjects.length} subject{subjects.length > 1 ? "s" : ""} selected
                  </p>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <h2 className="text-xl font-bold mb-1">When is your board exam?</h2>
                <p className="text-muted-foreground text-sm mb-6">
                  We&apos;ll generate a study plan and track your countdown
                </p>

                <div className="space-y-4">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                      type="date"
                      value={examDate}
                      onChange={(e) => setExamDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="flex h-12 w-full rounded-xl border border-border bg-secondary px-3 py-2 pl-9 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  {examDate && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4 text-center"
                    >
                      <div className="text-3xl font-black text-gradient-purple">
                        {Math.ceil((new Date(examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}
                      </div>
                      <div className="text-sm text-muted-foreground">days until your exam</div>
                    </motion.div>
                  )}

                  <div className="glass rounded-xl p-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <span className="text-foreground font-medium">What happens next:</span> Your AI professor will know your deadline and prioritize topics accordingly. You&apos;ll get a personalized study plan on your dashboard.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setStep((s) => s - 1)}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            )}
            <Button
              variant="gradient"
              className="flex-1 gap-2"
              disabled={!canProceed() || saving}
              onClick={() => {
                if (step < steps.length - 1) {
                  setStep((s) => s + 1);
                } else {
                  handleFinish();
                }
              }}
            >
              {step === steps.length - 1
                ? saving ? "Saving..." : "Start Learning"
                : "Continue"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Skip option */}
        {step < steps.length - 1 && (
          <p className="text-center text-xs text-muted-foreground mt-4">
            <button onClick={() => setStep((s) => s + 1)} className="hover:text-foreground transition-colors">
              Skip this step
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
