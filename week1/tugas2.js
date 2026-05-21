const mataKuliahList = {
  mataKuliah: [
    { kode: "MK001", nama: "Pemrograman Web", sks: 3 },
    { kode: "MK002", nama: "Basis Data", sks: 4 },
    { kode: "MK003", nama: "Algoritma", sks: 3 }
  ]
};

let mahasiswaList = {
  mahasiswa: [
    {
      nim: "A11.2023.15009",
      nama: "Zahra Afifah",
      status: true,
      matkul: [
        { matkulId: "MK001", tugas: 90, uts: 85, uas: 95 },
        { matkulId: "MK002", tugas: 88, uts: 80, uas: 90 }
      ]
    },
    {
      nim: "A11.2023.15010",
      nama: "Andi Setiawan",
      status: false,
      matkul: [
        { matkulId: "MK003", tugas: 70, uts: 75, uas: 80 }
      ]
    }
  ]
};

const show = () => {
  console.log("=== DAFTAR MAHASISWA ===");
  mahasiswaList.mahasiswa.forEach((mhs) => {
    console.log(`NIM: ${mhs.nim}, Nama: ${mhs.nama}, Status: ${mhs.status ? "Aktif" : "Tidak Aktif"}`);
    console.log("Mata Kuliah:");
    mhs.matkul.forEach((mk) => {
      const matkulName = mataKuliahList.mataKuliah.find((m) => m.kode === mk.matkulId)?.nama;
      console.log(` - ${matkulName}: Tugas ${mk.tugas}, UTS ${mk.uts}, UAS ${mk.uas}`);
    });
    console.log("-----------------------");
  });
};

const add = (mahasiswa) => {
  mahasiswaList.mahasiswa.push(mahasiswa);
  console.log(`Berhasil menambah mahasiswa: ${mahasiswa.nama}`);
};

const update = (nim, dataBaru) => {
  mahasiswaList.mahasiswa = mahasiswaList.mahasiswa.map((m) => 
    m.nim === nim ? { ...m, ...dataBaru } : m
  );
};

const deleteById = (nim) => {
  mahasiswaList.mahasiswa = mahasiswaList.mahasiswa.filter((m) => m.nim !== nim);
  console.log(`Mahasiswa dengan NIM ${nim} dihapus.`);
};

const totalNilai = (nim) => {
  const mahasiswa = mahasiswaList.mahasiswa.find((m) => m.nim === nim);
  if (!mahasiswa) return "Mahasiswa tidak ditemukan";
  return mahasiswa.matkul.map((mk) => {
    const total = mk.tugas + mk.uts + mk.uas;
    return { matkulId: mk.matkulId, total: total };
  });
};

const kategoriNilai = (nilai) => {
  if (nilai >= 85) return "A";
  if (nilai >= 75) return "B";
  if (nilai >= 65) return "C";
  if (nilai >= 50) return "D";
  return "E";
};

const IPS = (nim) => {
  const mahasiswa = mahasiswaList.mahasiswa.find((m) => m.nim === nim);
  if (!mahasiswa) return "Mahasiswa tidak ditemukan";

  const totalSks = mahasiswa.matkul.reduce((sum, mk) => {
    const matkul = mataKuliahList.mataKuliah.find((m) => m.kode === mk.matkulId);
    return sum + matkul.sks;
  }, 0);

  const totalNilaiBobot = mahasiswa.matkul.reduce((sum, mk) => {
    const total = (mk.tugas * 0.3) + (mk.uts * 0.3) + (mk.uas * 0.4);
    const matkul = mataKuliahList.mataKuliah.find((m) => m.kode === mk.matkulId);
    return sum + (total * matkul.sks);
  }, 0);

  return ((totalNilaiBobot / totalSks) / 25).toFixed(2);
};

const jumlahMahasiswa = () => mahasiswaList.mahasiswa.length;

const sortByNIM = () => {
  mahasiswaList.mahasiswa.sort((a, b) => a.nim.localeCompare(b.nim));
  console.log("Daftar mahasiswa telah diurutkan berdasarkan NIM.");
};

const jumlahAktifTidak = () => {
  return {
    aktif: mahasiswaList.mahasiswa.filter((m) => m.status).length,
    tidakAktif: mahasiswaList.mahasiswa.filter((m) => !m.status).length
  };
};


console.log("--- Uji Coba Fungsi ---");

show();

add({
  nim: "A11.2023.15099",
  nama: "Budi Cahyono",
  status: true,
  matkul: [{ matkulId: "MK003", tugas: 80, uts: 80, uas: 80 }]
});

update("A11.2023.15009", { status: false });

console.log(`IPS Zahra Afifah: ${IPS("A11.2023.15009")}`);

console.log("Statistik Status:", jumlahAktifTidak());

sortByNIM();
show();