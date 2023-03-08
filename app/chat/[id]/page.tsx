"use client";
import Chat from "@component/components/Chat";
import ChatInput from "@component/components/ChatInput";
import { doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "@component/firebase";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  const { data: session } = useSession();
  const messages = useDocumentData(
    doc(db, "users", session?.user?.email!, "chats", id)
  );
  // const [messages, setMessages] = useState([
  //   { role: "assistant", content: "Hello, I am DylanGPT, how may I help you?" },
  // ]);

  // let messageFunc = async (newMessages: any) => {
  //   setMessages(newMessages);
  // };
  // if (messagesDoc[0]) {
  //   // console.log("doctest", messagesDoc[0]);
  // }
  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <Chat chatId={id} messages={messages[0]?.messages}  />
      <ChatInput chatId={id}  />
    </div>
  );
}

export default ChatPage;
