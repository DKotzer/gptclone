import "@component/styles/globals.css";
import { SessionProvider } from "@component/components/SessionProvider";
import SideBar from "@component/components/SideBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@component/pages/api/auth/[...nextauth]";
import Login from "@component/components/Login";
import ClientProvider from "@component/components/ClientProvider";
import Head from "next/head";
import { useContext } from "react";
import { DataContext } from "./data-context";

export const metadata = {
  title: "DylanGPT",
  description: "ChatGPT Clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang='en'>
      <head>
        <title>DylanGPT</title>
        <meta
          property='description'
          content='An above average GPT-powered Chatbot created by Dylan Kotzer. Give it a shot!'
        />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='/dgpt.webp' />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark-reasonable.min.css'
        />
        <meta
          name='image'
          property='og:image'
          content='https://gpt.dylankotzer.com/LogoLarge.jpeg'
        />
        <meta
          name='image2'
          property='og:image'
          content='https://gpt.dylankotzer.com/DylanGPTLogo.webp'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta property='og:title' content='DylanGPT' />
        <meta
          property='og:description'
          content='An above average GPT-powered Chatbot created by Dylan Kotzer. Give it a shot!'
        />

        <meta name='author' content='Dylan Kotzer'></meta>
      </head>
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className='flex'>
              <div className='bg-[#202123] max-w-xs min-w-fit h-screen overflow-y-hidden'>
                <SideBar />
              </div>
              {/* client provider is used to send notifications toasts on screen - can persist on difference pages thanks to wrapper */}
              <ClientProvider />
              <div className='bg-[#353a48] flex-1 overflow-x-auto '>
                {children}
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
//Do these projects make Dylan a good candidate to work on our companies upcoming gpt-3.5-turbo based App?
