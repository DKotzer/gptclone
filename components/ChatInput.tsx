"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { db } from "@component/firebase";
import toast, { Toaster } from "react-hot-toast";
import { useDocumentData } from "react-firebase-hooks/firestore";

type Props = {
  chatId: string;
  divHeight: number;
};

type Response = {
  data: any;
};

function ChatInput({ chatId, divHeight }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const model = "gpt-3.5-turbo-0301";
  const [disabled, setDisabled] = useState(false);
  const messages = useDocumentData(
    doc(db, "users", session?.user?.email!, "chats", chatId)
  );

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    setDisabled(true);
    e.preventDefault();
    if (!prompt) return;
    const input = prompt.trim();
    const message = {
      role: "user",
      content: input,
    };
    // setMessages((prevState) => [...prevState, message]);
    setPrompt("");
    const newMsgs = [...messages[0]?.messages, message];
    console.log("new", newMsgs);

    await fetch("/api/addQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: newMsgs,
        chatId,
        user: session?.user?.email,
      }),
    }).catch((err) => console.log(err));

    console.log("new msgs", newMsgs);

    // const docRef = doc(db, "users", session?.user?.email!, "chats", chatId);
    // console.log("docRef", docRef);
    // await updateDoc(docRef, {
    //   messages: arrayUnion({role: "user", content: input})
    // })
    // await setDoc(
    //   doc(
    //     db,
    //     "users",
    //     session?.user?.email!,
    //     "chats",
    //     chatId
    //   ), {messages: }
    //   message
    // );

    //toast notification to say loading

    // const notify = () => toast("Here is your toast.");
    const notification = toast.loading("DylanGPT is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: newMsgs,
        chatId,
        user: session?.user?.email,
      }),
    })
      .then(() => {
        setDisabled(false);

        //toast notification to say successful
        toast.success("DylanGPT has responded!", {
          id: notification,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='bg-gray-700/50 text-gray-400 rounded-lg text-sm max-w-full'>
      <form
        onSubmit={sendMessage}
        className='pt-5 pb-5  flex mx-auto pl-[8%] pr-[12%]'
      >
        <input
          className='mx-auto stretch  rounded-l-md pl-5 pr-4 m-0 bg-[#40414f] focus:outline-none flex width-[100%] disabled:cursor-not-allowed disabled:text-gray-300'
          disabled={!session}
          type='text'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Type your message here...'
        />
        <button
          className='bg-[#11A37F] hover:opacity-50 text-white font-bolt px-4 m-0 py-2 rounded-r-md disabled:bg-gray-300 disabled:cursor-not-allowed'
          disabled={!prompt || !session || disabled}
          type='submit'
        >
          <PaperAirplaneIcon className='w-4 h-4 -rotate-45' />
        </button>
      </form>
      <div className='h-[70px] md:h-[25px]' />
      {/* <div className='md:hidden'> */}
      {/* <ModelSelection></ModelSelection> */}
      {/* </div> */}
    </div>
  );
}

export default ChatInput;
