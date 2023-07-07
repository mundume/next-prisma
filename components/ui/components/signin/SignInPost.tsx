import { BiCommentDots } from "react-icons/bi";
import Avatar from "../Avatar";
import { relativeDate } from "@/utils/utils";
import { AiFillHeart, AiOutlineRetweet } from "react-icons/ai";

type Props = {
  title: string;
  id: string;
  date: string;
  name: string;
  userId: string;
  image: string;
  commentNumber: number;
  likesNumber: number;

  retweetsNumber: number;
};
export default function SignInPost({
  title,
  id,
  date,
  name,
  userId,
  image,
  commentNumber,
  likesNumber,
  retweetsNumber,
}: Props) {
  return (
    <div className="text-gray-600">
      <div className="flex flex-col justify-around p-2 mx-2 my-3 min-h-[140px] border rounded ">
        <div className="flex items-center justify-between gap-1 ">
          <div className="flex items-center gap-1">
            <Avatar image={image!} name={name!} />
            <p className="font-semibold ">{name!}</p>
          </div>
          <small className="flex items-center text-sm font-normal text-yellow-500 ">
            {relativeDate(date)}
          </small>
        </div>
        <div className="mx-12">
          <p className="px-1 font-medium text-purple-600">{title}</p>
        </div>
        <div className="flex items-center justify-between py-3 px-[50px]">
          <p className="flex items-center gap-1">
            <BiCommentDots className="overflow-hidden text-2xl text-emerald-500" />
            {commentNumber}
          </p>

          <p className="flex items-center gap-1 text-gray-600">
            <AiOutlineRetweet className="overflow-hidden text-2xl font-semibold text-yellow-400 transition duration-200 ease-in-out" />
            {retweetsNumber}
          </p>
          <p className="flex items-center gap-1">
            <AiFillHeart className="overflow-hidden text-2xl text-purple-400 transition duration-200 ease-in-out" />
            {likesNumber}
          </p>
        </div>
      </div>
    </div>
  );
}
