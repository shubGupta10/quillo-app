"use client"

interface ClientDateProps {
    date: string | Date;
    className?: string;
    options?: Intl.DateTimeFormatOptions;
}

const defaultOptions: Intl.DateTimeFormatOptions = {
    month: 'short', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: '2-digit'
};

export function ClientDate({ date, className, options }: ClientDateProps) {
    const d = new Date(date);
    const isValid = !isNaN(d.getTime());

    if (!isValid) {
        return <span className={className}>—</span>;
    }

    const formattedDate = d.toLocaleString('en-US', options || defaultOptions);

    return (
        <time dateTime={d.toISOString()} suppressHydrationWarning className={className}>
            {formattedDate}
        </time>
    );
}
