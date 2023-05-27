import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const currentEmail = session?.user?.email!;
  const data = await req.json();

  const post = await prisma.post.create({
    data: {
      author: {
        connect: {
          email: currentEmail,
        },
      },
      ...data,
    },
  });

  return NextResponse.json(post);
}
