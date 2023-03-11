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
      // <div className='flex h-screen items-center'>
      //   <img
      //     className='mx-auto max-w-[50%] max-h-[50%]'
      //     src='/thinking.gif'
      //     alt=''
      //   />
      // </div>

      <div id='panel' className='flex h-screen w-screen items-center'>
        <span className='ml-[25%] mb-[20%] scale-150' id='loading1'>
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
