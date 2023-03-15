"use client";
import Chat from "@component/components/Chat";
import ChatInput from "@component/components/ChatInput";
import { useSession } from "next-auth/react";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  const { data: session, status } = useSession();

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
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
}

export default ChatPage;
