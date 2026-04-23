"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ChatInterface from "@/components/chat/ChatInterface";
import ExamMode from "@/components/chat/ExamMode";
import { AnimatePresence } from "framer-motion";

function ChatContent() {
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topicId") || undefined;
  const topicName = searchParams.get("topic") || "General Study";
  const subjectSlug = searchParams.get("subject") || "general";
  const [showExam, setShowExam] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <ChatInterface
        topicId={topicId}
        topicName={decodeURIComponent(topicName)}
        subjectSlug={subjectSlug}
        onExamModeStart={() => setShowExam(true)}
      />
      <AnimatePresence>
        {showExam && (
          <ExamMode
            topicName={decodeURIComponent(topicName)}
            subjectSlug={subjectSlug}
            onClose={() => setShowExam(false)}
            onComplete={(score) => {
              // Could show toast or update progress
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-violet-700 animate-pulse" />
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}
