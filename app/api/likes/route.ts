import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { userId, postId } = data;
  console.log(data);
  //fix stuff
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
