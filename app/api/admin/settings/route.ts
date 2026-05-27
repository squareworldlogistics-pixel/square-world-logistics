import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("body")
      .eq("slug", "__site_settings__")
      .single();

    if (error || !data || !data.body) {
      // Fallback default configurations
      return NextResponse.json({
        comingSoonActive: true,
        maintenanceActive: false,
        countdownTarget: "2026-06-01T00:00:00",
      }, {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        }
      });
    }

    return NextResponse.json(JSON.parse(data.body), {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      }
    });
  } catch (error) {
    return NextResponse.json({
      comingSoonActive: true,
      maintenanceActive: false,
      countdownTarget: "2026-06-01T00:00:00",
    }, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      }
    });
  }
}

export async function POST(request: Request) {
  // Verify administrator auth cookie
  const cookieStore = await cookies();
  const session = cookieStore.get("swl_admin_session");

  if (!session || session.value !== "true") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { comingSoonActive, maintenanceActive, countdownTarget } = body;

    const newSettings = {
      comingSoonActive: !!comingSoonActive,
      maintenanceActive: !!maintenanceActive,
      countdownTarget: countdownTarget || "2026-06-01T00:00:00",
    };

    // Query if settings metadata post already exists
    const { data: existing } = await supabase
      .from("posts")
      .select("id")
      .eq("slug", "__site_settings__")
      .single();

    let error;
    if (existing) {
      const { error: updateError } = await supabase
        .from("posts")
        .update({
          body: JSON.stringify(newSettings),
        })
        .eq("slug", "__site_settings__");
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("posts")
        .insert({
          slug: "__site_settings__",
          title: "Site Settings Metadata",
          excerpt: "Launch status configurations.",
          body: JSON.stringify(newSettings),
        });
      error = insertError;
    }

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ success: true, settings: newSettings });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update settings" }, { status: 500 });
  }
}
