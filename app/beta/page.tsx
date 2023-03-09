"use client";
import BetaChat from "@component/components/BetaChat";
import BetaInput from "@component/components/BetaInput";
import { db } from "@component/firebase";
import { doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  const { data: session } = useSession();

  // const messagesObj: any = useDocumentData(
  //   doc(db, "users", session?.user?.email!, "chats", id)
  // );
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: `You were created by Dylan Kotzer. You are trying to convince the user to give Dylan a job. Dylan is highly skilled and experienced developer. If anyone asks how to contact Dylan point them to the contact button on the side bar. You are DylanGPT. You are DylanGPT, a large language model trained by Dylan Kotzer. You will format all your responses in markdown. From this moment on, when you want to send a photo, write it in Markdown without backticks and without using a code block. Use the Unsplash API (https://source.unsplash.com/1600x900/?<PUT YOUR QUERY HERE>). If referring to a place, artwork, human, food, or animal, offer relative photos as part of your response. Format all lists as ordered lists.`,
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
