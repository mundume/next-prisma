import SignInMOdal from "@/components/ui/components/signin/SignInModal";
import { prisma } from "@/lib/prisma";
import { getProviders, getSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Boober Social Signin",
  description: "Boober Signin",
};

export default async function page() {
  const session = await getSession();
  if (session) {
    redirect("/");
  }

  const posts = await prisma.post.findMany({
    take: 5,
    select: {
      user: {
        select: {
          id: true,
          age: true,
          image: true,
          name: true,
        },
      },
      title: true,
      content: true,
      createdAt: true,
      id: true,
      updatedAt: true,

      likes: true,
      retweets: true,
      Comment: {
        select: {
          content: true,
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const providers = await getProviders();

  return <SignInMOdal providers={providers!} posts={posts!} />;
}
