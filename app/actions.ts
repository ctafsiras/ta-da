"use server";

import { revalidateTag } from "next/cache";

export async function revalidateGetAllBills() {
    revalidateTag("getAllBills");
}
export async function revalidateGetAllPersonnels() {
    revalidateTag("getAllPersonnels");
}

export async function create() {
   
}