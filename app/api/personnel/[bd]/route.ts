import prisma from "@/lib/prisma"

export async function GET(
    request: Request,
    { params }: { params: { bd: string } }
) {


    const user = await prisma.personnel.findFirst({
        where: {
            bd: params.bd
        }
    })

    if (!user) {
        return Response.json("No User Found")
    }

    return Response.json(user)
}