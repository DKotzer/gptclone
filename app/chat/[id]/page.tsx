"use client";
import Chat from "@component/components/Chat";
import ChatInput from "@component/components/ChatInput";
import { doc, getDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "@component/firebase";
type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  const { data: session, status } = useSession();

  const [streamingData, setStreamingData] = useState("");
  const [completedStream, setCompletedStream] = useState(false);

  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    // console.log("running useEffect()");
    const getUserData = async () => {
      const userDocRef = doc(db, "users", session?.user?.email!);
      const userDocSnap = await getDoc(userDocRef);
      // console.log("snap", userDocSnap);
      if (userDocSnap.exists()) {
        // console.log("exists");
        const userData = userDocSnap.data();
        // console.log(userData);
        setTokens(userData.tokens);
      }
    };

    if (session?.user?.email) {
      // console.log("email found");
      getUserData();
    }
  }, [session?.user?.email]);

  const handleStreamingData = async (data: any) => {
    setStreamingData(await data);
  };

  useEffect(() => {
    // console.log("streaming data: ", streamingData);
  }, [streamingData]);

  if (tokens && tokens > 10000) {
    return (
      <div className='relative w-full h-full overflow-hidden bg-cover bg-[50%] bg-no-repeat'>
        <div className='absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-auto bg-fixed bg-grey'>
          <div className='flex h-full items-center my-[5%] flex-col max-w-[80%] mx-auto'>
            <img
              src='/stonks.png'
              className='bg-white rounded-full mb-4 max-h-[30%]'
            ></img>
            <h2 className='text-white opacity-100'>
              Thank you for using DylanGPT!
            </h2>
            <p>&nbsp;</p>
            <p className='text-white opacity-100'>
              {" "}
              We hope you enjoyed the app and were able to find all the
              information about{" "}
              <a href='https://dylankotzer.com' className='text-blue-400'>
                Dylan Kotzer
              </a>{" "}
              that you were looking for. We are thrilled that the app has been
              more popular than expected.
            </p>
            <p>&nbsp;</p>
            <p className='text-white opacity-100'>
              Unfortunately, the costs of maintaining DylanGPT are adding up and
              it looks like you've used up all your free tokens.{" "}
            </p>
            <p>&nbsp;</p>
            <p className='text-white opacity-100'>
              Don't worry though - you can
              <a href='mailto:dylan@dylankotzer.com' className='text-blue-400'>
                {" "}
                contact Dylan Kotzer
              </a>{" "}
              to request more tokens or let us know about any features you'd
              like to see, bugs you've encountered, or feedback you have. We're
              always looking for ways to improve DylanGPT and make it even
              better for our users.
            </p>
            <p>&nbsp;</p>
            <p className='text-white opacity-100'>
              Thanks again for using DylanGPT, and we appreciate your
              understanding as we work to keep the app sustainable. We hope to
              hear from you soon!
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div id='loader' className='overlay-loader'>
        <div className='loader-background color-flip'></div>
        <img
          className='loader-icon spinning-cog'
          src='/cog05.svg'
          data-cog='cog05'
          alt=''
        />
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-screen`}>
      <Chat
        chatId={id}
        streamingData={streamingData}
        completedStream={completedStream}
        setCompletedStream={setCompletedStream}
        setStreamingData={setStreamingData}
      />
      <ChatInput
        chatId={id}
        handleStreamingData={handleStreamingData}
        setStreamingData={setStreamingData}
        setCompletedStream={setCompletedStream}
        streamingData={streamingData}
      />
    </div>
  );
}

export default ChatPage;
