import React from "react";

import {
  SunIcon,
  BoltIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

function HomePage() {
  return (
    <div className='flex flex-col items-center justify-center h-screen text-white px-2'>
      <h1 className='text-5xl font-bold mb-20'>DylanGPT</h1>
      <div className='flex space-x-2 text-center'>
        <div>
          <div className='flex flex-col items-center justify-center mb-5'>
            <SunIcon className='h-8 w-8' />
            <h2>Examples</h2>
          </div>

          <div className='space-y-2'>
            <p className='infoText'>
              Explain why single donkeys are kept on farms
            </p>
            <p className='infoText'>
              What is the difference between a dog and a cat
            </p>
            <p className='infoText'>
              What is the most common color of stars in the milky way
            </p>
          </div>
        </div>
        <div>
          <div className='flex flex-col items-center justify-center mb-5'>
            <BoltIcon className='h-8 w-8' />
            <h2>Capabilities</h2>
          </div>

          <div className='space-y-2'>
            <p className='infoText'>Change the DylanGPT model</p>
            <p className='infoText'>Chats are stored in a Firestore database</p>
            <p className='infoText'>
              Hot Toast Notifications while DylanGPT is thinking
            </p>
          </div>
        </div>
        <div>
          <div className='flex flex-col items-center justify-center mb-5'>
            <ExclamationTriangleIcon className='h-8 w-8' />
            <h2>Limitation</h2>
          </div>

          <div className='space-y-2'>
            <p className='infoText'>
              May sometimes make up answers or give false information
            </p>
            <p className='infoText'>May produce biased or harmful content</p>
            <p className='infoText'>
              Has very limited knowledge of events after 2021
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
