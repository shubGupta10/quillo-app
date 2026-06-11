import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background">
      <div className="flex flex-col items-center max-w-md p-8 border border-border rounded-xl bg-card shadow-sm">
        <div className="p-4 mb-6 rounded-full bg-primary/10">
            <AlertCircle className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight mb-2 text-foreground">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 text-base">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/dashboard" className="w-full">
          <Button className="w-full">Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
