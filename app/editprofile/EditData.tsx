"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function EditData({ user }: { user: User }) {
  const router = useRouter();
  async function updateUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const body = {
      name: formData.get("name") as string,
      bio: formData.get("bio") as string,
      age: formData.get("age") as string,
      image: formData.get("image") as string,
    };

    const response = await fetch(`/api/editprofile`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await response.json();
    router.back();
  }
  return (
    <div className="flex flex-col m-2">
      <h1 className="text-xl font-semibold text-purple-500 ">
        Edit Your Profile
      </h1>
      <form onSubmit={updateUser} className="flex flex-col gap-1">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          defaultValue={user?.name ?? ""}
          className="p-2 border-2 border-purple-500 rounded-md outline-none"
        />
        <label htmlFor="bio">Bio</label>
        <textarea
          name="bio"
          rows={5}
          cols={10}
          defaultValue={user?.bio ?? ""}
          className="p-2 border-2 border-purple-500 rounded-md outline-none"
        ></textarea>
        <label htmlFor="age">Age</label>
        <input
          type="text"
          name="age"
          defaultValue={user?.age ?? 0}
          className="p-2 border-2 border-purple-500 rounded-md outline-none"
        />
        <label htmlFor="image">Profile Image URL</label>
        <input
          type="text"
          name="image"
          defaultValue={user?.image ?? ""}
          className="p-2 border-2 border-purple-500 rounded-md outline-none"
        />

        <button
          type="submit"
          className="p-2 text-white bg-purple-500 rounded-md outline-none"
        >
          Save
        </button>
      </form>
    </div>
  );
}
