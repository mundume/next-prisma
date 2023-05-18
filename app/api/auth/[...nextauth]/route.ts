import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
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
