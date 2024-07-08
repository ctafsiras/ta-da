import prisma from "@/lib/prisma";
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { AddBillButton } from "./add-bill-button";
export const dynamic = 'force-dynamic'

export default async function BillsPage() {

  const res = await fetch('http://localhost:3000/api/bills/', { next: { tags: ['getAllBills'] }, cache: 'no-store' })
  const data = await res.json()

  return (
    <div className="container mx-auto py-10">
      <AddBillButton />
      <DataTable columns={columns} data={data} />
    </div>
  )
}
