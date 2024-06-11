"use client"
import React, { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import prisma from '@/lib/prisma';

const AddPersonnelButton = () => {
  const [bd, setBd] = useState("");
  const [name, setName] = useState("")
  const [branch, setBranch] = useState("")
  async function handleSubmit() {
    const employeeData = { bd, name, branch };
    const response = await fetch('/api/personnel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });

    if (response.ok) {
      console.log('Employee data saved successfully');
    } else {
      console.error('Error saving employee data');
    }

  }
  return (
    <div>
      <div className="bg-white p-6 shadow-md dark:bg-gray-950">
        <h2 className="mb-4 text-2xl font-bold">Add New Employee</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="id">Employee BD</Label>
            <Input required id="id" name="id" placeholder="Enter employee ID" type="text" onChange={(e) => setBd(e.target.value)} value={bd} />
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input required id="name" name="name" placeholder="Enter employee name" type="text" onChange={(e) => setName(e.target.value)} value={name} />
          </div>
          <div>
            <Label htmlFor="branch">Branch</Label>
            <Select required name="branch" onValueChange={setBranch} value={branch}>
              <SelectTrigger>
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GD(P)">GD(P)</SelectItem>
                <SelectItem value="GD(N)">GD(N)</SelectItem>
                <SelectItem value="Engg">Engg</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Legal">Legal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default AddPersonnelButton;