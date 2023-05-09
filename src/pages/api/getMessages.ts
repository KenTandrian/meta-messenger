// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";
import { Message } from "../../typings";

type Data = {
  messages: Message[];
};

type ErrorData = {
  body: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== "GET") {
    res.status(405).json({ body: "Method not Allowed" });
    return;
  }
  try {
    const messagesRes = await redis.hvals("messages");
    const messages: Message[] = messagesRes
      .map((message) => JSON.parse(message))
      .sort((a, b) => a.created_at - b.created_at);
    res.status(200).json({ messages });
  } catch (error: any) {
    res.status(500).json({ body: error.message ?? "Internal Server Error" });
  }
}
