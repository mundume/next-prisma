import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { getServerSession } from "next-auth";
import Avatar from "../Avatar";
import { relativeDate } from "@/utils/utils";
import { MessageSquare } from "lucide-react";
import { Heart } from "lucide-react";

type Props = {
  title: string;
  content?: string;
  id: string;
  date: string;
  name: string;
  userId: string;
  image: string;
  commentNumber: number;
};
export async function PostCard({
  title,
  id,
  date,
  name,
  userId,
  image,
  commentNumber,
}: Props) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  return (
    <div className="p-4 mx-2 my-3 border rounded ">
      <div className="flex items-center justify-between gap-1 ">
        <div className="flex items-center gap-1">
          <Avatar image={image!} />
          <Link href={`/profile/${userId!}`} className="font-semibold ">
            {name!}
          </Link>
        </div>
        <small className="flex items-center ">{relativeDate(date)}</small>
      </div>
      <div className="mx-12">
        <Link href={`/post/${id}`} className="px-1 font-medium text-purple-600">
          {title}
        </Link>
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <Link href={`/post/${id}`} className="flex items-center gap-1">
          <MessageSquare />
          {commentNumber}
        </Link>
        <Heart />
      </div>
    </div>
  );
}
