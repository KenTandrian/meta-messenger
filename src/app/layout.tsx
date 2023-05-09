import "src/styles/globals.scss";
import Header from "src/components/Header";
import { getServerSession } from "next-auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meta Messenger",
  description: "A messenger app built with Next.js and NextAuth.js",
  icons: "/favicon.ico",
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = async ({ children }: Props) => {
  const session = await getServerSession();

  return (
    <html>
      <head />
      <body>
        <Header session={session} />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
