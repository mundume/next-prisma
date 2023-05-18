import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const scopes = ["identify"].join(" ");
export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_APP_ID!,
      clientSecret: process.env.DISCORD_SECRET!,
      authorization: {},
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
