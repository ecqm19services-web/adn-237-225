import { NextResponse } from "next/server";
import { VALIDATION_QUESTIONS } from "@/app/api/validate/route";

export async function GET() {
  return NextResponse.json({ questions: VALIDATION_QUESTIONS });
}
