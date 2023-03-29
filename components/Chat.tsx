import { useSession } from "next-auth/react";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "@component/firebase";
import { collection, orderBy, query, doc } from "firebase/firestore";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

type Props = {
  chatId: string;
  streamingData: string;
};

function Chat({ chatId, streamingData }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const messages = useDocumentData(
    doc(db, "users", session?.user?.email!, "chats", chatId)
  );
  const messagesEndRef = useRef<HTMLDivElement>(null); // Create a ref for the last message element

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

  // Scroll to the second to last message when the component updates
  useEffect(() => {
    const messagesEnd = messagesEndRef.current;
    if (messagesEnd) {
      const secondToLastMessage = messagesEnd.previousSibling as HTMLElement;
      if (secondToLastMessage) {
        secondToLastMessage.scrollIntoView();
      }
    }
  }, [messages]);

  return (
    <div className='chatBox flex-1 overflow-y-auto overflow-x-auto h-full bg-[#434654]'>
      {messages[0]?.messages?.map((message, i) =>
        message.role !== "system" ? (
          <Message userImg={session?.user?.image!} key={i} message={message} />
        ) : null
      )}
      {streamingData}
      {messages[0]?.messages[messages[0]?.messages?.length - 1].content ==
      "Hello Dylan Kotzer, I am DylanGPT, how may I help you?" ? (
        <div>
          <p className='relative mt-[5em] text-center text-white py-auto'>
            Type a prompt below to get started!
          </p>
          <ArrowDownCircleIcon className='h-10 w-10 mx-auto mt-5 text-white animate-bounce ' />
        </div>
      ) : null}
      <div ref={messagesEndRef} />{" "}
      {/* Add a div with ref for the last message element */}
    </div>
  );
}

export default Chat;
