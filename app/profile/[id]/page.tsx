import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FollowButton from "@/app/components/FollowButton/FollowButton";
import UserCard from "@/app/components/UserCard";
import { PostCard } from "@/app/components/posts/PostCard";

import { prisma } from "@/lib/prisma";
import { relativeDate } from "@/utils/utils";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  return { title: `User profile of ${user?.name}` };
}

export default async function page({ params }: Props) {
  const session = await getServerSession(authOptions);
  const currentEmail = session?.user?.email;
  const userData = await prisma.user.findUnique({
    where: {
      id: params.id,
    },

    include: {
      followedBy: true,
      following: true,
      posts: {
        orderBy: {
          createdAt: "desc",
        },
      },
      Comment: true,
    },
  });

  return (
    <div className="grid gap-1 p-2">
      {/* @ts-ignore */}
      <UserCard userData={userData} />
      {/* @ts-ignore */}
      <FollowButton targetUserId={params.id} />
      <section className="flex items-center justify-between gap-2 py-4 font-medium text-purple-600">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <p className="text-lg">{userData?.following.length} </p>
            <p className="text-sm text-gray-500">Following</p>
          </div>

          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1">
              <p className="text-lg">{userData?.followedBy.length} </p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
          </div>
        </div>
        {userData?.email === currentEmail && (
          <Link
            href="/editprofile"
            className="inline-flex justify-center px-4 py-2.5 text-sm font-semibold text-purple-400 bg-white border  rounded-md hover:bg-purple-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-200 focus-visible:ring-offset-2 border-purple-400 mr-4"
          >
            Edit Profile
          </Link>
        )}
      </section>

      {userData?.posts?.map((post) => (
        // @ts-ignore
        <PostCard
          key={post.id}
          commentNumber={userData.Comment.length}
          date={post.createdAt.toString()}
          id={post.id}
          image={userData.image!}
          name={userData.name!}
          title={post.title}
          userId={userData.id!}
        />
      ))}
    </div>
  );
}
