"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type Props = {
  targetUserId: string;
  isFollowing: boolean;
  userId: string;
};

export default function FollowClient({
  targetUserId,
  isFollowing,
  userId,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;
  const follow = async () => {
    setIsFetching(true);
    const res = await fetch(`/api/follow`, {
      method: "POST",
      body: JSON.stringify({ targetUserId }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      throw new Error(err);
    });
    setIsFetching(false);
    console.log({ targetUserId });

    startTransition(() => {
      // Refresh the current route:
      // - Makes a new request to the server for the route
      // - Re-fetches data requests and re-renders Server Components
      // - Sends the updated React Server Component payload to the client
      // - The client merges the payload without losing unaffected
      //   client-side React state or browser state
      router.refresh();
    });
  };
  const unfollow = async () => {
    setIsFetching(true);
    const response = await fetch(`/api/follow?targetUserId=${targetUserId}`, {
      method: "DELETE",
    }).catch((err: Error) => {
      throw new Error(err.message);
    });
    console.log(response);
    setIsFetching(false);
    startTransition(() => {
      // Refresh the current route:
      // - Makes a new request to the server for the route
      // - Re-fetches data requests and re-renders Server Components
      // - Sends the updated React Server Component payload to the client
      // - The client merges the payload without losing unaffected
      //   client-side React state or browser state
      router.refresh();
    });
  };
  if (userId === targetUserId) return null;
  if (isFollowing) {
    return (
      <button
        onClick={unfollow}
        className={clsx(
          "inline-flex justify-center px-3.5 py-2 text-sm font-semibold text-purple-400 bg-white border  rounded-md hover:bg-purple-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-200 focus-visible:ring-offset-2 border-purple-400 mr-4"
        )}
      >
        {!isMutating ? "following" : "..."}
      </button>
    );
  } else
    return (
      <button
        onClick={follow}
        className={clsx(
          "inline-flex justify-center px-4 py-2.5 text-sm font-semibold text-white bg-purple-400 border  rounded-md hover:bg-white hover:text-purple-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-200 focus-visible:ring-offset-2 border-purple-400 mr-4"
        )}
      >
        {!isMutating ? "follow" : "..."}
      </button>
    );
}
