import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostCard } from "./components/posts/PostCard";

export async function Posts() {
  const session = await getServerSession(authOptions);
  const post = await prisma.post.findMany();

  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div>
      {post.map((post) => (
        //@ts-ignore
        <PostCard
          id={post.id}
          title={post.title}
          content={post.content}
          key={post.id}
        />
      ))}
    </div>
  );
}
