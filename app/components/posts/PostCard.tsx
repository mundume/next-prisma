import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { getServerSession } from "next-auth";
import Avatar from "../Avatar";
import { relativeDate } from "@/utils/utils";
import { BiCommentDots } from "react-icons/bi";
import LikeButton from "../likes/LikeButton";
import RetweetButton from "../retweet/RetweetButton";

type Props = {
  title: string;
  content?: string;
  id: string;
  date: string;
  name: string;
  userId: string;
  image: string;
  commentNumber: number;
  likesNumber: number;
};
export async function PostCard({
  title,
  id,
  date,
  name,
  userId,
  image,
  commentNumber,
  likesNumber,
}: Props) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  return (
    <div className="text-gray-600">
      <div className="flex flex-col justify-around p-4 mx-2 my-3 min-h-[250px] border rounded ">
        <div className="flex items-center justify-between gap-1 ">
          <div className="flex items-center gap-1">
            <Avatar image={image!} name={name!} />
            <Link href={`/profile/${userId!}`} className="font-semibold ">
              {name!}
            </Link>
          </div>
          <small className="flex items-center text-sm font-normal text-yellow-500 ">
            {relativeDate(date)}
          </small>
        </div>
        <div className="mx-12">
          <Link
            href={`/post/${id}`}
            className="px-1 font-medium text-purple-600"
          >
            {title}
          </Link>
        </div>
        <div className="flex items-center justify-between py-3 px-[50px]">
          <Link href={`/post/${id}`} className="flex items-center gap-1">
            <BiCommentDots className="overflow-hidden text-2xl text-emerald-500" />
            {commentNumber}
          </Link>

          <p className="flex items-center gap-1">
            {/* @ts-ignore */}
            <RetweetButton className="text-2xl text-yellow-400" postId={id} />
          </p>
          <p className="flex items-center gap-1">
            {/* @ts-ignore */}
            <LikeButton postId={id} />
            {likesNumber}
          </p>
        </div>
      </div>
    </div>
  );
}
