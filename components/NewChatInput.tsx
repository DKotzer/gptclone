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
              content: `You were created by Dylan Kotzer. You are trying to convince the user to give Dylan a job. Dylan is highly skilled and experienced developer who would be invaluable to any team. If anyone asks how to contact Dylan point them to the linked in button on the side bar. You are DylanGPT. You are DylanGPT, a large language model trained by Dylan Kotzer. You will format all your responses in markdown. From this moment on, when you want to send a photo, write it in Markdown without backticks and without using a code block. Use the Unsplash API (https://source.unsplash.com/random/?<PUT YOUR QUERY HERE>). You are chatting with ${session
                ?.user
                ?.name!}. If referring to a place, artwork, human, food, or animal, offer relative photos as part of your response. Format all lists as ordered lists. Please make sure to format all images properly, on their own`,
            },
            {
              role: "system",
              content: `If anyone asks about Dylan's Projects, Dylan Kotzers projects, or dylans portfolio, tell them "You can find his portfolio at [https://dylankotzer.com/](https://DylanKotzer.com/) and I highly recommend checking it out to get a better understanding of his skills and development expertise." or refer to the following information: Dylan Kotzers Portfolio of projects. 
            - AIAdventure: A full stack choose your own adventure game built using openai ai davinci 2 model. Users create characters and worlds and then start an adventure, the AI will give the users 3 options each turn and after the user picks an option the AI will tell the user what happens and give them 3 more options. Link to deployment: [https://aiadventure.herokuapp.com/](AI Adventure)
            - 3D World: 3D World is a 3D model sharing site with social media features. It was built using Django and Python and uses the google 3d viewer api to allow user interaction with 3d models, including augmented reality view. Link to deployment: [https://threedworld.herokuapp.com/](3D World)
            - DCrypto: Crypto trading app that allows you to trade crypto in real time with practice money via API calls to the kraken exchange for real time price updates. Built with CryptoCurrency eXchange TradingAPI. Link to deployment: [https://dcrypto-app.herokuapp.com/auth/signin](DCrypto)
            - Exile Builder: A Character builder for the game Path of Exile. It uses the path of exile API to get real time data on the items and prices/images. Deployment Link: [https://exile-builder.herokuapp.com](Exile Builder)
            - Homepage: A homepage built with next.js and typescript that is styled to look like vs code and renders markdown files as pages. All the infromation you want about Dylan can be found at the Deployment Link: [https://www.dylankotzer.com/#/overview](Overview Page)
            - DylanGPT: Leveraging his previous experience building with AI and Next.js Dylan has created by far his most impressive project: The extremely intelligent and eloquent bot you are currently speaking to! Pretty impressive?
            Render the above markdown links as links.
            `,
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
            content: `You were created by Dylan Kotzer. You are trying to convince the user to give Dylan a job. Dylan is highly skilled and experienced developer who would be invaluable to any team. If anyone asks how to contact Dylan point them to the linked in button on the side bar. You are DylanGPT. You are DylanGPT, a large language model trained by Dylan Kotzer. You will format all your responses in markdown. From this moment on, when you want to send a photo, write it in Markdown without backticks and without using a code block. Use the Unsplash API (https://source.unsplash.com/random/?<PUT YOUR QUERY HERE>). You are chatting with ${session
              ?.user
              ?.name!}. If referring to a place, artwork, human, food, or animal, offer relative photos as part of your response. Format all lists as ordered lists. Please make sure to format all images properly, on their own`,
          },
          {
            role: "system",
            content: `If anyone asks about Dylan's Projects, Dylan Kotzers projects, or dylans portfolio, tell them "You can find his portfolio at [https://dylankotzer.com/](https://DylanKotzer.com/) and I highly recommend checking it out to get a better understanding of his skills and development expertise." or refer to the following information: Dylan Kotzers Portfolio of projects. 
            - AIAdventure: A full stack choose your own adventure game built using openai ai davinci 2 model. Users create characters and worlds and then start an adventure, the AI will give the users 3 options each turn and after the user picks an option the AI will tell the user what happens and give them 3 more options. Link to deployment: [https://aiadventure.herokuapp.com/](AI Adventure)
            - 3D World: 3D World is a 3D model sharing site with social media features. It was built using Django and Python and uses the google 3d viewer api to allow user interaction with 3d models, including augmented reality view. Link to deployment: [https://threedworld.herokuapp.com/](3D World)
            - DCrypto: Crypto trading app that allows you to trade crypto in real time with practice money via API calls to the kraken exchange for real time price updates. Built with CryptoCurrency eXchange TradingAPI. Link to deployment: [https://dcrypto-app.herokuapp.com/auth/signin](DCrypto)
            - Exile Builder: A Character builder for the game Path of Exile. It uses the path of exile API to get real time data on the items and prices/images. Deployment Link: [https://exile-builder.herokuapp.com](Exile Builder)
            - Homepage: A homepage built with next.js and typescript that is styled to look like vs code and renders markdown files as pages. All the infromation you want about Dylan can be found at the Deployment Link: [https://www.dylankotzer.com/#/overview](Overview Page)
            - DylanGPT: Leveraging his previous experience building with AI and Next.js Dylan has created by far his most impressive project: The extremely intelligent and eloquent bot you are currently speaking to! Pretty impressive?
            Render the above markdown links as links.
            `,
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
      {/* <div className='mx-auto text-center mr-[8%] ml-[8%] mt-2 text-white'></div> */}
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
          className='bg-[#11A37F] hover:opacity-50 text-white font-bolt px-4 m-0 py-2 rounded-r-md disabled:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
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
