"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className='bg-[#202123] h-screen flex flex-col items-center justify-center text-center relative library bg-no-repeat bg-cover bg-center '>
      {/* <div className=' relative library bg-no-repeat bg-center rounded-lg max-w-[1024px] max-h-[1024px] min-h-[50%] min-w-[50%] bg-cover'> */}
      <img
        src={"/DylanGPTLogo.png"}
        alt='Logo'
        onClick={() => signIn("google")}
        className='hover:scale-105 rounded-3xl cursor-pointed mx-auto mt-[10%] hover:cursor-pointer max-h-[65%] max-w-[50%] '
      />
      <button
        onClick={() => signIn("google")}
        className=' hover:scale-105 font-bold text-3xl  rounded-3xl  bg-[#343541] text-white px-5 py-3 my-3 max-w-[100%] outline-white outline-1 outline hover:outline-white hover:outline hover:outline-2'
      >
        <span className='animate-pulse  '>Sign In to use DylanGPT</span>
      </button>
      {/* </div> */}
    </div>
  );
}

export default Login;
