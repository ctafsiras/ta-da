'use client'
import { Input } from "@/components/ui/input"
import { JSX, SVGProps, useState } from "react"
import LoadingButton from "../../components/loading-button";

export function AddBillButton() {
  const [bd, setBd] = useState("");
  const [personnelId, setPersonnelId] = useState("");
  const [name, setName] = useState("")
  const [branch, setBranch] = useState("")
  const [loading, setLoading] = useState(false)
  async function handleSubmit() {
    setLoading(true)
    const currentDate = new Date();
    const date = currentDate.toISOString();
    const status = {
      date,
      status: "POR Recieved"
    }
    const billData = { personnelId, amount: 0, date, status };
    const response = await fetch('/api/bills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(billData),
    });

    if (response.ok) {
      console.log('Employee data saved successfully');
    } else {
      console.error('Error saving employee data');
    }
    setLoading(false)
  }
  async function onUpdateBD(e: any) {
    if (e.target.value.length >= 4) {
      const data = await fetch(`/api/personnel/${e.target.value}`);
      const user = await data.json();
      if (user.id) {
        setName(user.name);
        setBranch(user.branch);
        setBd(user.bd);
        setPersonnelId(user.id);
      } else {
        setName('');
        setBranch('');
        setBd('');
        setPersonnelId('');
      }
    }
  }
  function handleKeyDown(e: any) {
    if (e.key === 'Enter' && name && personnelId && branch) {
      handleSubmit();
    }
  }
  return (

    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Generate Bill</h2>
      <div className="flex items-center mb-4">
        <Input className="flex-1 mr-4" placeholder="Enter BD" type="string" onChange={onUpdateBD} onKeyDown={handleKeyDown} />
        <LoadingButton loading={loading} onClick={handleSubmit}>Add</LoadingButton>
      </div>
      <div className="flex items-center text-gray-500">
        <UserIcon className="w-5 h-5 mr-2" />
        <span>{name}</span>
        <span className="mx-2">|</span>
        <BriefcaseIcon className="w-5 h-5 mr-2" />
        <span>{branch}</span>
      </div>
    </div>


  )
}

function BriefcaseIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}



function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
