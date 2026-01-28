import React from 'react'

const MessagesPrompt = ({ auth, messages, bottomRef, send, input, setInput, sending }) => {
    return (
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
    )
}

export default MessagesPrompt