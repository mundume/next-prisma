import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { useRouter } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default function EditData({ user }: { user: User }) {
  async function updateUserData(data: FormData) {
    "use server";
    const session = await getServerSession(authOptions);
    const currentEmail = session?.user?.email!;

    await prisma.user.update({
      where: {
        email: currentEmail,
      },
      data: {
        name: data.get("name") as string,
        bio: data.get("bio") as string,
        age: Number(data.get("age")),
        image: data.get("image") as string,
      },
    });
  }
  return (
    <div className="flex flex-col m-2">
      <h1 className="text-xl font-semibold text-purple-500 ">
        Edit Your Profile
      </h1>
      <form className="flex flex-col gap-1" action={updateUserData}>
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
