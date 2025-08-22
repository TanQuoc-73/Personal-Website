// src/app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { getProjects, createProject } from '@/server/services/project.service';
import { ProjectFilterSchema, CreateProjectSchema } from '@/validations/project.validation';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  
  // Parse và validate query params
  const queryParams = {
    categoryId: searchParams.get('categoryId') || undefined,
    status: searchParams.get('status') || undefined,
    search: searchParams.get('search') || undefined,
    isFeatured: searchParams.get('isFeatured') ? searchParams.get('isFeatured') === 'true' : undefined,
    sortBy: searchParams.get('sortBy') || 'created_at',
    sortOrder: searchParams.get('sortOrder') || 'desc',
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 10,
  };

  // Validate query params
  const validation = ProjectFilterSchema.safeParse(queryParams);
  if (!validation.success) {
    return NextResponse.json(
      { success: false, error: 'Tham số không hợp lệ', details: validation.error.format() },
      { status: 400 }
    );
  }

  const { categoryId, status, search, isFeatured, sortBy, sortOrder, page, limit } = validation.data;

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
  try {
    const body = await req.json();

    // Lọc bỏ trường like_count nếu có
    const { like_count, ...cleanBody } = body;

    // Log the incoming request body for debugging
    console.log('Incoming request body (cleaned):', JSON.stringify(cleanBody, null, 2));

    // First validate the cleaned request body
    const validation = CreateProjectSchema.safeParse(cleanBody);

    // If there are validation errors, return them
    if (!validation.success) {
      // Extract field names that caused validation to fail
      const errorFields = validation.error.issues.map(issue => issue.path[0]);
      console.warn('Validation failed for fields:', errorFields);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Dữ liệu không hợp lệ',
          details: validation.error.format() 
        },
        { status: 400 }
      );
    }

    const { data, error } = await createProject(validation.data);
    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.message.includes('not found') ? 404 : 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi khi tạo dự án' },
      { status: 500 }
    );
  }
}
