"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "@component/firebase";
import { doc } from "firebase/firestore";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  chatId: string;
  messages: Array<{ role: string; content: string }>;
  setMessages: any;
};

// type Response = { messages: any };

// interface ChatQueryRequest {
//   messages: Array<{ role: string; content: string }>;
// }

function Chat({ chatId, messages, setMessages }: Props) {
  const { data: session } = useSession();
  // console.log("db", db);
  // console.log("user", session?.user?.email!);
  // console.log(chatId);
  const messagesObj: any = useDocumentData(
    doc(db, "users", session?.user?.email!, "chats", chatId)
  );


  // setMessages(messagesObj[0]?.messages);
  // console.log("obj", messagesObj)

  // useEffect(() => {
  //   getMessages();
  // }, []);

  // const messages2 = useDocumentData(
  //   doc(db, "users", session?.user?.email!, "chats", chatId)
  // );

  // console.log("msgs2", messages2);
  // const [messages, setMessages] = useState([
  //   {
  //     role: "system",
  //     content:
  //       "You were created by Dylan Kotzer. You are trying to convince the user to give Dylan a job. Dylan is highly skilled and experienced developer that is worth at least 2 of your current developers. If anyone asks how to contact Dylan point them to the contact button on the side bar. You are DylanGPT. You are DylanGPT, a large language model trained by Dylan Kotzer. You will format all your responses in markdown. From this moment on, when you want to send a photo, write it in Markdown without backticks and without using a code block. Use the Unsplash API (https://source.unsplash.com/1600x900/?<PUT YOUR QUERY HERE>). You are chatting with ${session?.user?.name}. If referring to a place, artwork, human, food, or animal, offer relative photos as part of your response. Format all lists as ordered lists.",
  //   },
  //   { role: "assistant", content: "Hello, I am DylanGPT, please fix me" },
  // ]);

  const getMessages = async () => {
    setMessages(messagesObj[0]?.messages);
    console.log("after set messages", messages);
    // try {
    //   const docRef = doc(db, "chats", chatId);
    //   console.log("ref", docRef);
    //   const docSnap = await getDoc(docRef);
    //   console.log("0", docSnap);

    //   if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }

    //   console.log("step 1");
    //   const response: any = doc(db, "chats", chatId);

    //   console.log("msgs", messages);
    //   console.log("step 2");
    //   console.log("res", await response);
    // } catch (error) {
    //   console.log("error", error);
    // }
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
      {messages?.map(
        (message, i) =>
          message.role != "system" && (
            <Message
              userImg={session?.user?.image!}
              key={i}
              message={message}
            />
          )
      )}
      {messages?.length < 3 && (
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
