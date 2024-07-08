"use client";
import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const FormSchema = z.object({
  bd: z.string().min(4, {
    message: "BD number must be at least 4 characters.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  branch: z.string().min(1, "Required"),
});

const AddPersonnelButton = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bd: "",
      name: "",
      branch: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const response = await fetch("/api/personnel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      toast({
        title: "Employee data saved successfully",
      });
    } else {
      toast({
        title: "Error saving employee data",
        variant: "destructive"
      });
    }
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex space-x-4 items-center"
      >
        <FormField
          control={form.control}
          name="bd"
          render={({ field }) => (
            <FormItem className="pb-8">
              <FormLabel>BD Number</FormLabel>
              <FormControl>
                <Input placeholder="Type BD Number..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="pb-8">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Type Name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="branch"
          render={({ field }) => (
            <FormItem className="pb-8">
              <FormLabel>Branch</FormLabel>
              <FormControl>
                <Controller
                  control={form.control}
                  name="branch"
                  render={({ field: { onChange, value } }) => (
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GD(P)">GD(P)</SelectItem>
                        <SelectItem value="GD(N)">GD(N)</SelectItem>
                        <SelectItem value="Engg">Engg</SelectItem>
                        <SelectItem value="Logistic">Logistic</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="ATC">ATC</SelectItem>
                        <SelectItem value="ADWC">ADWC</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Legal">Legal</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Met">Met</SelectItem>
                        <SelectItem value="Medical">Medical</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={loading} className="ml-2" type="submit">
          Save
        </LoadingButton>
        {/* <Separator orientation="vertical" /> */}
        <p className="md:text-lg md:px-16">OR</p>
        <Link href='personnels/import'><Button variant="outline">Import From Excel</Button></Link>
      </form>
    </Form>
  );
};

export default AddPersonnelButton;
