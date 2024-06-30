import React from 'react';
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

interface LoadingButtonProps {
    loading: boolean;
    children: React.ReactNode;
    [key: string]: any;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ loading, children, ...props }) => {
    return (
        <div>
            {loading ? (
                <Button disabled {...props}>
                    <Loader2 className="h-4 animate-spin" />
                    Please wait
                </Button>
            ) : (
                <Button {...props}>{children}</Button>
            )}
        </div>
    );
};

export default LoadingButton;
