"use client";
import { useState } from "react";
import Link from "next/link";
import { CURRICULUM, SUBJECTS } from "@/lib/curriculum";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SubjectIcon } from "@/components/ui/SubjectIcon";
import { cn } from "@/lib/utils";
import { Search, ChevronRight, Clock, BookOpen } from "lucide-react";

export default function TopicsPage() {
  const [search, setSearch] = useState("");
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  const curriculumEntries = Object.entries(CURRICULUM);

  const filteredEntries = curriculumEntries.filter(([key]) => {
    if (!activeSubject) return true;
    return key.startsWith(activeSubject.replace("mathematics", "math"));
  });

  const searchLower = search.toLowerCase();

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Topic Library</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Browse all topics organized by subject and chapter
          </p>
        </div>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveSubject(null)}
              className={cn(
                "px-3 py-2 rounded-xl border text-xs font-medium whitespace-nowrap transition-all flex-shrink-0",
                !activeSubject ? "border-purple-500 bg-purple-900/20 text-purple-300" : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              All
            </button>
            {SUBJECTS.slice(0, 4).map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSubject(s.id === activeSubject ? null : s.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium whitespace-nowrap transition-all flex-shrink-0",
                  activeSubject === s.id ? "border-purple-500 bg-purple-900/20 text-purple-300" : "border-border text-muted-foreground hover:text-foreground"
                )}
              >
                <SubjectIcon subjectId={s.id} className="text-purple-300" /> {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-8">
          {filteredEntries.map(([key, subject]) => (
            <div key={key}>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-900/20">
                  <SubjectIcon subjectId={subject.slug} className="h-4.5 w-4.5 text-purple-300" />
                </div>
                <h2 className="text-lg font-bold">{subject.name}</h2>
                <Badge variant="secondary" className="text-xs ml-auto">
                  {subject.chapters.reduce((sum, c) => sum + c.topics.length, 0)} topics
                </Badge>
              </div>

              {subject.chapters.map((chapter) => {
                const filteredTopics = chapter.topics.filter((t) =>
                  !searchLower || t.title.toLowerCase().includes(searchLower) || t.description?.toLowerCase().includes(searchLower)
                );

                if (filteredTopics.length === 0) return null;

                return (
                  <div key={chapter.id} className="mb-4">
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2 ml-1">
                      {chapter.title}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {filteredTopics.map((topic) => (
                        <Link
                          key={topic.id}
                          href={`/topics/${topic.id}`}
                        >
                          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border hover:border-purple-500/40 hover:bg-purple-900/10 transition-all group cursor-pointer">
                            <div className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center flex-shrink-0">
                              <BookOpen className="w-3.5 h-3.5 text-muted-foreground group-hover:text-purple-400 transition-colors" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate group-hover:text-purple-300 transition-colors">
                                {topic.title}
                              </div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className={cn(
                                  "text-xs font-medium capitalize",
                                  topic.difficulty === "easy" ? "text-green-400" : topic.difficulty === "hard" ? "text-red-400" : "text-yellow-400"
                                )}>
                                  {topic.difficulty}
                                </span>
                                <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                                  <Clock className="w-3 h-3" /> {topic.estimatedMinutes}m
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-purple-400 transition-colors flex-shrink-0" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
