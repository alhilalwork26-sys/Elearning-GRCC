"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { db, User, Enrollment, Program, Batch } from "@/lib/db";

const STATUS_LABEL: Record<Enrollment["status"], string> = {
  belum_mulai: "Belum mulai",
  pre_test: "Pre-test",
  materi: "Sedang belajar",
  post_test: "Post-test",
  lulus: "Lulus",
  tidak_lulus: "Belum lulus",
};

const STATUS_COLOR: Record<Enrollment["status"], string> = {
  belum_mulai: "bg-slate-100 text-slate-600",
  pre_test: "bg-amber-50 text-amber-700",
  materi: "bg-blue-50 text-blue-700",
  post_test: "bg-amber-50 text-amber-700",
  lulus: "bg-teal-50 text-teal-700",
  tidak_lulus: "bg-red-50 text-red-700",
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [rows, setRows] = useState<{ e: Enrollment; batch: Batch; program: Program }[]>([]);

  useEffect(() => {
    db.init();
    const u = db.currentUser();
    if (!u) {
      router.push("/login");
      return;
    }
    setUser(u);
    const enrollments = db.getEnrollmentsForUser(u.id);
    const data = enrollments
      .map((e) => {
        const batch = db.getBatches().find((b) => b.id === e.batchId);
        const program = batch ? db.getProgram(batch.programId) : null;
        return batch && program ? { e, batch, program } : null;
      })
      .filter(Boolean) as any;
    setRows(data);
  }, [router]);

  if (!user) return null;

  return (
    <main className="min-h-screen px-6 py-10 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs text-navy/50">Selamat datang,</p>
          <h1 className="font-heading text-2xl font-extrabold">{user.nama}</h1>
        </div>
        <button
          onClick={() => { db.logout(); router.push("/"); }}
          className="text-sm font-semibold text-navy/60 hover:text-navy"
        >
          Keluar
        </button>
      </div>

      <div className="card p-6 mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-semibold mb-1">Punya kode akses training?</h2>
          <p className="text-sm text-navy/60">Masukkan kode dari panitia untuk mulai training baru.</p>
        </div>
        <Link href="/enroll" className="btn-primary whitespace-nowrap">Input kode akses</Link>
      </div>

      <h2 className="font-heading font-bold text-lg mb-4">Training saya</h2>
      {rows.length === 0 && (
        <div className="card p-8 text-center text-sm text-navy/50">
          Belum ada training yang diikuti. Masukkan kode akses untuk mulai.
        </div>
      )}
      <div className="space-y-3">
        {rows.map(({ e, batch, program }) => (
          <Link
            key={e.id}
            href={
              e.status === "lulus" ? `/sertifikat/${e.id}` :
              e.status === "belum_mulai" || e.status === "pre_test" ? `/test/pre/${e.id}` :
              e.status === "materi" ? `/materi/${e.id}` :
              `/test/post/${e.id}`
            }
            className="card p-5 flex items-center justify-between hover:border-navy/30 transition"
          >
            <div>
              <p className="text-xs font-mono text-teal-dk mb-1">{program.kode}</p>
              <p className="font-semibold">{program.nama}</p>
              <p className="text-xs text-navy/50 mt-1">{batch.namaBatch}</p>
            </div>
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${STATUS_COLOR[e.status]}`}>
              {STATUS_LABEL[e.status]}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
