'use server'

import prisma from "@/lib/prisma"

export async function createUser(data: any) {
    const newUser = await prisma.user.create({
        data
    })
    return newUser;
}
export async function deleteUser(data: any) {
    const deletedUser = await prisma.user.delete({
        where: {
            id: data.id,
        },
    })
    return Response.json(deletedUser);
}
interface SigninData {
    bd: string;
    password: string;
}
export async function signinUser(data: SigninData) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                bd: data.bd,
            },
        });
        if (!user) {
            return { success: false, message: "User not found" };
        }
        const passwordMatch = user.password === data.password;
        if (passwordMatch) {
            return { ...user, success: true };
        } else {
            return { success: false, message: "Password mismatched" };
        }
    } catch (error) {
        console.error("Error during user sign-in:", error);
        return { success: false, message: "Internal server error" };
    }
}