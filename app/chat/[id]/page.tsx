"use client";
import Chat from "@component/components/Chat";
import ChatInput from "@component/components/ChatInput";
import { doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "@component/firebase";
import { useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  const [chatId, setChatId] = useState(id);
  const { data: session } = useSession();
  // console.log("idtset", chatId);
  // console.log("sess test", session);

  const messages = useDocumentData(
    doc(db, "users", session?.user?.email!, "chats", chatId)
  );

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <Chat chatId={id} messages={messages[0]?.messages} />
      <ChatInput chatId={id} messages={messages[0]?.messages} />
    </div>
  );
}

export default ChatPage;
