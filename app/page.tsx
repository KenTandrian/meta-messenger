import React from "react";
import { Message } from "../typings";
import ChatInput from "../components/ChatInput";
import MessageList from "../components/MessageList";
import { unstable_getServerSession } from "next-auth/next";
import Providers from "./providers";

const HomePage = async () => {
  const data = await fetch(`${process.env.VERCEL_URL}/api/getMessages`).then(
    (res) => res.json()
  );
  const messages: Message[] = data.messages;
  const session = await unstable_getServerSession();

  return (
    <Providers session={session}>
      <main>
        <MessageList initialMessages={messages} />
        <ChatInput session={session} />
      </main>
    </Providers>
  );
};

export default HomePage;
