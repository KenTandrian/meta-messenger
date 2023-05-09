import { NextRequest, NextResponse } from "next/server";
import { serverPusher } from "src/pusher";
import redis from "src/redis";
import { Message } from "src/typings";

export const runtime = "edge";

export async function GET() {
  try {
    const messagesRes = await redis.hvals("messages");
    const messages: Message[] = messagesRes
      .map((message) => JSON.parse(message))
      .sort((a, b) => a.created_at - b.created_at);
    return NextResponse.json({ messages }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { body: error.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;
    if (!message) return new NextResponse("No message.", { status: 400 });

    const newMessage: Message = {
      ...message,
      // Replace the timestamp of the user to the timestamp of the server
      created_at: Date.now(),
    };
    // Push to Upstash Redis DB
    await redis.hset("messages", message.id, JSON.stringify(newMessage));
    serverPusher.trigger("messages", "new-message", newMessage);
    return NextResponse.json({ message: newMessage }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { body: error.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH() {
  return new NextResponse("Method not Allowed", { status: 405 });
}

export async function PUT() {
  return new NextResponse("Method not Allowed", { status: 405 });
}

export async function DELETE() {
  return new NextResponse("Method not Allowed", { status: 405 });
}
