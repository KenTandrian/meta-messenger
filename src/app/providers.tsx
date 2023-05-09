"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

const Providers = ({ session, children }: any) => {
  return (
    <SessionProvider session={session}>
      {session ? (
        children
      ) : (
        <p className="text-center m-10">
          You need to be signed up to use the app.
        </p>
      )}
    </SessionProvider>
  );
};

export default Providers;
