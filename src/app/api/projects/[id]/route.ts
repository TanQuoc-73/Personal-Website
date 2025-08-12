// src/app/api/projects/[id]/route.ts
import { NextResponse } from 'next/server';
import { getProjectById, updateProject, deleteProject } from '@/server/services/project.service';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { data, error } = await getProjectById(params.id);
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, data });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { data, error } = await updateProject(params.id, body);
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, data });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { error } = await deleteProject(params.id);
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
