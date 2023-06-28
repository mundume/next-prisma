"use client";

import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

type UserData = {
  name?: string;
  bio?: string;
  age?: number;
  image?: string;
  email?: string;
  id?: string;
  followers?: number;
  following?: number;
};

export default function MyModal({
  age,
  bio,
  image,
  name,
  email,
  id,
  followers,
  following,
}: UserData) {
  const { back, push } = useRouter();
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
    back();
  }

  function openModal() {
    setIsOpen(true);
  }

  async function updateUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const body = {
      name: formData.get("name") as string,
      bio: formData.get("bio") as string,
      age: formData.get("age") as string,
      image: formData.get("image") as string,
    };

    const response = await fetch(`/api/editprofile`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .catch((err: Error) => {
        throw new Error(err.message);
      })
      .finally(() => {
        setIsOpen(false);
        back();
      });
    await response.json();
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
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <form
                      className="flex flex-col gap-1 px-4 py-2"
                      onSubmit={updateUser}
                    >
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={name ?? ""}
                        className="p-2 border-2 border-purple-500 rounded-md outline-none"
                      />
                      <label htmlFor="bio">Bio</label>
                      <textarea
                        name="bio"
                        rows={5}
                        cols={10}
                        defaultValue={bio ?? ""}
                        className="p-2 border-2 border-purple-500 rounded-md outline-none"
                      ></textarea>
                      <label htmlFor="age">Age</label>
                      <input
                        type="text"
                        name="age"
                        defaultValue={age ?? 0}
                        className="p-2 border-2 border-purple-500 rounded-md outline-none"
                      />
                      <label htmlFor="image">Profile Image URL</label>
                      <input
                        type="text"
                        name="image"
                        defaultValue={image ?? ""}
                        className="p-2 border-2 border-purple-500 rounded-md outline-none"
                      />

                      <button
                        type="submit"
                        className="p-2 text-white bg-purple-500 rounded-md outline-none"
                      >
                        Save
                      </button>
                    </form>
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
