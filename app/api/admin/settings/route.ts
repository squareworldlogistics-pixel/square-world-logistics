import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const SETTINGS_PATH = path.join(process.cwd(), "public", "site-settings.json");

export async function GET() {
  try {
    const data = fs.readFileSync(SETTINGS_PATH, "utf8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({
      comingSoonActive: true,
      maintenanceActive: false,
      countdownTarget: "2026-06-01T00:00:00",
    });
  }
}

export async function POST(request: Request) {
  // Check auth cookie
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

    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(newSettings, null, 2), "utf8");
    return NextResponse.json({ success: true, settings: newSettings });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update settings" }, { status: 500 });
  }
}
