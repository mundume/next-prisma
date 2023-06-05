import { User } from "@prisma/client";
import React from "react";
import FollowButton from "./FollowButton/FollowButton";
import Image from "next/image";

export default async function UserCard({ userData }: { userData: User }) {
  return (
    <>
      <img
        src={userData?.image!}
        alt={userData?.name!}
        width={50}
        height={50}
      />
      <small className="font-bold">{userData?.email!}</small>
      <p className="font-semibold text-purple-600">{userData?.name}</p>
      <small className="font-bold">{userData?.age}</small>
      <p className="text-gray-900">{userData?.bio}</p>
      {/* //@ts-ignore */}
    </>
  );
}
