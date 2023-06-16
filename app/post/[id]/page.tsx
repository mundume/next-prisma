import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Avatar from "@/app/components/Avatar";
import Comments from "@/app/components/comment/Comments";
import AddComment from "@/app/components/comment/add-comments";
import { prisma } from "@/lib/prisma";
import { ArrowUpLeft } from "lucide-react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });
  return { title: ` ${user?.name} BooBer Posts` };
}
export default async function page({ params }: Props) {
  const currentPost = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
    include: {
      user: true,
      likes: true,
    },
  });
  const comments = await prisma.comment.findMany({
    where: {
      postId: params.id,
    },
    include: {
      user: true,
      post: true,
    },
  });
  return (
    <section className="p-4 m-2 rounded">
      <Link href="/" className="flex items-center gap-1 py-3">
        <ArrowUpLeft />
        <p>Back</p>
      </Link>
      <section role="div" className="flex items-center gap-1">
        <Avatar
          image={currentPost?.user?.image!}
          name={currentPost?.user?.name!}
        />
        <Link href={`/profile/${currentPost?.user?.id}`} className="font-bold">
          {currentPost?.user?.name!}
        </Link>
      </section>
      <section role="div" className="flex items-center py-2">
        <p className="px-1 font-medium text-purple-500 ">
          {currentPost?.title}
        </p>
      </section>
      {comments.map((comment) => (
        <Comments
          comment={comment.content!}
          key={comment.id}
          image={comment.user.image!}
          name={comment.user.name!}
          date={comment.createdAt.toString()!}
          postId={currentPost?.id!}
          userId={comment.user?.id!}
        />
      ))}
      <AddComment id={params.id} />
    </section>
  );
}
