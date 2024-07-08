import prisma from "@/lib/prisma";

//create new bill
export async function POST(request: Request) {
  const data = await request.json();
  const personnel = await prisma.personnel.findFirst({
    where: {
      bd: data.bd,
    },
  });
  if (!personnel) {
    return Response.json("No User Found");
  }
  const currentDate = new Date();
  const date = currentDate.toISOString();
  const status = {
    date,
    status: "POR Received",
  };
  const billData = { personnelId: personnel.id, amount: 0, date, status };
  const res = await prisma.bill.create({
    data: billData,
  });
  return Response.json(res);
}


export async function GET(request: Request) {
  const data = await prisma.bill.findMany({
    include: {
      personnel: true
    },
    orderBy: {
      date: 'desc'
    }
  });
  return Response.json(data);
}
