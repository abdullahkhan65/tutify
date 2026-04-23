"use client";
// Web Speech API type extensions
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition: any;
  }
}
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MessageBubble from "./MessageBubble";
import Whiteboard from "./Whiteboard";
import {
  Send, Mic, MicOff, Volume2, VolumeX, Zap, Globe,
  ChevronDown, Target, BookOpen, Sparkles, X
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
}

interface ChatInterfaceProps {
  topicId?: string;
  topicName?: string;
  subjectSlug?: string;
  onExamModeStart?: () => void;
}

const QUICK_PROMPTS = [
  "Explain this from the beginning",
  "Give me a real-life example",
  "Show me the derivation",
  "I don't understand — simplify please",
  "What will come in the board exam?",
];

export default function ChatInterface({ topicId, topicName, subjectSlug, onExamModeStart }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [bilingualMode, setBilingualMode] = useState(false);
  const [latestAIContent, setLatestAIContent] = useState("");
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);
  const [personality, setPersonality] = useState("friendly");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const streamingContentRef = useRef("");

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  // Initialize session
  useEffect(() => {
    initSession();
    // Welcome message
    if (topicName) {
      const welcome: Message = {
        id: "welcome",
        role: "assistant",
        content: `**Assalam o Alaikum!** 👋 I'm your Tutify professor. Today we're studying **${topicName}**.\n\nI'll explain everything step-by-step, show you the math clearly, and make sure you're ready for your board exam. What aspect would you like to start with, or shall I give you a complete overview?`,
      };
      setMessages([welcome]);
      setLatestAIContent(welcome.content);
    }
  }, [topicName]);

  async function initSession() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("sessions")
      .insert({
        user_id: user.id,
        topic_id: topicId || null,
        topic_name: topicName || "General Study",
        subject_slug: subjectSlug || null,
      })
      .select("id")
      .single();

    if (!error && data) {
      setSessionId(data.id);
    }
  }

  const sendMessage = useCallback(async (messageContent?: string) => {
    const content = (messageContent || input).trim();
    if (!content || isStreaming) return;

    setInput("");
    setShowQuickPrompts(false);
    inputRef.current?.focus();

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setIsStreaming(true);
    streamingContentRef.current = "";

    try {
      const allMessages = [
        ...messages.filter((m) => m.id !== "welcome"),
        userMessage,
      ].map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: allMessages,
          sessionId,
          topicContext: topicName,
          mode: bilingualMode ? "urdu" : "chat",
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        if (response.status === 429) {
          toast.error(err.error, { action: { label: "Upgrade", onClick: () => window.location.href = "/pricing" } });
        } else {
          toast.error("Failed to get response. Please try again.");
        }
        setMessages((prev) => prev.slice(0, -1));
        setIsStreaming(false);
        return;
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                fullContent += parsed.text;
                streamingContentRef.current = fullContent;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMessage.id
                      ? { ...m, content: fullContent }
                      : m
                  )
                );
                setLatestAIContent(fullContent);
              }
            } catch {}
          }
        }
      }

      // Text-to-speech if enabled
      if (voiceEnabled && fullContent) {
        speakText(fullContent.replace(/[*#`$\[\]]/g, "").slice(0, 500));
      }
    } catch (error) {
      toast.error("Connection error. Please try again.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsStreaming(false);
    }
  }, [input, messages, sessionId, isStreaming, topicName, bilingualMode, voiceEnabled]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function toggleVoiceInput() {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      toast.error("Voice input not supported in your browser. Try Chrome.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognitionAPI();
    recognition.lang = bilingualMode ? "ur-PK" : "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((result: any) => result[0].transcript)
        .join("");
      setInput(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast.error("Voice input error. Please try again.");
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }

  function speakText(text: string) {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = bilingualMode ? "ur-PK" : "en-US";
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }

  function stopSpeaking() {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }

  return (
    <div className="flex h-full bg-background">
      {/* Left: Chat Panel */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-border/50">
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-card/30">
          {/* Professor avatar */}
          <div
            className={cn(
              "w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-900/40 flex-shrink-0",
              isStreaming && "professor-speaking"
            )}
          >
            AI
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">
              {topicName || "Tutify Professor"}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className={cn("w-1.5 h-1.5 rounded-full", isStreaming ? "bg-purple-400 animate-pulse" : "bg-green-400")} />
              <span className="text-xs text-muted-foreground">
                {isStreaming ? "Explaining..." : "Ready to teach"}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setBilingualMode(!bilingualMode)}
              title={bilingualMode ? "Switch to English" : "Switch to Urdu mode"}
              className={cn(bilingualMode && "text-teal-400 bg-teal-900/20")}
            >
              <Globe className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                if (isSpeaking) stopSpeaking();
                setVoiceEnabled(!voiceEnabled);
              }}
              title={voiceEnabled ? "Disable voice" : "Enable voice output"}
              className={cn(voiceEnabled && "text-purple-400 bg-purple-900/20")}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
            {onExamModeStart && (
              <Button
                variant="teal"
                size="sm"
                onClick={onExamModeStart}
                className="gap-1.5 ml-1"
              >
                <Target className="w-3.5 h-3.5" />
                Test Me
              </Button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((msg, i) => (
            <MessageBubble
              key={msg.id}
              role={msg.role}
              content={msg.content}
              isStreaming={isStreaming && i === messages.length - 1 && msg.role === "assistant"}
            />
          ))}

          {/* Quick prompts */}
          <AnimatePresence>
            {showQuickPrompts && messages.length <= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-xs text-muted-foreground">Quick start:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="text-xs px-3 py-1.5 rounded-full border border-border bg-secondary hover:border-purple-500/50 hover:text-purple-300 hover:bg-purple-900/10 transition-all text-foreground/70"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Bilingual badge */}
        {bilingualMode && (
          <div className="px-4 py-1 flex items-center gap-2">
            <Badge variant="teal" className="text-xs gap-1">
              <Globe className="w-3 h-3" />
              Urdu Mode Active
            </Badge>
            <button onClick={() => setBilingualMode(false)} className="text-muted-foreground hover:text-foreground">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Input area */}
        <div className="px-4 py-3 border-t border-border/50 bg-card/20">
          <div className="flex items-end gap-2">
            {/* Voice input button */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "flex-shrink-0 rounded-xl",
                isListening && "bg-red-900/30 text-red-400 animate-pulse border border-red-500/30"
              )}
              onClick={toggleVoiceInput}
              title="Voice input"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>

            {/* Text input */}
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  // Auto-resize
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                }}
                onKeyDown={handleKeyDown}
                placeholder={
                  isListening
                    ? "Listening... speak now"
                    : bilingualMode
                    ? "Urdu ya English mein poochein..."
                    : "Ask your professor anything..."
                }
                rows={1}
                disabled={isStreaming}
                className="w-full resize-none rounded-xl border border-border bg-secondary px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 max-h-32 overflow-y-auto leading-relaxed"
              />
            </div>

            {/* Send button */}
            <Button
              variant="gradient"
              size="icon"
              className="flex-shrink-0 rounded-xl"
              disabled={!input.trim() || isStreaming}
              onClick={() => sendMessage()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between mt-1.5">
            <p className="text-xs text-muted-foreground">
              Press <kbd className="text-xs bg-secondary border border-border px-1 py-0.5 rounded">Enter</kbd> to send,{" "}
              <kbd className="text-xs bg-secondary border border-border px-1 py-0.5 rounded">Shift+Enter</kbd> for newline
            </p>
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <Volume2 className="w-3 h-3 animate-pulse" /> Stop speaking
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right: Whiteboard Panel */}
      <div className="w-80 lg:w-96 flex-shrink-0 bg-card/20 hidden md:flex flex-col">
        <Whiteboard
          content={latestAIContent}
          isStreaming={isStreaming}
          onTermClick={(term) => {
            setInput(`Explain "${term}" in more detail`);
            inputRef.current?.focus();
          }}
        />
      </div>
    </div>
  );
}
