// src/app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { getProjects, createProject } from '@/server/services/project.service';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const categoryId = searchParams.get('categoryId') || undefined;
  const status = searchParams.get('status') || undefined; // 'completed' | 'in-progress' | 'archived'
  const search = searchParams.get('search') || undefined;
  const isFeaturedParam = searchParams.get('isFeatured');
  const isFeatured = isFeaturedParam !== null ? isFeaturedParam === 'true' : undefined;
  const sortBy = (searchParams.get('sortBy') as 'created_at' | 'sort_order' | 'view_count' | 'like_count') || 'created_at';
  const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';
  const page = Number(searchParams.get('page') || '1');
  const limit = Number(searchParams.get('limit') || '10');

  const { data, error, count } = await getProjects({
    categoryId,
    status,
    search,
    isFeatured,
    sortBy,
    sortOrder,
    page,
    limit,
  });

  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, data, count, page, limit });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await createProject(body);
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, data });
}
