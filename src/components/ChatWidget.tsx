"use client";
import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: string[]; // only assistant turns
};

// shown on mount so the panel isn't an empty white void
const greeting: Message = {
  role: "assistant",
  content:
    "Hi! I can answer questions about the five stages of digestion: mouth, esophagus, stomach, small intestine, and large intestine. What would you like to know?",
};

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // stop the browser reloading the page on submit

    const question = input.trim();
    if (!question || loading) return; // nothing to send, or a request is already running

    // show the user's message right away and reset the input
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      // fetch only throws on a network error, so check the status myself
      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer, sources: data.sources },
      ]);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false); // runs whether it succeeded or failed
    }
  }

  const chatHistory = messages.map((message, i) => (
    <div
      key={i}
      className={`flex py-2 ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div className="max-w-[75%] rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-[#2A2520]">
        {message.content}
      </div>
    </div>
  ));

  return (
    <>
      {open ? (
        <div className="fixed bottom-6 right-6 z-50 flex h-[500px] max-h-[70vh] w-96 flex-col overflow-hidden rounded-xl bg-white shadow-lg">
          <div className="flex h-10 items-center px-4 bg-[#171310] text-white">
            <span className="text-sm font-medium">Human Digestion Chat</span>
            <span className="flex-1" />
            <button
              aria-label="Minimize"
              onClick={() => setOpen(false)}
              className="px-2 text-white/60 hover:text-white"
            >
              –
            </button>
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="px-2 text-white/60 hover:text-white"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto bg-[#FAF7F0] p-4">
            {chatHistory}
            {loading && (
              <div className="py-1 text-sm text-stone">Thinking…</div>
            )}
            {error && <div className="py-1 text-sm text-red-500">{error}</div>}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-black/10 p-3"
          >
            <input
              className="flex-1 rounded-lg border border-black/15 px-3 py-2 text-sm outline-none text-black"
              maxLength={500}
              placeholder="Ask me a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              aria-label="Send"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-bronze text-white"
            >
              →
            </button>
          </form>
        </div>
      ) : (
        <button
          aria-label="Open chat"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-espresso text-2xl text-linen shadow-[-4px_-2px_16px_rgba(0,0,0,0.35)] cursor-pointer"
          onClick={() => setOpen(true)}
        >
          💬
        </button>
      )}
    </>
  );
}
