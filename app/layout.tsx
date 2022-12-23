import "../styles/globals.scss";
import Header from "../components/Header";
import { unstable_getServerSession } from "next-auth";

type Props = {
  children: React.ReactNode;
};

const RootLayout = async ({ children }: Props) => {
  const session = await unstable_getServerSession();

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
