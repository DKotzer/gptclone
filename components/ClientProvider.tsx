"use client";
import { Toaster } from "react-hot-toast";

function ClientProvider() {
  return (
    <>
      <Toaster
        // position='top-center'
        containerStyle={{
          top: 35,
        }}
      ></Toaster>
    </>
  );
}

export default ClientProvider;
