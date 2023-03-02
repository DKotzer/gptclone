import { DocumentData } from "firebase/firestore";
import React from "react";

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  const isDylanGPT = message.user.name == "DylanGPT";
  return (
    <div className={`py-5 text-white ${isDylanGPT && "bg-[#434654]"}`}>
      <div className='flex space-x-5 px-10 max-w-wxl mx-auto'>
        <img src={message.user.avatar} alt='' className='h-8 w-8' />
        <p className='pt-1 text-sm'>{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
