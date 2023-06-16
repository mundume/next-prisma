import ProfilePostCard from "@/app/components/postCard/ProfilePostCard";
import { prisma } from "@/lib/prisma";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  const likedPosts = await prisma.retweets.findMany({
    where: {
      authorId: params.id,
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
      {likedPosts.map((post) => (
        <ProfilePostCard
          key={post.id}
          retweets={post.post.retweets.length}
          commentNumber={post.post.Comment.length}
          date={post.createdAt.toString()}
          id={post.id}
          image={post.post.user.image!}
          name={post.post.user.name!}
          title={post.post.title}
          userId={post.user.id!}
          likes={post.post.retweets.length}
          isLiked={post.post.likes.some((like) => like.authorId === params.id)}
          isRetweeted={post.post.retweets.some(
            (retweet) => retweet.authorId === params.id
          )}
        />
      ))}
    </div>
  );
}
