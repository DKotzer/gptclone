import { DocumentData } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React from "react";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

type Props = {
  message: DocumentData;
  userImg: string;
};

function BetaMessage({ message, userImg }: Props) {
  let md = new MarkdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }

      return ""; // use external default escaping
    },
  });
  let styledMSG = md.render(message.content);
  function createMarkup() {
    return { __html: styledMSG };
  }
  const isDylanGPT = message.role == "assistant";
  return (
    <div className={`py-5 text-white ${isDylanGPT && "bg-[#434654]"}`}>
      <div className='flex space-x-5 px-10 max-w-[80%] mx-auto'>
        <img
          src={
            message.role == "assistant"
              ? "https://i.imgur.com/9Hk3qUg.png"
              : userImg
          }
          alt=''
          className='h-10 w-10 rounded-lg cursor-pointed'
        />
        <div className={"markdown"} dangerouslySetInnerHTML={createMarkup()} />
      </div>
    </div>
  );
}

export default BetaMessage;
