import { NextApiRequest, NextApiResponse } from "next";
import { OpenAIStream } from "@component/utils/OpenAiStream";

import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@component/firebase";
import prompts from "@component/components/Prompts";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  let { messages, chatId, user } = (await req.json()) as {
    messages?: any;
    chatId?: string;
    user?: string;
  };

  const baseUrl = process.env.DEPLOYED_URL
    ? process.env.DEPLOYED_URL
    : "http://localhost:3000";

  if (!messages) {
    return new Response("Please provide messages", { status: 400 });
  }
  if (!chatId) {
    return new Response("Please provide a valid chat ID!", { status: 400 });
  }

  //if the last message.content.toLowerCase() includes 'dylan' then add prompts to the messages array
  const lastMessage = messages[messages.length - 1].content;

  const keywords = [
    "dylan",
    "him",
    "created",
    "his",
    "kotzer",
    "portfolio",
    "projects",
    "resume",
    "apps",
    "linkedin",
  ];

  const messageContainsKeyword = keywords.some((keyword) =>
    lastMessage.toLowerCase().includes(keyword)
  );

  if (messageContainsKeyword) {
    console.log("last message includes dylan ", lastMessage);
    messages = [...prompts, ...messages];
  }
  const payload = {
    model: "gpt-3.5-turbo",
    messages: messages,
    stream: true,
  };

  let getTotalContentLength = (messages): number => {
    let totalLength = 0;
    for (const obj of messages) {
      totalLength += obj.content.length;
    }
    return totalLength;
  };

  let tokens = getTotalContentLength(messages);
  console.log("Query Character Length: ", tokens);
  const estimatedTokenCount = ((tokens / 4) * 1.1).toFixed(0);
  console.log("estimatedQueryTokenCount: ", estimatedTokenCount);

  if ((tokens / 4) * 1.1 > 3200) {
    return new Response(
      JSON.stringify({
        Warning:
          "Chat length limit reached, please start a new chat to continue.",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    await fetch(`${baseUrl}/api/addTokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user,
        tokens: estimatedTokenCount,
      }),
    }).catch((err) => console.log("error detected", err));
  }

  const stream = await OpenAIStream(payload);

  return new Response(stream);
};
export default handler;
