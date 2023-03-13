import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "@component/firebase";
import { deleteDoc, doc } from "firebase/firestore";

type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);
  const pathname = usePathname();
  const messages = useDocumentData(
    doc(db, "users", session?.user?.email!, "chats", id)
  );

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname]);

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  return (
    <Link
      className={`chatRow justify-start ${active && "bg-gray-700/50"}`}
      href={`/chat/${id}`}
    >
      <ChatBubbleLeftIcon className='h-5 w-5 justify-start' />
      <p className='flex-1 md:inline-flex truncate max-w-[120px] overflow-ellipsis '>
        {messages[0]?.messages.length < 7
          ? "Empty Chat"
          : messages[0]?.messages[messages[0]?.messages.length - 2].content}
      </p>
      <TrashIcon
        onClick={removeChat}
        className='h-5 w-5 ml-0 pl-0 text-gray-700 hover:text-red-700'
      />
    </Link>
  );
}

export default ChatRow;
