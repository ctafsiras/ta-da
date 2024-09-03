"use client"

import useAuth from "@/hooks/useAuth";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavMenu } from "@/components/nav-menu";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "TA/DA Bill Management Software",
//   description: "A software to manage TA/DA bills for personnel.",
// };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();
  const router = useRouter();
  if (!user || !user.role) {
    router.push("/signin")
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <NavMenu />
        <Toaster />
        {children}</body>
    </html>
  );
}
