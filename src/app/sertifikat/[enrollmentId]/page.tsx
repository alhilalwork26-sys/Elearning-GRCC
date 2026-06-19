"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { db, Program, Enrollment, User } from "@/lib/db";

export default function SertifikatPage() {
  const router = useRouter();
  const params = useParams<{ enrollmentId: string }>();
  const [program, setProgram] = useState<Program | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    db.init();
    const e = db.getEnrollment(params.enrollmentId);
    if (!e || e.status !== "lulus") { router.push("/dashboard"); return; }
    const batch = db.getBatches().find((b) => b.id === e.batchId);
    const p = batch ? db.getProgram(batch.programId) : null;
    const u = db.getUsers().find((x) => x.id === e.userId) || null;
    if (!p || !u) { router.push("/dashboard"); return; }
    setEnrollment(e);
    setProgram(p);
    setUser(u);
  }, [params.enrollmentId, router]);

  if (!program || !enrollment || !user) return null;

  return (
    <main className="min-h-screen px-6 py-10 flex flex-col items-center">
      <div className="card w-full max-w-2xl p-12 text-center relative border-4 border-gold/30">
        <p className="text-xs font-mono text-teal-dk tracking-widest mb-6">SERTIFIKAT PENYELESAIAN</p>
        <p className="text-sm text-navy/50 mb-1">Diberikan kepada</p>
        <h1 className="font-heading text-4xl font-extrabold mb-4">{user.nama}</h1>
        <p className="text-sm text-navy/60 max-w-md mx-auto mb-6">
          Atas keberhasilannya menyelesaikan program training
        </p>
        <p className="font-heading text-xl font-bold text-navy mb-1">{program.nama}</p>
        <p className="text-xs text-navy/50 mb-8">diselenggarakan oleh GRCC — AILG, Universitas Airlangga</p>

        <div className="flex justify-center gap-10 text-xs text-navy/50 border-t border-slate-200 pt-6">
          <div>
            <p className="font-mono text-navy font-semibold">{enrollment.sertifikatNomor}</p>
            <p>Nomor sertifikat</p>
          </div>
          <div>
            <p className="font-mono text-navy font-semibold">{enrollment.skorPost}</p>
            <p>Skor post-test</p>
          </div>
          <div>
            <p className="font-mono text-navy font-semibold">
              {enrollment.tanggalLulus && new Date(enrollment.tanggalLulus).toLocaleDateString("id-ID")}
            </p>
            <p>Tanggal terbit</p>
          </div>
        </div>
      </div>

      <button onClick={() => window.print()} className="btn-primary mt-6">Unduh / cetak sertifikat</button>
      <button onClick={() => router.push("/dashboard")} className="text-sm font-semibold text-navy/60 mt-3">
        Kembali ke dashboard
      </button>
    </main>
  );
}
