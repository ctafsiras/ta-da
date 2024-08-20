'use server'

import prisma from "@/lib/prisma"

export async function createUser(data: any) {

    // const data = {

    //     // bd: formData.get('bd') as string,
    //     // password: formData.get('password') as string,
    //     // role: formData.get('role') as ("Admin" | "Viewer"),
    // }
    const newUser = await prisma.user.create({
        data
    })

    return newUser;
}