import FollowButton from "@/app/components/FollowButton/FollowButton";
import UserCard from "@/app/components/UserCard";
import { PostCard } from "@/app/components/posts/PostCard";

import { prisma } from "@/lib/prisma";
import { relativeDate } from "@/utils/utils";
import { Metadata } from "next";
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
      <div className="flex items-center gap-2 py-4 font-medium text-purple-600">
        <p className="flex items-center gap-1">
          <span className="text-lg">{userData?.following.length} </span>
          <span className="text-sm text-gray-500">Following</span>
        </p>
        <p className="flex items-center gap-1">
          <span className="text-lg">{userData?.followedBy.length} </span>
          <span className="text-sm text-gray-500">Followers</span>
        </p>
      </div>

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
