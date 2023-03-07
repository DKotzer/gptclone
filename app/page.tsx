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
            <p className='infoText'>List the top things to do in Toronto</p>
            <p className='infoText'>Why should I hire Dylan Kotzer.</p>
            <p className='infoText'>
              Create code for hello world in Python, Javascript and C++.
            </p>
          </div>
        </div>
        <div>
          <div className='flex flex-col items-center justify-center mb-5'>
            <BoltIcon className='h-8 w-8' />
            <h2>Capabilities</h2>
          </div>

          <div className='space-y-2'>
            <p className='infoText'>Find and post images</p>
            <p className='infoText'>Chats are stored in a Firestore database</p>
            <p className='infoText'>
              Advanced text formatting for responses, including code formatting
              and styling.
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
            <p className='infoText'>
              Will frequently post images of the wrong things.
            </p>
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
