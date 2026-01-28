import React, { useState } from "react";
import { Layout, MessagesPrompt, MessagesTable } from "../Components";
import useMessagesChat from "../Hooks/useMessagesChat";

const Messages = ({ auth }) => {
    const [view, setView] = useState('table');
    const { input, setInput, messages, sending, send, bottomRef } =
        useMessagesChat(auth);


    const renderView = () => {
        return view === "table" ?
            <MessagesTable /> :
            <MessagesPrompt
                auth={auth}
                bottomRef={bottomRef}
                send={send}
                sending={sending}
                messages={messages}
                input={input}
                setInput={setInput}
            />
    }
    return (
        <Layout auth={auth}>
            <div className="flex justify-center mb-8 gap-4">
                <button
                    onClick={() => setView("prompt")}
                    className={`px-4 py-2 rounded-md text-sm transition
            ${view === "prompt"
                            ? "bg-white text-black"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                >
                    AI Prompt View
                </button>

                <button
                    onClick={() => setView("table")}
                    className={`px-4 py-2 rounded-md text-sm transition
            ${view === "table"
                            ? "bg-white text-black"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                >
                    Table View
                </button>
            </div>

            {renderView()}
        </Layout>
    );
};

export default Messages;
