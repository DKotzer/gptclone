"use client";
import Chat from "@component/components/Chat";
import ChatInput from "@component/components/ChatInput";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  const { data: session, status } = useSession();

  const [streamingData, setStreamingData] = useState("");

  const handleStreamingData = async (data: any) => {
    setStreamingData(await data);
  };

  if (status === "loading") {
    return (
      <div id='loader' className='overlay-loader'>
        <div className='loader-background color-flip'></div>
        <img
          className='loader-icon spinning-cog'
          src='/cog05.svg'
          data-cog='cog05'
          alt=''
        />
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-screen`}>
      <Chat chatId={id} streamingData={streamingData} />
      <ChatInput chatId={id} handleStreamingData={handleStreamingData} setStreamingData={setStreamingData}/>
    </div>
  );
}

export default ChatPage;
