import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Avatar from "@/components/ui/components/Avatar";
import BackLink from "@/components/ui/components/BackLink";
import SideRecommended from "@/components/ui/components/SideRecommended";
import BookMarkButton from "@/components/ui/components/bookmarkButton/bookMarkButton";
import Comments from "@/components/ui/components/comment/Comments";
import AddComment from "@/components/ui/components/comment/add-comments";
import LikeButton from "@/components/ui/components/likes/LikeButton";
import PostDialog from "@/components/ui/components/posts/PostDialog";
import RetweetButton from "@/components/ui/components/retweet/RetweetButton";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const revalidate = 60;
type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });
  return {
    title: ` ${user?.name} BooBer Posts`,
  };
}

export default async function page({ params }: Props) {
  const currentPost = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
    include: {
      user: {
        include: {
          followedBy: true,
          following: true,
        },
      },
      likes: {
        include: {
          user: {
            include: {
              followedBy: true,
              following: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      retweets: {
        include: {
          user: {
            include: {
              followedBy: true,
              following: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },

      Comment: {
        include: {
          user: true,
        },
        where: {
          postId: params.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      Bookmark: {
        include: {
          user: true,
        },
      },
    },
  });

  const usersInteractedWithPost = await prisma.user.findMany({
    where: {
      OR: [
        {
          Comment: {
            some: {
              postId: currentPost?.id,
            },
          },
        },
        {
          likes: {
            some: {
              postId: currentPost?.id,
            },
          },
        },
        {
          retweets: {
            some: {
              postId: currentPost?.id,
            },
          },
        },
      ],
    },
    include: {
      followedBy: true,
      following: true,
    },
  });

  return (
    <section className="p-4 m-2 rounded">
      <BackLink />
      <div className="block md:grid md:grid-cols-10">
        <div className="block md:col-span-6">
          <section role="div" className="flex items-center gap-1 ">
            <Avatar
              image={currentPost?.user?.image!}
              name={currentPost?.user?.name!}
            />

            <Link
              href={`/profile/${currentPost?.user?.id}`}
              className="font-bold text-gray-700"
            >
              {currentPost?.user?.name!}{" "}
            </Link>
          </section>
          <section role="div" className="flex flex-col py-2 ">
            <p className="font-medium text-purple-500 ">
              {currentPost?.title}{" "}
            </p>
            <div className="flex items-center justify-between py-2 text-sm text-gray-500">
              {currentPost?.likes.length !== 0 && (
                <div className="">
                  <PostDialog
                    dialogTrigerTitle={currentPost?.likes.length}
                    dialogTitle="Liked by"
                    title={currentPost?.likes.length! > 1 ? "Likes" : "Like"}
                    value={currentPost?.likes}
                  />
                </div>
              )}
              {currentPost?.retweets.length !== 0 && (
                <div>
                  <PostDialog
                    dialogTitle="Retweeted by"
                    dialogTrigerTitle={currentPost?.retweets.length}
                    title={
                      currentPost?.retweets.length! > 1 ? "Retweets" : "Retweet"
                    }
                    value={currentPost?.retweets}
                  />
                </div>
              )}
              {currentPost?.Comment.length !== 0 && (
                <div>
                  <span className="text-base font-semibold text-gray-700 ">
                    {currentPost?.Comment.length}
                  </span>{" "}
                  {currentPost?.Comment.length! > 1 ? "comments" : "comment"}
                </div>
              )}
              {currentPost?.Bookmark.length !== 0 && (
                <div>
                  <span className="text-base font-semibold text-gray-700 ">
                    {currentPost?.Bookmark.length}
                  </span>{" "}
                  {currentPost?.Bookmark.length! > 1 ? "bookmarks" : "bookmark"}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between px-2 py-4 text-sm text-gray-500 border">
              <div className="">
                {/* @ts-ignore server component */}
                <LikeButton postId={currentPost?.id!} />
              </div>
              <div>
                {/* @ts-ignore server component */}
                <RetweetButton postId={currentPost?.id!} />
              </div>
              <div>
                {/* @ts-ignore server component */}
                <BookMarkButton postId={currentPost?.id!} />
              </div>
            </div>
          </section>
          <AddComment id={params.id} />
          {currentPost?.Comment?.map((comment) => (
            <Comments
              comment={comment.content!}
              key={comment.id}
              image={comment.user.image!}
              name={comment.user.name!}
              date={comment.createdAt.toString()!}
              postId={currentPost?.id!}
              userId={comment.user?.id!}
            />
          ))}
        </div>
        <div className="hidden px-4 border-r md:block md:col-span-4">
          <h1 className="block py-4 m-auto font-semibold text-center text-gray-700 lg:text-2xl ">
            Relevant People
          </h1>
          {usersInteractedWithPost.map((user) => (
            <SideRecommended
              bio={user.bio!}
              followers={user.followedBy.length}
              following={user.following.length}
              name={user.name!}
              image={user.image!}
              targetUserId={user.id}
              key={user.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
