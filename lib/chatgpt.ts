import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_KEY,
  organization: "org-qaFpK5RoJjLWjlPBEJSM2yAP",
});

const openai = new OpenAIApi(configuration);

export default openai;
