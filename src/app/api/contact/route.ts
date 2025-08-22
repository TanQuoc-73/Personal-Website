import { NextResponse } from 'next/server';
import { createContactMessage, getContactMessages } from '@/server/services/contact.service';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await createContactMessage(body);
    if (error) {
      return NextResponse.json({ error: error.message || 'Failed to create contact message' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await getContactMessages();
    if (error) {
      return NextResponse.json({ error: error.message || 'Failed to fetch contact messages' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
