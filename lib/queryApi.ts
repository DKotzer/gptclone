import openai from "./chatgpt";

interface QueryRequest {
  messages: any;
}

type Message = {
  role: string;
  content: string;
};

const query = async (messages: QueryRequest["messages"]) => {
  const completion = await openai
    .createChatCompletion({
      model: "gpt-4",
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

export default query;

// const query = async (prompt: string, chatId: string, model: string) => {
//   const res = await openai
//     .createCompletion({
//       model,
//       prompt,
//       temperature: 0.8,
//       max_tokens: 1000,
//       top_p: 1,
//       frequency_penalty: 0.5,
//       presence_penalty: 0.5,
//     })
//     .then((res) => res.data.choices[0].text)
//     .catch(
//       (err) =>
//         `DylanGPT was unable to find an answer for that! (Error: ${err.message})`
//     );

//   return res;
// };

// export default query;
