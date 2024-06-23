import prisma from "@/lib/prisma";
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

export default async function DemoPage() {
  const data = await prisma.bill.findMany({
    include: {
      personnel: true
    },
    orderBy: {
      date: 'desc'
    }
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
