"use client";
import NewChat from "./NewChat";
import { useSession, signOut } from "next-auth/react";
function SideBar() {
  const { data: session } = useSession();
  return (
    <div className='p-2 flex flex-col h-screen'>
      <div className='flex-1'>
        <div>
          <NewChat />
          <div>Selection Component</div>
          map rows here
        </div>
      </div>
      {session && (
        <img
          onClick={() => signOut()}
          src={session.user?.image!}
          alt='Profile Picture'
          className='h-12 w-12 rounded-full cursor-pointed mx-auto mb-2 hover:opacity-50'
        />
      )}
    </div>
  );
}

export default SideBar;
