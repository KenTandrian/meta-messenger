import React from "react";
import { Message } from "src/typings";
import ChatInput from "src/components/ChatInput";
import MessageList from "src/components/MessageList";
import { getServerSession } from "next-auth/next";
import Providers from "./providers";

const HomePage = async () => {
  const data = await fetch(`https://${process.env.VERCEL_URL}/api/messages`, {
    method: "GET",
  }).then((res) => res.json());
  const messages: Message[] = data.messages;
  const session = await getServerSession();

  return (
    <Providers session={session}>
      <main>
        <MessageList initialMessages={messages || []} />
        <ChatInput session={session} />
      </main>
    </Providers>
  );
};

export default HomePage;
