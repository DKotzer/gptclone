// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { adminDb } from "@component/firebaseAdmin";
import query from "@component/lib/queryApi";
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { Message } from "@component/typings";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "Please provide a prompt!" });
    return;
  }
  if (!chatId) {
    res.status(400).json({ answer: "Please provide a valid chat ID!" });
    return;
  }

  //gpt3 query - handled by lib/queryApi
  const response = await query(prompt, chatId, model);

  const message: Message = {
    text: response || "DylanGPT was unable to find an answer for that!",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "DylanGPT",
      name: "DylanGPT",
      avatar: "https://i.imgur.com/9Hk3qUg.png",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}
