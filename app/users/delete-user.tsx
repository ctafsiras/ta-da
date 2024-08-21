"use client"
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
import { deleteUser } from "./actions";

const DeleteUser = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(false);
    async function handleSubmit() {
        setLoading(true);
        const deletedUser = await deleteUser({ id });

        if (deletedUser) {
            toast({
                title: `User Deleted successfully`,
            });
        } else {
            toast({
                variant: "destructive",
                title: `Error deleting data`,
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
                        This action cannot be undone. This will permanently delete the user.
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

export default DeleteUser;
