import { Message } from "src/typings";

export const sortByCreatedAt = (a: Message, b: Message) => {
  return a.created_at - b.created_at;
};
