"use client";

import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";

function FAQPage() {
  const { data: session } = useSession();
  const [box1, setBox1] = useState(false);
  const [box2, setBox2] = useState(false);
  const [box3, setBox3] = useState(false);
  const [box4, setBox4] = useState(false);
  const [box5, setBox5] = useState(false);

  return (
    <div className='h-full bg-slate-700 z-100'>
      <div className='h-screen faqScroll overflow-x-auto overflow-y-auto z-1 '>
        <div className=' flex flex-col items-center justify-center sm:px-5 px-6 z-20 pb-5 '>
          <div className='py-10 md:py-15 text-center'>
            <h1
              role='heading'
              className='xl:text-6xl md:text-5xl text-xl font-bold text-white'
            >
              Frequently asked questions
            </h1>
          </div>
          <div className='lg:w-1/2 md:w-8/12 sm:w-9/12 w-full'>
            <div
              className='bg-white shadow rounded p-5 hover:cursor-pointer'
              onClick={() => setBox1(!box1)}
            >
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-base font-semibold leading-none text-gray-800'>
                    How does DylanGPT work?
                  </h2>
                </div>
                <button
                  onClick={() => setBox1(!box1)}
                  className='focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ring-offset-white cursor-pointer'
                >
                  {box1 ? (
                    <svg
                      role='button'
                      aria-label='close dropdown'
                      width='10'
                      height='6'
                      viewBox='0 0 10 6'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M1 5L5 1L9 5'
                        stroke='#4B5563'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  ) : (
                    <svg
                      width='10'
                      role='button'
                      aria-label='open dropdown'
                      height='6'
                      viewBox='0 0 10 6'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M1 1L5 5L9 1'
                        stroke='#4B5563'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  )}
                </button>
              </div>

              {box1 && (
                <ul className=''>
                  <li>
                    <p className='text-base leading-normal text-gray-600 mt-4'>
                      DylanGPT is fine-tuned from gpt-4, a language model
                      trained to produce text. GPT 3.5 was optimized for
                      dialogue by using Reinforcement Learning with Human
                      Feedback (RLHF) – a method that uses human demonstrations
                      and preference comparisons to guide the model toward
                      desired behavior. DylanGPT uses gpt-4 to do the heavy
                      lifting, but integrates other APIS and data to give
                      DylanGPT capabilities that ChatGPT Does not, such as
                      posting images.
                    </p>
                  </li>
                </ul>
              )}
            </div>
            <div
              className='bg-white shadow rounded p-8 mt-8 hover:cursor-pointer'
              onClick={() => setBox2(!box2)}
            >
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-base font-semibold leading-none text-gray-800'>
                    Why does the AI seem so real and lifelike?
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setBox2(!box2);
                  }}
                  data-menu
                  className='focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ring-offset-white cursor-pointer'
                >
                  {box2 ? (
                    <svg
                      role='button'
                      aria-label='close dropdown'
                      width='10'
                      height='6'
                      viewBox='0 0 10 6'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M1 5L5 1L9 5'
                        stroke='#4B5563'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  ) : (
                    <svg
                      width='10'
                      role='button'
                      aria-label='open dropdown'
                      height='6'
                      viewBox='0 0 10 6'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M1 1L5 5L9 1'
                        stroke='#4B5563'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  )}
                </button>
              </div>
              {box2 && (
                <ul>
                  <li>
                    <p className='text-base leading-normal text-gray-600 mt-4 '>
                      {`These models were trained on vast amounts of data from the
                      internet written by humans, including conversations, so
                      the responses it provides may sound human-like. It is
                      important to keep in mind that this is a direct result of
                      the system's design (i.e. maximizing the similarity
                      between outputs and the dataset the models were trained
                      on) and that such outputs may be inaccurate, untruthful,
                      and otherwise misleading at times.`}
                    </p>
                  </li>
                </ul>
              )}
            </div>
            <div
              className='bg-white shadow rounded p-8 mt-8 hover:cursor-pointer'
              onClick={() => setBox3(!box3)}
            >
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-base font-semibold leading-none text-gray-800'>
                    Can I trust that the AI is telling me the truth?
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setBox3(!box3);
                  }}
                  data-menu
                  className='focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ring-offset-white cursor-pointer'
                >
                  {box3 ? (
                    <svg
                      role='button'
                      aria-label='close dropdown'
                      width='10'
                      height='6'
                      viewBox='0 0 10 6'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M1 5L5 1L9 5'
                        stroke='#4B5563'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  ) : (
                    <svg
                      width='10'
                      role='button'
                      aria-label='open dropdown'
                      height='6'
                      viewBox='0 0 10 6'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M1 1L5 5L9 1'
                        stroke='#4B5563'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  )}
                </button>
              </div>
              {box3 && (
                <ul>
                  <li>
                    <p className='text-base leading-normal text-gray-600 mt-4 '>
                      {`DylanGPT is not connected to the internet, and it can
                      occasionally produce incorrect answers. It has limited
                      knowledge of world and events after 2021 and may also
                      occasionally produce harmful instructions or biased
                      content. We'd recommend checking whether responses from
                      the model are accurate or not.`}
                    </p>
                  </li>
                </ul>
              )}
            </div>
            <div
              className='bg-white shadow rounded p-8 mt-8 hover:cursor-pointer'
              onClick={() => setBox4(!box4)}
            >
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-base font-semibold leading-none text-gray-800'>
                    Where can we find information about you?
                  </h2>
                </div>
                <button
                  onClick={() => setBox4(!box4)}
                  data-menu
                  className='focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ring-offset-white cursor-pointer'
                >
                  {box4 ? (
                    <svg
                      role='button'
                      aria-label='close dropdown'
                      width='10'
                      height='6'
                      viewBox='0 0 10 6'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M1 5L5 1L9 5'
                        stroke='#4B5563'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  ) : (
                    <svg
                      width='10'
                      role='button'
                      aria-label='open dropdown'
                      height='6'
                      viewBox='0 0 10 6'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M1 1L5 5L9 1'
                        stroke='#4B5563'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  )}
                </button>
              </div>
              {box4 && (
                <ul>
                  <li>
                    <p className='text-base leading-normal text-gray-600 mt-4 '>
                      You can find more information about me on my{" "}
                      <a
                        href='https://www.dylankotzer.com/#/overview'
                        className='text-blue-300 underline'
                      >
                        website.
                      </a>
                      Or a link to my linkedin on the sidebar, or click{" "}
                      <a
                        href='https://www.linkedin.com/in/dylan-kotzer-3a5421190/'
                        className='text-blue-400 underline'
                      >
                        here.
                      </a>
                    </p>
                  </li>
                </ul>
              )}
            </div>
            <div
              className='bg-white shadow rounded p-8 mt-8 hover:cursor-pointer'
              onClick={() => setBox5(!box5)}
            >
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-base font-semibold leading-none text-gray-800'>
                    Where can we find information about you?
                  </h2>
                </div>
                <button
                  onClick={() => setBox5(!box5)}
                  data-menu
                  className='focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ring-offset-white cursor-pointer'
                >
                  {box5 ? (
                    <svg
                      role='button'
                      aria-label='close dropdown'
                      width='10'
                      height='6'
                      viewBox='0 0 10 6'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M1 5L5 1L9 5'
                        stroke='#4B5563'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  ) : (
                    <svg
                      width='10'
                      role='button'
                      aria-label='open dropdown'
                      height='6'
                      viewBox='0 0 10 6'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M1 1L5 5L9 1'
                        stroke='#4B5563'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  )}
                </button>
              </div>
              {box5 && (
                <ul>
                  <li>
                    <p className='text-base leading-normal text-gray-600 mt-4 '>
                      You can find more information about me on my{" "}
                      <a
                        href='https://www.dylankotzer.com/#/overview'
                        className='text-blue-300 underline'
                      >
                        website.
                      </a>
                      Or a link to my linkedin on the sidebar, or click{" "}
                      <a
                        href='https://www.linkedin.com/in/dylan-kotzer-3a5421190/'
                        className='text-blue-400 underline'
                      >
                        here.
                      </a>
                    </p>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>{" "}
        <img
          src='https://i.imgur.com/WfaTJdw.png'
          alt='blue pattern background'
          className='mx-auto max-w-[66%] object-center   z-0'
        />{" "}
      </div>
      {/* <div className='h-[80px] lg:h-[25px]' /> */}
    </div>
  );
}

export default FAQPage;
