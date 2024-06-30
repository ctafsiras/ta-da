"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import LoadingButton from "./loading-button"
import { useState } from "react"

const FormSchema = z.object({
    bd: z.string().min(4, {
        message: "BD number must be at least 4 characters.",
    }),
})

export function InputForm({ setData }: any) {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            bd: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true)
        const response = await fetch(`/api/bills/${data.bd}`);
        const bills = await response.json();
        if (response.ok) {
            setData(bills)
        } else {
            toast({
                title: "Error saving employee data",
            })
        }
        setLoading(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex  items-center">
                <FormField

                    control={form.control}
                    name="bd"
                    render={({ field }) => (
                        <FormItem className="pb-8">
                            <FormLabel>BD Number</FormLabel>
                            <FormControl>
                                <Input placeholder="10452" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <LoadingButton loading={loading} className="ml-2" type="submit">Search</LoadingButton>
            </form>
        </Form>
    )
}
