import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import AddPersonnelButton from "./add-personnel-button";
import { host } from "@/lib/utils";
export const dynamic = "force-dynamic";

const page = async () => {
  const res = await fetch(`${host}/api/personnel`, { next: { tags: ['getAllUsers'] }, cache: 'no-store' })
  const data = await res.json()
  return (
    <div className="container mx-auto py-10">
      <AddPersonnelButton />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default page;
