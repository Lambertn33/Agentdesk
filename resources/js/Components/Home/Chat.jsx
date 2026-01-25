import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";

const CHAT_MODE = {
    INFO: "INFO", // ask agent about user profile
    MESSAGE: "MESSAGE", // leave a message for the user
};

const UserChatModal = ({ open, onClose, user }) => {
    const bottomRef = useRef(null);

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [sending, setSending] = useState(false);
    const [mode, setMode] = useState(CHAT_MODE.INFO);

    const title = useMemo(() => {
        const name = user?.names ?? "this person";
        return mode === CHAT_MODE.MESSAGE
            ? `Send a message to ${name}`
            : `What would you like to know about ${name}?`;
    }, [user?.names, mode]);

    // Reset chat when modal opens or user changes
    useEffect(() => {
        if (!open || !user) return;

        setMode(CHAT_MODE.INFO);
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

    const toggleMode = () => {
        setMode((prev) =>
            prev === CHAT_MODE.INFO ? CHAT_MODE.MESSAGE : CHAT_MODE.INFO
        );
        setMessage("");

        // optional: add a small system hint in the chat stream
        setMessages([]);
        setMessages((prev) => [
            ...prev,
            {
                role: "assistant",
                text:
                    mode === CHAT_MODE.INFO
                        ? "Okay — type your message and I’ll send it."
                        : "Okay — ask anything about this user’s profile.",
            },
        ]);
    };

    const send = async (e) => {
        e.preventDefault();

        const text = message.trim();
        if (!text || sending) return;

        // show user's message immediately
        setMessages((prev) => [...prev, { role: "user", text }]);
        setMessage("");
        setSending(true);

        try {
            const url =
                mode === CHAT_MODE.MESSAGE ? "/api/messages" : "/api/get-user";

            const payload =
                mode === CHAT_MODE.MESSAGE
                    ? {
                        // message-user expects: receiverId + message
                        receiverId: user.id,
                        message: text,
                    }
                    : {
                        // get-user expects: userId + message
                        userId: user.id,
                        message: text,
                    };
            alert(payload);

            const res = await axios.post(url, payload);

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

    const placeholder =
        mode === CHAT_MODE.MESSAGE
            ? `Type a message to ${user?.names ?? "this user"}… (e.g. "Hey, I'm Lambert…")`
            : "Ask something… e.g. Can they work on weekends?";

    const switchText =
        mode === CHAT_MODE.INFO ? "Text the user instead" : "Ask about the user instead";

    const sendButtonText =
        mode === CHAT_MODE.MESSAGE ? (sending ? "Sending…" : "Send message") : (sending ? "Sending…" : "Send");

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-[min(720px,95vw)] rounded-xl bg-[#0f0f0f] text-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 p-4">
                    <div>
                        <div className="text-lg font-semibold">{title}</div>
                        <div className="text-xs opacity-70">{user.email}</div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={toggleMode}
                            className="rounded-md px-3 py-1 text-sm bg-white/10 hover:bg-white/20"
                            disabled={sending}
                        >
                            {switchText}
                        </button>

                        <button
                            onClick={onClose}
                            className="rounded-md px-3 py-1 text-sm bg-white/10 hover:bg-white/20"
                        >
                            Close
                        </button>
                    </div>
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
                        placeholder={placeholder}
                        className="flex-1 rounded-md bg-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
                        disabled={sending}
                    />
                    <button
                        type="submit"
                        disabled={sending}
                        className="rounded-md px-4 py-2 text-sm bg-white/10 hover:bg-white/20 disabled:opacity-60"
                    >
                        {sendButtonText}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserChatModal;
