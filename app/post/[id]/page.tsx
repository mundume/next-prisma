import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Avatar from "@/app/components/Avatar";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
type Props = {
  params: {
    id: string;
  };
};
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
        },
      },
    },
  });
  return (
    <div className="p-4">
      <div className="flex items-center gap-1">
        <Avatar image={user?.image!} />
        <Link href={`/profile/${user?.id!}`} className="font-bold">
          {user?.name!}
        </Link>
      </div>
      <div className="mx-12 ">
        <small className="px-1 font-semibold text-purple-500 ">
          {currentPost?.title}
        </small>
      </div>
    </div>
  );
}
