import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import SignOutButton from "./components/buttons";
import { prisma } from "@/lib/prisma";

import AlertDiailog from "./components/AlertDiailog";

import clsx from "clsx";

type Data = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
async function fetchStuff(): Promise<Data[]> {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos");
  const response = await data.json();
  return response;
}

export default async function Home() {
  const userData = await prisma.user?.findMany();

  const session = await getServerSession(authOptions);

  return (
    <div>
      {session ? (
        <div>
          {userData.map((user) => (
            <>
              <p key={user.id}>{user.name}</p>
              <AlertDiailog name={user.name!} />
            </>
          ))}
          <Link href="/login">Hello</Link>
        </div>
      ) : (
        <div className={clsx("flex justify-between, items-center")}>
          <Link href="/login">Login</Link>
          <Link href="/api/auth/signin">Sign in</Link>
        </div>
      )}
    </div>
  );
}
