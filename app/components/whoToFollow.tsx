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
  });

  return (
    <div className="fixed">
      <h1 className="px-8 pb-4 text-xl font-medium text-gray-500">
        Who to follow
      </h1>
      <div className=" text-gray-600 rounded-lg bg-slate-100 lg:w-[300px] md:w-[200px] w-full py-8 ">
        <div className="flex flex-col items-center gap-4 px-4">
          {usersNotFollowing.map((user) => {
            if (user.id !== userId) {
              return (
                // @ts-ignore server component

                <WhoToFolllowComponent
                  name={user.name!}
                  image={user.image!}
                  targetUserId={user.id}
                  key={user.id}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
