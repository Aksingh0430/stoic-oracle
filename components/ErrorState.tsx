"use client";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      className="msg-appear flex gap-4"
      style={{
        padding: "16px",
        border: "1px solid rgba(196,154,69,0.2)",
        borderRadius: "2px",
        background: "rgba(196,154,69,0.04)",
      }}
    >
      <div className="flex-1">
        <div
          style={{
            fontFamily: "Josefin Sans, sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            color: "var(--gold-dim)",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          The Oracle Falls Silent
        </div>
        <div
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1rem",
            fontStyle: "italic",
            color: "var(--stone-500)",
            lineHeight: 1.7,
            marginBottom: "12px",
          }}
        >
          &ldquo;Even Marcus Aurelius faced obstacles. The connection faltered:{" "}
          {message}&rdquo;
        </div>
        <button
          onClick={onRetry}
          style={{
            background: "transparent",
            border: "1px solid rgba(196,154,69,0.3)",
            color: "var(--stone-400)",
            fontFamily: "Josefin Sans, sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            padding: "8px 16px",
            cursor: "pointer",
            borderRadius: "2px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--gold)";
            e.currentTarget.style.color = "var(--gold)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(196,154,69,0.3)";
            e.currentTarget.style.color = "var(--stone-400)";
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
