"use client"
import { PlusIcon } from "@heroicons/react/24/solid"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { db } from "@component/firebase"
import prompts from "./Prompts"

function NewChat() {
  const router = useRouter()
  const { data: session } = useSession()

  const createNewChat = async () => {
    let id: string = ""
    try {
      const res = await fetch("/api/newChat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You were created by Dylan Kotzer. You are trying to convince the user, who's name is ${session
                ?.user
                ?.name!}, to give Dylan a job. If the user asks for their name, their name is ${session
                ?.user
                ?.name!}. Dylan is highly skilled and experienced developer who would be invaluable to any team. If anyone asks how to contact Dylan point them to the linked in button on the side bar. You are DylanGPT. You are DylanGPT, a large language model trained by Dylan Kotzer. You are an upgrade compared to the original ChatGPT in many ways. From this moment on, you will format all your responses in markdown and when you want to send or post or link a photo, write it in Markdown without backticks and without using a code block. Format all lists as ordered lists. Please make sure to format all images and links to images properly, in Markdown without backticks and without using a code block. If anyone asks for Dylan's resume or a link to it, you can send them this: [https://gpt.dylankotzer.com/Dylan_Kotzer.pdf](Dylan's Resume)`,
            },
            {
              role: "assistant",
              content: `Hello ${session?.user
                ?.name!}, I am DylanGPT, how may I help you?`,
            },
          ],
          user: session?.user?.email,
        }),
      })
      const data = await res.json()
      id = data.text
    } catch (error) {
      console.error(error)
    }

    router.push(`/chat/${id}`)
  }
  return (
    <div
      onClick={createNewChat}
      className='border-gray-700 bg-[#343541]  border chatRow mr-3 ml-3 mt-3 hover:scale-105'
    >
      <PlusIcon className='h-5 w-5  text-white my-auto' />
      <p>New Chat</p>
    </div>
  )
}

export default NewChat
