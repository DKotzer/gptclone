import { useSession } from "next-auth/react";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "@component/firebase";
import { collection, orderBy, query, doc } from "firebase/firestore";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const messages = useDocumentData(
    doc(db, "users", session?.user?.email!, "chats", chatId)
  );

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  //if done loading, and no errors, check if chat id exists inside chats, if not, go back to home page. - this handles people manually entering in the wrong chat or going to chats they have deleted in the past
  useEffect(() => {
    if (!loading && !error && chats) {
      const chatIds = chats.docs.map((doc) => doc.id);
      if (!chatIds.includes(chatId)) {
        router.push("/");
      }
    }
  }, [chats]);

  return (
    <div className='flex-1 overflow-y-auto overflow-x-hidden'>
      {messages[0]?.messages?.map(
        (message, i) =>
          message.role != "system" && (
            <Message
              userImg={session?.user?.image!}
              key={i}
              message={message}
            />
          )
      )}
      {messages[0]?.messages?.length < 3 && (
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

export default Chat;
