// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import { updateDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@component/firebase";

type Data = {
  text: any;
  tokens: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { messages, chatId, user, tokens } = req.body;

  if (!messages) {
    res.status(400).json({ text: "Please provide messages" });
    return;
  }
  if (!chatId) {
    res.status(400).json({ text: "Please provide a valid chat ID!" });
    return;
  }

  //gpt3 query - handled by lib/queryApi

  //...
  await updateDoc(doc(db, "users", user, "chats", chatId), {
    messages: messages,
  });

  const userRef = doc(db, "users", user);
  // console.log("userRef", userRef);
  if (userRef && tokens) {
    console.log("userRef.path", userRef.path);
    const userDoc = await getDoc(userRef);
    // console.log("data", userDoc);
    console.log("tokens pre if", userDoc.data().tokens);

    if (userDoc.data()) {
      console.log("user data found");
      if (userDoc.data().tokens) {
        console.log("tokens found", userDoc.data().tokens);
        await updateDoc(userRef, {
          tokens: userDoc.data().tokens + Number(tokens),
        });
      } else {
        console.log("uer data found but no tokens");
        await setDoc(userRef, { tokens: tokens });
      }
    } else {
      console.log("no user data found, creating tokens data");
      await setDoc(userRef, { tokens: tokens });
    }
  }
  res.status(200).json({ text: messages });
}
