// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@component/firebase";

type Data = {
  text: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { messages, user } = req.body;

  if (!messages) {
    res.status(400).json({ text: "Please provide messages" });
    return;
  }

  const doc = await addDoc(collection(db, "users", user, "chats"), {
    userId: user,
    createdAt: serverTimestamp(),
    messages: messages,
  });

  console.log("type of doc id, ", typeof doc.id, doc.id);
  res.status(200).json({ text: doc.id });
}
