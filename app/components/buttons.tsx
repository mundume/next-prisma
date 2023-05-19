"use client";

import { signIn, signOut } from "next-auth/react";

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

export default function SignOutButton() {
  return (
    <button
      className="px-4 py-2 text-white bg-blue-500 rounded"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
