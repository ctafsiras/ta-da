"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const NewUserModal = () => {
    const [users, setUsers] = useState([
        { id: 1, userId: "user1", role: "Admin" },
        { id: 2, userId: "user2", role: "Viewer" },
        { id: 3, userId: "user3", role: "Viewer" },
    ])
    const [showModal, setShowModal] = useState(false)
    const [newUserId, setNewUserId] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newRole, setNewRole] = useState("Viewer")
    const handleAddUser = async () => {
        const newUser = { id: users.length + 1, userId: newUserId, role: newRole }
        const res = await fetch("YOUR_API_URL", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
        const data = await res.json()
        setUsers([...users, data])
        setShowModal(false)
    }

    return (
        <div className="">
            <Button onClick={() => setShowModal(true)}>Add User</Button>
            {showModal && (
                <Dialog open={showModal} onOpenChange={setShowModal}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New User</DialogTitle>
                            <DialogDescription>Enter the user details and click Create to add a new user.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid items-center grid-cols-4 gap-4">
                                <Label htmlFor="user-id" className="text-right">
                                    User ID
                                </Label>
                                <Input
                                    id="user-id"
                                    value={newUserId}
                                    onChange={(e) => setNewUserId(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid items-center grid-cols-4 gap-4">
                                <Label htmlFor="password" className="text-right">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid items-center grid-cols-4 gap-4">
                                <Label htmlFor="role" className="text-right">
                                    Role
                                </Label>
                                <Select id="role" value={newRole} onValueChange={setNewRole} className="col-span-3">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                        <SelectItem value="Viewer">Viewer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleAddUser}>Create</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default NewUserModal;