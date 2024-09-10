import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Jalankan query untuk mendapatkan data siswa dari tabel
    const result = await sql`SELECT * FROM siswa;`;
    
    // Mengembalikan hasil query dalam bentuk JSON
    return NextResponse.json({ siswa: result.rows }, { status: 200 });
  } catch (error) {
    // Pastikan error adalah instance dari Error, agar TypeScript tahu memiliki property message
    if (error instanceof Error) {
      console.error("Database error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validasi input dari body
    const { nama, nisn, kelas } = body;
    if (!nama || !nisn || !kelas) {
      return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 });
    }

    // Masukkan data siswa ke dalam database
    const result = await sql`
      INSERT INTO siswa (nama, nisn, kelas) 
      VALUES (${nama}, ${nisn}, ${kelas})
    `;

    return NextResponse.json({ message: 'Siswa berhasil ditambahkan' }, { status: 201 });
  } catch (error) {
    // Tangani error seperti sebelumnya
    if (error instanceof Error) {
      console.error("Database error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    await sql`DELETE FROM siswa WHERE id = ${id};`;
    return NextResponse.json({ message: 'Siswa berhasil dihapus' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Database error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const { nama, nisn, kelas } = await req.json();

  try {
    await sql`
      UPDATE siswa 
      SET nama = ${nama}, nisn = ${nisn}, kelas = ${kelas}
      WHERE id = ${id};
    `;
    return NextResponse.json({ message: 'Siswa berhasil diperbarui' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Database error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}