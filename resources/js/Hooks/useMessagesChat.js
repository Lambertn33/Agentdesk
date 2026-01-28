import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function useMessagesChat(auth) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [sending, setSending] = useState(false);
    const bottomRef = useRef(null);

    // Reset chat when user changes/logs in
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

    // Auto-scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const send = async (e) => {
        e.preventDefault();

        const text = input.trim();
        if (!text || sending) return;

        // Add user message immediately
        setMessages((prev) => [...prev, { role: "user", text }]);
        setInput("");
        setSending(true);

        try {
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

    return {
        input,
        setInput,
        messages,
        setMessages,
        sending,
        send,
        bottomRef,
    };
}
