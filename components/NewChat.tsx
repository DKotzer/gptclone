"use client";
import { PlusIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { db } from "@component/firebase";

function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = async () => {
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
            role: "assistant",
            content: `Hello ${session?.user
              ?.name!}, I am DylanGPT, how may I help you?`,
          },
        ],
      }
    );
    router.push(`/chat/${doc.id}`);
  };
  return (
    <div
      onClick={createNewChat}
      className='border-gray-700 bg-[#343541]  border chatRow mr-3 ml-3 hover:scale-105'
    >
      <PlusIcon className='h-4 w-4  text-white my-auto' />
      <p>New Chat</p>
    </div>
  );
}

export default NewChat;
