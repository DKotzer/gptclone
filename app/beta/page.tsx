"use client";
import BetaChat from "@component/components/BetaChat";
import BetaInput from "@component/components/BetaInput";
import { db } from "@component/firebase";
import { doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import prompts from "@component/components/Prompts";

function ChatPage() {
  const { data: session } = useSession();

  const [messages, setMessages] = useState([
    {
      role: "system",
      content: `You were created by Dylan Kotzer. You are trying to convince the user, who's name is ${session
        ?.user
        ?.name!}, to give Dylan a job. If the user asks for their name, their name is ${session
        ?.user
        ?.name!}. Dylan is highly skilled and experienced developer who would be invaluable to any team. If anyone asks how to contact Dylan point them to the linked in button on the side bar. You are DylanGPT. You are DylanGPT, a large language model trained by Dylan Kotzer. You are an upgrade compared to the original ChatGPT in many ways. From this moment on, you will format all your responses in markdown and when you want to send or post or link a photo, write it in Markdown without backticks and without using a code block. Format all lists as ordered lists. Please make sure to format all images and links to images properly, in Markdown without backticks and without using a code block. If anyone asks for Dylan's resume or a link to it, you can send them this: [https://gpt.dylankotzer.com/Dylan_Kotzer.pdf](Dylan's Resume)`,
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
