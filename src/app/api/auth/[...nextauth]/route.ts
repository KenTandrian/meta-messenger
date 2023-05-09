import NextAuth, { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  pages: { signIn: "/auth/signin" },
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
