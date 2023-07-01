import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import FollowClient from "./FollowClient";

type Props = {
  targetUserId: string;
};

export default async function FollowButton({ targetUserId }: Props) {
  const session = await getServerSession(authOptions);
  //get the current user Id
  const currentUserId = await prisma.user
    .findFirst({
      where: {
        email: session?.user?.email!,
      },
    })
    .then((user) => user?.id!);

  //check if the user is following the target user
  const isFollowing = await prisma.follows.findFirst({
    where: { followerId: currentUserId, followingId: targetUserId },
  });

  return (
    <FollowClient
      targetUserId={targetUserId}
      isFollowing={!!isFollowing}
      userId={currentUserId}
    />
  );
}
