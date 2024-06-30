"use client"

import prisma from "@/lib/prisma";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { InputForm } from "@/components/search-box";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState([])
  return (
    <main className="mx-8">
      <InputForm setData={setData}/>
      <DataTable columns={columns} data={data} />
    </main>
  );
}
