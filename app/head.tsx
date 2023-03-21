import React from "react";

export default function Head() {
  return (
    <>
      <title>DylanGPT</title>
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <link rel='icon' href='/dgpt.png' />
      <meta
        property='og:image'
        content='https://gpt.dylankotzer.com/DylanGPTLogo.png'
      />
      <meta property='og:title' content='DylanGPT' />
      <meta name='description' content='A cutting edge AI-powered Chatbot' />
      <meta
        property='description'
        content='A cutting edge AI-powered Chatbot'
      />

      <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark-reasonable.min.css'
      />
    </>
  );
}
