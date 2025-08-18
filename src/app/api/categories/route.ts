import { NextResponse } from 'next/server';
import { getAllCategories, getCategoriesById} from '@/server/services/categories.service';

export async function GET() {
  const { data, error } = await getAllCategories();
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, data });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await getCategoriesById(body);
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, data });
}