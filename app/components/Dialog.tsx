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
                      <div className="flex items-center gap-1">
                        <p className="text-lg">{followers} </p>
                        <p className="text-sm text-gray-500">followers</p>
                      </div>
                      <p className="flex items-center gap-1">
                        <p className="text-lg">{following} </p>
                        <p className="text-sm text-gray-500">following</p>
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-around gap-4 mt-4 ">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2.5 text-sm font-semibold text-white bg-purple-400 border border-transparent rounded-md hover:bg-purple-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 w-52"
                      onClick={closeModal}
                    >
                      Go Back
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2.5 text-sm font-semibold text-purple-400 bg-white border  rounded-md hover:bg-purple-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 border-purple-400 w-52 "
                      onClick={() => window.location.reload()}
                    >
                      View Full Profile
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
