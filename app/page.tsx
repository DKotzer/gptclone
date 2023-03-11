"use client";

import { FormEvent, MouseEventHandler, useEffect, useState } from "react";
import {
  SunIcon,
  BoltIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import NewChatInput from "@component/components/NewChatInput";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@component/firebase";
import { useRouter } from "next/navigation";

type Response = {
  data: any;
};

function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const model = "gpt-3.5-turbo-0301";
  const [disabled, setDisabled] = useState(false);
  const [docId, setDocId] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (docId !== "") {
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
                ?.name!}. If referring to a place, artwork, human, food, or animal, offer relative photos as part of your response. Format all lists as ordered lists. Please make sure to format all images properly.`,
            },
            {
              role: "user",
              content: prompt.trim(),
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

  const promptSetter = async (e: any) => {
    if (db && session?.user?.email) {
      setPrompt(e?.target?.innerText!);
      createNewChat();
    }
  };

  const createNewChat = async () => {
    setDisabled(true);
    const notification = toast.loading("DylanGPT is thinking...");
    setNote(notification);
    const text = prompt.trim();

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
            content: text,
          },
        ],
      }
    );
    setDocId(doc.id);
    router.push(`/chat/${doc.id}`);
  };

  return (
    <div className={`flex flex-col h-screen overflow-hidden`}>
      <div
        className={`flex flex-col items-center justify-center h-full text-white px-2`}
      >
        <h1 className='text-5xl font-bold mb-20'>DylanGPT</h1>
        <div className='flex space-x-2 text-center'>
          <div>
            <div className='flex flex-col items-center justify-center mb-5'>
              <SunIcon className='h-8 w-8' />
              <h2>Examples</h2>
            </div>

            <div className='space-y-2'>
              <p
                onClick={promptSetter}
                className='infoText border-slate-300/50 hover:border hover:scale-105 hover:cursor-pointer '
              >
                List the top things to do in Toronto
              </p>
              <p
                onClick={promptSetter}
                className='infoText border-slate-300/50 hover:border hover:scale-105 hover:cursor-pointer'
              >
                Why should I hire Dylan Kotzer.
              </p>
              <p
                onClick={promptSetter}
                className='infoText border-slate-300/50 hover:border hover:scale-105 hover:cursor-pointer'
              >
                Create code for hello world in Python, Javascript and C++.
              </p>
            </div>
          </div>
          <div>
            <div className='flex flex-col items-center justify-center mb-5'>
              <BoltIcon className='h-8 w-8' />
              <h2>Capabilities</h2>
            </div>

            <div className='space-y-2'>
              <p
                onClick={promptSetter}
                className='infoText border-slate-300/50 hover:border hover:scale-105 hover:cursor-pointer'
              >
                Find and post images
              </p>
              <p className='infoText'>
                Chats are stored in a Firestore database
              </p>
              <p className='infoText'>
                Advanced text formatting for responses, including code
                formatting and styling.
              </p>
            </div>
          </div>
          <div>
            <div className='flex flex-col items-center justify-center mb-5'>
              <ExclamationTriangleIcon className='h-8 w-8' />
              <h2>Limitation</h2>
            </div>

            <div className='space-y-2'>
              <p className='infoText'>
                May sometimes make up answers or give false information
              </p>
              <p className='infoText'>
                Will frequently post images of the wrong things.
              </p>
              <p className='infoText'>
                Has very limited knowledge of events after 2021
              </p>
            </div>
          </div>
        </div>
      </div>
      <NewChatInput />
    </div>
  );
}

export default HomePage;
