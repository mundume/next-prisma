import { relativeDate } from "@/utils/utils";
import Avatar from "../Avatar";
import Link from "next/link";

type User = {
  name: string;
  image: string;
  comment: string;
  date: string;
  postId: string;
  userId: string;
};

export default function Comments({ comment, name, image, date, userId }: User) {
  return (
    <div className="px-4 py-2 my-2 text-gray-500 border rounded">
      <section className="flex items-center gap-1 ">
        <Avatar image={image} />
        <div className="flex items-center gap-2 ">
          <Link
            href={`/profile/${userId}`}
            className="font-bold text-gray-800 "
          >
            {name}
          </Link>
          <p className="text-sm font-normal text-yellow-500">
            {relativeDate(date)}
          </p>
        </div>
      </section>
      <article className="">{comment}</article>
    </div>
  );
}
