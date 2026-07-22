import { Platform } from "@/features/content/models/content.interface";
import { getPublisher } from "@/features/schedule/services/publisher.factory";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ provider: string }> }
) {
    try {
        await connectDB();
        const { provider } = await params;

        if (provider === "google") {
            return auth.handler(request);
        }

        const searchParams = request.nextUrl.searchParams;
        const code = searchParams.get("code");
        const error = searchParams.get("error");

        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return NextResponse.redirect(new URL("/sign-in", request.url));
        }

        if (error || !code) {
            console.error(`${provider} OAuth Error:`, error);
            return NextResponse.redirect(new URL(`/settings?error=${error || 'no_code'}`, request.url));
        }

        const platformEnum = provider.toUpperCase() as Platform;

        const publisher = getPublisher(platformEnum);

        const success = await publisher.exchangeCode(code, session.user.id);

        if (!success) {
            return NextResponse.redirect(new URL("/settings?error=exchange_failed", request.url));
        }

        return NextResponse.redirect(new URL("/settings?success=account_connected", request.url));

    } catch (error) {
        console.error("OAuth Callback Error:", error);
        return NextResponse.redirect(new URL("/settings?error=internal_error", request.url));
    }
}