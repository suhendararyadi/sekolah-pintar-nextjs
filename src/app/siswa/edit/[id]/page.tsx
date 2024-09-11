"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const EditSiswa = ({ params }: { params: { id: string } }) => {
  const [nama, setNama] = useState("");
  const [nisn, setNisn] = useState("");
  const [kelas, setKelas] = useState("");
  const [kelasOptions, setKelasOptions] = useState([]); // State untuk menyimpan opsi kelas
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Mengambil data siswa berdasarkan ID dan data kelas dari API
  useEffect(() => {
    async function fetchSiswaAndKelas() {
      try {
        // Fetch data siswa berdasarkan ID
        const siswaResponse = await fetch(`/api/siswa/${params.id}`);
        const siswaData = await siswaResponse.json();
        setNama(siswaData.nama);
        setNisn(siswaData.nisn);
        setKelas(siswaData.kelas);

        // Fetch data kelas untuk dropdown
        const kelasResponse = await fetch("/api/kelas");
        const kelasData = await kelasResponse.json();
        setKelasOptions(kelasData);
        
        setLoading(false); // Selesai loading
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchSiswaAndKelas();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataSiswa = { nama, nisn, kelas };

    try {
      const response = await fetch(`/api/siswa/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSiswa),
      });

      if (response.ok) {
        alert("Data siswa berhasil diperbarui!");
        router.push("/siswa"); // Kembali ke halaman daftar siswa
      } else {
        alert("Terjadi kesalahan saat memperbarui data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return <div>Loading data...</div>; // Tampilkan loading saat data belum ada
  }

  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
        <h3 className="font-medium text-black dark:text-white mb-6">Edit Siswa</h3>
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
            <select
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            >
              <option value="">Pilih Kelas</option>
              {kelasOptions.map((kelasOption: { id: number; nama_kelas: string }) => (
                <option key={kelasOption.id} value={kelasOption.nama_kelas}>
                  {kelasOption.nama_kelas}
                </option>
              ))}
            </select>
          </div>

          <button className="w-full rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Update Siswa
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default EditSiswa;