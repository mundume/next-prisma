import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = 'edge'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;
  const currentUserId = await prisma.user
    .findUnique({
      where: {
        email: currentUserEmail,
      },
    })
    .then((userId) => userId?.id);
  const data = await req.json();
  const { title, id }: { title: string; id: string } = data;
  const comment = await prisma.comment.create({
    data: {
      content: title!,
      postId: id!,
      authorId: currentUserId!,
    },
    include: {
      user: true,
      post: true,
    },
  });

  return NextResponse.json(comment);
}
