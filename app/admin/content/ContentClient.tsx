"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Trash2, BookOpen, Search, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { SUBJECTS, CLASS_LEVELS, BOARDS } from "@/lib/curriculum";

interface Question {
  id: string;
  topic_id: string | null;
  topic_name: string | null;
  subject_slug: string | null;
  year: number | null;
  board: string | null;
  question_text: string;
  options: { id: string; text: string }[] | null;
  correct_answer: string | null;
  explanation: string | null;
  marks: number | null;
  question_type: string | null;
}

interface ContentClientProps {
  questions: Question[];
}

export default function ContentClient({ questions: initialQuestions }: ContentClientProps) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Form state
  const [form, setForm] = useState({
    topic_name: "",
    subject_slug: "physics_fsc1",
    year: new Date().getFullYear(),
    board: "punjab",
    question_text: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_answer: "A",
    explanation: "",
    marks: 1,
  });

  const filtered = questions.filter((q) =>
    q.question_text.toLowerCase().includes(search.toLowerCase()) ||
    (q.topic_name || "").toLowerCase().includes(search.toLowerCase()) ||
    (q.subject_slug || "").toLowerCase().includes(search.toLowerCase())
  );

  async function handleAdd() {
    if (!form.question_text.trim() || !form.option_a || !form.option_b || !form.option_c || !form.option_d) {
      toast.error("Fill in all fields");
      return;
    }
    setSaving(true);
    const supabase = createClient();
    const db = supabase as any;
    const { data, error } = await db.from("past_paper_questions").insert({
      topic_name: form.topic_name || null,
      subject_slug: form.subject_slug,
      year: form.year,
      board: form.board,
      question_text: form.question_text,
      options: [
        { id: "A", text: form.option_a },
        { id: "B", text: form.option_b },
        { id: "C", text: form.option_c },
        { id: "D", text: form.option_d },
      ],
      correct_answer: form.correct_answer,
      explanation: form.explanation || null,
      marks: form.marks,
      question_type: "MCQ",
    }).select().single();

    setSaving(false);
    if (error) {
      toast.error("Failed to add question");
    } else {
      toast.success("Question added!");
      setQuestions((prev) => [data, ...prev]);
      setShowForm(false);
      setForm({ ...form, question_text: "", option_a: "", option_b: "", option_c: "", option_d: "", explanation: "" });
    }
  }

  async function handleDelete(id: string) {
    const supabase = createClient();
    const db = supabase as any;
    await db.from("past_paper_questions").delete().eq("id", id);
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    toast.success("Question deleted");
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-400" /> Past Paper Questions
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">{questions.length} questions in database</p>
        </div>
        <Button variant="teal" className="gap-2" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4" /> Add Question
        </Button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="glass-strong rounded-2xl border border-border p-5 mb-6 space-y-4">
          <h2 className="font-semibold text-sm">New MCQ Question</h2>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Subject</label>
              <select
                value={form.subject_slug}
                onChange={(e) => setForm({ ...form, subject_slug: e.target.value })}
                className="w-full bg-secondary border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {SUBJECTS.filter((s) => s.key).map((s) => (
                  <option key={s.key} value={s.key!}>{s.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Board</label>
              <select
                value={form.board}
                onChange={(e) => setForm({ ...form, board: e.target.value })}
                className="w-full bg-secondary border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {BOARDS.map((b) => (
                  <option key={b.id} value={b.id}>{b.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Topic Name</label>
              <Input value={form.topic_name} onChange={(e) => setForm({ ...form, topic_name: e.target.value })} placeholder="e.g. Newton's Laws" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Year</label>
              <Input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} min={2010} max={2025} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Question Text</label>
            <textarea
              value={form.question_text}
              onChange={(e) => setForm({ ...form, question_text: e.target.value })}
              rows={3}
              className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none"
              placeholder="Enter the question..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {(["A", "B", "C", "D"] as const).map((opt) => (
              <div key={opt} className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Option {opt}</label>
                <Input
                  value={form[`option_${opt.toLowerCase()}` as keyof typeof form] as string}
                  onChange={(e) => setForm({ ...form, [`option_${opt.toLowerCase()}`]: e.target.value })}
                  placeholder={`Option ${opt}`}
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Correct Answer</label>
              <select
                value={form.correct_answer}
                onChange={(e) => setForm({ ...form, correct_answer: e.target.value })}
                className="w-full bg-secondary border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                {["A", "B", "C", "D"].map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Marks</label>
              <Input type="number" value={form.marks} onChange={(e) => setForm({ ...form, marks: Number(e.target.value) })} min={1} max={10} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Explanation (optional)</label>
            <textarea
              value={form.explanation}
              onChange={(e) => setForm({ ...form, explanation: e.target.value })}
              rows={2}
              className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none"
              placeholder="Why is this the correct answer..."
            />
          </div>

          <div className="flex gap-2">
            <Button variant="teal" className="flex-1" onClick={handleAdd} disabled={saving}>
              {saving ? "Saving..." : "Add Question"}
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions..." className="pl-9" />
      </div>

      {/* Question list */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No questions yet. Add your first past paper question.</p>
          </div>
        )}
        {filtered.map((q) => (
          <div key={q.id} className="glass-strong rounded-xl border border-border overflow-hidden">
            <div className="flex items-start gap-3 p-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {q.board && <Badge variant="outline" className="text-xs">{q.board}</Badge>}
                  {q.year && <Badge variant="outline" className="text-xs">{q.year}</Badge>}
                  {q.subject_slug && <Badge variant="outline" className="text-xs capitalize">{q.subject_slug.replace(/_/g, " ")}</Badge>}
                  {q.correct_answer && (
                    <Badge className="text-xs bg-green-900/30 text-green-400 border-green-500/30">
                      Ans: {q.correct_answer}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-foreground/90 line-clamp-2">{q.question_text}</p>
                {q.topic_name && <p className="text-xs text-muted-foreground mt-1">{q.topic_name}</p>}
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
                  className="p-1.5 text-muted-foreground hover:text-foreground"
                >
                  {expandedId === q.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDelete(q.id)}
                  className="p-1.5 text-muted-foreground hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {expandedId === q.id && q.options && (
              <div className="px-4 pb-4 border-t border-border/50 pt-3 space-y-1.5">
                {q.options.map((opt) => (
                  <div key={opt.id} className={cn(
                    "flex items-center gap-2 text-sm px-3 py-2 rounded-lg",
                    opt.id === q.correct_answer ? "bg-green-900/20 text-green-300" : "text-muted-foreground"
                  )}>
                    <span className="font-bold w-5">{opt.id}.</span>
                    <span>{opt.text}</span>
                  </div>
                ))}
                {q.explanation && (
                  <div className="mt-2 p-3 rounded-lg bg-secondary/50 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Explanation: </span>{q.explanation}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
