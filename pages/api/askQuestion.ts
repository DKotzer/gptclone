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
  console.log("res data 666", response.data.choices[0].message);
  console.log("667", [...messages, response.data.choices[0].message]);

  //...
  await updateDoc(doc(db, "users", user, "chats", chatId), {
    messages: [...messages, response.data.choices[0].message],
  });

  //fix db entry to edit instead of add
  // await adminDb
  //   .collection("users")
  //   .doc(session?.user?.email)
  //   .collection("chats")
  //   .doc(chatId)
  //   .set(
  //     { messages: [...messages, response.data.choices[0].message] },
  //     { merge: true }
  //   );

  res
    .status(200)
    .json({ text: [...messages, response.data.choices[0].message] });
}
