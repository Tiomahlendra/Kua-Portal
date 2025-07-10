import React, { useState } from "react";

interface FormModalProps {
  onClose: () => void;
}

const FormModal: React.FC<FormModalProps> = ({ onClose }) => {
  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [layanan, setLayanan] = useState("Pendaftaran Nikah");
  const [catatan, setCatatan] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("nik", nik);
    formData.append("tanggal", tanggal);
    formData.append("layanan", layanan);
    formData.append("catatan", catatan);

    const res = await fetch("http://localhost/kua-backend/pengajuan.php", {
      method: "POST",
      body: formData,
    });

    const text = await res.text();
    setResponse(text);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Formulir Pendaftaran</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="text"
            placeholder="NIK"
            value={nik}
            onChange={(e) => setNik(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
          <select
            value={layanan}
            onChange={(e) => setLayanan(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="Pendaftaran Nikah">Pendaftaran Nikah</option>
            <option value="Konsultasi Pranikah">Konsultasi Pranikah</option>
            <option value="Pendaftaran Rujuk">Pendaftaran Rujuk</option>
          </select>
          <textarea
            placeholder="Catatan tambahan"
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            className="w-full border rounded p-2"
          />
          <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded w-full">
            Kirim
          </button>
        </form>
        {response && (
          <div className="mt-4 text-center text-sm text-blue-700">{response}</div>
        )}
        <button onClick={onClose} className="mt-4 text-red-600 underline w-full">
          Tutup
        </button>
      </div>
    </div>
  );
};

export default FormModal;
