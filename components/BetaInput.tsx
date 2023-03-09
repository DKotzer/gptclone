"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  setMessages: Function;
  messages: Array<any>;
};

function BetaInput({ setMessages, messages }) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const model = "gpt-3.5-turbo-0301";
  const [disabled, setDisabled] = useState(false);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    setDisabled(true);
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
        setDisabled(false);
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
      <form onSubmit={sendMessage} className='p-5  flex w-2/3 mx-auto'>
        <input
          role='textbox'
          className='mx-auto stretch rounded-l-md pl-5 pr-5 m-git one flex-1 overflow-visible disabled:cursor-not-allowed disabled:text-gray-300'
          disabled={!session}
          type='text'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Type your message here...'
        />
        <button
          className='bg-[#11A37F] hover:opacity-50 text-white font-bolt px-4 m-0 py-2 rounded-r-md disabled:bg-green-300/20 disabled:cursor-not-allowed'
          disabled={!prompt || !session || disabled}
          type='submit'
        >
          <PaperAirplaneIcon className='w-4 h-4 -rotate-45' />
        </button>
      </form>
      <div className='md:hidden'></div>
    </div>
  );
}

export default BetaInput;
