import AuthProvider from "./AuthProvider";
import SideBar from "@/components/ui/components/sidebar/SideBar";

import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Providers } from "@/lib/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Boober Social",
  description: "Boober Social",
};

export default function RootLayout({
  children,
  modal,
  authModal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* @ts-ignore */}

          <div className="min-h-screen grid-flow-col md:grid md:grid-cols-9 ">
            <div className="hidden p-2 border-r md:block md:col-span-2">
              {/* @ts-ignore */}
              <SideBar />
            </div>
            <div className="md:col-span-7">
              {children}
              {modal}
              {authModal}
            </div>
            {/* <div className="hidden px-4 py-10 border-r lg:px-10 md:block md:col-span-3">
             
              <WhoToFollow />
            </div> */}
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
