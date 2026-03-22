"use client";

import { useEffect, useState } from "react";

interface LandingViewProps {
  onEnter: () => void;
}

const EPIGRAPHS = [
  { text: "You have power over your mind — not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { text: "Nusquam est qui ubique est. He who is everywhere is nowhere.", author: "Seneca" },
  { text: "Make the best use of what is in your power, and take the rest as it happens.", author: "Epictetus" },
];

export default function LandingView({ onEnter }: LandingViewProps) {
  const [visible, setVisible] = useState(false);
  const [epigraph] = useState(() => EPIGRAPHS[Math.floor(Math.random() * EPIGRAPHS.length)]);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = () => {
    setLeaving(true);
    setTimeout(onEnter, 600);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative"
      style={{
        transition: "opacity 0.6s ease",
        opacity: leaving ? 0 : 1,
      }}
    >
      {/* Top ornament */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(196,154,69,0.4), transparent)",
        }}
      />

      {/* Centering container */}
      <div
        className="max-w-2xl w-full text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        {/* Roman numerals ornament */}
        <div
          className="oracle-glow mb-8 select-none"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(3rem, 8vw, 5rem)",
            fontWeight: 300,
            color: "var(--gold)",
            letterSpacing: "0.3em",
            lineHeight: 1,
          }}
        >
          ✦
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: "Josefin Sans, sans-serif",
            fontSize: "clamp(0.65rem, 1.5vw, 0.75rem)",
            letterSpacing: "0.5em",
            color: "var(--gold-dim)",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          Consult the
        </div>

        <h1
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(3.5rem, 10vw, 7rem)",
            fontWeight: 300,
            color: "var(--stone-200)",
            margin: 0,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          Stoic
          <br />
          <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Oracle</span>
        </h1>

        {/* Gold rule */}
        <div
          className="my-10 mx-auto"
          style={{
            height: "1px",
            maxWidth: "280px",
            background: "linear-gradient(90deg, transparent, var(--gold-dim), transparent)",
          }}
        />

        {/* Epigraph */}
        <div
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "var(--stone-400)",
            lineHeight: 1.7,
            maxWidth: "480px",
            margin: "0 auto 0.75rem",
          }}
        >
          &ldquo;{epigraph.text}&rdquo;
        </div>
        <div
          style={{
            fontFamily: "Josefin Sans, sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            color: "var(--stone-500)",
            textTransform: "uppercase",
            marginBottom: "3rem",
          }}
        >
          — {epigraph.author}
        </div>

        {/* CTA */}
        <button
          onClick={handleEnter}
          className="group relative"
          style={{
            background: "transparent",
            border: "1px solid var(--gold-dim)",
            color: "var(--stone-300)",
            fontFamily: "Josefin Sans, sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            padding: "1rem 2.5rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--gold)";
            e.currentTarget.style.color = "var(--gold)";
            e.currentTarget.style.background = "rgba(196,154,69,0.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--gold-dim)";
            e.currentTarget.style.color = "var(--stone-300)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          Seek Wisdom
        </button>

        {/* Philosopher byline */}
        <div
          className="mt-16"
          style={{
            fontFamily: "Josefin Sans, sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.4em",
            color: "var(--stone-600, #5c5640)",
            textTransform: "uppercase",
          }}
        >
          Marcus Aurelius &nbsp;·&nbsp; Seneca &nbsp;·&nbsp; Epictetus
        </div>
      </div>

      {/* Bottom ornament */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(196,154,69,0.15), transparent)",
        }}
      />
    </div>
  );
}
