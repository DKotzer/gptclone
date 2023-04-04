// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { updateDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@component/firebase";

type Data = {
  text: string;
  tokens?: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { user, tokens } = req.body;

  const userRef = doc(db, "users", user);
  if (userRef && tokens) {
    const userDoc = await getDoc(userRef);
    const userTokens = userDoc?.data()?.tokens;

    if (userDoc.data()) {
      if (userTokens) {
        const updatedTokens = Number(userTokens) + Number(tokens);
        await updateDoc(userRef, { tokens: updatedTokens });
        console.log("tokens api after", updatedTokens);
      } else {
        console.log("user data found but no tokens", tokens);
        await setDoc(userRef, { tokens: Number(tokens) });
      }
    } else {
      console.log(
        "no user data found, attempting to create tokens data",
        tokens
      );
      await setDoc(userRef, { tokens: Number(tokens) });
    }
  }
  res.status(200).json({ text: "Tokens added: " + tokens });
}
