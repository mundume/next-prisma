import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostCard } from "@/components/ui/components/posts/PostCard";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function Posts() {
  const session = await getServerSession(authOptions);
  const post = await prisma.post.findMany({
    include: {
      user: {
        include: {
          followedBy: true,
          following: true,
        },
      },

      Comment: true,
      likes: true,
      retweets: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="">
      {post.map((post) => (
        //@ts-ignore
        <PostCard
          id={post.id}
          title={post.title}
          date={post.createdAt.toString()}
          key={post.id}
          name={post.user.name!}
          image={post.user.image!}
          userId={post.user.id}
          commentNumber={post.Comment.length}
          retweetsNumber={post.retweets.length}
          likesNumber={post.likes.length}
          followers={post.user.followedBy.length}
          following={post.user.following.length}
          bio={post.user.bio!}
        />
      ))}
    </div>
  );
}
