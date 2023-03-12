"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className='bg-[#202123] h-screen flex flex-col items-center justify-center text-center'>
      <img
        src={"/DylanGPTLogo.png"}
        alt='Logo'
        onClick={() => signIn("google")}
        className='hover:scale-105 rounded-3xl cursor-pointed mx-auto mb-2 hover:cursor-pointer max-w-[50%] max-h-[50%]'
      />
      <button
        onClick={() => signIn("google")}
        className='font-bold text-3xl  rounded-3xl  bg-[#343541] text-white px-5 py-3'
      >
        <span className='animate-pulse hover:scale-105 hover:border hover:border-solid hover:border-white'>
          Sign In to use DylanGPT
        </span>
      </button>
    </div>
  );
}

export default Login;
