import { Atom, Beaker, Dna, Sigma } from "lucide-react";
import { cn } from "@/lib/utils";

const subjectIconMap = {
  physics: Atom,
  chemistry: Beaker,
  mathematics: Sigma,
  math: Sigma,
  biology: Dna,
} as const;

interface SubjectIconProps {
  subjectId: string;
  className?: string;
}

export function SubjectIcon({ subjectId, className }: SubjectIconProps) {
  const key = subjectId.replace(/_(fsc|matric).*/, "") as keyof typeof subjectIconMap;
  const Icon = subjectIconMap[key] || Atom;
  return <Icon className={cn("h-4 w-4", className)} />;
}
