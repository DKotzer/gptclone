"use client";
import NewChat from "./NewChat";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@component/firebase";
import ChatRow from "./ChatRow";

function SideBar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session && query( collection(db, "users", session.user?.email!, "chats"), orderBy("createdAt", "asc"))
  );
  console.log("chats", chats);
  return (
    <div className='p-2 flex flex-col h-screen'>
      <div className='flex-1'>
        <div>
          <NewChat />
          {chats?.docs.map(chat => (<ChatRow key={chat.id} id={chat.id}/>))}
        </div>
      </div>
      {session && (
        <img
          onClick={() => signOut()}
          src={session.user?.image || "/../public/user.png"}
          alt='Profile Picture'
          className='h-12 w-12 rounded-full cursor-pointed mx-auto mb-2 hover:opacity-50'
        />
      )}
    </div>
  );
}

export default SideBar;
