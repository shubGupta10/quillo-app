"use client"

import { useEffect, useState } from "react";

interface ClientDateProps {
    date: string | Date;
    className?: string;
    options?: Intl.DateTimeFormatOptions;
}

export function ClientDate({ date, className, options }: ClientDateProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <span className={`opacity-0 ${className || ""}`}>Loading...</span>;
    }

    const defaultOptions: Intl.DateTimeFormatOptions = {
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit'
    };

    return (
        <span className={className}>
            {new Date(date).toLocaleString(undefined, options || defaultOptions)}
        </span>
    );
}
