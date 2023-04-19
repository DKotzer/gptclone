import openai from "./chatgpt";

type Message = {
  role: string;
  content: string;
};
interface BetaQueryRequest {
  messages: any;
}

const betaQuery = async (messages: BetaQueryRequest["messages"]) => {
  const completion = await openai
    .createChatCompletion({
      model: "gpt-4",
      messages: messages,
    })
    .then((res) => {
      console.log("beta res", res);
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
