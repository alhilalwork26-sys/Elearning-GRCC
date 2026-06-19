"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ nama: "", email: "", instansi: "", password: "" });
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      db.init();
      const user = db.registerUser(form);
      localStorage.setItem("grcc_session", JSON.stringify(user.id));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <form onSubmit={handleSubmit} className="card max-w-sm w-full p-8">
        <h1 className="font-heading text-2xl font-extrabold mb-1">Buat akun</h1>
        <p className="text-sm text-navy/60 mb-6">Daftar untuk mulai mengikuti training GRCC Academy.</p>

        {error && <div className="bg-red-50 text-red-600 text-sm rounded-lg p-3 mb-4">{error}</div>}

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-navy/70">Nama lengkap</label>
            <input required className="input mt-1" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-semibold text-navy/70">Email</label>
            <input required type="email" className="input mt-1" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-semibold text-navy/70">Instansi</label>
            <input required className="input mt-1" value={form.instansi} onChange={(e) => setForm({ ...form, instansi: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-semibold text-navy/70">Password</label>
            <input required type="password" minLength={6} className="input mt-1" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
        </div>

        <button type="submit" className="btn-primary w-full mt-6">Daftar</button>
        <p className="text-xs text-center mt-4 text-navy/60">
          Sudah punya akun? <Link href="/login" className="font-semibold underline">Masuk</Link>
        </p>
      </form>
    </main>
  );
}
