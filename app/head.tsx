import React from "react";

export default function Head() {
  return (
    <>
      <title>DylanGPT</title>
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
        content='https://gpt.dylankotzer.com/DylanGPTLogo.webp'
      />
      <meta
        name='image'
        property='og:image'
        content='https://gpt.dylankotzer.com/LogoLarge.png'
      />
      <meta property='og:image:width' content='500' />

      <meta property='og:image:height' content='500' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      {/* <meta name='image' property='og:image' content='/layoutLarge.png'></meta> */}
      {/* <meta
        name='image'
        property='og:image'
        content='https://gpt.dylankotzer.com/DylanGPTLogo.webp'
      />
      <meta
        name='image'
        property='og:image'
        content='https://gpt.dylankotzer.com/LogoLarge.png'
      /> */}

      <meta property='og:title' content='DylanGPT' />
      <meta
        property='og:description'
        content='An above average GPT-powered Chatbot created by Dylan Kotzer. Give it a shot!'
      />

      <meta name='author' content='Dylan Kotzer'></meta>
    </>
  );
}

// <meta name='image' property='og:image' content='/layoutLarge.png'></meta>
// <meta
//   name='image'
//   property='og:image'
//   content='https://gpt.dylankotzer.com/DylanGPTLogo.webp'
// />
// <meta property='og:title' content='DylanGPT' />
// <meta
//   property='og:description'
//   content='An above average GPT-powered Chatbot created by Dylan Kotzer. Give it a shot!'
// />
// <head />
// <meta name='author' content='Dylan Kotzer'></meta>
