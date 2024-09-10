import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DataSiswaTable from "@/components/DataSiswa/DataSiswaTable"; // Import DataSiswaTable

const DataSiswa = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        {/* Komponen Tabel Data Siswa */}
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <DataSiswaTable /> {/* Menampilkan tabel data siswa */}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DataSiswa;
