import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Heart, Users, BookOpen, FileText, Bell, MapPin, Clock, Phone } from "lucide-react";

const DashboardUser = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
    setRiwayat([]); // default kosong, isi nanti dari backend
  }, []);

  const services = [
    {
      id: "nikah",
      title: "Pendaftaran Nikah",
      description: "Daftar untuk melangsungkan pernikahan di KUA",
      icon: Heart,
      color: "bg-pink-500",
      requirements: ["KTP Calon Pengantin", "Akta Kelahiran", "Surat Keterangan Belum Menikah", "Pas Foto 4x6"]
    },
    {
      id: "konsultasi",
      title: "Konsultasi Pranikah",
      description: "Bimbingan dan konsultasi sebelum menikah",
      icon: Users,
      color: "bg-blue-500",
      requirements: ["KTP", "Surat Keterangan dari RT/RW", "Jadwal Appointment"]
    },
    {
      id: "rujuk",
      title: "Rujuk/Mediasi",
      description: "Layanan mediasi dan rujuk pasangan suami istri",
      icon: BookOpen,
      color: "bg-green-500",
      requirements: ["KTP Pasangan", "Surat Keterangan Masalah", "Dokumen Pernikahan"]
    },
    {
      id: "administrasi",
      title: "Administrasi Umum",
      description: "Layanan administrasi dan surat keterangan",
      icon: FileText,
      color: "bg-orange-500",
      requirements: ["KTP", "Dokumen Pendukung", "Surat Pengantar RT/RW"]
    }
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard Pengguna - KUA</h1>
        <div className="flex items-center space-x-4">
          <Bell className="h-6 w-6 cursor-pointer" onClick={() => setNotifikasi(false)} />
          <button onClick={() => navigate("/auth/login")} className="bg-white text-green-700 px-3 py-1 rounded">Logout</button>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 py-6 space-y-6">

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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              const isActive = selectedService === service.title;
              return (
                <Card
                  key={service.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${isActive ? "ring-2 ring-green-500 shadow-lg" : ""}`}
                  onClick={() => setSelectedService(service.title)}
                >
                  <CardHeader className="text-center pb-2">
                    <div className={`w-14 h-14 ${service.color} rounded-full mx-auto flex items-center justify-center mb-2`}>
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

        {/* Riwayat Pengajuan */}
        <section>
          <h2 className="text-xl font-bold mb-4">Riwayat Pengajuan Anda</h2>
          {riwayat.length === 0 ? (
            <p className="text-gray-500 italic">Belum ada pengajuan layanan.</p>
          ) : (
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
                    <td className="p-2">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

  {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">2,500+</div>
              <p className="text-gray-600">Pernikahan Terdaftar</p>
              <p className="text-sm text-gray-500">Tahun 2024</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-600">Konsultasi Pranikah</p>
              <p className="text-sm text-gray-500">Tahun 2024</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
              <p className="text-gray-600">Kepuasan Pelayanan</p>
              <p className="text-sm text-gray-500">Rating Masyarakat</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <p className="text-gray-600">Informasi Online</p>
              <p className="text-sm text-gray-500">Sistem Informasi</p>
            </div>
          </div>
        </div>
      </section>

        {/* Kontak dan Lokasi */}
        <section className="py-12 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <MapPin className="h-8 w-8 mx-auto mb-2" />
              <h4 className="text-lg font-semibold">Alamat</h4>
              <p className="text-green-100 text-sm">
                Jl. Soekarno Hatta, Benai<br />Kuantan Singingi, Riau 29553
              </p>
            </div>
            <div>
              <Phone className="h-8 w-8 mx-auto mb-2" />
              <h4 className="text-lg font-semibold">Kontak</h4>
              <p className="text-green-100 text-sm">
                Telp: (021) 1234-5678<br />Email: info@kuabenai.go.id
              </p>
            </div>
            <div>
              <Clock className="h-8 w-8 mx-auto mb-2" />
              <h4 className="text-lg font-semibold">Jam Pelayanan</h4>
              <p className="text-green-100 text-sm">
                Senin - Kamis: 08:00 - 16:00<br />Jumat: 08:00 - 11:30<br />Sabtu: 08:00 - 14:00
              </p>
            </div>
          </div>
        </section>

        {/* Lokasi */}
<section className="py-16 bg-white" id="lokasi">
  <div className="container mx-auto px-4 text-center">
    <h3 className="text-2xl font-bold mb-4 text-gray-800">Lokasi Kami</h3>
    <p className="text-gray-600 mb-6">Kunjungi kantor KUA Benai melalui lokasi berikut:</p>
    <div className="rounded-xl overflow-hidden shadow-lg border max-w-4xl mx-auto">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6748947771225!2d101.62069617496473!3d-0.4858202995094188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e2a492e414fd7e1%3A0x1379a66f14eadd80!2sKantor%20Urusan%20Agama%20(KUA)%20Benai!5e0!3m2!1sid!2sid!4v1751945426407!5m2!1sid!2sid"
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</section>
</main>
{/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-6">
        <div className="w-full">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">KUA Kecamatan Benai</h5>
              <p className="text-gray-300 text-sm">
                Melayani masyarakat dalam urusan keagamaan dengan sepenuh hati dan amanah.
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Layanan Utama</h5>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>Pendaftaran Nikah</li>
                <li>Konsultasi Pranikah</li>
                <li>Rujuk/Mediasi</li>
                <li>Administrasi Umum</li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Informasi</h5>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>Syarat dan Ketentuan</li>
                <li>Prosedur Pelayanan</li>
                <li>FAQ</li>
                <li>Kontak Kami</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 KUA Kecamatan Benai. Semua hak dilindungi undang-undang.
            </p>
          </div>
        </div>
      </footer>

      
    </div>
  );
};

export default DashboardUser;
