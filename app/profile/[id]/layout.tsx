"use client";
import MyModal from "@/app/components/Dialog";
import MyTabs from "@/app/components/Tabs";
import { useSelectedLayoutSegment } from "next/navigation";

type Props = {
  children: React.ReactNode;
  likes: React.ReactNode;
  users: React.ReactNode;
};

export default function Layout({ children, likes, users }: Props) {
  return (
    <div>
      {children}
      <MyTabs users={users} likes={likes} />
    </div>
  );
}
