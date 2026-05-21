import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  confirmDelete,
  confirmUpdate,
} from "@/Utils/Helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

import { mahasiswaList } from "@/Data/Dummy";

import Card from "@/pages/Admin/Components/Card";
import Heading from "@/pages/Admin/Components/Heading";
import Button from "@/pages/Admin/Components/Button";

import MahasiswaTable from "@/pages/Admin/Mahasiswa/MahasiswaTable";
import MahasiswaModal from "@/pages/Admin/Mahasiswa/MahasiswaModal";

const Mahasiswa = () => {
  const navigate = useNavigate();

  const [mahasiswa, setMahasiswa] = useState([]);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMahasiswa(mahasiswaList);
  }, []);

  // CRUD
  const storeMahasiswa = (data) => {
    setMahasiswa([...mahasiswa, data]);
  };

  const updateMahasiswa = (data) => {
    const updated = mahasiswa.map((mhs) =>
      mhs.nim === data.nim ? data : mhs
    );
    setMahasiswa(updated);
  };

  const deleteMahasiswa = (nim) => {
    const filtered = mahasiswa.filter((mhs) => mhs.nim !== nim);
    setMahasiswa(filtered);
  };

  // Modal control
  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setIsModalOpen(true);
  };

  const openEditModal = (mhs) => {
    setSelectedMahasiswa(mhs);
    setIsModalOpen(true);
  };

 const handleSubmit = (formData) => {
    
    if (selectedMahasiswa) {
      confirmUpdate(() => {
        updateMahasiswa(formData); 
        toastSuccess("Data berhasil diperbarui");
        setIsModalOpen(false);
      });
    } else {
      const exists = mahasiswa.find((m) => m.nim === formData.nim);
      if (exists) {
        toastError("NIM sudah terdaftar!");
        return;
      }
      
      storeMahasiswa(formData); 
      toastSuccess("Data berhasil ditambahkan");
      setIsModalOpen(false);
    }
  };

  const handleDelete = (nim) => {
    confirmDelete(() => {
      deleteMahasiswa(nim);
      toastSuccess("Data berhasil dihapus");
    });
  };
  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">
            Daftar Mahasiswa
          </Heading>
          <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
        </div>

        <MahasiswaTable
          mahasiswa={mahasiswa}
          openEditModal={openEditModal}
          onDelete={handleDelete}
          onDetail={(nim) => navigate(`/admin/mahasiswa/${nim}`)}
        />
      </Card>

      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
      />
    </>
  );
};

export default Mahasiswa;