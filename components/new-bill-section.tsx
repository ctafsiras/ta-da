import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"
import { AddBillButton } from "./add-bill-button"
import prisma from "@/lib/prisma"
import { StatusHistory } from "./component/status-history"
import { StatusUpdateButton } from "./component/status-update-button"

export async function AddNewBill() {
  const bills = await prisma.bill.findMany({
    include: {
      personnel: true
    },
    orderBy: {
      date: 'desc'
    }
  });
  console.log(bills);
  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-8">
        <AddBillButton />
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Bill History</h2>
            <Button className="flex items-center" variant="outline">
              Hide Paid Bills
              <EyeOffIcon className="w-5 h-5 ml-2" />
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              {/* <Button variant="outline" onClick={toggleShowPaidBills} className="flex items-center">
              {showPaidBills ? "Hide Paid Bills" : "Show Paid Bills"}
              <EyeOffIcon className="w-5 h-5 ml-2" />
            </Button> */}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="px-4 py-2 text-left">BD</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Branch</th>
                    <th className="px-4 py-2 text-right">Amount</th>
                    <th className="px-4 py-2 text-right">Status</th>
                    <th className="px-4 py-2 text-right">Update</th>
                    <th className="px-4 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bills
                    .filter((bill) => bill.status[bill.status.length - 1].status !== "Paid")
                    .map((bill) => (
                      <tr
                        key={bill.id}
                        className={`border-b ${bill.status[bill.status.length - 1].status === "Paid" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                      >
                        <td className="px-4 py-2">{bill.personnel.bd}</td>
                        <td className="px-4 py-2">{bill.personnel.name}</td>
                        <td className="px-4 py-2">{bill.personnel.branch}</td>
                        <td className="px-4 py-2 text-right">{bill.amount.toFixed(2)} ৳</td>
                        <td className={`px-4 py-2 text-right ${getStatusColor(bill.status[bill.status.length - 1].status)}`}>
                          {bill.status[bill.status.length - 1].status}
                        </td>
                        <td className="px-4 py-2 text-right">
                          <StatusUpdateButton id={bill.id} />
                        </td>
                        <td className="px-4 py-2 text-right">
                          <StatusHistory status={bill.status} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


function EyeOffIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  )
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Paid":
      return "text-green-500";
    case "Bill Prepared":
      return "text-yellow-500";
    case "Bill Ready":
      return "text-blue-500";
    default:
      return "text-red-500";
  }
};