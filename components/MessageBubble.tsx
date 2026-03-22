"use client";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface MessageBubbleProps {
  message: Message;
  isLast: boolean;
}

export default function MessageBubble({ message, isLast }: MessageBubbleProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="msg-appear flex justify-end">
        <div
          style={{
            maxWidth: "75%",
            padding: "10px 16px",
            background: "rgba(196,154,69,0.08)",
            border: "1px solid rgba(196,154,69,0.2)",
            borderRadius: "2px 2px 2px 12px",
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1.05rem",
            color: "var(--stone-300)",
            lineHeight: 1.6,
          }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  // Assistant — parse and render with italic emphasis for quoted passages
  const rendered = renderAssistantText(message.content);

  return (
    <div className={`msg-appear flex gap-4`}>
      {/* Oracle sigil */}
      <div
        className="flex-none mt-1"
        style={{
          width: "28px",
          height: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(196,154,69,0.3)",
          borderRadius: "50%",
          color: "var(--gold)",
          fontSize: "0.8rem",
          flexShrink: 0,
        }}
      >
        ✦
      </div>

      <div className="flex-1 min-w-0">
        {/* Label */}
        <div
          style={{
            fontFamily: "Josefin Sans, sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            color: "var(--stone-600, #5c5640)",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          The Oracle
        </div>

        {/* Message content */}
        <div
          className="stoic-prose"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1.1rem",
            lineHeight: 1.85,
            color: "var(--stone-300)",
          }}
          dangerouslySetInnerHTML={{ __html: rendered }}
        />

        {/* Decorative divider after oracle messages */}
        {isLast && message.content && (
          <div
            className="mt-6"
            style={{
              height: "1px",
              maxWidth: "200px",
              background:
                "linear-gradient(90deg, rgba(196,154,69,0.3), transparent)",
            }}
          />
        )}
      </div>
    </div>
  );
}

function renderAssistantText(text: string): string {
  // Escape HTML first
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Convert **bold** to styled span
  html = html.replace(
    /\*\*(.*?)\*\*/g,
    '<span style="color: var(--gold-light, #d4af6a); font-weight: 500;">$1</span>'
  );

  // Convert *italic* to em
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Convert _italic_ to em
  html = html.replace(/_(.*?)_/g, "<em>$1</em>");

  // Paragraphs: double newlines
  html = html.replace(/\n\n+/g, '</p><p style="margin: 1.2em 0 0;">');

  // Single newlines to br within paragraphs
  html = html.replace(/\n/g, "<br/>");

  // Wrap in paragraph
  html = `<p style="margin: 0;">${html}</p>`;

  return html;
}
