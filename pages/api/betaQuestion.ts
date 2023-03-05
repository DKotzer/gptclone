// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import betaQuery from "@component/lib/betaQueryApi";
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { messages, session } = req.body;

  if (!messages) {
    res.status(400).json({ answer: "Please provide messages" });
    return;
  }

  //gpt3 query - handled by lib/queryApi
  const response = await betaQuery(messages);

  res.status(200).json({ text: `${response.data.choices[0].message.content}` });
}
