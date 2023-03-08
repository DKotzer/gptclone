"use client";

import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@component/firebase";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

type Props = {
  chatId: string;
};

// type Response = { messages: any };

// interface ChatQueryRequest {
//   messages: Array<{ role: string; content: string }>;
// }

function Chat({ chatId }: Props) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([
    { role: "assistant", content: "change me" },
  ]);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    console.log("running get Messages");
    try {
      const docRef = doc(db, "chats", chatId);
      console.log("ref", docRef);
      const docSnap = await getDoc(docRef);
      console.log("0", docSnap);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      console.log("step 1");
      const response: any = doc(db, "chats", chatId);

      console.log("msgs", messages);
      console.log("step 2");
      console.log("res", await response);
      setMessages(await response.messages);
    } catch (error) {
      console.log("error", error);
    }
    console.log("step 3", messages);
  };

  // const fetchModels = () => fetch("/api/getEngines").then((res) => res.json());
  // console.log('chatId', chatId)
  // const messages = async (messages: ChatQueryRequest["messages"]) => {
  //   const docRef: any = doc(db, "chats", chatId, "messages");

  //   if (docRef.exists()) {
  //     return await getDoc(docRef);
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //     return "No such document";
  //   }
  // };

  // const [messages] = useCollection(
  //   session &&
  //     query(
  //       collection(
  //         db,
  //         "users",
  //         session?.user?.email!,
  //         "chats",
  //         chatId,
  //         "messages"
  //       ),
  //       orderBy("createdAt", "asc")
  //     )
  // );
  return (
    <div className='flex-1 overflow-y-auto overflow-x-hidden'>
      {messages?.map((message) => (
        <Message message={message} userImg={session?.user?.image!} />
      ))}
      {messages?.length! < 3 && (
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
