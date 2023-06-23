import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export const runtime = 'edge'

export async function GET() {
  const session = await getServerSession(authOptions);
  const profileData = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });

  return NextResponse.json(profileData);
}
