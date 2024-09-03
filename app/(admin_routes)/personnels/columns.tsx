"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeletePersonnel from "./delete-user";
export type Personnel = {
  id: string;
  bd: string;
  name: string;
  branch: string;
};

export const columns: ColumnDef<Personnel>[] = [
  {
    accessorKey: "bd",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          BD No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "branch",
    header: "Branch",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <DeletePersonnel bd={row.original.bd}/>;
    },
  },
];
