import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await fetch("http://localhost/kua-backend/auth/user_login.php", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    if (data.success) {
      // ✅ Simpan role dan username
      localStorage.setItem("userType", data.role);     // ← penting
      localStorage.setItem("username", data.username); // opsional, kalau kamu butuh

      // ✅ Redirect sesuai role
      navigate(data.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
    } else {
      alert("Login gagal: " + (data.message || ""));
    }
  } catch (err) {
    alert("Gagal terhubung ke server.");
    console.error(err);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Login</h2>
        <input
          className="w-full p-2 border mb-4"
          placeholder="Email"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <div className="relative mb-6">
          <input
            className="w-full p-2 border pr-10"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-2 right-2 text-gray-600 text-sm"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <button
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="text-center mt-4 text-sm">
          Belum punya akun? <a href="/auth/register" className="text-green-700 font-semibold">Daftar</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
