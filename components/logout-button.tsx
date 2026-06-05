"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export function LogoutButton(){
    const router = useRouter();

    return (
        <Button
         variant="default"
         onClick={async() => {
            await authClient.signOut();
            router.push("/sign-in");
         }}
        >
            Logout
        </Button>
    )
}