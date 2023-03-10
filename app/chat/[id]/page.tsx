"use client";
import Chat from "@component/components/Chat";
import ChatInput from "@component/components/ChatInput";
import { doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "@component/firebase";
import { useEffect, useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  const { data: session, status } = useSession();
  const [menuHeight, setMenuHeight] = useState<number>(0);
  const [viewportHeight, setViewportHeight] = useState<number>(0);
  const [divHeight, setDivHeight] = useState<number>(0);

  useEffect(() => {
    setViewportHeight(window.innerHeight);
    const onResize = () => setViewportHeight(window.innerHeight);
    const onMenuToggle = () => {
      const menu = document.querySelector(".menu") as HTMLElement; // add type assertion
      setMenuHeight(menu.offsetHeight);
    };

    window.addEventListener("resize", onResize);
    document
      .querySelector(".menu-toggle")
      ?.addEventListener("click", onMenuToggle);
    return () => {
      window.removeEventListener("resize", onResize);
      document
        .querySelector(".menu-toggle")
        ?.removeEventListener("click", onMenuToggle);
    };
  }, []);

  useEffect(() => {
    setDivHeight(viewportHeight - menuHeight);
  }, [menuHeight, viewportHeight]);

  if (status === "loading") {
    return (
      <div
        id='panel'
        className={`h-screen w-screen flex flex-col items-center justify-center text-center `}
      >
        <span id='loading1'>
          <span id='outerCircle' className='animate-pulse'></span>

          <span id='innerCircle' className='animate-pulse'>
            <span id='center' className='animate-pulse'></span>
          </span>
        </span>
      </div>
    );
  }

  // if (!session) {
  //   // Render a loading indicator or redirect to login page
  //   return (
  //     <div
  //       id='panel'
  //       className='h-screen w-screen flex flex-col items-center justify-center text-center '
  //     >
  //       <span id='loading1' className=' scale-150'>
  //         <span id='outerCircle' className='animate-pulse'></span>

  //         <span id='innerCircle' className='animate-pulse'>
  //           <span id='center' className='animate-pulse'></span>
  //         </span>
  //       </span>
  //     </div>
  //   );
  // }
  // console.log("sess test", session);

  return (
    <div className={`flex flex-col h-screen overflow-hidden`}>
      <Chat chatId={id} divHeight={divHeight} />
      <ChatInput chatId={id} divHeight={divHeight} />
    </div>
  );
}

export default ChatPage;
