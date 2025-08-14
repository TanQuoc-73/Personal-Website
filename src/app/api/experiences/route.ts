import { NextResponse } from 'next/server';
import { getAllExperiences, getExperienceById} from '@/server/services/experience.service';

export async function GET() {
  const { data, error } = await getAllExperiences();
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, data });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await getExperienceById(body);
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, data });
}