import { User } from "@prisma/client";
import React from "react";

export default async function UserCard({ userData }: { userData: User }) {
  return (
    <>
      <img src={userData?.image!} alt={userData?.name!} />
      <small className="font-bold">{userData?.email!}</small>
      <p className="font-semibold text-purple-600">{userData?.name}</p>
    </>
  );
}
