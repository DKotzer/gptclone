"use client";
import BetaChat from "@component/components/BetaChat";
import BetaInput from "@component/components/BetaInput";
import { useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "You are DylanGPT, a large language model trained by OpenAI. You will format all your responses in markdown. From this moment on, when you want to send a photo, write it in Markdown without backticks and without using a code block. Use the Unsplash API (https://source.unsplash.com/1600x900/?<PUT YOUR QUERY HERE>). ",
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
