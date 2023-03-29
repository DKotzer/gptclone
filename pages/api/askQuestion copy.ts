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

  if (!messages) {
    res.status(400).json({ text: "Please provide messages" });
    return;
  }
  if (!chatId) {
    res.status(400).json({ text: "Please provide a valid chat ID!" });
    return;
  }

  //gpt3 query - handled by lib/queryApi
  const payload = await openai.createChatCompletion({
    model: "gpt-4",
    messages: messages,
    stream: true,
  });
  // .then((res) => {
  //   res.data.choices[0]?.message?.content! ||
  //     "There was a problem receiving a response from the AI";
  //   return res;
  // })
  // .catch(
  //   (err) =>
  //     `DylanGPT was unable to find an answer for that! (Error: ${err.message})`
  // );

  const stream = await OpenAIStream(payload);
  console.log("ask question stream", stream);

  // const newMsgArr = response?.data?.choices[0]?.message
  //   ? [...messages, response.data.choices[0].message]
  //   : [
  //       ...messages,
  //       {
  //         role: "assistant",
  //         content:
  //           "I am sorry, the maximum chat length has been reached. Please start a new chat to continue.",
  //       },
  //     ];

  // if (!response?.data?.choices[0]?.message) {
  //   const newMsgArr = [...messages, response.data.choices[0].message];
  // } else{

  // }
  // console.log("res data 666", response.data.choices[0].message);
  // console.log("667", newMsgArr);

  // await updateDoc(doc(db, "users", user, "chats", chatId), {
  //   messages: newMsgArr,
  // });

  res
    .status(200)
    .json({ text: [...messages, response.data.choices[0].message] });
}
