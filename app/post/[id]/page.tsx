import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Avatar from "@/app/components/Avatar";
import Comments from "@/app/components/comment/Comments";
import AddComment from "@/app/components/comment/add-comments";
import PostDialog from "@/app/components/posts/PostDialog";
import { prisma } from "@/lib/prisma";
import { ArrowUpLeft } from "lucide-react";
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
    },
  });

  return (
    <section className="p-4 m-2 rounded">
      <Link href="/" className="flex items-center gap-1 py-3">
        <ArrowUpLeft />
        <p>Back</p>
      </Link>
      <section role="div" className="flex items-center gap-1">
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
      <section role="div" className="flex flex-col py-2">
        <p className="font-medium text-purple-500 ">{currentPost?.title} </p>
        <div className="flex items-center justify-between py-2 text-sm text-gray-500">
          <div className="">
            <PostDialog
              dialogTrigerTitle={currentPost?.likes.length}
              dialogTitle="Liked by"
              title="Likes"
              value={currentPost?.likes}
            />
          </div>
          <div>
            <PostDialog
              dialogTitle="Retweeted by"
              dialogTrigerTitle={currentPost?.retweets.length}
              title="Retweets"
              value={currentPost?.retweets}
            />
          </div>
          <div>
            <span className="text-base font-semibold text-gray-700 ">
              {currentPost?.Comment.length}
            </span>{" "}
            comments
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
    </section>
  );
}
