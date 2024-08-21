import NewUserModal from "@/components/new-user-modal";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import DeleteUser from "./delete-user";
import dynamic from "next/dynamic";

export default async function Component() {
    const users: any = await prisma.user.findMany({});

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">User Management</h1>
                <NewUserModal />
            </div>
            <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-muted">
                        <tr>
                            <th className="px-4 py-3 text-left">#</th>
                            <th className="px-4 py-3 text-left">BD No</th>
                            <th className="px-4 py-3 text-left">Role</th>
                            <th className="px-4 py-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: User) => (
                            <tr key={user.id} className="border-b">
                                <td className="px-4 py-3">{user.id}</td>
                                <td className="px-4 py-3">{user.bd}</td>
                                <td className="px-4 py-3">{user.role}</td>
                                <td className="px-4 py-3"><DeleteUser id={user.id} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}