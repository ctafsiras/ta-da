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
export async function signinUser(data: any) {
    const user = await prisma.user.delete({
        where: {
            bd: data.bd,
        },
    })
    if (user.password === data.password) {
        return Response.json(user)
    }
    return Response.error();
}