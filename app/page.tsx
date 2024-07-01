"use client"

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useState } from "react";
import { SearchBox } from "./search-box";

export default function Home() {
  const [data, setData] = useState([])
  return (
    <main className="mx-8">
      <SearchBox setData={setData} />
      <DataTable columns={columns} data={data} />
    </main>
  );
}
