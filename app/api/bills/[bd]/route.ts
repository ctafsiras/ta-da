import prisma from "@/lib/prisma"


//get all bills by bd
export async function GET(
    request: Request,
    { params }: { params: { bd: string } }
) {
    const data = await prisma.bill.findMany({
        where: {
            personnel: {
                bd: params.bd
            }
        },
        include: {
            personnel: true
        },
        orderBy: {
            date: 'desc'
        }
    });
    if (!data) {
        return Response.json("No data Found")
    }
    return Response.json(data)
}