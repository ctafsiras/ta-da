"use client"

import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const { user } = useAuth();
    if (!user || !user.role) {
        router.push("/signin")
    }

    if (user?.role === 'Viewer') {
        return (<div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
                <hr className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">Access Denied</h1>
                <p className="text-gray-600 mb-6">You don’t have access to this page.</p>
                <a
                    href="/"
                    className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                >
                    Go to Homepage
                </a>
            </div>
        </div>)
    }

    return (
        <>
            {children}
        </>
    );
}
