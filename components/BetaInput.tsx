"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { db } from "@component/firebase";
import toast, { Toaster } from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";
import { Configuration, OpenAIApi } from "openai";
import { join } from "path";

type Props = {
  setMessages: Function;
  messages: Array<any>;
};

function BetaInput({ setMessages, messages }) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  // const configuration = new Configuration({
  //   apiKey: process.env.OPENAI_API_KEY,
  //   organization: "org-qaFpK5RoJjLWjlPBEJSM2yAP",
  // });
  // const openai = new OpenAIApi(configuration);
  const model = "gpt-3.5-turbo-0301";

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    const input = prompt.trim();
    setMessages((prevState) => [
      ...prevState,
      { role: "user", content: input },
    ]);
    setPrompt("");
    //toast notification to say loading
    const notification = toast.loading("DylanGPT is thinking...");
    let msgHolder = [...messages, { role: "user", content: input }];

    let response = await fetch("/api/betaQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: msgHolder,
      }),
    })
      .then((res) => {
        res
          .json()
          .then((j) => {
            setMessages((prevState) => [
              ...prevState,
              { role: "assistant", content: j.text },
            ]);
          })
          .catch((err) => console.log("error:", err));
        //toast notification to say successfull
        toast.success("DylanGPT has responded!", {
          id: notification,
        });
      })
      .catch(
        (err) =>
          `DylanGPT was unable to find an answer for that! (Error: ${err.message})`
      );
  };

  return (
    <div className='bg-gray-700/50 text-gray-400 rounded-lg text-sm'>
      <form onSubmit={sendMessage} className='p-5  flex max-w-2xl mx-auto'>
        <input
          className='mx-auto stretch rounded-l-md pl-5 pr-5 m-0 bg-[#40414f] focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300'
          disabled={!session}
          type='text'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Type your message here...'
        />
        <button
          className='bg-[#11A37F] hover:opacity-50 text-white font-bolt px-4 m-0 py-2 rounded-r-md disabled:bg-gray-300 disabled:cursor-not-allowed'
          disabled={!prompt || !session}
          type='submit'
        >
          <PaperAirplaneIcon className='w-4 h-4 -rotate-45' />
        </button>
      </form>
      <div className='md:hidden'>
        <ModelSelection></ModelSelection>
      </div>
    </div>
  );
}

export default BetaInput;
