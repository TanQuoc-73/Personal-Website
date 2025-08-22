// src/app/api/get-user-role/route.ts (hoặc pages/api/get-user-role.ts nếu dùng pages API)
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    console.log('Received userId:', userId); // Log để debug

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    // Truy vấn bảng users lấy tất cả trường để debug dễ hơn
    const { data, error } = await supabase
      .from('users')
      .select('id, email, role, full_name, avatar_url')
      .eq('id', userId)
      .maybeSingle(); // dùng maybeSingle để tránh lỗi không tìm thấy

    console.log('Query result data:', data, 'error:', error);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ role: data.role, full_name: data.full_name, email: data.email });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
