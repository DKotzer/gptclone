import { stringify } from "querystring";
import openai from "./chatgpt";

type Message = {
  role: string;
  content: string;
};

const betaQuery = async (messages) => {
  const completion = await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    })
    .then((res) => {
      res.data.choices[0]?.message?.content! ||
        "There was a problem receiving a response from the AI";
      return res;
    })
    .catch(
      (err) =>
        `DylanGPT was unable to find an answer for that! (Error: ${err.message})`
    );

  return await completion;
};

export default betaQuery;
