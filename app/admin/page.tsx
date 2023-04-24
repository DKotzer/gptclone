"use client";
import {
  collection,
  doc,
  getDoc,
  query,
  orderBy,
  QuerySnapshot,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { db } from "@component/firebase";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

function AdminPage() {
  const { data: session, status } = useSession();

  const [adminFound, setAdminFound] = useState(false);
  const [users, setUsers] = useState<any>([]);
  const [totalTokens, setTotalTokens] = useState(0);
  const [totalChats, setTotalChats] = useState(0);

  useEffect(() => {
    if (session?.user?.email) {
      //   console.log("email found", session?.user?.email);
      if (session?.user?.email === "dkotzer@gmail.com") {
        setAdminFound(true);
        setUsers(getAllUserData());
      }
    }
  }, [session?.user?.email]);

  const getAllUserData = async () => {
    let users: DocumentData[] = [];
    const usersRef = collection(db, "users");
    const usersSnap = await getDocs(usersRef);
    let totalTokens = 0;
    let totalChats = 0;
    for (const doc of usersSnap.docs) {
      //   console.log(doc);
      // Get the user data
      const userData = doc.data();

      totalTokens += Number(userData.tokens) ?? 1;
      // Get the user id
      const userId = doc.id;
      // Get the chats subcollection reference
      const chatsRef = collection(db, `users/${userId}/chats`);
      // Get the chats subcollection snapshot
      const chatsSnap = await getDocs(chatsRef);
      // Get the chats data as an array of objects
      const chatsData = chatsSnap.docs.map((chatDoc) => chatDoc.data());
      // Create an object with the desired fields
      totalChats += chatsData.length;
      const userObject = {
        name: userId,
        chats: chatsData,
        tokens: userData.tokens ?? 1,
      };
      // Push the object to the users array
      users.push(userObject);
    }
    setUsers(users);
    setTotalTokens(totalTokens);
    setTotalChats(totalChats);
    // console.log(users);

    return users;
  };

  const renderUser = (user) => {
    return (
      <tr className="userRow'" key={`${user.name}-${user.tokens}`}>
        <td className='border px-4 py-2 border-gray-300 bg-white text-gray-600 '>
          <a
            href={`https://console.firebase.google.com/u/0/project/chatgptclone-ce83a/firestore/data/~2Fusers~2F${user.name}`}
            target='_blank'
          >
            {user.name}
          </a>
        </td>
        <td className='border px-4 py-2 border-gray-300 bg-white text-gray-600'>
          {user.chats.length}
        </td>
        <td className='border px-4 py-2 border-gray-300 bg-white text-gray-600'>
          {user.tokens}
        </td>
      </tr>
    );
  };

  return adminFound && users.length > 0 ? (
    <div className='overflow-y-auto max-h-screen '>
      <div className='sm:m-10'>
        <div className=' grid grid-cols-3 gap-6 '>
          <div className='flex flex-col bg-white border border-gray-300 rounded-lg shadow-sm'>
            <div className='p-6'>
              <div className='text-2xl font-semibold text-black'>
                Total Users
              </div>
              <div className='mt-2 text-lg text-gray-600'>{users.length}</div>
            </div>
          </div>
          <div className='flex flex-col bg-white border border-gray-300 rounded-lg shadow-sm'>
            <div className='p-6'>
              <div className='text-2xl font-semibold text-black'>
                Total Chats
              </div>
              <div className='mt-2 text-lg text-gray-600'>{totalChats}</div>
            </div>
          </div>
          <div className='flex flex-col bg-white border border-gray-300 rounded-lg shadow-sm'>
            <div className='p-6'>
              <div className='text-2xl font-semibold text-black'>
                Total Tokens
              </div>
              <div className='mt-2 text-lg text-gray-600'>{totalTokens}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='sm:m-10'>
        <table className='min-w-full divide-y divide-gray-200 mb-10'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase'>
                Name
              </th>
              <th className='px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase'>
                Chats
              </th>
              <th className='px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase'>
                Tokens
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {users.map((user) => renderUser(user))}
          </tbody>
        </table>
      </div>
      <div className='h-[80px]  lg:h-[25px]' />
    </div>
  ) : (
    <div>Not Admin</div>
  );
}

export default AdminPage;
