"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusHistory } from "@/components/component/status-history"
import { StatusUpdateButton } from "@/components/component/status-update-button"
import { Payment, StatusColumnHeader, getStatusColor } from "../columns"

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
]