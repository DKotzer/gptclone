// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// @ts-nocheck
import betaQuery from "@component/lib/betaQueryApi";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  text: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { messages, session } = req.body;

  //gpt3 query - handled by lib/queryApi
  const response = await betaQuery(messages);
  let textHolder = response.data.choices[0].message.content;

  res.status(200).json({ text: textHolder });
}
