import React from "react";

export default function Head() {
  return (
    <>
      <title>DylanGPT</title>
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='description' content='An AI-powered Chatbot' />
      <link rel='icon' href='/dgpt.png' />
      <meta property='og:image' content='/DylanGPTLogo.png' />

      <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark-reasonable.min.css'
      />
    </>
  );
}
