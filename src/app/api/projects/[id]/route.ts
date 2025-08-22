import { NextRequest, NextResponse } from 'next/server';
import { getProjectById, updateProject, deleteProject } from '@/server/services/project.service';
import { ProjectIdSchema, UpdateProjectSchema } from '@/validations/project.validation';

function extractIdFromRequest(request: NextRequest): string | undefined {
  const pathname = request.nextUrl.pathname;
  const parts = pathname.split('/');
  return parts[parts.length - 1];
}

export async function GET(request: NextRequest) {
  const id = extractIdFromRequest(request);

  const idValidation = ProjectIdSchema.safeParse(id);
  if (!idValidation.success) {
    return NextResponse.json(
      { success: false, error: 'ID dự án không hợp lệ' },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await getProjectById(idValidation.data);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.message.includes('not found') ? 404 : 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi khi lấy thông tin dự án' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const id = extractIdFromRequest(request);

  const idValidation = ProjectIdSchema.safeParse(id);
  if (!idValidation.success) {
    return NextResponse.json(
      { success: false, error: 'ID dự án không hợp lệ' },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();

    const validation = UpdateProjectSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Dữ liệu cập nhật không hợp lệ',
          details: validation.error.format(),
        },
        { status: 400 }
      );
    }

    const { data, error } = await updateProject(idValidation.data, validation.data);
    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.message.includes('not found') ? 404 : 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi khi cập nhật dự án' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const id = extractIdFromRequest(request);

  const idValidation = ProjectIdSchema.safeParse(id);
  if (!idValidation.success) {
    return NextResponse.json(
      { success: false, error: 'ID dự án không hợp lệ' },
      { status: 400 }
    );
  }

  try {
    const { error } = await deleteProject(idValidation.data);
    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.message.includes('not found') ? 404 : 500 }
      );
    }
    return NextResponse.json({
      success: true,
      message: 'Xóa dự án thành công',
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi khi xóa dự án' },
      { status: 500 }
    );
  }
}
