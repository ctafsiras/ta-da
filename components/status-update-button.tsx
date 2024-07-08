"use client"
import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "./ui/use-toast"
import LoadingButton from "./loading-button"
import { revalidateGetAllBills } from "@/app/actions"


export function StatusUpdateButton({ id }: any) {
  const [status, setStatus] = useState("")
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  async function handleSubmit() {
    setLoading(true)
    const currentDate = new Date();
    const date = currentDate.toISOString();
    const billData = {
      id,
      ...(amount && { newAmount: amount }),
      newStatus: { date, status }
    };
    const response = await fetch('/api/bills/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(billData),
    });

    if (response.ok) {
      revalidateGetAllBills()
      toast({
        title: `Bill status updated to ${status} successfully`,
      })
    } else {
      console.error('Error saving bill data');
      toast({
        variant: "destructive",
        title: `Bill status not updated to ${status} successfully`,
      })
    }
    setLoading(false)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Update Status</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>Select the current status e if needed.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-2 gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="POR Received">POR Received</SelectItem>
                <SelectItem value="Bill Prepared">Bill Prepared</SelectItem>
                <SelectItem value="Waiting For OIC/OC Sign">Waiting For OIC/OC Sign</SelectItem>
                <SelectItem value="Bill Ready">Bill Ready</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {status === "Bill Prepared" && (
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input onChange={e => setAmount(e.target.value)} id="amount" type="number" className="col-span-3" />
            </div>
          )}
        </div>
        <DialogFooter>
          <LoadingButton loading={loading} type="submit" onClick={handleSubmit}>Update</LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
