"use client";

import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import { BsDiscord } from "react-icons/bs";

type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
};
export default function SignInButton({ providers }: Props) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => {
              signIn(provider.id, { callbackUrl: "/" });
            }}
            className="flex justify-center gap-1 px-4 py-2.5 text-sm font-semibold text-purple-400 bg-white border  rounded-md hover:bg-purple-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-200 focus-visible:ring-offset-2 border-purple-400 mr-4"
          >
            Sign in with <BsDiscord className="text-2xl tex-purple-400" />
          </button>
        </div>
      ))}
    </>
  );
}
