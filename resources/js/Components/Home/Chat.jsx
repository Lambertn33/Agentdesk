import React from "react";
import useUserChat, { CHAT_MODE } from "../../Hooks/useUserChat";

const UserChatModal = ({ open, onClose, user }) => {
    const {
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
    } = useUserChat({ open, user, onClose });

    if (!open || !user) return null;

    const sendButtonText =
        mode === CHAT_MODE.MESSAGE
            ? sending
                ? "Sending…"
                : "Send message"
            : sending
                ? "Sending…"
                : "Send";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={close} />

            <div className="relative w-[min(720px,95vw)] rounded-xl bg-[#0f0f0f] text-white shadow-xl">
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
                            disabled={sending || messageSent}
                            title={messageSent ? "Message already sent" : undefined}
                        >
                            {switchText}
                        </button>

                        <button
                            onClick={close}
                            className="rounded-md px-3 py-1 text-sm bg-white/10 hover:bg-white/20"
                        >
                            Close
                        </button>
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
                        placeholder={placeholder}
                        className="flex-1 rounded-md bg-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
                        disabled={inputDisabled}
                    />
                    <button
                        type="submit"
                        disabled={inputDisabled}
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
