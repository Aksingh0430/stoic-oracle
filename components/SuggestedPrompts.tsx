"use client";

const PROMPTS = [
  {
    label: "On anxiety",
    text: "I am consumed by worry about the future. How do the Stoics counsel me?",
  },
  {
    label: "On loss",
    text: "I have lost something I loved deeply. How should I bear grief?",
  },
  {
    label: "On anger",
    text: "Someone has wronged me and I cannot let go of my anger. What would the Stoics say?",
  },
  {
    label: "On purpose",
    text: "I feel my life lacks meaning. How did the Stoics find purpose?",
  },
  {
    label: "On death",
    text: "I fear death. How did Marcus Aurelius make peace with mortality?",
  },
  {
    label: "On wealth",
    text: "I am consumed by the pursuit of wealth and status. Is this wrong?",
  },
];

interface SuggestedPromptsProps {
  onSelect: (text: string) => void;
}

export default function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  return (
    <div className="mt-8 w-full max-w-lg mx-auto">
      <div
        style={{
          fontFamily: "Josefin Sans, sans-serif",
          fontSize: "0.6rem",
          letterSpacing: "0.4em",
          color: "var(--stone-600, #5c5640)",
          textTransform: "uppercase",
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        Begin with a question
      </div>

      <div
        className="grid grid-cols-2 gap-2"
        style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
      >
        {PROMPTS.map((p) => (
          <button
            key={p.label}
            onClick={() => onSelect(p.text)}
            className="group text-left"
            style={{
              background: "rgba(28,26,20,0.6)",
              border: "1px solid rgba(196,154,69,0.15)",
              borderRadius: "2px",
              padding: "12px 14px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(196,154,69,0.4)";
              e.currentTarget.style.background = "rgba(196,154,69,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(196,154,69,0.15)";
              e.currentTarget.style.background = "rgba(28,26,20,0.6)";
            }}
          >
            <div
              style={{
                fontFamily: "Josefin Sans, sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                color: "var(--gold-dim)",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              {p.label}
            </div>
            <div
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "0.9rem",
                fontStyle: "italic",
                color: "var(--stone-400)",
                lineHeight: 1.5,
              }}
            >
              {p.text}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
