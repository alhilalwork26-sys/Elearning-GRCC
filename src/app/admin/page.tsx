"use client";
import { useEffect, useState } from "react";
import { db, Program, Batch, Enrollment, User } from "@/lib/db";

export default function AdminPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [rows, setRows] = useState<{ e: Enrollment; user: User; program: Program; batch: Batch }[]>([]);

  useEffect(() => {
    db.init();
    setPrograms(db.getPrograms());
    setBatches(db.getBatches());
    const users = db.getUsers();
    const data = db.getEnrollments().map((e) => {
      const user = users.find((u) => u.id === e.userId)!;
      const batch = db.getBatches().find((b) => b.id === e.batchId)!;
      const program = db.getProgram(batch.programId)!;
      return { e, user, program, batch };
    });
    setRows(data);
  }, []);

  const totalLulus = rows.filter((r) => r.e.status === "lulus").length;

  return (
    <main className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <p className="text-xs font-mono text-teal-dk mb-1">ADMIN PANEL</p>
      <h1 className="font-heading text-2xl font-extrabold mb-8">GRCC Academy — Monitoring</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card p-5">
          <p className="text-3xl font-extrabold font-heading">{programs.length}</p>
          <p className="text-xs text-navy/50 mt-1">Program aktif</p>
        </div>
        <div className="card p-5">
          <p className="text-3xl font-extrabold font-heading">{rows.length}</p>
          <p className="text-xs text-navy/50 mt-1">Total enrollment</p>
        </div>
        <div className="card p-5">
          <p className="text-3xl font-extrabold font-heading">{totalLulus}</p>
          <p className="text-xs text-navy/50 mt-1">Lulus & bersertifikat</p>
        </div>
      </div>

      <h2 className="font-heading font-bold mb-3">Kode akses batch</h2>
      <div className="card divide-y divide-slate-100 mb-8">
        {batches.map((b) => {
          const program = db.getProgram(b.programId);
          return (
            <div key={b.id} className="p-4 flex items-center justify-between text-sm">
              <div>
                <p className="font-semibold">{b.namaBatch}</p>
                <p className="text-xs text-navy/50">{program?.nama} · {b.tanggal}</p>
              </div>
              <span className="font-mono bg-navy text-white px-3 py-1.5 rounded-lg text-xs">{b.kodeAkses}</span>
            </div>
          );
        })}
      </div>

      <h2 className="font-heading font-bold mb-3">Peserta</h2>
      <div className="card divide-y divide-slate-100">
        {rows.length === 0 && <p className="p-6 text-sm text-navy/50 text-center">Belum ada peserta terdaftar.</p>}
        {rows.map(({ e, user, program, batch }) => (
          <div key={e.id} className="p-4 flex items-center justify-between text-sm">
            <div>
              <p className="font-semibold">{user.nama}</p>
              <p className="text-xs text-navy/50">{user.instansi} · {program.nama} ({batch.namaBatch})</p>
            </div>
            <div className="text-right text-xs">
              <p>Pre: <span className="font-semibold">{e.skorPre ?? "-"}</span> · Post: <span className="font-semibold">{e.skorPost ?? "-"}</span></p>
              <p className="text-navy/50 mt-0.5">{e.status}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
