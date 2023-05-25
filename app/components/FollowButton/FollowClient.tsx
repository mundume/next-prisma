"use client";

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
  async function follow() {
    setIsFetching(true);
    const res = await fetch(`/api/follow/${targetUserId}`, {
      method: "POST",
      body: JSON.stringify({ targetUserId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);

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
  }
  async function unfollow() {
    setIsFetching(true);
    const response = await fetch(`/api/follow/${targetUserId}`, {
      method: "DELETE",
    });
    console.log(response);
  }
  if (isFollowing) {
    return (
      <button onClick={unfollow}>{!isMutating ? "Unfollow" : "..."}</button>
    );
  } else
    return <button onClick={follow}>{!isMutating ? "Follow" : "..."} </button>;
}
