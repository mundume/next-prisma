import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Post } from "@prisma/client";
import Link from "next/link";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Avatar from "../Avatar";
import { relativeDate } from "@/utils/utils";

type Props = {
  title: string;
  content?: string;
  id: string;
  date: string;
};
export async function PostCard({ title, content, id, date }: Props) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const user = await prisma.user.findUnique({
    where: {
      email: email!,
    },
  });

  return (
    <div className="p-4 mx-2 my-3 border rounded ">
      <div className="flex items-center justify-between gap-1 ">
        <div className="flex items-center gap-1">
          <Avatar image={user?.image!} />
          <Link href={`/profile/${user?.id!}`} className="font-semibold ">
            {user?.name!}
          </Link>
        </div>
        <small className="flex items-center ">{relativeDate(date)}</small>
      </div>
      <div className="mx-12">
        <Link href={`/post/${id}`} className="px-1 font-medium text-purple-600">
          {title}
        </Link>
      </div>
    </div>
  );
}
