import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { userId, postId } = data;
  console.log(data);

  const likes = await prisma.retweets.create({
    data: {
      authorId: userId,
      postId: postId,
    },
  });
  return NextResponse.json(likes);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id")!;
  const unlike = await prisma.retweets.delete({
    where: {
      id,
    },
  });
  return NextResponse.json(unlike);
}
