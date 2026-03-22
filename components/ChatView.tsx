"use client";

import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import SuggestedPrompts from "./SuggestedPrompts";
import ErrorState from "./ErrorState";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [input]);

  const sendMessage = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || loading) return;

    setInput("");
    setError(null);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);

    const assistantId = (Date.now() + 1).toString();
    const assistantMsg: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
    };
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error("The Oracle is momentarily silent.");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      if (!reader) throw new Error("No response stream.");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const raw = line.slice(6).trim();
            if (raw === "[DONE]") break;
            try {
              const { text } = JSON.parse(raw);
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: m.content + text }
                    : m
                )
              );
            } catch {
              // skip malformed chunks
            }
          }
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "The Oracle cannot be reached."
      );
      // Remove the empty assistant message
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div
      className="flex flex-col h-screen"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      {/* Header */}
      <header
        className="flex-none flex items-center justify-between px-6 py-4"
        style={{
          borderBottom: "1px solid rgba(196,154,69,0.15)",
          background: "rgba(12,11,9,0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-3">
          <span
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.1rem",
              color: "var(--gold)",
            }}
          >
            ✦
          </span>
          <div>
            <div
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.25rem",
                fontWeight: 400,
                color: "var(--stone-200)",
                lineHeight: 1,
              }}
            >
              Stoic Oracle
            </div>
            <div
              style={{
                fontFamily: "Josefin Sans, sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.35em",
                color: "var(--stone-500)",
                textTransform: "uppercase",
                marginTop: "2px",
              }}
            >
              Ancient Wisdom · Modern Mind
            </div>
          </div>
        </div>

        {/* Philosophers badge */}
        <div
          className="hidden sm:flex items-center gap-3"
          style={{
            fontFamily: "Josefin Sans, sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.3em",
            color: "var(--stone-600, #5c5640)",
            textTransform: "uppercase",
          }}
        >
          Marcus Aurelius &nbsp;·&nbsp; Seneca &nbsp;·&nbsp; Epictetus
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto relative">
        {isEmpty ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center h-full px-6 py-12">
            <div
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 300,
                color: "var(--stone-700)",
                textAlign: "center",
                lineHeight: 1.2,
                marginBottom: "0.5rem",
              }}
            >
              What troubles your mind,
              <br />
              <span style={{ fontStyle: "italic", color: "var(--stone-600, #5c5640)" }}>
                seeker?
              </span>
            </div>
            <div
              className="mt-8"
              style={{
                height: "1px",
                width: "120px",
                background:
                  "linear-gradient(90deg, transparent, var(--gold-dim), transparent)",
              }}
            />
            <SuggestedPrompts onSelect={sendMessage} />
          </div>
        ) : (
          /* Messages */
          <div className="max-w-2xl mx-auto w-full px-4 py-8 space-y-6">
            {messages.map((msg, i) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                isLast={i === messages.length - 1}
              />
            ))}
            {loading && messages[messages.length - 1]?.role === "assistant" && messages[messages.length - 1]?.content === "" && (
              <TypingIndicator />
            )}
            {error && (
              <ErrorState
                message={error}
                onRetry={() => {
                  setError(null);
                  const lastUser = [...messages]
                    .reverse()
                    .find((m) => m.role === "user");
                  if (lastUser) {
                    setMessages((prev) =>
                      prev.filter((m) => m.id !== lastUser.id)
                    );
                    sendMessage(lastUser.content);
                  }
                }}
              />
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div
        className="flex-none px-4 pb-6 pt-4"
        style={{
          borderTop: "1px solid rgba(196,154,69,0.1)",
          background: "rgba(12,11,9,0.9)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-2xl mx-auto">
          <div
            className="flex items-end gap-3"
            style={{
              border: "1px solid rgba(196,154,69,0.25)",
              borderRadius: "2px",
              padding: "12px 16px",
              background: "rgba(28,26,20,0.8)",
              transition: "border-color 0.2s ease",
            }}
            onFocus={() => {}}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask the Oracle…"
              rows={1}
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.05rem",
                color: "var(--stone-200)",
                border: "none",
                outline: "none",
                lineHeight: 1.6,
                caretColor: "var(--gold)",
                minHeight: "28px",
                background: "transparent",
                resize: "none",
                width: "100%",
                flex: 1,
              } as React.CSSProperties}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              style={{
                background: "transparent",
                border: "none",
                cursor: !input.trim() || loading ? "not-allowed" : "pointer",
                color: !input.trim() || loading ? "var(--stone-700)" : "var(--gold)",
                fontSize: "1.1rem",
                padding: "4px",
                transition: "color 0.2s ease",
                lineHeight: 1,
                flexShrink: 0,
              }}
              aria-label="Send message"
            >
              {loading ? (
                <span style={{ fontSize: "0.8rem", letterSpacing: "0.1em" }}>
                  ···
                </span>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>

          {/* Hint */}
          <div
            className="mt-2 text-center"
            style={{
              fontFamily: "Josefin Sans, sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.2em",
              color: "var(--stone-700)",
              textTransform: "uppercase",
            }}
          >
            Press Enter to send &nbsp;·&nbsp; Shift+Enter for new line
          </div>
        </div>
      </div>
    </div>
  );
}
