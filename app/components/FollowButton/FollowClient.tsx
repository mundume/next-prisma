"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type Props = {
  targetUserId: string;
  isFollowing: boolean;
};

export default function FollowClient({ targetUserId, isFollowing }: Props) {
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
    });
    console.log(response);
  };
  if (isFollowing) {
    return (
      <button
        onClick={unfollow}
        className={clsx("bg-yellow-400 text-white px-2 py-2 rounded-md")}
      >
        {!isMutating ? "Unfollow" : "..."}
      </button>
    );
  } else
    return (
      <button
        onClick={follow}
        className={clsx("bg-yellow-400 text-white rounded-md px-1 py-2")}
      >
        {!isMutating ? "Follow" : "..."}{" "}
      </button>
    );
}
