import React, { useEffect, useMemo, useRef, useState } from "react";
import { router } from "@inertiajs/react";

const UserChatModal = ({ open, onClose, user }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState(() => []);
    const [sending, setSending] = useState(false);
    const bottomRef = useRef(null);

    const title = useMemo(() => {
        const name = user?.names ?? "this person";
        return `What would you like to know about ${name}?`;
    }, [user]);

    useEffect(() => {
        if (!open) return;
        setMessages([
            {
                role: "assistant",
                text:
                    "Ask about availability, skills experience, interests, or what else they can help with.",
            },
        ]);
        setMessage("");
    }, [open]);

    useEffect(() => {
        if (!open) return;
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, open]);

    if (!open || !user) return null;

    const send = async (e) => {
        e.preventDefault();
        const text = message.trim();
        if (!text) return;

        const userMsg = { role: "user", text };
        setMessages((prev) => [...prev, userMsg]);
        setMessage("");
        setSending(true);

        // Inertia POST to backend: you implement this route/controller
        router.post(
            "/ai/user-chat",
            { user_id: user.id, message: text },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    // Expect backend to return flash.assistantReply or props.assistantReply
                    const reply =
                        page?.props?.flash?.assistantReply ??
                        page?.props?.assistantReply ??
                        null;

                    if (reply) {
                        setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
                    } else {
                        setMessages((prev) => [
                            ...prev,
                            {
                                role: "assistant",
                                text: "I didn't get a reply. Try again.",
                            },
                        ]);
                    }
                },
                onError: () => {
                    setMessages((prev) => [
                        ...prev,
                        { role: "assistant", text: "Something went wrong. Try again." },
                    ]);
                },
                onFinish: () => setSending(false),
            }
        );
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="relative w-[min(720px,95vw)] rounded-xl bg-[#0f0f0f] text-white shadow-xl">
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
                            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
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

                {/* Input */}
                <form onSubmit={send} className="border-t border-white/10 p-4 flex gap-2">
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
