import prisma from "@/lib/prisma";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {

    console.log("object: ", params.id);
    const bill = await prisma.bill.delete({
        where: {
            id: params.id,
        },
    });
    if (!bill) {
        return Response.json("No Bill Found");
    }
    return Response.json(bill);
}
