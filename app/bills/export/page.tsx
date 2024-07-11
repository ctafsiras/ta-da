"use client"
import React from 'react';
import { writeXLSX, } from 'xlsx';
import { DatePickerWithRange } from './DatePickerWithRange';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { Button } from '@/components/ui/button';

const Page = () => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 1),
    })
    async function handle() {
        const data = await fetch('/api/bills/export', {
            method: 'POST',
            body: JSON.stringify(date),
        })
        const bills = await data.json()
        console.log("Bills: ", bills);
    }
    return (
        <div>
            <DatePickerWithRange className={""} date={date} setDate={setDate} />
            <Button onClick={handle}>Show</Button>
        </div>
    );
};

export default Page;