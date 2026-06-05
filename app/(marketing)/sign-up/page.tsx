import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] px-6 py-12">
      <div className="w-full max-w-md p-8 border rounded-lg bg-card shadow-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Sign up to start turning work into content
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/dashboard" 
            className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-medium transition-colors flex items-center justify-center"
          >
            Continue with Google
          </Link>
        </div>
      </div>
    </div>
  );
}
