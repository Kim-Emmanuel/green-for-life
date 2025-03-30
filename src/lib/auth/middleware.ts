// src/lib/auth/middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { verifyToken } from "./jwt";

// Main middleware function (default export)
export default async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Public routes that don't require auth
	if (pathname.startsWith("/api/auth") || pathname === "/login") {
		return NextResponse.next();
	}

	try {
		const token =
			request.cookies.get("token")?.value ||
			request.headers.get("Authorization")?.split(" ")[1];

		if (!token) {
			// Only redirect to login for HTML requests
			if (request.headers.get("accept")?.includes("text/html")) {
				return NextResponse.redirect(new URL("/login", request.url));
			}
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const payload = verifyToken(token);
		
		// Add user context to headers
		const headers = new Headers(request.headers);
		headers.set("x-user-id", payload.id);
		headers.set("x-user-role", payload.role);

		return NextResponse.next({ request: { headers } });
	} catch (_error) {
		// Only redirect to login for HTML requests
		if (request.headers.get("accept")?.includes("text/html")) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
		return NextResponse.json({ error: "Invalid token" }, { status: 401 });
	}
}

// Authentication checker for API routes
export async function verifyAuth(
	request: NextRequest,
	requiredRole?: "ADMIN" | "USER"
) {
	try {
		const token =
			request.cookies.get("token")?.value ||
			request.headers.get("Authorization")?.split(" ")[1];

		if (!token) {
			return { error: "Unauthorized", status: 401 };
		}

		const payload = verifyToken(token);

		if (requiredRole && payload.role !== requiredRole) {
			return { error: "Forbidden", status: 403 };
		}

		return {
			status: 200,
			user: {
				id: payload.id,
				role: payload.role,
				email: payload.email
			},
		};
	} catch (_error) {
		return { error: "Invalid token", status: 401 };
	}
}

export const config = {
	matcher: [
		"/admin/:path*", 
		"/api/((?!auth).)*", // Exclude all auth endpoints
		"/news-resources/:path*"
	],
};