"use client";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@component/firebase";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import BetaMessage from "./BetaMessage";

type Props = {
  chatId: string;
};

function BetaChat({ chatId }: Props) {
  const { data: session } = useSession();


  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful assistant." },
  ]);

  //   const [messages] = useCollection(
  //     session &&
  //       query(
  //         collection(
  //           db,
  //           "users",
  //           session?.user?.email!,
  //           "chats",
  //           chatId,
  //           "messages"
  //         ),
  //         orderBy("createdAt", "asc")
  //       )
  //   );
  return (
    <div className='flex-1 overflow-y-auto overflow-x-hidden'>
      {messages?.length > 2 && (
        <>
          <p className='mt-10 text-center text-white'>
            Type a prompt in below to get started!
          </p>
          <ArrowDownCircleIcon className='h-10 w-10 mx-auto mt-5 text-white animate-bounce ' />
        </>
      )}
      {messages?.length > 1 &&
        messages?.map((message, i) => (
          <BetaMessage
            userImg={session?.user?.image!}
            key={i}
            message={message}
          />
        ))}
    </div>
  );
}

export default BetaChat;
