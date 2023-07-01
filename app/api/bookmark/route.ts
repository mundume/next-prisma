import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { userId, postId } = data;
  console.log(data);

  const bookmark = await prisma.bookmark.create({
    data: {
      authorId: userId,
      postId: postId,
    },
  });
  return NextResponse.json(bookmark);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id")!;
  const bookmark = await prisma.bookmark.delete({
    where: {
      id,
    },
  });
  return NextResponse.json(bookmark);
}
