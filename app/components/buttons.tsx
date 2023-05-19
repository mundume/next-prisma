"use client";

import { AlertDialogAction } from "@/components/ui/alert-dialog";

import { signIn, signOut } from "next-auth/react";
import router from "next/router";

// export default function SignInButton() {
//   return (
//     <button
//       className="px-4 py-2 text-white bg-blue-500 rounded"
//       onClick={() => signIn()}
//     >
//       Sign in
//     </button>
//   );
// }

export default function SignOutButton({ children }: { children: string }) {
  return (
    <AlertDialogAction
      onClick={async () => {
        await signOut();
      }}
    >
      {children}
    </AlertDialogAction>
  );
}
