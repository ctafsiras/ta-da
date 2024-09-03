"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createUser } from "@/app/(admin_routes)/users/actions"; // Assuming this is a server-side function

const NewUserModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [bd, setBD] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Viewer");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const result = await createUser({ bd, password, role });
        console.log(result);
        setBD("")
        setPassword("")
        setShowModal(false);
    };

    return (
        <div>
            <Button onClick={() => setShowModal(true)}>Add User</Button>
            {showModal && (
                <Dialog open={showModal} onOpenChange={setShowModal}>
                    <form onSubmit={handleSubmit}>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add New User</DialogTitle>
                                <DialogDescription>
                                    Enter the user details and click Create to add a new user.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid items-center grid-cols-4 gap-4">
                                    <Label htmlFor="bd" className="text-right">
                                        User BD
                                    </Label>
                                    <Input
                                        id="bd"
                                        name="bd"
                                        type="text"
                                        value={bd}
                                        onChange={(e) => setBD(e.target.value)}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid items-center grid-cols-4 gap-4">
                                    <Label htmlFor="password" className="text-right">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid items-center grid-cols-4 gap-4">
                                    <Label htmlFor="role" className="text-right">
                                        Role
                                    </Label>
                                    <Select
                                        name="role"
                                        value={role}
                                        onValueChange={setRole}
                                    >
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
                                <Button type="submit" onClick={handleSubmit} >Create</Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            )}
        </div>
    );
};

export default NewUserModal;

