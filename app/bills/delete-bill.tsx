import React, { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { revalidateGetAllBills } from "../actions";

const DeleteBill = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(false);
    async function handleSubmit() {
        setLoading(true);
        const response = await fetch(`/api/bills/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            revalidateGetAllBills()
            toast({
                title: `Bill Deleted successfully`,
            });
        } else {
            toast({
                variant: "destructive",
                title: `Error deleting data`,
                description:
                    response.statusText,
            });
        }
        setLoading(false);
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Trash2Icon className=" text-red-500 " />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        bill and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteBill;
