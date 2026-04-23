"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, BookOpen, Share2, RefreshCw } from "lucide-react";
import { extractWhiteboardContent } from "@/lib/utils";
import "katex/dist/katex.min.css";

interface WhiteboardProps {
  content: string;
  isStreaming?: boolean;
  onTermClick?: (term: string) => void;
}

function MathBlock({ latex }: { latex: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    import("katex").then((katex) => {
      try {
        katex.default.render(latex, ref.current!, {
          displayMode: true,
          throwOnError: false,
          trust: false,
        });
      } catch (e) {
        if (ref.current) ref.current.textContent = latex;
      }
    });
  }, [latex]);

  return (
    <div className="my-3 bg-purple-900/20 border border-purple-500/20 rounded-xl p-4 overflow-x-auto">
      <div ref={ref} className="text-center" />
    </div>
  );
}

function MermaidDiagram({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    import("mermaid").then((mermaid) => {
      mermaid.default.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          primaryColor: "#7c3aed",
          primaryTextColor: "#e5e7eb",
          primaryBorderColor: "#4c1d95",
          lineColor: "#6d28d9",
          secondaryColor: "#0d9488",
          tertiaryColor: "#1f2937",
          background: "#0a0a0f",
          mainBkg: "#1a1a2e",
          nodeBorder: "#7c3aed",
          clusterBkg: "#1f2937",
          titleColor: "#e5e7eb",
          edgeLabelBackground: "#1f2937",
          fontFamily: "Inter, system-ui, sans-serif",
        },
      });

      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      mermaid.default
        .render(id, code)
        .then(({ svg }) => {
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        })
        .catch(() => setError(true));
    });
  }, [code]);

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-4 text-sm text-red-400">
        Could not render diagram
      </div>
    );
  }

  return (
    <div className="mermaid-container rounded-xl overflow-hidden border border-border/50 my-3">
      <div className="text-xs text-muted-foreground px-3 py-1.5 border-b border-border/30 bg-card/50 flex items-center gap-1.5">
        <Share2 className="w-3 h-3" />
        Diagram
      </div>
      <div ref={ref} className="p-4 flex justify-center [&_svg]:max-w-full [&_svg]:h-auto" />
    </div>
  );
}

export default function Whiteboard({ content, isStreaming, onTermClick }: WhiteboardProps) {
  const { blockMath, diagrams, keyTerms } = extractWhiteboardContent(content);

  const isEmpty = blockMath.length === 0 && diagrams.length === 0 && keyTerms.length === 0;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
        <Zap className="w-4 h-4 text-purple-400" />
        <span className="text-sm font-semibold">Smart Whiteboard</span>
        {isStreaming && (
          <span className="ml-auto text-xs text-purple-400 flex items-center gap-1">
            <RefreshCw className="w-3 h-3 animate-spin" />
            Live
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {isEmpty && !isStreaming ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-48 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-900/20 border border-purple-500/20 flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Whiteboard is ready</p>
              <p className="text-xs text-muted-foreground mt-1">
                Math equations, diagrams, and key terms will appear here as you learn
              </p>
            </motion.div>
          ) : (
            <>
              {/* Block Math Equations */}
              {blockMath.length > 0 && (
                <motion.div
                  key="math"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span className="text-purple-400">∑</span> Equations
                  </div>
                  {blockMath.map((math, i) => (
                    <MathBlock key={i} latex={math} />
                  ))}
                </motion.div>
              )}

              {/* Diagrams */}
              {diagrams.length > 0 && (
                <motion.div
                  key="diagrams"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-teal-400" /> Diagrams
                  </div>
                  {diagrams.map((code, i) => (
                    <MermaidDiagram key={i} code={code} />
                  ))}
                </motion.div>
              )}

              {/* Key Terms */}
              {keyTerms.length > 0 && (
                <motion.div
                  key="terms"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-teal-400" /> Key Terms
                    <span className="text-muted-foreground font-normal normal-case tracking-normal ml-1">(click to explore)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {keyTerms.map((term) => (
                      <button
                        key={term}
                        onClick={() => onTermClick?.(term)}
                        className="text-xs px-2.5 py-1.5 rounded-lg bg-secondary border border-border hover:border-purple-500/60 hover:text-purple-300 hover:bg-purple-900/20 transition-all text-foreground/80 font-medium"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Streaming indicator for whiteboard */}
              {isStreaming && (
                <motion.div
                  key="streaming"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-xs text-purple-400 py-2"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                  Updating whiteboard...
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
