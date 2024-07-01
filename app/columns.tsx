"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowDown, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { StatusHistory } from "@/components/component/status-history"

export type Payment = {
    personnel: {
        id: string;
        bd: string;
        name: string;
        branch: string;
    };
    id: string;
    personnelId: string;
    amount: number;
    date: Date;
    status: {
        status: string;
        date: Date; // Change this to string to match the requirement
    }[];
}
export const StatusColumnHeader = ({ column }: any) => {
    const [filter, setFilter] = useState('');

    const handleFilterChange = (status: any) => {
        setFilter(status);
        column.setFilterValue(status);
    };

    const statusOptions = ['POR Recieved', 'Paid', 'Bill Prepared', 'Bill Ready', 'Waiting For OIC/OC Sign']; // Example statuses

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    Status
                    <ArrowDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleFilterChange('')}>
                    Show All
                </DropdownMenuItem>
                {statusOptions.map((status) => (
                    <DropdownMenuItem key={status} onClick={() => handleFilterChange(status)}>
                        {status}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "personnel.bd",
        header: "BD Number"
    },
    {
        accessorKey: 'personnel.name',
        header: "Name",
    },
    {
        accessorKey: 'personnel.branch',
        header: "Branch",
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "BDT",
            }).format(amount)

            return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        id: 'status', // Add this line to specify the id for the column
        accessorFn: (row) => row.status[row.status.length - 1].status,
        header: StatusColumnHeader,
        cell: ({ row }) => <span className={`px-2 rounded py-1 text-right ${getStatusColor(row.original.status[row.original.status.length - 1].status)}`}>{row.original.status[row.original.status.length - 1].status}</span>,
    },
    {
        id: "history",
        header: "History",
        cell: ({ row }) => {
            return (
                <StatusHistory status={row.original.status} />
            )
        },
    },
]

export const getStatusColor = (status: string) => {
    switch (status) {
        case "Paid":
            return "text-green-700 bg-green-200";
        case "Bill Prepared":
            return "text-yellow-700 bg-yellow-200";
        case "Bill Ready":
            return "text-blue-700 bg-blue-200";
        default:
            return "text-red-700 bg-red-200";
    }
};