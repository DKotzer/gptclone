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
interface Messages {
  content: string;
}

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

  const newMsgArr = response?.data?.choices[0]?.message
    ? [...messages, response.data.choices[0].message]
    : [
        ...messages,
        {
          role: "assistant",
          content:
            "I am sorry, the maximum chat length has been reached. Please start a new chat to continue.",
        },
      ];

  //check token count of response.data.choices[0].message and add it to tokens count, token count should always exist by time there is an answer streamed

  // if (!response?.data?.choices[0]?.message) {
  //   const newMsgArr = [...messages, response.data.choices[0].message];
  // } else{

  // }
  // console.log("res data 666", response.data.choices[0].message);
  // console.log("667", newMsgArr);

  await updateDoc(doc(db, "users", user, "chats", chatId), {
    messages: newMsgArr,
  });

  function getTotalContentLength(objects: Messages[]): number {
    let totalLength = 0;
    for (const obj of objects) {
      totalLength += obj.content.length;
    }
    return totalLength;
  }

  let tokens = getTotalContentLength(newMsgArr);
  const estimatedTokenCount =
    tokens +
    Math.floor(tokens.length * 0.1) +
    (streamingData.endsWith(".") ? 1 : 0);
  // console.log("estimatedTokenCount: ", estimatedTokenCount);

  // console.log("userRef", userRef);
  await updateDoc(doc(db, "users", user), {
    tokens: userDoc.data().tokens + Number(estimatedTokenCount),
  });
  // console.log("data", userDoc);

  res
    .status(200)
    .json({ text: [...messages, response.data.choices[0].message] });
}
