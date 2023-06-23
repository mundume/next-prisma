import AuthProvider from "./AuthProvider";
import Navbar from "./components/Navbar";
import SideBar from "./components/sidebar/SideBar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Boober Social",
  description: "Boober Social",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar href="/" />
          <div className="min-h-screen grid-flow-col md:grid md:grid-cols-8 ">
            <div className="hidden p-2 border-r md:block md:col-span-2">
              {/* @ts-ignore */}
              <SideBar/>
            </div>
            <div className="md:col-span-4">
              {children}
              {modal}
            </div>
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
