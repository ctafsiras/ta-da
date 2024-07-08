"use client";

import * as XLSX from "xlsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import LoadingButton from "@/components/loading-button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast";
import { revalidateGetAllPersonnels } from "@/app/actions";
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

  async function onSubmit() {
    try {
      setLoading(true);
      const convertedData = data.map(item => {
        return {
          ...item,
          bd: item.bd.toString()
        };
      });
      const response = await fetch("/api/personnel/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(convertedData),
      });
      if (response.ok) {
        revalidateGetAllPersonnels();
        toast({
          title: "Employee data saved successfully",
        });
      } else {
        toast({
          title: "Error saving employee data",
          variant: "destructive",
          description: JSON.stringify(response),
        });
      }
    } catch (error) {
      toast({
        title: "Error saving employee data",
        variant: "destructive",
        description: JSON.stringify(error),
      });
    }
    setLoading(false);
  }


  return (
    <div className="md:px-16">
      <div className="m-4 flex w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="excelFile">Select the file</Label>
        <Input
          className="cursor-pointer"
          id="excelFile"
          type="file"
          accept=".xls, .xlsx, .csv"
          onChange={fileToJSON}
        />
        <LoadingButton onClick={onSubmit} disabled={data.length <= 0} loading={loading} >Upload</LoadingButton>
      </div>

      <div className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Serial</TableHead>
              <TableHead>BD</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Branch</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((invoice) => (
              <TableRow key={invoice.bd}>
                <TableCell>{invoice.__rowNum__}</TableCell>
                <TableCell>{invoice.bd}</TableCell>
                <TableCell>{invoice.name}</TableCell>
                <TableCell>{invoice.branch}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
