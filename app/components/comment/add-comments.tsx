"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function AddComment({ id }: { id: string }) {
  const router = useRouter();

  const clearInput = useRef<HTMLInputElement>(null);
  async function addComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = {
      title: formData.get("comment") as string,
      id: id,
    };
    if (body.title === "") {
      throw new Error("Comment cannot be empty");
    }

    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await response.json();
    clearInput.current!.value = "";

    router.refresh();
  }

  return (
    <form onSubmit={addComment} className="block">
      <input
        placeholder="add a comment"
        name="comment"
        className="w-full max-w-xs textarea textarea-bordered textarea-lg"
        ref={clearInput}
      />
      <button
        type="submit"
        className="block px-4 py-3 my-4 font-semibold text-white bg-purple-600 border-none rounded-md outline-none hover:bg-purple-400 active:bg-purple-500"
      >
        Comment
      </button>
    </form>
  );
}
