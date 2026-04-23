"use client";
import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import "katex/dist/katex.min.css";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

const MessageBubble = memo(function MessageBubble({ role, content, isStreaming }: MessageBubbleProps) {
  const isAssistant = role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("flex gap-3", !isAssistant && "flex-row-reverse")}
    >
      {/* Avatar */}
      {isAssistant ? (
        <div
          className={cn(
            "w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-lg shadow-purple-900/40 self-start mt-1",
            isStreaming && "professor-speaking"
          )}
        >
          AI
        </div>
      ) : (
        <div className="w-8 h-8 rounded-xl bg-secondary border border-border flex items-center justify-center text-xs font-bold flex-shrink-0 self-start mt-1">
          You
        </div>
      )}

      {/* Bubble */}
      <div className={cn("max-w-[85%] flex flex-col gap-1", !isAssistant && "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isAssistant
              ? "bg-secondary/80 rounded-tl-sm text-foreground/90"
              : "bg-purple-600/25 border border-purple-500/20 rounded-tr-sm text-foreground"
          )}
        >
          {isAssistant ? (
            <div className="prose-chat">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  // Custom renderers for better styling
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  strong: ({ children }) => (
                    <strong className="text-purple-300 font-semibold">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="text-teal-400 not-italic font-medium">{children}</em>
                  ),
                  code: ({ children, className }) => {
                    const isBlock = className?.includes("language-");
                    if (isBlock) {
                      const lang = className?.replace("language-", "");
                      if (lang === "mermaid") {
                        // Mermaid diagrams are handled by whiteboard
                        return null;
                      }
                      return (
                        <pre className="bg-card border border-border rounded-xl p-3 overflow-x-auto my-3">
                          <code className="font-mono text-xs text-foreground/80">{children}</code>
                        </pre>
                      );
                    }
                    return (
                      <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-purple-900/30 text-purple-200">
                        {children}
                      </code>
                    );
                  },
                  ul: ({ children }) => (
                    <ul className="list-disc pl-5 space-y-1 my-2">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-5 space-y-1 my-2">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-foreground/85">{children}</li>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-base font-semibold text-foreground mt-3 mb-1">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-sm font-semibold text-foreground mt-2 mb-1">{children}</h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-purple-500/50 pl-3 my-2 text-muted-foreground">
                      {children}
                    </blockquote>
                  ),
                  hr: () => <hr className="border-border my-3" />,
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-3">
                      <table className="text-xs w-full border-collapse">{children}</table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-border px-2 py-1.5 bg-secondary text-left font-semibold">{children}</th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-border px-2 py-1.5">{children}</td>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
              {isStreaming && (
                <span className="inline-block w-1.5 h-4 bg-purple-400 ml-0.5 animate-pulse rounded-sm" />
              )}
            </div>
          ) : (
            <span>{content}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
});

export default MessageBubble;
