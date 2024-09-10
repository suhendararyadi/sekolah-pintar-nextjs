import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// GET: Mengambil data siswa berdasarkan ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const result = await sql`SELECT * FROM siswa WHERE id = ${id};`;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Siswa tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}

// PUT: Mengedit data siswa berdasarkan ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { nama, nisn, kelas } = await request.json();

  try {
    const result = await sql`
      UPDATE siswa 
      SET nama = ${nama}, nisn = ${nisn}, kelas = ${kelas} 
      WHERE id = ${id};
    `;

    return NextResponse.json({ message: 'Siswa berhasil diperbarui' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating data' }, { status: 500 });
  }
}

// DELETE: Menghapus data siswa berdasarkan ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await sql`DELETE FROM siswa WHERE id = ${id};`;
    return NextResponse.json({ message: 'Siswa berhasil dihapus' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting data' }, { status: 500 });
  }
}
