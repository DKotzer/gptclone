"use client";
import BetaChat from "@component/components/BetaChat";
import BetaInput from "@component/components/BetaInput";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: process.env.NEXT_PUBLIC_SECRETSAUCE,
    },
    { role: "assistant", content: "Hello, I am DylanGPT, how may I help you?" },
  ]);

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <BetaChat messages={messages} />
      <BetaInput setMessages={setMessages} messages={messages} />
    </div>
  );
}

export default ChatPage;

//https://firebase.google.com/docs/firestore/manage-data/add-data - Update a document section - create a function similar to addDoc in ChatInput for BetaInput to update messages to messages from state
