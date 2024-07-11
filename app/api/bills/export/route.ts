import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const date = await request.json();
    const bills = await prisma.bill.findMany({
        where: {
            status: {
                some: {
                    status: "Paid",
                    date: {
                        gte: date.from,
                        lte: date.to
                    }
                }
            },
        },
        include: {
            personnel: true
        },
    });
    return Response.json(bills);
}