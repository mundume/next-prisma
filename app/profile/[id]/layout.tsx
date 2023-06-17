"use client";
import MyModal from "@/app/components/Dialog";
import MyTabs from "@/app/components/Tabs";
import { useSelectedLayoutSegment } from "next/navigation";

type Props = {
  children: React.ReactNode;
  likes: React.ReactNode;
  users: React.ReactNode;
  retweets: React.ReactNode;
};

export default function Layout({ children, likes, users, retweets }: Props) {
  return (
    <div>
      {children}
      <div className="flex items-center">
        <MyTabs users={users} likes={likes} retweets={retweets} />
      </div>
    </div>
  );
}
