// @ts-nocheck
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@component/firebase";

type Data = {
  text: string;
  // tokens?: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { messages, chatId, user } = req.body;

  if (!messages) {
    res.status(400).json({ text: "Please provide messages" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ text: "Please provide a valid chat ID!" });
    return;
  }

  await updateDoc(doc(db, "users", user, "chats", chatId), {
    messages: messages,
  });

  res.status(200).json({ text: messages });
}
