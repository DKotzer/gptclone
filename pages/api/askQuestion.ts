// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// @ts-nocheck
import { adminDb } from "@component/firebaseAdmin";
import query from "@component/lib/queryApi";
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { Message } from "@component/typings";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@component/firebase";
import { OpenAIStream } from "@component/lib/OpenAiStream";
import openai from "../../lib/chatgpt";

type Data = {
  text: any;
};

export const config = {
  runtime: "edge",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { messages, chatId, user } = req.body;

  //gpt3 query - handled by lib/queryApi
  const payload = await openai.createChatCompletion({
    model: "gpt-4",
    messages: messages,
    stream: true,
  });

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}
