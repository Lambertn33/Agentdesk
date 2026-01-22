import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";

const UserChatModal = ({ open, onClose, user }) => {
    const bottomRef = useRef(null);

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [sending, setSending] = useState(false);

    const title = useMemo(() => {
        const name = user?.names ?? "this person";
        return `What would you like to know about ${name}?`;
    }, [user?.names]);

    // Reset chat when modal opens
    useEffect(() => {
        if (!open || !user) return;

        setMessages([
            {
                role: "assistant",
                text:
                    "Ask about availability, skills experience, interests, or what else they can help with.",
            },
        ]);

        setMessage("");
    }, [open, user?.id]);

    // Auto-scroll
    useEffect(() => {
        if (!open) return;
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, open]);

    if (!open || !user) return null;

    const send = async (e) => {
        e.preventDefault();

        const text = message.trim();
        if (!text || sending) return;

        setMessages((prev) => [...prev, { role: "user", text }]);
        setMessage("");
        setSending(true);

        try {
            const res = await axios.post('/api/get-user', {
                message,
                userId: user.id
            });
            const reply =
                res?.data?.assistantReply ??
                "";
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: typeof reply === "string" && reply.trim()
                        ? reply
                        : "I didn’t get a reply. Please try again.",
                },
            ]);

        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: "Something went wrong. Please try again.",
                },
            ]);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-[min(720px,95vw)] rounded-xl bg-[#0f0f0f] text-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 p-4">
                    <div>
                        <div className="text-lg font-semibold">{title}</div>
                        <div className="text-xs opacity-70">{user.email}</div>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-md px-3 py-1 text-sm bg-white/10 hover:bg-white/20"
                    >
                        Close
                    </button>
                </div>

                {/* Messages */}
                <div className="max-h-[60vh] overflow-auto p-4 space-y-3">
                    {messages.map((m, idx) => (
                        <div
                            key={idx}
                            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${m.role === "user"
                                    ? "bg-[#f53003]"
                                    : "bg-white/10"
                                    }`}
                            >
                                {m.text}
                            </div>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <form
                    onSubmit={send}
                    className="border-t border-white/10 p-4 flex gap-2"
                >
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask something… e.g. Can they work on weekends?"
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
    );
};

export default UserChatModal;
