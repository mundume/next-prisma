import MyDialog from "@/components/ui/components/Dialog";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });
  return {
    title: `User profile of ${user?.name}`,
  };
}

export default async function page({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const userData = await prisma.user?.findUnique({
    where: {
      id: params.id,
    },
    include: {
      followedBy: true,
      following: true,
    },
  });

  return (
    <div>
      <MyDialog
        image={userData?.image!}
        bio={userData?.bio!}
        name={userData?.name!}
        age={userData?.age!}
        email={userData?.email!}
        id={userData?.id!}
        followers={userData?.followedBy.length!}
        following={userData?.following.length!}
      />
    </div>
  );
}
