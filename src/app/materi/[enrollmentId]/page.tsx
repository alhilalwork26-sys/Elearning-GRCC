"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { db, Program, Enrollment } from "@/lib/db";

export default function MateriPage() {
  const router = useRouter();
  const params = useParams<{ enrollmentId: string }>();
  const [program, setProgram] = useState<Program | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);

  useEffect(() => {
    db.init();
    const e = db.getEnrollment(params.enrollmentId);
    if (!e) { router.push("/dashboard"); return; }
    const batch = db.getBatches().find((b) => b.id === e.batchId);
    const p = batch ? db.getProgram(batch.programId) : null;
    if (!p) { router.push("/dashboard"); return; }
    if (e.status === "belum_mulai" || e.status === "pre_test") {
      router.push(`/test/pre/${e.id}`);
      return;
    }
    setEnrollment(e);
    setProgram(p);
  }, [params.enrollmentId, router]);

  function toggleSelesai(judul: string) {
    if (!enrollment) return;
    const sudah = enrollment.materiSelesai.includes(judul);
    const materiSelesai = sudah ? enrollment.materiSelesai.filter((m) => m !== judul) : [...enrollment.materiSelesai, judul];
    const updated = { ...enrollment, materiSelesai };
    db.saveEnrollment(updated);
    setEnrollment(updated);
  }

  function lanjutPostTest() {
    if (!enrollment) return;
    const updated = { ...enrollment, status: "post_test" as const };
    db.saveEnrollment(updated);
    router.push(`/test/post/${enrollment.id}`);
  }

  if (!program || !enrollment) return null;
  const semuaSelesai = program.materi.every((m) => enrollment.materiSelesai.includes(m.judul));

  return (
    <main className="min-h-screen px-6 py-10 max-w-2xl mx-auto">
      <p className="text-xs font-mono text-teal-dk mb-1">{program.kode}</p>
      <h1 className="font-heading text-2xl font-extrabold mb-1">{program.nama}</h1>
      <p className="text-sm text-navy/50 mb-8">
        Skor pre-test Anda: <span className="font-semibold text-navy">{enrollment.skorPre}</span>
      </p>

      <div className="space-y-3">
        {program.materi.map((m) => {
          const selesai = enrollment.materiSelesai.includes(m.judul);
          return (
            <div key={m.judul} className="card p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase bg-navy text-white px-2 py-1 rounded">{m.tipe}</span>
                <p className="font-semibold text-sm">{m.judul}</p>
              </div>
              <button
                onClick={() => toggleSelesai(m.judul)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full ${selesai ? "bg-teal-50 text-teal-700" : "bg-slate-100 text-slate-500"}`}
              >
                {selesai ? "Selesai dibaca" : "Tandai selesai"}
              </button>
            </div>
          );
        })}
      </div>

      <button disabled={!semuaSelesai} onClick={lanjutPostTest} className="btn-primary w-full mt-8">
        {semuaSelesai ? "Lanjut ke post-test" : "Selesaikan semua materi dulu"}
      </button>
    </main>
  );
}
