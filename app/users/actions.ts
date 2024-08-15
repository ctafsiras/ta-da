'use server'

import prisma from "@/lib/prisma"

export async function createUser(formData: FormData) {
    console.log("object");
    const data = {
        bd: formData.get('bd') as string,
        password: formData.get('password') as string,
        role: formData.get('role') as ("Admin" | "Viewer"),
    }
    await prisma.user.create({
        data
    })
}