import { Tab } from "@headlessui/react";
import React from "react";

type Props = {
  users: React.ReactNode;
  likes: React.ReactNode;
  retweets: React.ReactNode;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function MyTabs({ users, likes, retweets }: Props) {
  const tabscss = ` outline-none text-sm font-medium text-purple-500  focus:underline `;
  return (
    <div className="items-center block w-full py-2 m-auto ">
      <Tab.Group>
        <Tab.List className="flex justify-between w-full px-5">
          <Tab className={tabscss}>Posts</Tab>
          <Tab className={tabscss}>Likes</Tab>
          <Tab className={tabscss}>Retweets</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>{users}</Tab.Panel>
          <Tab.Panel>{likes}</Tab.Panel>
          <Tab.Panel>{retweets}</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
