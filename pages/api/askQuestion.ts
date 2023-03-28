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

  // Log the stream as it comes in
  // const decoder = new TextDecoder();
  // while (true) {
  //   const { done, value } = await stream.getReader().read();
  //   if (done) break;
  //   console.log(decoder.decode(value));
  // }

  // Create a new response object with the stream as the body
  const response = new Response(stream);
  console.log(response);

  // Set the Content-Type header to text/plain
  // response.headers.set("Content-Type", "text/plain");

  return response;
};
export default handler;

// const reader = stream.getReader();
// // Set response headers
// res.setHeader("Content-Type", "text/plain");

// // Start pumping data to the response object
// const pump = async () => {
//   try {
//     while (true) {
//       const { value, done } = await reader.read();
//       if (done) {
//         // Stream ended, close response object
//         res.end();
//         break;
//       }
//       console.log("value:", value);
//       res.write(value);
//     }
//   } catch (error) {
//     console.error(error);
//     res.end();
//   }
// };
// pump();
