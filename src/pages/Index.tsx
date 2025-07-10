
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, Heart, Phone, MapPin, Users, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FormModal from "@/components/ui/FormModal";
import { useNavigate } from "react-router-dom"; // ✅ Untuk Vite
import { BrowserRouter } from "react-router-dom";




const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);

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

  const handleServiceClick = (serviceId: string) => {
    setActiveService(activeService === serviceId ? null : serviceId);
    toast({
      title: "Informasi Layanan",
      description: "Lihat persyaratan di bawah untuk melanjutkan.",
    });
  };

 const handleRegister = () => {
  navigate("/auth/register");
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">KUA Kecamatan Benai</h1>
                <p className="text-green-100">Sistem Informasi Kantor Urusan Agama</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">(021) 1234-5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">08:00 - 16:00 WIB</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Selamat Datang di Sistem Informasi KUA
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-3xl mx-auto">
            Melayani masyarakat dalam urusan keagamaan dengan pelayanan yang cepat, tepat, dan transparan. 
            Kami siap membantu Anda dalam persiapan pernikahan dan layanan keagamaan lainnya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-green-50 font-semibold"
              onClick={() => navigate("/auth/register")}
            >
              Daftar Online
            </Button>

            <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-green-600 font-semibold"
            onClick={() => {
              const lokasiEl = document.getElementById("lokasi");
              if (lokasiEl) {
                lokasiEl.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <MapPin className="mr-2 h-5 w-5" />
            Lihat Lokasi
          </Button>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Layanan Kami</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Berbagai layanan keagamaan yang tersedia di KUA untuk memenuhi kebutuhan masyarakat
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {services.map((service) => {
              const Icon = service.icon;
              const isActive = activeService === service.id;
              
              return (
                <Card 
                  key={service.id} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                    isActive ? 'ring-2 ring-green-500 shadow-lg' : ''
                  }`}
                  onClick={() => handleServiceClick(service.id)}
                >
                  <CardHeader className="text-center pb-2">
                    <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    
                    {isActive && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2 text-gray-800">Persyaratan:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {service.requirements.map((req, index) => (
                            <li key={index} className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                              {req}
                            </li>
                          ))}
                        </ul>
                        <Button 
                          size="sm" 
                          className="mt-3 w-full bg-green-600 hover:bg-green-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRegister(service.title); // atau service.id
                          }}
                        >
                          Daftar Sekarang
                        </Button>

                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
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

      {/* Contact Info */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-green-200" />
              <h4 className="text-xl font-semibold mb-2">Alamat</h4>
              <p className="text-green-100">
                Jl. Soekarno Hatta,<br />
                Kecamatan Benai<br />
                Kabupaten Kuantan Singingi, Riau 29553, Indonesia
              </p>
            </div>
            <div className="text-center">
              <Phone className="h-12 w-12 mx-auto mb-4 text-green-200" />
              <h4 className="text-xl font-semibold mb-2">Kontak</h4>
              <p className="text-green-100">
                Telepon: (021) 1234-5678<br />
                WhatsApp: 0812-3456-7890<br />
                Email: info@kuabenai.go.id
              </p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-green-200" />
              <h4 className="text-xl font-semibold mb-2">Jam Pelayanan</h4>
              <p className="text-green-100">
                Senin - Kamis: 08:00 - 16:00<br />
                Jumat: 08:00 - 11:30<br />
                Sabtu: 08:00 - 14:00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Form */}
    {showModal && (
  <FormModal 
    onClose={() => setShowModal(false)} 
    layanan={activeService || ""} // (optional) biar tau user klik layanan apa
  />
)}

<section id="lokasi" className="py-16 bg-white">
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



      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
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

export default Index;
