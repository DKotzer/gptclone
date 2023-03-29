import { NextApiRequest, NextApiResponse } from "next";
import { OpenAIStream } from "@component/utils/OpenAiStream";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { messages, chatId, user } = (await req.json()) as {
    messages?: string[];
    chatId?: string;
    user?: string;
  };

  if (!messages) {
    return new Response("Please provide messages", { status: 400 });
  }
  if (!chatId) {
    return new Response("Please provide a valid chat ID!", { status: 400 });
  }

  const payload = {
    model: "gpt-4",
    messages: messages,
    stream: true,
  };

  const stream = await OpenAIStream(payload);

  const response = new Response(stream);
  console.log(response);

  return response;
};
export default handler;
