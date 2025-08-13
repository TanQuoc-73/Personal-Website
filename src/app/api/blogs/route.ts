// src/app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { getAllBlog, createBlog, updateBlog, deleteBlog } from '@/server/services/blog.service';

export async function GET() {
  const { data, error } = await getAllBlog();
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, data });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await createBlog(body);
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, data });
}
