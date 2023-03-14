"use client";
import { useSession } from "next-auth/react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import BetaMessage from "./BetaMessage";

type Props = {
  messages: Array<{ role: string; content: string }>;
};

function BetaChat({ messages }: Props) {
  const { data: session } = useSession();

  return (
    <div className='flex-1 overflow-y-auto overflow-x-hidden'>
      {messages?.length > 1 &&
        messages?.map(
          (message, i) =>
            message.role != "system" && (
              <BetaMessage
                userImg={session?.user?.image!}
                key={i}
                message={message}
              />
            )
        )}
      {messages?.length < 6 && (
        <>
          <p className='mt-10 text-center text-white py-auto'>
            Type a prompt in below to get started!
          </p>
          <ArrowDownCircleIcon className='h-10 w-10 mx-auto mt-5 text-white animate-bounce ' />
        </>
      )}
    </div>
  );
}

export default BetaChat;
