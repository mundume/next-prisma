import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });

  const body = await req.json();
  const { title }: { title: string } = body;
  const post = await prisma.post.create({
    data: {
      title,
      authorId: userId!.id,
    },
  });

  return NextResponse.json(post);
}
