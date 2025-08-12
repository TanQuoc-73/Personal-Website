import { NextResponse } from "next/server";
import { getAllSkills, createSkill } from "@/server/services/skill.service";

export async function GET() {
  const { data, error } = await getAllSkills();
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, data });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await createSkill(body);
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, data });
}