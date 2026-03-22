"use client";

import { useState } from "react";
import LandingView from "@/components/LandingView";
import ChatView from "@/components/ChatView";

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <main className="min-h-screen bg-stone-950 texture relative overflow-hidden">
      {/* Background ambient orb */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(196,154,69,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 80% 80%, rgba(196,154,69,0.03) 0%, transparent 60%)",
        }}
      />

      {!entered ? (
        <LandingView onEnter={() => setEntered(true)} />
      ) : (
        <ChatView />
      )}
    </main>
  );
}
