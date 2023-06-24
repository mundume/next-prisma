import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AddPosts() {
  const session = await getServerSession(authOptions);
  const userId = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });
  const addPost = async (data: FormData) => {
    "use server";

    const title = data.get("title") as string;
    if (title === "") {
      throw new Error("Post can't be empty");
    }
    await prisma.post.create({
      data: {
        title,
        authorId: userId!.id,
      },
    });
    data.set("title", "");
  };
  return (
    <div className="flex items-center justify-center">
      <div>
        <form action={addPost} className="flex items-center gap-1">
          <input
            placeholder="What's Happening?"
            name="title"
            className="w-full border border-yellow-500 textarea textarea-lg md:h-[100px]"
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
    </div>
  );
}
