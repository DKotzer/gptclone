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
  handleStreamingData: any;
  setStreamingData: any;
};

type Response = {
  data: any;
};

function ChatInput({ chatId, handleStreamingData, setStreamingData }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const model = "gpt-4";
  const [disabled, setDisabled] = useState(false);
  const [streamingResponse, setStreamingResponse] = useState("");
  const messages = useDocumentData(
    doc(db, "users", session?.user?.email!, "chats", chatId)
  );

  // useEffect(() => {
  //   console.log("streaming res", streamingResponse);
  // }, [streamingResponse]);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    setDisabled(true);
    const notification = toast.loading("DylanGPT is thinking...");

    e.preventDefault();
    if (!prompt) return;
    const input = prompt.trim();
    const message = {
      role: "user",
      content: input,
    };
    setPrompt("");
    const newMsgs = [...messages[0]?.messages, message];

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

    const response = await fetch("/api/askQuestion", {
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
    });
    console.log("Response headers:", response.headers);
    console.log("front end response", response);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    setDisabled(true);
    // const data = await response.text(); // extract the response data as a text string
    const data = response.body;
    // const data = await response.body;

    // console.log("data", data);

    if (!data) {
      setDisabled(false);
      console.log("no data");
      return;
    }

    const reader = data.getReader();

    const decoder = new TextDecoder();

    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();

      done = doneReading;

      const chunkValue = decoder.decode(value);
      console.log("cv", chunkValue);
      setStreamingResponse((prev) => prev + chunkValue);
      setStreamingData((prev) => prev + chunkValue);
    }
    toast.success("DylanGPT has responded!", {
      id: notification,
    });
    setDisabled(false);
  };

  return (
    <div className='bg-[#353a48] text-gray-400 rounded-lg text-sm max-w-[90%] min-w-[70%] mx-auto overflow-x-hidden'>
      <p>{streamingResponse}</p>
      <form onSubmit={sendMessage} className='pt-5 pb-5  flex mx-auto '>
        <input
          className='mx-auto stretch  rounded-l-md pl-5 pr-4 m-0 bg-[#40414f] focus:outline-none flex width-[80%] disabled:cursor-not-allowed disabled:text-gray-300'
          disabled={!session}
          type='text'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Type your message here...'
        />
        <button
          className='bg-[#11A37F] hover:opacity-50 text-white font-bolt px-4 m-0 py-2 rounded-r-md disabled:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={!prompt || !session || disabled}
          type='submit'
        >
          <PaperAirplaneIcon className='w-4 h-4 -rotate-45' />
        </button>
      </form>
      <div className='h-[70px]  md:h-[25px]' />
    </div>
  );
}

export default ChatInput;

// const reader = response?.body?.getReader();
// console.log("reader", reader);
// reader?.read().then(function processResult(result) {
//   console.log("result value", result);
//   if (result.done) {
//     console.log("Stream finished");
//     return;
//   }
//   console.log("reader", reader.read().then(processResult));
// });
