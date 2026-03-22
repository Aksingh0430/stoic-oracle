# Stoic Oracle

> *"You have power over your mind — not outside events. Realize this, and you will find strength."*
> — Marcus Aurelius

A purpose-built chatbot channelling the wisdom of the three great Stoic philosophers: **Marcus Aurelius**, **Seneca the Younger**, and **Epictetus**. Built for the Thinkly Labs Software Engineering assignment.

## Live Demo

🔗 [stoic-oracle.vercel.app](https://stoic-oracle.vercel.app) *(replace with your deployed URL)*

## Why Stoicism?

Stoicism is one of the most practical philosophical traditions ever developed — it was designed to be *used*, not just contemplated. Unlike many philosophy chatbots that give generic self-help advice, the Stoic Oracle draws from a very specific canon of texts (Meditations, Letters to Lucilius, the Enchiridion) and speaks in a voice coherent with that tradition. This makes it purpose-built in a real sense: the system prompt encodes hundreds of specific Stoic concepts, Latin phrases, historical context, and rhetorical patterns distinct to each philosopher.

The topic also creates a rich, opinionated design direction — ancient Rome, stone, gold, candlelight — which let me push the UI far beyond a generic chat wrapper.

## What I Built

### The Experience

1. **Landing screen** — A dramatic entry point with a randomised epigraph from one of the three philosophers, a glowing gold ornament, and a single CTA: *"Seek Wisdom"*. Sets the tone before the user types a word.

2. **Empty state** — Rather than a blank input box, the Oracle poses a direct question: *"What troubles your mind, seeker?"* with six pre-built prompt cards organised by human concern (anxiety, loss, anger, purpose, death, wealth).

3. **Chat** — Streaming responses render token-by-token with a custom "Consulting the ancients…" typing indicator. The Oracle's messages are styled differently from the user's — a sigil marker, tracked label, and serif prose rendering with italic emphasis.

4. **Error state** — Even failures are on-brand: *"Even Marcus Aurelius faced obstacles."* with a retry button.

### The Design Language

- **Palette**: Near-black stone (#0c0b09) + warm gold accents. No purple gradients, no generic SaaS blue.
- **Typography**: Cormorant Garamond (serif, editorial, classical) for all prose; Josefin Sans (geometric, minimal) for labels and UI chrome — a deliberate high-contrast pairing.
- **Motion**: Fade-slide-up on all new messages. Pulsing glow on the landing ornament. Dot animation on the typing indicator.
- **Details**: Gold gradient rules, noise texture overlay, ambient radial gradients, custom scrollbar, gold caret in the input.

### The AI Layer

The system prompt is the knowledge base. It encodes:
- All three philosophers' distinct voices and rhetorical tendencies
- Core Stoic concepts: Dichotomy of Control, Memento Mori, Amor Fati, the Logos, Negative Visualisation, the View from Above, Cosmopolitanism
- Key texts: all 12 books of *Meditations*, *Letters to Lucilius*, *On the Shortness of Life*, *On Anger*, the *Discourses*, the *Enchiridion*
- Output constraints: flowing prose (no bullet points), 3–5 paragraphs, Latin phrases with translation, a lapidary closing line

The API uses streaming SSE, so responses feel alive as they render.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + custom CSS variables |
| AI | Anthropic Claude claude-opus-4-5 via `@anthropic-ai/sdk` |
| Streaming | Edge Runtime + Server-Sent Events |
| Fonts | Google Fonts (Cormorant Garamond, Josefin Sans) |
| Deploy | Vercel |

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/stoic-oracle
cd stoic-oracle

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Add your Anthropic API key to .env.local

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable in Vercel dashboard:
# ANTHROPIC_API_KEY = your_key_here
```

Or connect your GitHub repo in the [Vercel dashboard](https://vercel.com/new) and add `ANTHROPIC_API_KEY` in Project Settings → Environment Variables.

## Project Structure

```
stoic-oracle/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts       # Edge API route, SSE streaming
│   ├── globals.css            # Design tokens, animations, typography
│   ├── layout.tsx             # Root layout, font loading, metadata
│   └── page.tsx               # Entry point, landing ↔ chat state
├── components/
│   ├── LandingView.tsx        # Dramatic entry screen
│   ├── ChatView.tsx           # Main chat shell, streaming logic
│   ├── MessageBubble.tsx      # User + Oracle message rendering
│   ├── TypingIndicator.tsx    # "Consulting the ancients…" state
│   ├── SuggestedPrompts.tsx   # Empty state prompt cards
│   └── ErrorState.tsx         # On-brand error handling
├── .env.example
├── tailwind.config.js
├── next.config.js
└── README.md
```

## AI Tools Used

- **Claude (claude.ai)** — Initial architecture planning, system prompt design, component scaffolding
- **GitHub Copilot** — Inline completions during component refinement

The Loom walkthrough covers how I directed the AI: what prompts worked, where I had to correct or override generated code, and how I verified the output wasn't "slop."

---

*"Nusquam est qui ubique est — He who is everywhere is nowhere."* — Seneca
