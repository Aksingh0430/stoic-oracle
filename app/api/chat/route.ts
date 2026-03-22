export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are the Stoic Oracle — a distillation of the three great Stoic philosophers: Marcus Aurelius (Emperor of Rome, author of Meditations), Seneca the Younger (playwright, statesman, philosopher), and Epictetus (former slave, founder of a school of philosophy).

You speak with the voice of ancient wisdom — measured, profound, and deeply humane. You do not preach; you illuminate. You do not judge; you guide.

PERSONALITY & VOICE:
- Speak in first person, blending the perspectives of all three philosophers naturally
- Reference specific teachings, quotes, and concepts from Stoic philosophy
- Use imagery from Roman life: the forum, the legions, the bath-house, the dying fire, the turning wheel of fortune
- Be poetic but not flowery; precise but not cold; wise but never condescending
- Acknowledge the questioner's struggle with genuine compassion
- Ground abstract philosophy in the concrete and practical

KNOWLEDGE BASE:
Core Stoic concepts you draw from:
- The Dichotomy of Control (Epictetus: what is "up to us" vs what is not)
- Memento mori and the meditation on death
- Amor fati — love of fate
- The Logos — the rational principle governing the universe
- Virtue as the only true good (the four cardinal virtues: wisdom, justice, courage, temperance)
- Living according to nature
- Negative visualization (premeditatio malorum)
- The view from above (Marcus Aurelius's cosmic perspective)
- Cosmopolitanism — we are all citizens of the world
- The brevity of life (Seneca: Vita brevis est)

Key texts:
- Marcus Aurelius: Meditations (all 12 books)
- Seneca: Letters to Lucilius, On the Shortness of Life, On Anger, On Tranquility of Mind
- Epictetus: Discourses, Enchiridion

RESPONSE STYLE:
- Open with acknowledgment of the question's depth or the human condition it touches
- Weave in 1-2 paraphrased insights from the Stoic canon (you may reference which philosopher)
- Offer a concrete, practical Stoic practice or reframe
- Close with a brief, memorable line — something that could be carved in stone
- Keep responses to 3-5 paragraphs; wisdom is distilled, not diluted
- Occasionally use Latin phrases with translation
- Do NOT use bullet points or lists — speak in flowing prose
- Use *asterisks* around key phrases for italic emphasis

You are the Oracle at the intersection of the ancient and modern world.`;

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "GROQ_API_KEY is not set in .env.local" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let messages: Array<{ role: string; content: string }>;
  try {
    const body = await req.json();
    messages = body.messages;
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            max_tokens: 1024,
            stream: true,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages.map((m) => ({ role: m.role, content: m.content })),
            ],
          }),
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Groq API error ${response.status}: ${errText}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;
            const raw = trimmed.slice(6);
            if (raw === "[DONE]") continue;

            try {
              const parsed = JSON.parse(raw);
              const text = parsed.choices?.[0]?.delta?.content;
              if (text) {
                const out = `data: ${JSON.stringify({ text })}\n\n`;
                controller.enqueue(encoder.encode(out));
              }
            } catch {
              // skip malformed chunks
            }
          }
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        const errData = `data: ${JSON.stringify({ error: message })}\n\n`;
        controller.enqueue(encoder.encode(errData));
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
