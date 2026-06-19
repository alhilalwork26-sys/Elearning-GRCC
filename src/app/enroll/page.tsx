"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/db";

export default function EnrollPage() {
  const router = useRouter();
  const [kode, setKode] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const user = db.currentUser();
    if (!user) { router.push("/login"); return; }
    try {
      const enrollment = db.enroll(user.id, kode);
      router.push(`/test/pre/${enrollment.id}`);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="card max-w-sm w-full p-8 text-center">
        <h1 className="font-heading text-xl font-extrabold mb-2">Input kode akses</h1>
        <p className="text-sm text-navy/60 mb-6">
          Kode dibagikan oleh tim GRCC saat pelatihan offline berlangsung.
        </p>
        {error && <div className="bg-red-50 text-red-600 text-sm rounded-lg p-3 mb-4">{error}</div>}
        <input
          required
          className="input text-center font-mono uppercase tracking-wider"
          placeholder="MIS. ERM-JUN26"
          value={kode}
          onChange={(e) => setKode(e.target.value)}
        />
        <button type="submit" className="btn-primary w-full mt-5">Gabung training</button>
        <p className="text-xs text-navy/40 mt-4">Coba: ERM-JUN26 atau ESG-JUN26</p>
      </form>
    </main>
  );
}
