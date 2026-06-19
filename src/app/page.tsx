"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center gap-2 bg-navy text-white px-4 py-1.5 rounded-full text-xs font-mono mb-6">
          GRCC ACADEMY · LMS
        </div>
        <h1 className="font-heading text-3xl font-extrabold mb-3">
          Lanjutkan pelatihan Anda
        </h1>
        <p className="text-sm text-navy/60 mb-8">
          Masuk untuk mengakses pre-test, materi, post-test, dan sertifikat training Anda.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/login" className="btn-primary">Masuk</Link>
          <Link href="/register" className="text-sm font-semibold text-navy underline underline-offset-4">
            Belum punya akun? Daftar
          </Link>
        </div>
      </div>
    </main>
  );
}
