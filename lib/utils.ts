import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins < 60) return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString("en-PK", { day: "numeric", month: "short" });
}

export function getDaysUntilExam(examDate: string | null): number | null {
  if (!examDate) return null;
  const exam = new Date(examDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = exam.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-yellow-400";
  return "text-red-400";
}

export function getMasteryLabel(score: number): string {
  if (score >= 80) return "Mastered";
  if (score >= 50) return "In Progress";
  if (score > 0) return "Started";
  return "Not Started";
}

export function calculateXpForLevel(level: number): number {
  return level * level * 100;
}

export function getLevelFromXp(xp: number): number {
  let level = 1;
  while (calculateXpForLevel(level + 1) <= xp) level++;
  return level;
}

export function getLevelTitle(level: number): string {
  if (level >= 20) return "Professor";
  if (level >= 15) return "Master";
  if (level >= 10) return "Expert";
  if (level >= 7) return "Advanced";
  if (level >= 4) return "Scholar";
  if (level >= 2) return "Student";
  return "Beginner";
}

export function parseMarkdownMath(content: string): {
  hasMath: boolean;
  hasDiagram: boolean;
} {
  const hasMath = /\$\$[\s\S]+?\$\$|\$[^$]+?\$/.test(content);
  const hasDiagram = /```mermaid[\s\S]+?```/.test(content);
  return { hasMath, hasDiagram };
}

export function extractWhiteboardContent(content: string): {
  blockMath: string[];
  diagrams: string[];
  keyTerms: string[];
} {
  const blockMath: string[] = [];
  const diagrams: string[] = [];
  const keyTerms: string[] = [];

  // Extract block math ($$...$$)
  const blockMathRegex = /\$\$([\s\S]+?)\$\$/g;
  let match;
  while ((match = blockMathRegex.exec(content)) !== null) {
    if (match[1].trim()) blockMath.push(match[1].trim());
  }

  // Extract mermaid diagrams
  const mermaidRegex = /```mermaid\n([\s\S]+?)```/g;
  while ((match = mermaidRegex.exec(content)) !== null) {
    if (match[1].trim()) diagrams.push(match[1].trim());
  }

  // Extract bold key terms (**term**)
  const boldRegex = /\*\*([^*]+)\*\*/g;
  while ((match = boldRegex.exec(content)) !== null) {
    const term = match[1].trim();
    if (term.length < 50 && !keyTerms.includes(term)) {
      keyTerms.push(term);
    }
  }

  return { blockMath, diagrams, keyTerms: keyTerms.slice(0, 12) };
}
