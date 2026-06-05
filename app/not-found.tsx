import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 min-h-screen px-4 text-center bg-background">
      <div className="flex flex-col items-center max-w-md p-8 border rounded-lg bg-card">
        <div className="p-4 mb-4 rounded-full bg-muted">
            <AlertCircle className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/dashboard">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
