import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: "1528643",
  key: "8260cc5ac7af636c78a8",
  secret: process.env.PUSHER_SECRET || "",
  cluster: "ap1",
  useTLS: true,
});

export const clientPusher = new ClientPusher("8260cc5ac7af636c78a8", {
  cluster: "ap1",
  forceTLS: true,
});
