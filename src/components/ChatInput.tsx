"use client";
import { Session } from "next-auth";
import React, { useState } from "react";
import useSWR from "swr";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import fetcher from "../utils/fetchMessages";

type Props = {
  session: Session | null;
};

const ChatInput = ({ session }: Props) => {
  const [input, setInput] = useState("");
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);

  const addMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || !session) return;

    const messageToSend = input;
    setInput("");

    const id = uuid();
    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!,
    };
    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }).then((resp) => resp.json());

      return [data.message, ...messages!];
    };
    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };

  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 w-full flex px-8 py-4 space-x-2 border-t bg-white border-gray-100"
    >
      <input
        type="text"
        value={input}
        disabled={!session}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter message here..."
        className="
          flex-1 rounded border border-gray-300 focus:outline-none 
          focus:ring-2 focus:ring-blue-600 focus:border-transparent px-4 py-2
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      />
      <button
        type="submit"
        disabled={!input}
        className="
          bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded 
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
