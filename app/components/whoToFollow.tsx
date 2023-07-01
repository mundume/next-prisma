import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton/FollowButton";
import WhoToFolllowComponent from "./WhoToFolllowComponent";

export default async function WhoToFollow() {
  const session = await getServerSession(authOptions);
  const currentEmail = session?.user?.email;
  const userId = await prisma.user
    .findUnique({
      where: {
        email: currentEmail!,
      },
    })
    .then((user) => user?.id!);
  //filter non following accounts
  const usersNotFollowing = await prisma.user.findMany({
    where: {
      NOT: {
        followedBy: {
          some: {
            followerId: userId,
          },
        },
      },
    },
    include: {
      followedBy: true,
      following: true,
    },
  });

  return (
    <div className="fixed">
      <h1 className="px-10 text-xl font-medium text-gray-600 md:text-3xl">
        Who to follow
      </h1>
      <div className=" text-gray-600 rounded-lg bg-slate-100 lg:w-[300px] md:bg-white w-full py-3 ">
        <div className="flex flex-col items-stretch gap-4 px-4">
          {usersNotFollowing.map((user) => {
            if (user.id !== userId) {
              return (
                // @ts-ignore server component

                <WhoToFolllowComponent
                  name={user.name!}
                  image={user.image!}
                  targetUserId={user.id}
                  key={user.id}
                  followers={user.followedBy.length}
                  following={user.following.length}
                  bio={user.bio!}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
