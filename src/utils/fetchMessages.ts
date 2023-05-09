import { Message } from "src/typings";

const fetcher = async () => {
  const res = await fetch("/api/messages", { method: "GET" });
  const data = await res.json();
  const messages: Message[] = data.messages || [];
  return messages;
};

export default fetcher;
