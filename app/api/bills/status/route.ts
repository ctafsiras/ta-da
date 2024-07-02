import prisma from "@/lib/prisma";
//update bill status
export async function POST(request: Request) {
    const data = await request.json();
    const { id, newStatus, newAmount } = data;
    const res = await prisma.bill.update({
        where: {
            id
        },
        data: {
            status: {
                push: newStatus
            },
            amount: newAmount !== undefined ? parseFloat(newAmount) : undefined,
        },
    })
    console.log(data);
    console.log(res);
    return Response.json(res)
}