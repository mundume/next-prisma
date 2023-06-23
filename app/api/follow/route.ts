import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const currentEmail = session?.user?.email!;
  // id for the user that is to be followed from the client
  const { targetUserId } = await req.json();
  console.log(targetUserId);
  //id for the current user (fetched from prismadb)
  const currentUserId = await prisma.user
    .findUnique({
      where: {
        email: currentEmail,
      },
    })
    .then((user) => user?.id!);
  //create a record in the follows table that the follower id is equal to the current user id and the following id is equal to the target user id
  const record = await prisma.follows.create({
    data: {
      followerId: currentUserId,
      followingId: targetUserId as string,
    },
  });
  return NextResponse.json(record);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const currentEmail = session?.user?.email!;
  // id for the user that is to be unfolowed which is extracted from the URL using the NextUrl object
  const targetUserId = req.nextUrl.searchParams.get("targetUserId");
  console.log(targetUserId);
  //grab the current user id from the database using the email of the current user and get the id through the returned promise by findUnique
  const currentUserId = await prisma.user
    .findUnique({
      where: {
        email: currentEmail,
      },
    })
    .then((user) => user?.id!);
  //delete the record in the follows table where the follower id is equal to the current user id and the following id is equal to the target user id
  const record = await prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId: currentUserId,
        followingId: targetUserId!,
      },
    },
  });
  return NextResponse.json(record);
}
