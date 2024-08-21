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