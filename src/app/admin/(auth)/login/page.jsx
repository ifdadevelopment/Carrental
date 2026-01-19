"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axiosInstance from "@/app/api/lib/axiosInstance";

export default function AdminAuth() {
  const router = useRouter();
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (tab === "signup" && form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      if (tab === "login") {
        const { data } = await axiosInstance.post("/api/auth/login", {
          email: form.email,
          password: form.password,
        });

        document.cookie = `token=${data.token}; path=/`;
        router.replace("/admin/dashboard");
      } else {
        await axiosInstance.post("/api/auth/register", {
          name: form.name,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        });
        setTab("login");
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      setError(
        error?.response?.data?.message || "Server error"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="p-[2px] rounded-[22px] bg-gradient-to-br from-green-400 to-indigo-600 shadow-[0_0_30px_rgba(0,255,117,0.3)]">
        <div className="rounded-[20px] bg-[#171717] hover:scale-[0.98] transition duration-200">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 px-8 pt-6 pb-6 w-[320px]"
          >
            {/* Tabs */}
            <div className="flex justify-center gap-6 mb-2">
              {["login", "signup"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`text-sm font-semibold ${tab === t
                      ? "text-white border-b-2 border-green-400"
                      : "text-gray-400"
                    }`}
                >
                  {t === "login" ? "Login" : "Sign Up"}
                </button>
              ))}
            </div>

            <p className="text-center text-white text-lg font-semibold">
              {tab === "login" ? "Admin Login" : "Create Account"}
            </p>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Name */}
            {tab === "signup" && (
              <div className="bg-[#171717] px-4 py-3 rounded-full shadow-inner">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  className="bg-transparent outline-none text-gray-300 w-full"
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </div>
            )}

            {/* Email */}
            <div className="bg-[#171717] px-4 py-3 rounded-full shadow-inner">
              <input
                type="email"
                placeholder="Email"
                required
                className="bg-transparent outline-none text-gray-300 w-full"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div className="relative bg-[#171717] px-4 py-3 rounded-full shadow-inner">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="bg-transparent outline-none text-gray-300 w-full pr-10"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            {tab === "signup" && (
              <div className="relative bg-[#171717] px-4 py-3 rounded-full shadow-inner">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  required
                  className="bg-transparent outline-none text-gray-300 w-full pr-10"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-[#252525] text-white py-2 rounded-md hover:bg-black transition disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : tab === "login"
                  ? "Login"
                  : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
