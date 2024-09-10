"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const EditSiswa = ({ params }: { params: { id: string } }) => {
  const [nama, setNama] = useState("");
  const [nisn, setNisn] = useState("");
  const [kelas, setKelas] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchSiswa() {
      const response = await fetch(`/api/siswa/${params.id}`);
      const data = await response.json();
      setNama(data.nama);
      setNisn(data.nisn);
      setKelas(data.kelas);
    }
    fetchSiswa();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/siswa/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nama, nisn, kelas }),
      });

      if (response.ok) {
        alert("Data siswa berhasil diperbarui!");
        router.push("/siswa");
      } else {
        alert("Terjadi kesalahan saat memperbarui data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Edit Siswa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama"
        />
        <input
          type="text"
          value={nisn}
          onChange={(e) => setNisn(e.target.value)}
          placeholder="NISN"
        />
        <input
          type="text"
          value={kelas}
          onChange={(e) => setKelas(e.target.value)}
          placeholder="Kelas"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditSiswa;
