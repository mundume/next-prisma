import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect("/signin");
  }
  const profileData = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });

  return NextResponse.json(profileData);
}
