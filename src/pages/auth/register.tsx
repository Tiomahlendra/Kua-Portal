import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    nama: "",
    nik: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Password dan konfirmasi tidak cocok");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError("Password harus terdiri dari huruf besar, kecil, angka, dan simbol.");
      return;
    }
console.log(formData)
    try {
      const res = await fetch("http://localhost/kua-backend/auth/user_register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (result.success) {
        toast({
          title: "Registrasi Berhasil",
          description: "Akun berhasil dibuat. Silakan login.",
        });
        setTimeout(() => navigate("/auth/login"), 1000);
      } else {
        setError(result.message || "Registrasi gagal.");
      }
    } catch (err) {
      setError("Terjadi kesalahan koneksi ke server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Daftar Akun</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="text" name="nama" placeholder="Nama Lengkap" required onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="text" name="nik" placeholder="NIK" required onChange={handleChange} className="w-full border p-2 rounded" />

          <div className="relative">
            <input type={showPass ? "text" : "password"} name="password" placeholder="Password" required onChange={handleChange} className="w-full border p-2 rounded pr-10" />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute top-2 right-3 text-gray-500">
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <input type={showConfirm ? "text" : "password"} name="confirmPassword" placeholder="Konfirmasi Password" required onChange={handleChange} className="w-full border p-2 rounded pr-10" />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute top-2 right-3 text-gray-500">
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* TODO: Tambahkan CAPTCHA di sini nanti */}

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
            Daftar
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Sudah punya akun? <a href="/auth/login" className="text-green-700 font-semibold hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
