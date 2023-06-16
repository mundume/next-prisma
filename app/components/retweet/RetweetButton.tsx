import { prisma } from "@/lib/prisma";
import RetweetClient from "./RetweetClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type Props = {
  postId: string;
};
export default async function RetweetButton({ postId }: Props) {
  const session = await getServerSession(authOptions);
  const currentEmail = session?.user?.email;
  const currentUserId = await prisma.user
    .findUnique({
      where: {
        email: currentEmail!,
      },
    })
    .then((user) => user?.id);

  const isRetweeted = await prisma.retweets.findFirst({
    where: {
      authorId: currentUserId,
      postId: postId,
    },
    include: {
      user: true,
    },
  });

  return (
    <RetweetClient
      userId={currentUserId!}
      id={isRetweeted?.id!}
      isRetweeted={!!isRetweeted}
      postId={postId}
      retweetedUserId={isRetweeted?.user.id!}
    />
  );
}
