"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";

export default function LikeClient({
  userId,
  postId,
  isLiked,
  id,
  LikedUserId,
}: {
  userId: string;
  postId: string;
  isLiked: boolean;
  id: string;
  LikedUserId: string;
}) {
  const [liked, setLiked] = useState(isLiked);
  const router = useRouter();
  const like = async () => {
    const res = await fetch("/api/likes", {
      method: "POST",
      body: JSON.stringify({ userId, postId }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      throw new Error(err.message);
    });

    router.refresh();
    setLiked(true);
  };
  const unlike = async () => {
    console.log(LikedUserId, userId);
    if (LikedUserId === userId) {
      const res = await fetch(`/api/likes?id=${id}`, {
        method: "DELETE",
      });
      console.log(res);
      router.refresh();
      setLiked(false);
    } else {
      console.log(" cant unlike");
    }
  };
  return (
    <AiFillHeart
      onClick={isLiked ? unlike : like}
      className={
        liked
          ? "overflow-hidden text-2xl text-purple-400 transition duration-200 ease-in-out"
          : "text-slate-200 text-2xl transition duration-200 ease-in-out"
      }
    />
  );
}
