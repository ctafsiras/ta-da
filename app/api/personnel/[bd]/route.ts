import prisma from "@/lib/prisma";
//get a personnel by bd
export async function GET(
  request: Request,
  { params }: { params: { bd: string } }
) {
  const user = await prisma.personnel.findFirst({
    where: {
      bd: params.bd,
    },
  });
  if (!user) {
    return Response.json("No User Found");
  }

  return Response.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: { bd: string } }
) {
  const user = await prisma.personnel.delete({
    where: {
      bd: params.bd,
    },
  });
  if (!user) {
    return Response.json("No User Found");
  }
  return Response.json(user);
}
