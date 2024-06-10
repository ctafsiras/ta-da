"use client"

import { Calendar } from "@/components/ui/calendar"

import React from 'react';

const Cal = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
console.log(date);
    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
        />
    )
};

export default Cal;
