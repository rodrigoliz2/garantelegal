import { NextRequest, NextResponse } from "next/server";
import { availableSlots, modalities } from "@/lib/booking";

export async function GET(request: NextRequest) {
  const modality = request.nextUrl.searchParams.get("modality");
  if (!modality || !modalities.includes(modality as (typeof modalities)[number])) return NextResponse.json({ error: "Modalidad inválida." }, { status: 400 });
  try {
    const slots = await availableSlots(modality as (typeof modalities)[number]);
    return NextResponse.json({ slots }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "No pudimos cargar los horarios. Intenta de nuevo." }, { status: 503 });
  }
}
