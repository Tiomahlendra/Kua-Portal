import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Heart, Users, BookOpen, FileText, Bell } from "lucide-react";

const services = [
  {
    id: "nikah",
    title: "Pendaftaran Nikah",
    description: "Daftar untuk melangsungkan pernikahan di KUA",
    icon: Heart,
    color: "bg-pink-500",
    requirements: ["KTP Calon Pengantin", "Akta Kelahiran", "Surat Belum Menikah", "Pas Foto"]
  },
  {
    id: "konsultasi",
    title: "Konsultasi Pranikah",
    description: "Konsultasi untuk kesiapan menikah",
    icon: Users,
    color: "bg-blue-500",
    requirements: ["KTP", "Surat RT/RW"]
  },
  {
    id: "rujuk",
    title: "Rujuk / Mediasi",
    description: "Layanan rujuk dan mediasi pasangan",
    icon: BookOpen,
    color: "bg-green-500",
    requirements: ["KTP Pasangan", "Surat Masalah", "Dokumen Pernikahan"]
  },
  {
    id: "administrasi",
    title: "Administrasi Umum",
    description: "Layanan umum seperti surat keterangan",
    icon: FileText,
    color: "bg-orange-500",
    requirements: ["KTP", "Surat Pengantar"]
  },
];

const DashboardUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [catatan, setCatatan] = useState("");
  const [riwayat, setRiwayat] = useState<any[]>([]);
  const [notifikasi, setNotifikasi] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }

    // fetch riwayat dari backend
    setRiwayat([
      {
        layanan: "Pendaftaran Nikah",
        tanggal: "07 Juli 2025",
        status: "Disetujui"
      },
      {
        layanan: "Administrasi Umum",
        tanggal: "05 Juli 2025",
        status: "Ditolak"
      }
    ]);
  }, []);

  const handleDaftar = async () => {
    if (!selectedService) return;
    const formData = new FormData();
    formData.append("layanan", selectedService);
    formData.append("catatan", catatan);
    formData.append("user_id", user.id);

    try {
      const res = await fetch("http://localhost/kua-backend/layanan.php", {
        method: "POST",
        body: formData
      });

      const result = await res.json();
      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Terimakasih! Permintaan Anda sedang kami proses. Mohon tunggu sebentar admin akan memverifikasi data anda.",
        });
        setSelectedService(null);
        setCatatan("");
      }
    } catch (err) {
      toast({ title: "Gagal", description: "Terjadi kesalahan." });
    }
  };

  const renderStatusBadge = (status: string) => {
    const base = "px-2 py-1 rounded text-xs font-semibold";
    if (status === "Disetujui") return <span className={`${base} bg-green-100 text-green-700`}>{status}</span>;
    if (status === "Ditolak") return <span className={`${base} bg-red-100 text-red-700`}>{status}</span>;
    if (status === "Diproses") return <span className={`${base} bg-yellow-100 text-yellow-700`}>{status}</span>;
    return <span className={`${base} bg-gray-100 text-gray-700`}>{status}</span>;
  };

  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-green-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard Pengguna - KUA</h1>
        <div className="flex items-center space-x-4">
          <Bell className="h-6 w-6 cursor-pointer" onClick={() => setNotifikasi(false)} />
          <button onClick={() => navigate("/auth/login")} className="bg-white text-green-700 px-3 py-1 rounded">Logout</button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {notifikasi && (
          <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded shadow">
            <div className="flex justify-between">
              <div>
                <h2 className="font-bold text-green-800 text-lg">Selamat! Pengajuan Anda Telah Disetujui</h2>
                <p className="text-sm">Layanan "Pendaftaran Nikah" Anda telah diverifikasi oleh admin pada 7 Juli 2025.</p>
              </div>
              <button onClick={() => setNotifikasi(false)} className="text-green-600">✕</button>
            </div>
            <div className="mt-2 space-x-2">
              <Button variant="outline">Lihat Detail</Button>
              <Button>Cetak Bukti Persetujuan</Button>
            </div>
          </div>
        )}

        {/* Info Akun */}
        <div className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold text-lg mb-2">Informasi Akun</h2>
          <p><strong>Nama:</strong> {user?.nama}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>NIK:</strong> {user?.nik}</p>
        </div>

        {/* Ajukan Layanan */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Ajukan Layanan</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => {
              const Icon = service.icon;
              const isActive = selectedService === service.title;
              return (
                <Card
                  key={service.id}
                  className={`cursor-pointer ${isActive ? "ring-2 ring-green-600" : ""}`}
                  onClick={() => setSelectedService(service.title)}
                >
                  <CardHeader className="text-center">
                    <div className={`w-12 h-12 ${service.color} rounded-full mx-auto flex items-center justify-center`}>
                      <Icon className="text-white w-6 h-6" />
                    </div>
                    <CardTitle className="text-base mt-2">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-600 text-center">
                    <p>{service.description}</p>
                    {isActive && (
                      <div className="mt-2">
                        <ul className="text-left list-disc list-inside text-xs mb-2">
                          {service.requirements.map((req, i) => <li key={i}>{req}</li>)}
                        </ul>
                        <textarea
                          placeholder="Catatan tambahan..."
                          className="w-full border rounded p-1 mb-2"
                          value={catatan}
                          onChange={(e) => setCatatan(e.target.value)}
                        />
                        <Button className="w-full" onClick={handleDaftar}>Daftar Sekarang</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Riwayat */}
        <section>
          <h2 className="text-xl font-bold mb-2">Riwayat Pengajuan Anda</h2>
          <table className="w-full text-sm border">
            <thead className="bg-green-100">
              <tr>
                <th className="p-2 text-left">Jenis Layanan</th>
                <th className="p-2 text-left">Tanggal</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2">{item.layanan}</td>
                  <td className="p-2">{item.tanggal}</td>
                  <td className="p-2">{renderStatusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Footer Info */}
        <section className="text-center text-sm text-gray-500 mt-12">
          &copy; {new Date().getFullYear()} Sistem Informasi KUA Kecamatan Benai
        </section>
      </main>
    </div>
  );
};

export default DashboardUser;