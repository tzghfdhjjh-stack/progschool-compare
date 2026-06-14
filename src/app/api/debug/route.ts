import { NextResponse } from 'next/server';

export async function GET() {
  const domain = process.env.MICROCMS_SERVICE_DOMAIN ?? '';
  const hasKey = !!process.env.MICROCMS_API_KEY;
  const keyLength = process.env.MICROCMS_API_KEY?.length ?? 0;

  let fetchResult: unknown = null;
  try {
    const res = await fetch(
      `https://${domain}.microcms.io/api/v1/schools?limit=1&fields=name`,
      { headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY ?? '' } }
    );
    fetchResult = await res.json();
  } catch (e) {
    fetchResult = { error: String(e) };
  }

  return NextResponse.json({ domain, hasKey, keyLength, fetchResult });
}
