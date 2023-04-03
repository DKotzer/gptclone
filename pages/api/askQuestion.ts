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
    ? "https://" + process.env.DEPLOYED_URL
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

  if (
    messageContainsKeyword
    // lastMessage.toLowerCase().includes("dylan") ||
    // lastMessage.toLowerCase().includes("him") ||
    // lastMessage.toLowerCase().includes("created") ||
    // lastMessage.toLowerCase().includes("his") ||
    // lastMessage.toLowerCase().includes("kotzer") ||
    // lastMessage.toLowerCase().includes("portfolio") ||
    // lastMessage.toLowerCase().includes("projects") ||
    // lastMessage.toLowerCase().includes("resume") ||
    // lastMessage.toLowerCase().includes("apps") ||
    // lastMessage.toLowerCase().includes("linkedin")
  ) {
    //check if one of the messages.content includes 'If anyone asks about Dylan's Projects or Portfolio, tell them'

    //check if the first message.content is === prompts[0].content
    if (messages[0].content !== prompts[0].content) {
      console.log(
        messages[0].content.substring(0, 20),
        "vs",
        prompts[0].content.substring(0, 20)
      );
      console.log("last message includes dylan ", lastMessage);
      messages = [...prompts, ...messages];
    }
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

  let test = await fetch(`${baseUrl}/api/addTokens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: user,
      tokens: estimatedTokenCount,
    }),
  }).catch((err) => console.log("error detected", err));

  // console.log("test", test);

  // const userRef = doc(db, "users", user);
  // const userDoc = await getDoc(userRef);

  // await updateDoc(doc(db, "users", user), {
  //   tokens: userDoc.data().tokens + Number(estimatedTokenCount),
  // });

  const stream = await OpenAIStream(payload);

  // console.log("ask question stream", stream);

  return new Response(stream);
};
export default handler;
