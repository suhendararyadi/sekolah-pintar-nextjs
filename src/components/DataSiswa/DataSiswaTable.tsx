"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Siswa {
  id: number;
  nama: string;
  nisn: string;
  kelas: string;
}

export default function DataSiswaTable() {
  const [siswa, setSiswa] = useState<Siswa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/siswa");
        const data = await res.json();

        if (Array.isArray(data.siswa)) {
          setSiswa(data.siswa);
        } else {
          console.error("Data format is incorrect, expected array:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus siswa ini?")) {
      try {
        const response = await fetch(`/api/siswa/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Siswa berhasil dihapus");
          setSiswa(siswa.filter((item) => item.id !== id)); // Hapus dari state
        } else {
          alert("Gagal menghapus siswa");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (siswa.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Data Siswa</h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="col-span-2 p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Nama</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">NISN</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Kelas</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Aksi</h5>
          </div>
        </div>

        {siswa.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-5 border-b border-stroke dark:border-strokedark"
          >
            <div className="col-span-2 flex items-center justify-center p-2.5 xl:p-5">
              {/* Link ke halaman profil, tetapi tetap berwarna hitam */}
              <Link href={`/siswa/${item.id}`}>
                <p className="text-black dark:text-white hover:underline">
                  {item.nama}
                </p>
              </Link>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.nisn}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{item.kelas}</p>
            </div>
            <div className="flex items-center justify-center gap-2 p-2.5 xl:p-5">
              {/* Tombol Edit */}
              <Link href={`/siswa/edit/${item.id}`}>
                <button className="inline-flex items-center justify-center gap-2.5 rounded-md border border-primary bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90">
                  Edit
                </button>
              </Link>
              {/* Tombol Hapus */}
              <button
                onClick={() => handleDelete(item.id)}
                className="inline-flex items-center justify-center gap-2.5 rounded-md border border-primary bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
