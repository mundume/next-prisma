import ProfilePostCard from "@/app/components/postCard/ProfilePostCard";
import { prisma } from "@/lib/prisma";
import React from "react";
type Props = {
  params: {
    id: string;
  };
};

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
        include: {
          Comment: {
            orderBy: {
              createdAt: "desc",
            },
          },
          likes: true,
        },
      },
    },
  });

  return (
    <div className="grid gap-1 p-2">
      {userData?.posts?.map((post) => (
        // @ts-ignore
        <ProfilePostCard
          key={post.id}
          commentNumber={post.Comment.length}
          date={post.createdAt.toString()}
          id={post.id}
          image={userData.image!}
          name={userData.name!}
          title={post.title}
          userId={userData.id!}
          likes={post.likes}
          isLiked={post.likes.some((like) => like.authorId === userData.id)}
        />
      ))}
    </div>
  );
}
