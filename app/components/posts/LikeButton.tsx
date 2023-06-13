import { prisma } from "@/lib/prisma";
import LikeClient from "./LikeClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function LikeButton({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) {
  const session = await getServerSession(authOptions);
  const currentEmail = session?.user?.email;
  if (!session) {
    redirect("/api/auth/signin");
  }

  // check if the user has already liked the post
  const isLiked = await prisma.likes.findFirst({
    where: {
      authorId: userId,
      postId: postId,
    },
  });

  return (
    <LikeClient
      userId={userId}
      postId={postId}
      isLiked={!!isLiked}
      id={isLiked?.id!}
    />
  );
}
