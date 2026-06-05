"use client";

import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard",
        });
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] px-6 py-12">
            <div className="w-full max-w-md p-8 border rounded-lg bg-card shadow-sm space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Welcome back
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Sign in to access your dashboard
                    </p>
                </div>

                <button
                    onClick={handleGoogleSignIn}
                    className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-medium transition-colors"
                >
                    Continue with Google
                </button>
            </div>
        </div>
    );
}