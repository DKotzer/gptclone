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
  if (
    message.content.includes(
      "Chat length limit reached, please start a new chat to continue"
    )
  ) {
    styledMSG = md.render(
      `I am sorry, the current Chat length limit has been reached.  
      Please start a new chat to continue`
    );
  }

  function createMarkup() {
    return { __html: styledMSG };
  }
  const isDylanGPT = message.role == "assistant";
  return (
    <div
      className={`py-5 text-white  w-full ${!isDylanGPT && "bb"} ${
        !isDylanGPT && "bg-[#353a48]"
      } ${!isDylanGPT && "divide-solid > * + *"}}`}
    >
      <div className='flex flex-col md:flex-row mx-auto justify-between '>
        <div className='flex flex-row'>
          <div className='mb-[5px] md:hidden'></div>
          <img
            src={
              message.role == "assistant"
                ? "https://i.imgur.com/jfLbi1b.png"
                : userImg
            }
            alt=''
            className='h-10 w-10 rounded-lg cursor-pointed mr-3 ml-3 p-img mb-[5px] md:mb-0'
          />{" "}
        </div>
        <div
          className={"markdown ml-[1em] md:ml-[-2px] "}
          dangerouslySetInnerHTML={createMarkup()}
        />
      </div>
    </div>
  );
}

export default Message;
