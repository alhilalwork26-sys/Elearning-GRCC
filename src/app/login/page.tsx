"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      db.init();
      db.loginUser(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <form onSubmit={handleSubmit} className="card max-w-sm w-full p-8">
        <h1 className="font-heading text-2xl font-extrabold mb-1">Masuk</h1>
        <p className="text-sm text-navy/60 mb-6">Lanjutkan ke dashboard training Anda.</p>

        {error && <div className="bg-red-50 text-red-600 text-sm rounded-lg p-3 mb-4">{error}</div>}

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-navy/70">Email</label>
            <input required type="email" className="input mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-navy/70">Password</label>
            <input required type="password" className="input mt-1" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>

        <button type="submit" className="btn-primary w-full mt-6">Masuk</button>
        <p className="text-xs text-center mt-4 text-navy/60">
          Belum punya akun? <Link href="/register" className="font-semibold underline">Daftar</Link>
        </p>
      </form>
    </main>
  );
}
