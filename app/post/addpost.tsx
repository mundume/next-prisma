"use client";

import { useRouter } from "next/navigation";

export default function AddPosts() {
  const router = useRouter();
  const addPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = {
      title: formData.get("title") as string,
    };
    const response = await fetch(`/api/post`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.refresh();
    console.log(response);
  };
  return (
    <div>
      <form action="" onSubmit={addPost} className="flex items-center gap-1">
        <textarea
          placeholder="What's Happening?"
          name="title"
          className="w-full border border-yellow-500 textarea textarea-lg"
        />
        <button
          type="submit"
          className="px-4 py-3 font-semibold text-white bg-purple-600 border-none rounded-md outline-none hover:bg-purple-400 active:bg-purple-500"
        >
          {" "}
          Post
        </button>
      </form>
    </div>
  );
}
