import prisma from "@/lib/prisma";
//create new personnel
export async function POST(request: Request) {
    const data = await request.json();
    const res = await prisma.personnel.create({
        data
    })
    return Response.json(res)
}
export async function GET(request: Request) {
    const data = await prisma.personnel.findMany({});
    return Response.json(data)
}