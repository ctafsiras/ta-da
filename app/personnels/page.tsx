import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import prisma from "@/lib/prisma";
import AddPersonnelButton from "./add-personnel-button";
export const dynamic = "force-dynamic";

const page = async () => {
  const data = await prisma.personnel.findMany({});
  return (
    <div className="container mx-auto py-10">
      <AddPersonnelButton />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default page;
