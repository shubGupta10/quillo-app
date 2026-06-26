import { NextResponse, type NextRequest } from "next/server";

const publicRoutes = ["/", "/sign-in", "/sign-up"];

export default async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith("/api/") ||
        pathname.startsWith("/_next/") ||
        pathname.startsWith("/favicon.ico") ||
        pathname.endsWith(".svg") ||
        pathname.endsWith(".png") ||
        pathname === "/manifest.json" ||
        pathname === "/sw.js" ||
        pathname.startsWith("/swe-worker-") ||
        pathname.startsWith("/workbox-")
    ) {
        return NextResponse.next();
    }


    const sessionResponse = await fetch(
        new URL("/api/auth/get-session", request.nextUrl.origin),
        {
            headers: {
                cookie: request.headers.get("cookie") || "",
            },
        }
    );

    const session = sessionResponse.ok ? await sessionResponse.json() : null;
    const isAuthenticated = !!session?.user;
    const isPublicRoute = publicRoutes.includes(pathname);

    if (isAuthenticated && isPublicRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }


    if (!isAuthenticated && !isPublicRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
