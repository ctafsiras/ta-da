import prisma from "@/lib/prisma";
import { Personnel } from "@prisma/client";
//create new personnel
export async function POST(request: Request) {
    const data = await request.json();
    const existingUsers = await prisma.personnel.findMany({
        select: {
            bd: true,
        },
    });
    const existingPersonnelBDs = existingUsers.map(user => user.bd);
    const newUsers = data.filter((user: Personnel) => !existingPersonnelBDs.includes(user.bd));
    if (newUsers.length > 0) {
        const res = await prisma.personnel.createMany({
            data: newUsers
        })
        return Response.json(res)
    } else {
        throw new Error("No new users to create.")
    }
}