import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Layout } from "../Components";

const Messages = ({ auth }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [sending, setSending] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (!auth?.user) return;

        setInput("");
        setMessages([
            {
                role: "assistant",
                text: "Ask about your unread messages, who wrote to you, how many new messages, etc.",
            },
        ]);
    }, [auth?.user?.id]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const send = async (e) => {
        e.preventDefault();

        const text = input.trim();
        if (!text || sending) return;

        // add user message
        setMessages((prev) => [...prev, { role: "user", text }]);
        setInput("");
        setSending(true);

        try {
            // authenticated user is inferred on backend, so we only send the question/message
            const res = await axios.post("/messages", { prompt: text });

            const reply = res?.data?.assistantReply ?? "";

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text:
                        typeof reply === "string" && reply.trim()
                            ? reply
                            : "I didn’t get a reply. Please try again.",
                },
            ]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", text: "Something went wrong. Please try again." },
            ]);
        } finally {
            setSending(false);
        }
    };

    return (
        <Layout auth={auth}>
            <div className="inset-0 z-[100] flex items-center justify-center">
                <div className="relative w-[min(720px,95vw)] rounded-xl bg-[#0f0f0f] text-white shadow-xl">
                    <div className="flex items-center justify-between border-b border-white/10 p-4">
                        <div>
                            <div className="text-lg font-semibold">Inbox Assistant</div>
                            <div className="text-xs opacity-70">{auth?.user?.email ?? ""}</div>
                        </div>
                    </div>

                    <div className="max-h-[60vh] overflow-auto p-4 space-y-3">
                        {messages.map((m, idx) => (
                            <div
                                key={idx}
                                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${m.role === "user" ? "bg-[#f53003]" : "bg-white/10"
                                        }`}
                                >
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    <form onSubmit={send} className="border-t border-white/10 p-4 flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask anything about your unread messages…"
                            className="flex-1 rounded-md bg-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
                            disabled={sending}
                        />
                        <button
                            type="submit"
                            disabled={sending}
                            className="rounded-md px-4 py-2 text-sm bg-white/10 hover:bg-white/20 disabled:opacity-60"
                        >
                            {sending ? "Sending…" : "Send"}
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Messages;
