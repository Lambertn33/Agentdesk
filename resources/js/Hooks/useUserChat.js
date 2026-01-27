import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

export const CHAT_MODE = {
    INFO: "INFO",
    MESSAGE: "MESSAGE",
};

export default function useUserChat({ open, user, onClose }) {
    const bottomRef = useRef(null);

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [sending, setSending] = useState(false);
    const [mode, setMode] = useState(CHAT_MODE.INFO);
    const [messageSent, setMessageSent] = useState(false);

    const title = useMemo(() => {
        const name = user?.names ?? "this person";
        return mode === CHAT_MODE.MESSAGE
            ? `Send a message to ${name}`
            : `What would you like to know about ${name}?`;
    }, [user?.names, mode]);

    const placeholder = useMemo(() => {
        if (mode === CHAT_MODE.MESSAGE) {
            return `Type a message to ${user?.names ?? "this user"}…`;
        }
        return "Ask something… e.g. Can they work on weekends?";
    }, [mode, user?.names]);

    const switchText = useMemo(() => {
        return mode === CHAT_MODE.INFO
            ? "Text the user instead"
            : "Ask about the user instead";
    }, [mode]);

    // Reset when opened or user changes
    useEffect(() => {
        if (!open || !user) return;

        setMode(CHAT_MODE.INFO);
        setMessageSent(false);
        setInput("");
        setMessages([
            {
                role: "assistant",
                text: "Ask about availability, skills experience, interests, or what else they can help with.",
            },
        ]);
    }, [open, user?.id]);

    // Auto-scroll
    useEffect(() => {
        if (!open) return;
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, open]);

    const toggleMode = useCallback(() => {
        setInput("");

        setMode((prev) => {
            const next = prev === CHAT_MODE.INFO ? CHAT_MODE.MESSAGE : CHAT_MODE.INFO;

            // If already sent, don’t allow going back to MESSAGE mode
            if (next === CHAT_MODE.MESSAGE && messageSent) return CHAT_MODE.INFO;

            return next;
        });

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
    }, [mode, messageSent]);

    const canSend = useMemo(() => {
        if (!open || !user) return false;
        if (sending) return false;
        if (mode === CHAT_MODE.MESSAGE && messageSent) return false;
        return true;
    }, [open, user, sending, mode, messageSent]);

    const inputDisabled = useMemo(() => {
        return sending || (mode === CHAT_MODE.MESSAGE && messageSent);
    }, [sending, mode, messageSent]);

    const send = useCallback(
        async (e) => {
            e?.preventDefault?.();

            const text = input.trim();
            if (!text || !canSend) return;

            setMessages((prev) => [...prev, { role: "user", text }]);
            setInput("");
            setSending(true);

            try {
                const url =
                    mode === CHAT_MODE.MESSAGE ? "/api/message-user" : "/api/get-user";

                const payload =
                    mode === CHAT_MODE.MESSAGE
                        ? { receiverId: user.id, message: text }
                        : { userId: user.id, message: text };

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

                // ✅ lock after successful message send (HTTP 200)
                const wasSentSuccessfully =
                    mode === CHAT_MODE.MESSAGE && res?.status === 200;

                if (wasSentSuccessfully) {
                    setMessageSent(true);

                    // Option: switch back to INFO mode
                    setMode(CHAT_MODE.INFO);
                    setMessages((prev) => [
                        ...prev,
                        {
                            role: "assistant",
                            text: "You can now ask questions about this user’s profile.",
                        },
                    ]);
                }
            } catch (err) {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", text: "Something went wrong. Please try again." },
                ]);
            } finally {
                setSending(false);
            }
        },
        [input, canSend, mode, user?.id]
    );

    const close = useCallback(() => {
        onClose?.();
    }, [onClose]);

    return {
        bottomRef,
        messages,
        input,
        setInput,
        sending,
        mode,
        messageSent,
        title,
        placeholder,
        switchText,
        inputDisabled,
        toggleMode,
        send,
        close,
    };
}
