import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Profil Siswa",
  description: "Halaman Profil Siswa",
};

interface Siswa {
  id: number;
  nama: string;
  nisn: string;
  kelas: string;
  bio?: string;
}

// Fungsi untuk mengambil data siswa langsung dari database
async function getSiswaById(id: string) {
  try {
    const result = await sql`SELECT * FROM siswa WHERE id = ${id};`;

    if (result.rows.length === 0) {
      return null; // Jika tidak ditemukan, kembalikan null
    }

    return result.rows[0]; // Kembalikan data siswa yang ditemukan
  } catch (error) {
    console.error("Error fetching siswa data:", error);
    return null;
  }
}

export default async function Profile({ params }: { params: { id: string } }) {
  const siswa = await getSiswaById(params.id);

  if (!siswa) {
    return notFound(); // Jika siswa tidak ditemukan
  }

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Profil Siswa" />

        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="relative z-20 h-35 md:h-65">
            <Image
              src={"/images/cover/cover-01.png"}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
              width={970}
              height={260}
              priority
            />
          </div>
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2">
                <Image
                  src={"/images/user/user-06.png"}  // Placeholder image
                  width={160}
                  height={160}
                  alt="profile"
                  priority
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {siswa.nama} {/* Nama Siswa */}
              </h3>
              <p className="font-medium">NISN: {siswa.nisn}</p> {/* NISN */}
              <p className="font-medium">Kelas: {siswa.kelas}</p> {/* Kelas */}

              <div className="mx-auto mb-5.5 mt-4.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                  <span className="font-semibold text-black dark:text-white">
                    259
                  </span>
                  <span className="text-sm">Posts</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                  <span className="font-semibold text-black dark:text-white">
                    129K
                  </span>
                  <span className="text-sm">Followers</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                  <span className="font-semibold text-black dark:text-white">
                    2K
                  </span>
                  <span className="text-sm">Following</span>
                </div>
              </div>

              <div className="mx-auto max-w-180">
                <h4 className="font-semibold text-black dark:text-white">
                  Tentang Siswa
                </h4>
                <p className="mt-4.5">
                  {siswa.bio
                    ? siswa.bio
                    : "Belum ada informasi lebih lanjut mengenai siswa ini."}
                </p>
              </div>

              <div className="mt-6.5">
                <h4 className="mb-3.5 font-medium text-black dark:text-white">
                  Sosial Media
                </h4>
                <div className="flex items-center justify-center gap-3.5">
                  <Link href="#" className="hover:text-primary" aria-label="social-icon">
                    {/* Facebook icon */}
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_30_966)">
                        <path
                          d="M12.8333 12.375H15.125L16.0416 8.70838H12.8333V6.87504C12.8333 5.93088 12.8333 5.04171 14.6666 5.04171H16.0416V1.96171C15.7428 1.92229 14.6144 1.83337 13.4227 1.83337C10.934 1.83337 9.16663 3.35229 9.16663 6.14171V8.70838H6.41663V12.375H9.16663V20.1667H12.8333V12.375Z"
                          fill=""
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_30_966">
                          <rect width="22" height="22" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>
                  <Link href="#" className="hover:text-primary" aria-label="social-icon">
                    {/* Twitter icon */}
                    <svg
                      className="fill-current"
                      width="23"
                      height="22"
                      viewBox="0 0 23 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_30_970)">
                        <path
                          d="M20.9813 5.18472C20.2815 5.49427 19.5393 5.69757 18.7795 5.78789C19.5804 5.30887 20.1798 4.55498 20.4661 3.66672C19.7145 4.11405 18.8904 4.42755 18.0315 4.59714C17.4545 3.97984 16.6898 3.57044 15.8562 3.43259C15.0225 3.29474 14.1667 3.43617 13.4218 3.83489C12.6768 4.2336 12.0845 4.86726 11.7368 5.63736C11.3891 6.40746 11.3056 7.27085 11.4993 8.0933C9.97497 8.0169 8.48376 7.62078 7.12247 6.93066C5.76118 6.24054 4.56024 5.27185 3.59762 4.08747C3.25689 4.67272 3.07783 5.33801 3.07879 6.01522C3.07879 7.34439 3.75529 8.51864 4.78379 9.20614C4.17513 9.18697 3.57987 9.0226 3.04762 8.72672V8.77439C3.04781 9.65961 3.35413 10.5175 3.91465 11.2027C4.47517 11.8878 5.2554 12.3581 6.12304 12.5336C5.55802 12.6868 4.96557 12.7093 4.39054 12.5996C4.63517 13.3616 5.11196 14.028 5.75417 14.5055C6.39637 14.983 7.17182 15.2477 7.97196 15.2626C7.17673 15.8871 6.2662 16.3488 5.29243 16.6212C4.31866 16.8936 3.30074 16.9714 2.29688 16.8502C4.04926 17.9772 6.08921 18.5755 8.17271 18.5735C15.2246 18.5735 19.081 12.7316 19.081 7.66522C19.081 7.50022 19.0765 7.33339 19.0691 7.17022C19.8197 6.62771 20.4676 5.95566 20.9822 5.18564L20.9813 5.18472Z"
                          fill=""
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_30_970">
                          <rect
                            width="22"
                            height="22"
                            fill="white"
                            transform="translate(0.666138)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
