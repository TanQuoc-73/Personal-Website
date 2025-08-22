import { NextRequest, NextResponse } from 'next/server';
import { getSkillById, updateSkill, deleteSkill } from '@/server/services/skill.service';

function extractIdFromRequest(request: NextRequest): string | undefined {
  const pathname = request.nextUrl.pathname;
  const parts = pathname.split('/');
  return parts[parts.length - 1];
}

function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') {
    return (error as any).message;
  }
  return 'Đã xảy ra lỗi';
}

export async function GET(request: NextRequest) {
  const id = extractIdFromRequest(request);

  const { data, error } = await getSkillById(id ?? '');
  if (error) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  }
  return NextResponse.json({ success: true, data });
}

export async function PUT(request: NextRequest) {
  const id = extractIdFromRequest(request);
  const body = await request.json();

  const { data, error } = await updateSkill(id ?? '', body);
  if (error) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  }
  return NextResponse.json({ success: true, data });
}

export async function DELETE(request: NextRequest) {
  const id = extractIdFromRequest(request);

  const { error } = await deleteSkill(id ?? '');
  if (error) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
