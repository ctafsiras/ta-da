import { columns } from "./columns"
import { DataTable } from "./data-table"
import { AddBillButton } from "./add-bill-button";
import { host } from "@/lib/utils";

export default async function BillsPage() {
  const res = await fetch(`${host}/api/bills/`, { next: { tags: ['getAllBills'] }, cache: 'no-store' })
  const data = await res.json()

  return (
    <div className="container mx-auto py-10">
      <AddBillButton />
      <DataTable columns={columns} data={data} />
    </div>
  )
}
