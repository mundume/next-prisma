import AuthProvider from "./AuthProvider";
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
          {children}
          {modal}
        </body>
      </html>
    </AuthProvider>
  );
}
