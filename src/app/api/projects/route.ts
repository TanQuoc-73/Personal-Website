// src/app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { getAllProjects, createProject } from '@/server/services/project.service';

export async function GET() {
  const { data, error } = await getAllProjects();
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, data });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await createProject(body);
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, data });
}
