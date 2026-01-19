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
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-[360px] rounded-xl bg-white text-black shadow-xl">
        <div className="px-8 pt-6">
          <h1 className="text-2xl font-semibold text-center">
            {tab === "login" ? "Admin Login" : "Create Admin Account"}
          </h1>
          <div className="flex justify-center gap-8 mt-4 ">
            {["login", "signup"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTab(t);
                  setError("");
                }}
                className={`pb-2 text-sm font-medium transition ${tab === t
                  ? "border-b-2 border-black text-black"
                  : "text-gray-400 hover:text-black"
                  }`}
              >
                {t === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 px-8 py-6"
        >
          {error && (
            <p className="text-sm text-center text-red-600">{error}</p>
          )}

          {tab === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              required
              className="border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-black"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            required
            className="border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              autoComplete={tab === "login" ? "current-password" : "new-password"}
              className="border rounded-md px-4 py-2 w-full outline-none focus:ring-2 focus:ring-black"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Confirm Password */}
          {tab === "signup" && (
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                autoComplete="new-password"
                className="border rounded-md px-4 py-2 w-full outline-none focus:ring-2 focus:ring-black"
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-black text-white py-2 rounded-md font-medium hover:bg-gray-900 transition disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : tab === "login"
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
