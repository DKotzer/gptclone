import { DocumentData } from "firebase/firestore";
import React from "react";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

type Props = {
  message: DocumentData;
  userImg: string;
};

function Message({ message, userImg }: Props) {
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
  // console.log(message.content);
  let styledMSG = md.render(message.content);
  function createMarkup() {
    return { __html: styledMSG };
  }
  const isDylanGPT = message.role == "assistant";
  return (
    <div
      className={`py-5 text-white bb w-full ${isDylanGPT && "bg-[#434654]"} ${
        !isDylanGPT && "divide-solid > * + *"
      }}`}
    >
      <div className='flex mx-auto justify-between;'>
        <img
          src={
            message.role == "assistant"
              ? "https://i.imgur.com/jfLbi1b.png"
              : userImg
          }
          alt=''
          className='h-10 w-10 rounded-lg cursor-pointed mr-3 ml-3'
        />
        <div className={"markdown"} dangerouslySetInnerHTML={createMarkup()} />
      </div>
    </div>
  );
}

export default Message;
