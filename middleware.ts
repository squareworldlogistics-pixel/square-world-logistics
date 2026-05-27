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

  // 2. Query settings directly from Supabase REST API (NOT a self-fetch)
  //    Self-fetching own API routes from middleware is broken on Vercel Edge.
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.next();
    }

    const res = await fetch(
      `${supabaseUrl}/rest/v1/posts?slug=eq.__site_settings__&select=body`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        cache: "no-store",
      }
    );

    if (res.ok) {
      const rows = await res.json();

      if (rows && rows.length > 0 && rows[0].body) {
        const settings = JSON.parse(rows[0].body);

        // Maintenance mode takes absolute priority
        if (settings.maintenanceActive) {
          const url = request.nextUrl.clone();
          url.pathname = "/maintenance";
          return NextResponse.redirect(url);
        }

        // Coming soon mode — only redirect if countdown target is meaningfully in the future
        if (settings.comingSoonActive && settings.countdownTarget) {
          const now = Date.now();
          const targetTime = new Date(settings.countdownTarget).getTime();

          if (!isNaN(targetTime) && now < targetTime) {
            const url = request.nextUrl.clone();
            url.pathname = "/coming-soon";
            return NextResponse.redirect(url);
          }
        }
      }
    }
  } catch (error) {
    // If anything fails, let traffic through — never block users due to a settings check failure
    console.error("Middleware settings check failed:", error);
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
