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
  const retweet = async () => {
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

  return (
    <AiOutlineRetweet
      className={
        retweeted
          ? "overflow-hidden text-2xl text-yellow-400 transition duration-200 ease-in-out font-semibold"
          : "text-slate-200 text-2xl transition duration-200 ease-in-out"
      }
      onClick={isRetweeted ? undoRetweet : retweet}
    />
  );
}
