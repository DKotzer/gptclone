"use client";
import Chat from "@component/components/Chat";
import ChatInput from "@component/components/ChatInput";
import { doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "@component/firebase";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      // <div className='grid'>
      //   <div></div>
      //   <div></div>
      //   <div></div>
      //   <div></div>
      //   <div></div>
      //   <div></div>
      //   <div></div>
      //   <div></div>
      //   <div></div>
      // </div>

      // <div className='grid min-h-screen place-content-center'>
      //   <div className='flex items-center gap-2 text-gray-500'>
      //     <span className='h-14 w-14 block rounded-full border-4 border-t-blue-300 animate-spin'></span>
      //     loading...
      //   </div>
      // </div>
      <div>
        <div className='socket'>
          <div className='gel center-gel'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c1 r1'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c2 r1'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c3 r1'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c4 r1'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c5 r1'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c6 r1'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c7 r2'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c8 r2'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c9 r2'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c10 r2'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c11 r2'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c12 r2'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c13 r2'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c14 r2'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c15 r2'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c16 r2'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c17 r2'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c18 r2'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c19 r3'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c20 r3'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c21 r3'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c22 r3'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c23 r3'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c24 r3'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c25 r3'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c26 r3'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c28 r3'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c29 r3'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c30 r3'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c31 r3'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c32 r3'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c33 r3'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c34 r3'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c35 r3'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c36 r3'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
          <div className='gel c37 r3'>
            <div className='hex-brick h1'></div>
            <div className='hex-brick h2'></div>
            <div className='hex-brick h3'></div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    // Render a loading indicator or redirect to login page
    return (
      <div id='loader-wrapper'>
        <div id='loader'></div>

        <div className='loader-section section-left'></div>
        <div className='loader-section section-right'></div>
      </div>
    );
  }
  console.log("sess test", session);

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
}

export default ChatPage;
