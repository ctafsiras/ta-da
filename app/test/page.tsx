"use client";

import * as XLSX from "xlsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import LoadingButton from "@/components/loading-button";

const Page = () => {
  const [data, setData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  async function fileToJSON(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const file = e.target.files?.[0];
      if (file) {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const jsonData = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]]
        );
        setData(jsonData);
      } else {
        console.error("No file selected");
      }
    } catch (error) {
      console.error("Error reading file:", error);
    }
  }

  return (
    <div>
      <div className="m-4 flex w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="excelFile">Select the file</Label>
        <Input
          className="cursor-pointer"
          id="excelFile"
          type="file"
          accept=".xls, .xlsx, .csv"
          onChange={fileToJSON}
        />
        <LoadingButton disabled={data.length<=0} loading={loading}>Upload</LoadingButton>
      </div>
    </div>
  );
};

export default Page;
