import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const data = await req.json();
  const { userId, postId } = data;
  console.log(data);

  const likes = await prisma.likes.create({
    data: {
      authorId: userId,
      postId: postId,
    },
  });
  return NextResponse.json(likes);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id")!;
  const unlike = await prisma.likes.delete({
    where: {
      id,
    },
  });
  return NextResponse.json(unlike);
}
