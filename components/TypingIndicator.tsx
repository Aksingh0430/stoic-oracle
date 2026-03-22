"use client";

export default function TypingIndicator() {
  return (
    <div className="msg-appear flex gap-4">
      {/* Oracle sigil */}
      <div
        className="flex-none"
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

      <div className="flex-1">
        <div
          style={{
            fontFamily: "Josefin Sans, sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            color: "var(--stone-600, #5c5640)",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          The Oracle
        </div>

        <div className="flex items-center gap-1" style={{ height: "24px" }}>
          <div
            className="dot-1"
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "var(--gold-dim)",
            }}
          />
          <div
            className="dot-2"
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "var(--gold-dim)",
            }}
          />
          <div
            className="dot-3"
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "var(--gold-dim)",
            }}
          />
          <span
            style={{
              fontFamily: "Josefin Sans, sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: "var(--stone-600, #5c5640)",
              textTransform: "uppercase",
              marginLeft: "8px",
            }}
          >
            Consulting the ancients
          </span>
        </div>
      </div>
    </div>
  );
}
