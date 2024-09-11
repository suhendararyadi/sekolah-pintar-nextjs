import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// GET: Mengambil semua kelas dari database
export async function GET() {
  try {
    const result = await sql`SELECT * FROM kelas;`;
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}