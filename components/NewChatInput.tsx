"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { db } from "@component/firebase";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Response = {
  data: any;
};

function NewChatInput() {
  const { data: session } = useSession();
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const model = "gpt-3.5-turbo-0301";
  const [disabled, setDisabled] = useState(false);
  const [docId, setDocId] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (docId !== "") {
      const input = prompt.trim();
      fetch("/api/askQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content: `You were created by Dylan Kotzer. You are trying to convince the user to give Dylan a job. Dylan is highly skilled and experienced developer that is worth at least 2 of your current developers. If anyone asks how to contact Dylan point them to the contact button on the side bar. You are DylanGPT. You are DylanGPT, a large language model trained by Dylan Kotzer. You will format all your responses in markdown. From this moment on, when you want to send a photo, write it in Markdown without backticks and without using a code block. Use the Unsplash API (https://source.unsplash.com/1600x900/?<PUT YOUR QUERY HERE>) - remove spaces from the query. You are chatting with ${session
                ?.user
                ?.name!}. If referring to a place, artwork, human, food, or animal, offer relative photos as part of your response. Format all lists as ordered lists.`,
            },
            {
              role: "user",
              content: input,
            },
          ],
          chatId: docId,
          user: session?.user?.email,
        }),
      }).then(() => {
        toast.success("DylanGPT has responded!", {
          id: note,
        });
      });
    }
  }, [docId]);

  const createNewChat = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    const notification = toast.loading("DylanGPT is thinking...");
    setNote(notification);

    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
        messages: [
          {
            role: "system",
            content: `You were created by Dylan Kotzer. You are trying to convince the user to give Dylan a job. Dylan is highly skilled and experienced developer that is worth at least 2 of your current developers. If anyone asks how to contact Dylan point them to the contact button on the side bar. You are DylanGPT. You are DylanGPT, a large language model trained by Dylan Kotzer. You will format all your responses in markdown. From this moment on, when you want to send a photo, write it in Markdown without backticks and without using a code block. Use the Unsplash API (https://source.unsplash.com/1600x900/?<PUT YOUR QUERY HERE>) - remove spaces from the query. You are chatting with ${session
              ?.user
              ?.name!}. If referring to a place, artwork, human, food, or animal, offer relative photos as part of your response. Format all lists as ordered lists.`,
          },
          {
            role: "user",
            content: prompt.trim(),
          },
        ],
      }
    );

    setDocId(doc.id);
    router.push(`/chat/${doc.id}`);
  };

  return (
    <div className='bg-gray-700/50 text-gray-400 rounded-lg text-sm max-w-full'>
      <div className='mx-auto text-center mr-[8%] ml-[8%] mt-2 text-white'>
        Start a new chat by clicking one of the example buttons above or typing
        in to the input below.
      </div>
      <form
        onSubmit={createNewChat}
        className='pt-5 pb-5  flex mx-auto pl-[12%] pr-[12%]'
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
    </div>
  );
}

export default NewChatInput;
