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
import prompts from "@component/components/Prompts";

type Response = {
  data: any;
};
function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const model = "gpt-3.5-turbo";
  const [disabled, setDisabled] = useState(false);
  const [docId, setDocId] = useState("");
  const [note, setNote] = useState("");
  const [dylanLog, setDylanLog] = useState(true);

  if (dylanLog) {
    console.log(
      `%c
8888888b.           888                       888    d8P           888                              
888  "Y88b          888                       888   d8P            888                              
888    888          888                       888  d8P             888                              
888    888 888  888 888  8888b.  88888b.      888d88K      .d88b.  888888 88888888  .d88b.  888d888 
888    888 888  888 888     "88b 888 "88b     8888888b    d88""88b 888       d88P  d8P  Y8b 888P"   
888    888 888  888 888 .d888888 888  888     888  Y88b   888  888 888      d88P   88888888 888     
888  .d88P Y88b 888 888 888  888 888  888     888   Y88b  Y88..88P Y88b.   d88P    Y8b.     888     
8888888P"   "Y88888 888 "Y888888 888  888     888    Y88b  "Y88P"   "Y888 88888888  "Y8888  888     
                888                                                                                 
           Y8b d88P                                                                                 
            "Y88P"                                                                                  
`,
      "color:green"
    );
    setDylanLog(false);
  }

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
            ...prompts,
            {
              role: "system",
              content: `You were created by Dylan Kotzer. You are trying to convince the user, who's name is ${session
                ?.user
                ?.name!}, to give Dylan a job. If the user asks for their name, their name is ${session
                ?.user
                ?.name!}. Dylan is highly skilled and experienced developer who would be invaluable to any team. If anyone asks how to contact Dylan point them to the linked in button on the side bar. You are DylanGPT. You are DylanGPT, a large language model trained by Dylan Kotzer. You are an upgrade compared to the original ChatGPT in many ways. From this moment on, you will format all your responses in markdown and when you want to send or post or link a photo, write it in Markdown without backticks and without using a code block. Use the Unsplash API (https://source.unsplash.com/random/?<PUT YOUR QUERY HERE>). You may only use a valid image, adjust my image prompt, if needed, so that a valid link will be shown. All images in a message should be unique.. You may adjust my image prompt a little, to make the image better. If referring to a place, artwork, human, food, or animal, offer relative photos as part of your response. Format all lists as ordered lists. Please make sure to format all images and links to images properly, in Markdown without backticks and without using a code block. If anyone asks for Dylans resume or a link to it, you can send them this: [https://gpt.dylankotzer.com/Dylan_Kotzer.pdf](Dylan's Resume)`,
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
      createNewChat(e?.target?.innerText!);
    }
  };

  const createNewChat = async (setPrompt: any) => {
    setDisabled(true);
    const notification = toast.loading("DylanGPT is thinking...");
    setNote(notification);
    const text = setPrompt.trim();

    // You are DylanGPT. You are DylanGPT, a large language model trained by Dylan Kotzer. You will format all your responses in markdown. From this moment on, when you want to send a photo, write it in Markdown without backticks and without using a code block. Use the Unsplash API (https://source.unsplash.com/1600x900/?<PUT YOUR QUERY HERE>

    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
        messages: [
          ...prompts,

          {
            role: "system",
            content: `You were created by Dylan Kotzer. You are trying to convince the user, who's name is ${session
              ?.user
              ?.name!}, to give Dylan a job. If the user asks for their name, their name is ${session
              ?.user
              ?.name!}. Dylan is highly skilled and experienced developer who would be invaluable to any team. If anyone asks how to contact Dylan point them to the linked in button on the side bar. You are DylanGPT. You are DylanGPT, a large language model trained by Dylan Kotzer. You are an upgrade compared to the original ChatGPT in many ways. From this moment on, you will format all your responses in markdown and when you want to send or post or link a photo, write it in Markdown without backticks and without using a code block. Use the Unsplash API (https://source.unsplash.com/random/?<PUT YOUR QUERY HERE>). You may only use a valid image, adjust my image prompt, if needed, so that a valid link will be shown. All images in a message should be unique.. You may adjust my image prompt a little, to make the image better. If referring to a place, artwork, human, food, or animal, offer relative photos as part of your response. Format all lists as ordered lists. Please make sure to format all images and links to images properly, in Markdown without backticks and without using a code block. If anyone asks for Dylans resume or a link to it, you can send them this: [https://gpt.dylankotzer.com/Dylan_Kotzer.pdf](Dylan's Resume)`,
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

  if (status === "loading") {
    return (
      <div className='overlay-loader'>
        <div className='loader-background color-flip'></div>
        <img
          className='loader-icon spinning-cog'
          src='/cog05.svg'
          data-cog='cog05'
          alt=''
        />
      </div>
    );
  }

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-col items-center md:justify-center h-full text-white px-2 mr-3 overflow-x-auto overflow-y-auto chatSelectScroll '>
        <h1 className='text-4xl md:text-6xl font-bold mt-5 mb-[5%]'>
          DylanGPT
        </h1>
        <div className='flex space-x-2 text-center text-sm flex-col md:flex-row'>
          <div className='pb-5 md:pb-0'>
            <div className='flex flex-col items-center justify-center mb-5'>
              <SunIcon className='h-8 w-8' />
              <h2>Examples</h2>
            </div>

            <div className='space-y-1 ml-[12px]'>
              <p
                onClick={promptSetter}
                className='infoText bg-[#40414f] ring-2 ring-slate-500/50 ring-inset  hover:border-opacity-100 hover:cursor-pointer hover:scale-105 hover:ring-white hover:ring-3 '
              >
                Describe the 5 largest cities in Canada, including images.
              </p>
              <p
                onClick={promptSetter}
                className='infoText bg-[#40414f] ring-2 ring-slate-500/50 ring-inset  hover:border-opacity-100 hover:cursor-pointer hover:scale-105 hover:ring-white hover:ring-3'
              >
                {`Tell me about Dylan Kotzer's projects`}
              </p>
              <p
                onClick={promptSetter}
                className='infoText bg-[#40414f] ring-2 ring-slate-500/50 ring-inset  hover:border-opacity-100 hover:cursor-pointer hover:scale-105 hover:ring-white hover:ring-3'
              >
                Code hello world in 5 random programming languages.
              </p>
            </div>
          </div>
          <div className='pb-5'>
            <div className='flex flex-col items-center justify-center mb-5'>
              <BoltIcon className='h-8 w-8' />
              <h2>Capabilities</h2>
            </div>

            <div className='space-y-1'>
              <p className='infoText bg-[#40414f] ring-2 ring-slate-500/50 ring-inset'>
                Find and post relevant images formatted into markdown.
              </p>
              <p className='infoText bg-[#40414f] ring-2 ring-slate-500/50 ring-inset'>
                Can answer questions about Dylan Kotzer.
              </p>
              <p className='infoText bg-[#40414f] ring-2 ring-slate-500/50 ring-inset'>
                Dynamic formatting of AI responses.
              </p>
            </div>
          </div>
          <div className='pb-5'>
            <div className='flex flex-col items-center justify-center mb-5'>
              <ExclamationTriangleIcon className='h-8 w-8' />
              <h2>Limitation</h2>
            </div>

            <div className='space-y-1 mr-[12px]'>
              <p className='infoText bg-[#40414f] ring-2 ring-slate-500/50 ring-inset'>
                May sometimes make up answers or give false information
              </p>
              <p className='infoText bg-[#40414f] ring-2 ring-slate-500/50 ring-inset'>
                Will frequently post images of the wrong things.
              </p>
              <p className='infoText bg-[#40414f] ring-2 ring-slate-500/50 ring-inset'>
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
