import ProfilePostCard from "@/app/components/postCard/ProfilePostCard";
import { prisma } from "@/lib/prisma";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  const likedPosts = await prisma.likes.findMany({
    where: {
      authorId: params.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      post: {
        include: {
          user: true,
          Comment: {
            where: {
              authorId: params.id,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
          likes: {
            where: {
              authorId: params.id,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
          retweets: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
    },
  });

  return (
    <div className="grid gap-1 p-2">
      {likedPosts.map((item) => (
        <ProfilePostCard
          key={item.id}
          commentNumber={item.post.Comment.length}
          date={item.createdAt.toString()}
          id={item.post.id}
          image={item.post.user.image!}
          name={item.post.user.name!}
          title={item.post.title}
          userId={item.user.id!}
          likes={item.post.likes}
          isLiked={item.post.likes.some((like) => like.authorId === params.id)}
          isRetweeted={item.post.retweets.some(
            (retweet) => retweet.authorId === params.id
          )}
          retweets={item.post.retweets.length}
        />
      ))}
    </div>
  );
}
