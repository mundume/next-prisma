"use client";

import { Dialog, Transition } from "@headlessui/react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import Avatar from "./Avatar";

type UserData = {
  image: string;
  name: string;
  email: string;
  bio: string;
  age: number;
  id: string;
  followers: number;
  following: number;
};

export default function MyModal({
  age,
  bio,
  email,
  image,
  name,
  followers,
  following,
}: UserData) {
  const router = useRouter();
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
    router.back();
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center justify-start gap-1"
                  >
                    <Avatar image={image} name={name} />
                    <p className="font-semibold">{name}</p>
                  </Dialog.Title>
                  <div className="pt-2">
                    <p className="flex font-semibold text-yellow-500 ">
                      {email}
                    </p>
                    <p className="flex pt-2 font-medium text-gray-500">
                      {bio}.
                    </p>
                    <div className="flex items-center gap-2 py-2 font-medium text-purple-600">
                      <p className="flex items-center gap-1">
                        <span className="text-lg">{followers} </span>
                        <span className="text-sm text-gray-500">followers</span>
                      </p>
                      <p className="flex items-center gap-1">
                        <span className="text-lg">{following} </span>
                        <span className="text-sm text-gray-500">following</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
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
