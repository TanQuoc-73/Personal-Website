// src/app/api/skills/[id]/route.ts
import { NextResponse } from 'next/server';
import { getSkillById, updateSkill, deleteSkill } from '@/server/services/skill.service';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { data, error } = await getSkillById(params.id);
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, data });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { data, error } = await updateSkill(params.id, body);
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, data });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { error } = await deleteSkill(params.id);
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
