import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostCard } from "./components/posts/PostCard";

export async function Posts() {
  const session = await getServerSession(authOptions);
  const post = await prisma.post.findMany({
    include: {
      user: true,
      Comment: true,
      likes: true,
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
          likesNumber={post.likes.length}
        />
      ))}
    </div>
  );
}
