import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Avatar from "@/app/components/Avatar";
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
  const session = await getServerSession(authOptions);
  const email = session?.user?.email!;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const currentPost = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
          id: true,
        },
      },
    },
  });
  return (
    <div className="p-4">
      <Link href="/" className="flex items-center gap-1 py-3">
        <ArrowUpLeft />
        <p>Back</p>
      </Link>
      <div className="flex items-center gap-1">
        <Avatar image={currentPost?.author?.image!} />
        <Link href={`/profile/${currentPost?.author.id}`} className="font-bold">
          {currentPost?.author?.name!}
        </Link>
      </div>
      <div className="mx-12 ">
        <p className="px-1 font-medium text-purple-500 ">
          {currentPost?.title}
        </p>
      </div>
    </div>
  );
}
