"use client";
import { useState } from "react";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

type Props = {
  userId: string;
  id: string;
  isBookmarked: boolean;
  postId: string;
  bookmarkedUserId: string;
};
export default function BookmarkClient({
  userId,
  id,
  isBookmarked,
  postId,
  bookmarkedUserId,
}: Props) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [clicked, setClicked] = useState(false);

  const router = useRouter();
  const bookmark = async () => {
    const res = await fetch("/api/bookmark", {
      method: "POST",
      body: JSON.stringify({ userId, postId }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err: Error) => {
      console.log(err.message);
    });
    console.log(res);
    setBookmarked(true);
    router.refresh();
  };

  const undoBookmark = async () => {
    if (bookmarkedUserId === userId) {
      const res = await fetch(`/api/retweet?id=${id}`, {
        method: "DELETE",
      });
      console.log(res);
      setBookmarked(false);
      router.refresh();
    }
  };

  const handleClick = async () => {
    if (!clicked) {
      setClicked(true);
    }

    if (bookmarked) {
      await undoBookmark();
    } else {
      await bookmark();
    }
  };
  const bookMarkClassName = bookmarked
    ? "overflow-hidden text-2xl text-yellow-400 transition duration-200 ease-in-out font-semibold"
    : "text-slate-200 text-2xl transition duration-200 ease-in-out";
  return (
    <button
      className={bookMarkClassName}
      onClick={isBookmarked ? undoBookmark : bookmark}
      disabled={clicked}
    >
      <BsFillBookmarkFill />
    </button>
  );
}
