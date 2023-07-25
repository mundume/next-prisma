"use client";
import { useState } from "react";
import { AiOutlineRetweet } from "react-icons/ai";
import { useRouter } from "next/navigation";

type Props = {
  userId: string;
  id: string;
  isRetweeted: boolean;
  postId: string;
  retweetedUserId: string;
};
export default function RetweetClient({
  userId,
  id,
  isRetweeted,
  postId,
  retweetedUserId,
}: Props) {
  const [retweeted, setRetweeted] = useState(isRetweeted);
  const router = useRouter();
  const [clicked, setClicked] = useState(false);

  const retweet = async () => {
    if (isRetweeted) return;
    const res = await fetch("/api/retweet", {
      method: "POST",
      body: JSON.stringify({ userId, postId }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err: Error) => {
      console.log(err.message);
    });
    console.log(res);
    setRetweeted(true);
    router.refresh();
  };

  const undoRetweet = async () => {
    if (retweetedUserId === userId) {
      const res = await fetch(`/api/retweet?id=${id}`, {
        method: "DELETE",
      });
      console.log(res);
      setRetweeted(false);
      router.refresh();
    }
  };

  const handleClick = async () => {
    if (!clicked) {
      setClicked(true);
    }

    if (isRetweeted) {
      await undoRetweet();
    } else {
      await retweet();
    }
  };

  const retweetClassName = retweeted
    ? "overflow-hidden text-2xl text-yellow-400 transition duration-200 ease-in-out font-semibold"
    : "text-slate-200 text-2xl transition duration-200 ease-in-out";
  return (
    <button
      type="button"
      className={retweetClassName}
      onClick={handleClick}
      disabled={clicked}
    >
      <AiOutlineRetweet />
    </button>
  );
}
