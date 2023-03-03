import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@component/firebase";
import { collection, deleteDoc, doc, writeBatch } from "firebase/firestore";

type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);
  const [messages] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname]);

  const deleteCollection = async (collectionRef, batchSize) => {
    const query = collectionRef.orderBy("__name__").limit(batchSize);

    return new Promise((resolve, reject) => {
      deleteQueryBatch(query, batchSize, resolve, reject);
    });
  };

  const deleteQueryBatch = async (query, batchSize, resolve, reject) => {
    try {
      const snapshot = await query.get();

      if (snapshot.size === 0) {
        resolve();
        return;
      }

      const batch = db.batch();
      snapshot.docs.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();

      process.nextTick(() => {
        deleteQueryBatch(query, batchSize, resolve, reject);
      });
    } catch (error) {
      reject(error);
    }
  };

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  return (
    <Link
      className={`chatRow justify-center ${active && "bg-gray-700/50"}`}
      href={`/chat/${id}`}
    >
      <ChatBubbleLeftIcon className='h-5 w-5' />
      <p className='flex-1 hidden md:inline-flex truncate'>
        {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
      </p>
      <TrashIcon
        onClick={removeChat}
        className='h-5 w-5 text-gray-700 hover:text-red-700'
      />
    </Link>
  );
}

export default ChatRow;
