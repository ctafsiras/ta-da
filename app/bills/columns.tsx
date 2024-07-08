"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusHistory } from "@/components/status-history"
import { StatusColumnHeader, getStatusColor } from "../columns"
import { StatusUpdateButton } from "@/components/status-update-button"
import DeleteBill from "./delete-bill"

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

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "personnel.bd",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    BD No
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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
        id: 'status',
        accessorFn: (row) => row.status[row.status.length - 1].status,
        header: StatusColumnHeader,
        cell: ({ row }) => <span className={`px-2 rounded py-1 text-right ${getStatusColor(row.original.status[row.original.status.length - 1].status)}`}>{row.original.status[row.original.status.length - 1].status}</span>,
    },
    {
        id: "update",
        header: "Update",
        cell: ({ row }) => {
            return (
                <StatusUpdateButton id={row.original.id} />
            )
        },
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
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return <DeleteBill id={row.original.id} />;
        },
    },
]