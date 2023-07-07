import { prisma } from "@/lib/prisma";
import LikeClient from "./LikeClient";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/auth";

export default async function LikeButton({ postId }: { postId: string }) {
  const session = await getServerSession(authOptions);
  const currentEmail = session?.user?.email;
  if (!session) {
    redirect("/signin");
  }
  const userId = await prisma.user
    .findUnique({
      where: {
        email: currentEmail!,
      },
    })
    .then((user) => user?.id!);

  // check if the user has already liked the post
  const isLiked = await prisma.likes.findFirst({
    where: {
      authorId: userId,
      postId: postId,
    },
    include: {
      user: true,
    },
  });

  return (
    <LikeClient
      userId={userId}
      postId={postId}
      isLiked={!!isLiked}
      id={isLiked?.id!}
      LikedUserId={isLiked?.user.id!}
    />
  );
}
