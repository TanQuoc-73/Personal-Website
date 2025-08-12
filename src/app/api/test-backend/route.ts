// src/app/api/test-backend/route.ts
import { NextResponse } from 'next/server';
import { getUserProfile } from '@/server/services/user.service'; // đường dẫn tới file service của bạn

export async function GET() {
  const userId = 'some-user-id'; // Thay bằng userId thật để test hoặc truyền từ query params

  const { data, error } = await getUserProfile(userId);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data });
}
