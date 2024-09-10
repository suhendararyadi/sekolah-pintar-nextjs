"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";

const TambahSiswa = () => {
  const [nama, setNama] = useState("");
  const [nisn, setNisn] = useState("");
  const [kelas, setKelas] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataSiswa = { nama, nisn, kelas };

    try {
      const response = await fetch("/api/siswa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSiswa),
      });

      if (response.ok) {
        alert("Data siswa berhasil ditambahkan!");
        setNama("");
        setNisn("");
        setKelas("");
      } else {
        alert("Terjadi kesalahan, coba lagi.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
        <h3 className="font-medium text-black dark:text-white mb-6">Tambah Siswa</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Nama
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan Nama"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              NISN
            </label>
            <input
              type="text"
              value={nisn}
              onChange={(e) => setNisn(e.target.value)}
              placeholder="Masukkan NISN"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Kelas
            </label>
            <input
              type="text"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              placeholder="Masukkan Kelas"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            />
          </div>

          <button className="w-full rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Tambah Siswa
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default TambahSiswa;
