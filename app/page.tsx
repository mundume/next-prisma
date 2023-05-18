import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import { signOut } from "next-auth/react";

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
  const data = await fetchStuff();
  const session = await getServerSession(authOptions);

  return (
    <div>
      <p>{session?.user?.email}</p>
      {session ? (
        data.map((item) => {
          return (
            <>
              <div key={item.id}>{item.title}</div>
            </>
          );
        })
      ) : (
        <>
          <Link href="/api/auth/signin">signup</Link>
        </>
      )}
    </div>
  );
}
