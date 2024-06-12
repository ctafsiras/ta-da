import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728e4d52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "7283ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed552f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728edg52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728esd52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52jf",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed532f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "7j28ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52jf",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52vf",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
