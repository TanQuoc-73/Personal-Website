import { NextResponse } from 'next/server';
import { getAllCategories, getCategoriesById } from '@/server/services/categories.service';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      // Nếu có ID, lấy category theo ID
      const { data, error } = await getCategoriesById(id);
      if (error) throw error;
      return NextResponse.json({ success: true, data });
    } else {
      // Nếu không có ID, lấy tất cả categories
      const { data, error } = await getAllCategories();
      if (error) throw error;
      return NextResponse.json({ success: true, data });
    }
  } catch (error) {
    console.error('Error in categories API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Lỗi không xác định' 
      }, 
      { status: 500 }
    );
  }
}

// Giữ lại POST nếu cần thiết cho các chức năng khác
export async function POST(req: Request) {
  return NextResponse.json(
    { success: false, error: 'Phương thức không được hỗ trợ' },
    { status: 405 }
  );
}