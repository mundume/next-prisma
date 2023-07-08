import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import BookmarkClient from "./bookmarkClient";
import { authOptions } from "@/utils/auth";

type Props = {
  postId: string;
};
export default async function BookMarkButton({ postId }: Props) {
  const session = await getServerSession(authOptions);
  const currentEmail = session?.user?.email;
  if (currentEmail === undefined || currentEmail === null) return;
  const currentUserId = await prisma.user
    .findUnique({
      where: {
        email: currentEmail!,
      },
    })
    .then((user) => user?.id);

  const isBookmarked = await prisma.bookmark.findFirst({
    where: {
      authorId: currentUserId,
      postId: postId,
    },
    include: {
      user: true,
    },
  });

  return (
    <BookmarkClient
      userId={currentUserId!}
      id={isBookmarked?.id!}
      isBookmarked={!!isBookmarked}
      postId={postId}
      bookmarkedUserId={isBookmarked?.user.id!}
    />
  );
}
