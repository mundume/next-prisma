"use client";

import { Dialog, Transition } from "@headlessui/react";
import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import SignInButton from "./SignInButton";
import { Comment, Likes, Post, Retweets } from "@prisma/client";

import SignInPost from "./SignInPost";

type User = {
  id: string;
  age: number;
  image: string;
  name: string;
};

type FetchPostsResult = Post & {
  user: User;
  likes: Likes[];
  retweets: Retweets[];
  Comment: Comment[];
};

type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
  posts: any;
};

export default function SignInMOdal({ providers, posts }: Props) {
  let [isOpen, setIsOpen] = useState(true);
  const { back } = useRouter();
  function closeModal() {
    setIsOpen(false);
    back();
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 text-gray-700"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="flex flex-col items-center justify-center pt-4 pb-2 text-xl font-semibold leading-6 text-gray-700 md:text-2xl "
                  >
                    Welcome to Boober Social
                  </Dialog.Title>
                  <p className="flex flex-col items-center gap-1 text-xl font-medium md:text-2xl ">
                    Scroll down to see a few
                    <span className="text-purple-400">Posts</span>
                  </p>
                  <br />
                  <div className="flex flex-col items-center gap-2 py-2">
                    <p className="py-2 text-2xl font-semibold text-gray-700 ">
                      Or
                    </p>
                    <SignInButton providers={providers} />
                  </div>

                  <div>
                    {posts.map((post: FetchPostsResult) => (
                      <SignInPost
                        commentNumber={post.Comment.length}
                        key={post.id}
                        date={post.createdAt.toString()}
                        id={post.id}
                        likesNumber={post.likes.length}
                        name={post.user.name!}
                        retweetsNumber={post.retweets.length}
                        title={post.title}
                        userId={post.user.id}
                        image={post.user.image}
                      />
                    ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
