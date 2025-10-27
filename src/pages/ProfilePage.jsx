// src/pages/ProfilePage.jsx
export default function ProfilePage() {
  const kelompok = {
    namaKelompok: "Kelompok 35",
    mataKuliah: "Praktikum Pemrograman Bergerak",
    asprak1:"Fadli Shidqi Firdaus",
    asprak2:"Edi Wicoro",
    anggota: [
      { nama: "Farrel Alfat'han", nim: "21120123130101" },
      { nama: "Sabiq Habiburrahman Zarkasi", nim: "21120123140058" },
      { nama: "Jeremy Cavellino Sulistyo", nim: "21120123140162" },
      { nama: "Ananda Dwiki Bayu Widiatama", nim: "21120123120026" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-8 text-center">
          <h1 className="text-3xl font-bold mb-2">{kelompok.namaKelompok}</h1>
          <p className="text-lg opacity-90">{kelompok.mataKuliah}</p>
          <p className="text-sm mt-2 opacity-80">
            Asisten Praktikum: <span className="font-semibold">{kelompok.asprak1} dan {kelompok.asprak2}</span>
          </p>
        </div>

        {/* Konten Anggota */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4 text-center">
            Daftar Anggota Kelompok
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-700 font-semibold">No</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-semibold">Nama</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-semibold">NIM</th>
                </tr>
              </thead>
              <tbody>
                {kelompok.anggota.map((anggota, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-indigo-50 transition`}
                  >
                    <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                    <td className="py-3 px-4 text-gray-800 font-medium">{anggota.nama}</td>
                    <td className="py-3 px-4 text-gray-700">{anggota.nim}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Catatan */}
          <div className="mt-8 text-center text-gray-600 text-sm">
            <p className="mt-1 font-medium text-indigo-600">
              Universitas Diponegoro &middot; 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
