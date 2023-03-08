import { DocumentData } from "firebase/firestore";
import React from "react";

type Props = {
  message: DocumentData;
  userImg: string;
};

function Message({ message, userImg }: Props) {
  const isDylanGPT = message.role == "assistant";
  const isHidden = message.role == "system";
  return (
    <div
      className={`py-5 text-white ${isDylanGPT && "bg-[#434654]"} ${
        isHidden && "hidden"
      }`}
    >
      <div className='flex space-x-5 px-10 max-w-wxl mx-auto'>
        <img
          src={
            message.role == "assistant"
              ? "https://i.imgur.com/9Hk3qUg.png"
              : userImg
          }
          alt=''
          className='h-10 w-10 rounded-lg cursor-pointed  '
        />
        <p className='pt-2 text-sm'>{message.content}</p>
      </div>
    </div>
  );
}

export default Message;
