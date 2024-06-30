import prisma from "@/lib/prisma";
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { AddBillButton } from "./add-bill-button";


export default async function BillsPage() {
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
      <AddBillButton />
      <DataTable columns={columns} data={data}/>
    </div>
  )
}
