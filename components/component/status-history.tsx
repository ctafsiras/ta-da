import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogHeader, DialogContent, Dialog } from "@/components/ui/dialog"
import type { StatusHistory } from "@prisma/client"
import { formatTime } from "@/lib/timeFormat"

export function StatusHistory({ status }: { status: StatusHistory[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">History</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>History Timeline</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {status && status.map((st, i) => (
            <div key={i} className="grid gap-2 text-sm">
              <div className="flex items-center justify-between">
                <div className="font-medium">
                  {new Date(st?.date).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    timeZone: 'Asia/Dhaka'
                  })}
                </div>
                <div className="px-2 py-1 rounded-full bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-400">
                  {st.status}
                </div>
              </div>
              <div className="text-gray-500 dark:text-gray-400">Time: {formatTime("" + st.date)}</div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
