import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Post } from "@prisma/client";
import Link from "next/link";
import { getServerSession } from "next-auth";
import Image from "next/image";

type Props = {
  title: string;
  content: string;
  id: string;
};
export async function PostCard({ title, content, id }: Props) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const user = await prisma.user.findUnique({
    where: {
      email: email!,
    },
  });

  return (
    <div className="block">
      <div className="flex items-center gap-1 ">
        <div className="avatar">
          <div className="w-12 border rounded-full">
            <img src={user?.image!} alt="null" />
          </div>
        </div>
        <Link href={`/profile/${user?.id!}`}>{user?.name!}</Link>
      </div>
    </div>
  );
}
