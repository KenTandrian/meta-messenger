import React from "react";
import { Message } from "../typings";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

const HomePage = async () => {
  const data = await fetch(`${process.env.VERCEL_URL}/api/getMessages`).then(
    (res) => res.json()
  );

  const messages: Message[] = data.messages;
  return (
    <main>
      <MessageList initialMessages={messages} />
      <ChatInput />
    </main>
  );
};

export default HomePage;
