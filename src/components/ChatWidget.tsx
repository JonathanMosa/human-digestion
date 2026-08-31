"use client";
import { useState } from "react";

export default function ChatWidget() {
  type Message = {
    role: "user" | "assistant";
    content: string;
    sources?: string[]; //only assistant turns
  };

  const [messages, setMessages] = useState<Message[]>([]);
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
    <div key={i} className="text-black py-1">
      {message.content}
    </div>
  ));

  return (
    <>
      {open ? (
        <div className="fixed w-96 h-[500px] max-h-[70vh] bottom-6 right-6 z-50 flex flex-col bg-white rounded-md shadow-md">
          <div className="flex items-center gap-4 px-4 py-4 bg-bronze">
            <div className="mr-auto"> Human Digestion Chat</div>
            {/* '—': Minimize & Keep Chat logs */}
            <button className="ml-24" onClick={() => setOpen(false)}>
              —
            </button>
            {/* 'X': Close & End Chat */}
            <button className="ml-auto" onClick={() => setOpen(false)}>
              X
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4 text-black">
            {chatHistory}
            {loading && <div className="py-1 text-stone">Thinking…</div>}
            {error && <div className="py-1 text-red-500">{error}</div>}
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex px-4 text-black border mr-4 ml-4 mb-3 rounded-full"
          >
            <textarea
              className="flex-1 outline-none resize-none"
              maxLength={500}
              placeholder="Ask me a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
            <button type="submit" disabled={loading}>
              Send
            </button>
          </form>
        </div>
      ) : (
        <button
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-espresso text-linen"
          onClick={() => setOpen(true)}
        >
          button
        </button>
      )}
    </>
  );
}
