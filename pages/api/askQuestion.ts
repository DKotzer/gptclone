import { NextApiRequest, NextApiResponse } from "next";
import { OpenAIStream } from "@component/utils/OpenAiStream";

import { updateDoc, doc } from "firebase/firestore";
import { db } from "@component/firebase";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { messages, chatId, user } = (await req.json()) as {
    messages?: string[];
    chatId?: string;
    user?: string;
  };

  if (!messages) {
    return new Response("Please provide messages", { status: 400 });
  }
  if (!chatId) {
    return new Response("Please provide a valid chat ID!", { status: 400 });
  }

  const payload = {
    model: "gpt-3.5-turbo",
    messages: messages,
    stream: true,
  };

  const stream = await OpenAIStream(payload);

  // console.log("ask question stream", stream);

  return new Response(stream);
};
export default handler;
