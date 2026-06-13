import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-microcms-signature');
  if (secret !== process.env.MICROCMS_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json() as { api?: string; id?: string };

    if (body.api === 'schools') {
      revalidatePath('/ranking/', 'page');
      revalidatePath('/compare/', 'page');
      revalidatePath('/', 'page');
      if (body.id) {
        revalidatePath(`/school/${body.id}/`, 'page');
      }
    }

    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
