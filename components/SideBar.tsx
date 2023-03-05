"use client";
import NewChat from "./NewChat";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@component/firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

function SideBar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  const createBetaChat = async () => {
    router.push(`/beta`);
  };
  return (
    <div className='p-2 flex flex-col h-screen'>
      <div className='flex-1'>
        <div>
          <NewChat />
          <div className='hidden sm:inline'>
            <ModelSelection />
          </div>

          <div className='flex flex-col space-y-2 my-2'>
            {loading && (
              <div className='animate-pulse text-center text-white'>
                <p>Loading Chats...</p>
              </div>
            )}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>
      {session && (
        <div className='flex flex-col'>
          <img
            src={session.user?.image! || "https://i.imgur.com/dTJ67HS.png"}
            alt='Profile Picture'
            className='h-12 w-12 rounded-full cursor-pointed mx-auto mb-2 hover:opacity-50'
          />{" "}
          <div
            className='hover:border-gray-700 chatRow align-self-start '
            onClick={createBetaChat}
          >
            <ArrowUpTrayIcon className='h-4 w-4 rotate-90' />
            <p>Beta</p>
          </div>
          <div
            className='hover:border-gray-700 chatRow align-self-start '
            onClick={() => signOut()}
          >
            <ArrowUpTrayIcon className='h-4 w-4 rotate-90' />
            <p className='md:text-sm'>Log Out</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
