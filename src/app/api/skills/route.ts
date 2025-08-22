import { NextResponse } from "next/server";
import { getAllSkills, createSkill } from "@/server/services/skill.service";

function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'message' in error) {
    const e = error as { message?: unknown };
    if (typeof e.message === 'string') return e.message;
  }
  return 'Đã xảy ra lỗi';
}

export async function GET() {
  const { data, error } = await getAllSkills();
  if (error) 
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  
  return NextResponse.json({ success: true, data });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await createSkill(body);
  if (error) 
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  
  return NextResponse.json({ success: true, data });
}
