"use client";
import MyTabs from "@/app/components/Tabs";

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
      <MyTabs users={users} likes={likes} retweets={retweets} />
    </div>
  );
}
