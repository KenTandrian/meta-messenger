import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoutBtn from "./LogoutBtn";

type Props = {
  session: Session | null;
};

const Header = ({ session }: Props) => {
  if (session)
    return (
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-5 shadow-sm">
        <div className="flex space-x-2">
          <Image
            className="rounded-full mx-2 object-contain"
            draggable={false}
            height={10}
            width={50}
            src={session.user?.image || "/meta.webp"}
            alt="Profile Picture"
          />
          <div>
            <p className="text-blue-400">Logged in as:</p>
            <p className="font-bold text-lg">{session.user?.name}</p>
          </div>
        </div>
        <LogoutBtn />
      </header>
    );

  return (
    <header className="sticky top-0 z-50 bg-white flex justify-center items-center p-5 shadow-sm">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items-center">
          <Image
            alt="Logo"
            draggable={false}
            height={50}
            width={50}
            src="/meta.webp"
          />
          <p className="text-blue-400">Welcome to Meta Messenger!</p>
        </div>
        <Link
          href="/auth/signin"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default Header;
