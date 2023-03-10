import { useSession } from "next-auth/react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "@component/firebase";
import { doc } from "firebase/firestore";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

type Props = {
  chatId: string;
  divHeight: number;
};

function Chat({ chatId, divHeight }: Props) {
  // const [heightHolder, setHeightHolder] = useState(divHeight - 225);
  const { data: session } = useSession();
  console.log("screen height:", divHeight);

  // useEffect(() => {
  //   () => {
  //     setHeightHolder(divHeight - 295);
  //   };
  // }, [divHeight]);

  const messages = useDocumentData(
    doc(db, "users", session?.user?.email!, "chats", chatId)
  );

  // const messagesObj: any = useDocumentData(
  //   doc(db, "users", session?.user?.email!, "chats", chatId)
  // );

  return (
    <div className='flex-1 overflow-y-auto overflow-x-hidden'>
      {messages[0]?.messages?.map(
        (message, i) =>
          message.role != "system" && (
            <Message
              userImg={session?.user?.image!}
              key={i}
              message={message}
            />
          )
      )}
      {messages[0]?.messages?.length < 3 && (
        <>
          <p className='mt-10 text-center text-white py-auto'>
            Type a prompt in below to get started!
          </p>
          <ArrowDownCircleIcon className='h-10 w-10 mx-auto mt-5 text-white animate-bounce ' />
        </>
      )}
    </div>
  );
}

export default Chat;
