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
      <div
        id='panel'
        className={`h-screen w-screen flex flex-col items-center justify-center text-center `}
      >
        <span id='loading1'>
          <span id='outerCircle' className='animate-pulse'></span>

          <span id='innerCircle' className='animate-pulse'>
            <span id='center' className='animate-pulse'></span>
          </span>
        </span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-screen overflow-hidden`}>
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
}

export default ChatPage;
