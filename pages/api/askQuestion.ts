// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// @ts-nocheck
import { adminDb } from "@component/firebaseAdmin";
import query from "@component/lib/queryApi";
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { Message } from "@component/typings";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@component/firebase";

type Data = {
  text: any;
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

  //gpt3 query - handled by lib/queryApi
  const response = await query(messages);
  const newMsgArr = [...messages, response.data.choices[0].message];
  // console.log("res data 666", response.data.choices[0].message);
  // console.log("667", newMsgArr);

  await updateDoc(doc(db, "users", user, "chats", chatId), {
    messages: newMsgArr,
  });


  res
    .status(200)
    .json({ text: [...messages, response.data.choices[0].message] });
}
