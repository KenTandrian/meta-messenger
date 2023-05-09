import React from "react";
import { getProviders } from "next-auth/react";
import Image from "next/image";
import SignInComponent from "./SignInComponent";

const SignInPage = async () => {
  const providers = await getProviders();

  return (
    <div className="grid justify-center">
      <div>
        <Image
          className="mx-2 p-16 object-cover"
          draggable={false}
          width={350}
          height={350}
          src="/messenger.webp"
          alt="Profile Picture"
        />
      </div>
      <SignInComponent providers={providers} />
    </div>
  );
};

export default SignInPage;
