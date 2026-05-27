import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow bypass for essential system paths, admin panels, and static files
  if (
    pathname.startsWith("/coming-soon") ||
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/blog/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. Query settings dynamically
  try {
    const settingsRes = await fetch(`${request.nextUrl.origin}/api/admin/settings`);
    if (settingsRes.ok) {
      const settings = await settingsRes.json();

      // Maintenance mode takes absolute priority
      if (settings.maintenanceActive) {
        const url = request.nextUrl.clone();
        url.pathname = "/maintenance";
        return NextResponse.redirect(url);
      }

      // Coming soon mode takes next priority, but only if the countdown target is in the future
      if (settings.comingSoonActive) {
        const now = new Date().getTime();
        const targetTime = new Date(settings.countdownTarget).getTime();

        if (!isNaN(targetTime) && now < targetTime) {
          const url = request.nextUrl.clone();
          url.pathname = "/coming-soon";
          return NextResponse.redirect(url);
        }
      }
    }
  } catch (error) {
    console.error("Middleware settings fetch failed:", error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
