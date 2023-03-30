"use client";

import {
  FormEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
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
import Message from "@component/components/Message";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

type Response = {
  data: any;
};
function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const model = "gpt-4";
  const [disabled, setDisabled] = useState(false);
  const [docId, setDocId] = useState("");
  const [note, setNote] = useState("");
  const [dylanLog, setDylanLog] = useState(true);
  const [streamingResponse, setStreamingResponse] = useState("");
  const [completedStream, setCompletedStream] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    const messagesEnd = messagesEndRef.current;
    if (messagesEnd) {
      const lastMessage = messagesEnd as HTMLElement;
      if (lastMessage) {
        lastMessage.scrollIntoView();
      }
    }
  }, [streamingResponse]);

  useEffect(() => {
    if (docId !== "") {
      // console.log("docId change detected", docId);
      (async () => {
        // console.log("docIdtest", docId);
        if (docId !== "") {
          const notification = toast.loading("DylanGPT is thinking...");
          const response = await fetch("/api/askQuestion", {
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
          });

          if (!response.ok) {
            throw new Error(response.statusText);
          }
          setDisabled(true);
          const data = response.body;

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
            // console.log("cv", chunkValue);
            setStreamingResponse((prev) => prev + chunkValue);
          }

          // console.log("finished streaming response", streamingResponse);
          toast.success("DylanGPT has responded!", {
            id: notification,
          });
          setCompletedStream(true);
        }
      })();
    }
  }, [docId]);

  useEffect(() => {
    if (completedStream == true) {
      const postData = async () => {
        await fetch("/api/addQuestion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4",
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
              {
                role: "assistant",
                content: streamingResponse,
              },
            ],
            chatId: docId,
            user: session?.user?.email,
          }),
        }).catch((err) => console.log(err));
      };
      postData();
      setCompletedStream(false);
      router.push(`/chat/${docId}`);
    }
  }, [completedStream]);

  // const handleCompletedStream = async () => {};

  // .then((res) => {
  //       toast.success("DylanGPT has responded!", {
  //         id: note,
  //       });
  //     });

  const promptSetter = async (e: any) => {
    if (db && session?.user?.email) {
      setPrompt(e?.target?.innerText!);
      createNewChat(e?.target?.innerText!);
    }
  };

  const inputPromptSetter = async () => {
    console.log(
      "input prompt setter",
      prompt,
      session?.user?.email ? "user found" : "no user"
    );
    if (db && session?.user?.email) {
      createNewChat(prompt);
    }
  };

  const createNewChat = async (setPrompt: any) => {
    // console.log("creating new chat");
    setDisabled(true);

    const text = setPrompt.trim();

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
    <div className='flex chatBox flex-col overflow-y-auto overflow-x-auto h-screen bg-[#434654]  md:ml-0'>
      <div className='flex flex-col items-center md:justify-center h-full text-white px-2 mr-3 overflow-x-auto overflow-y-auto chatSelectScroll '>
        {streamingResponse ? (
          <div className='fontPageChat w-full h-full'>
            <Message
              message={{ role: "user", content: prompt }}
              userImg={session?.user?.image!}
            />
            <Message
              message={{ role: "assistant", content: streamingResponse }}
              userImg='https://i.imgur.com/jfLbi1b.png'
            />
            <div ref={messagesEndRef} />{" "}
          </div>
        ) : (
          <div>
            <h1 className='text-4xl text-center md:text-6xl font-bold mt-5 mb-[5%]'>
              DylanGPT
            </h1>
            <div className='flex space-x-2 text-center text-sm flex-col md:flex-row'>
              <div className='pb-5 md:pb-0'>
                <div className='flex flex-col items-center justify-center mb-5'>
                  <SunIcon className='h-8 w-8' />
                  <h2>Examples</h2>
                </div>

                <div className='space-y-1 '>
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
        )}
      </div>
      <div className='bg-[#353a48] text-gray-400 rounded-lg text-sm mx-auto w-full overflow-x-hidden overflow-y-hidden'>
        {/* <div className='mx-auto text-center mr-[8%] ml-[8%] mt-2 text-white'></div> */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            inputPromptSetter();
          }}
          className='pt-5 pb-5  flex mx-auto max-w-[90%] min-w-[70%]  '
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
            className='bg-[#11A37F] hover:opacity-50 text-white font-bolt px-4 m-0 py-2 rounded-r-md disabled:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={!prompt || !session || disabled}
            type='submit'
          >
            <PaperAirplaneIcon className='w-4 h-4 -rotate-45' />
          </button>
        </form>
        <div className='h-[70px] md:h-[25px]' />
      </div>
    </div>
  );
}

export default HomePage;
