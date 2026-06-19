"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { db, Soal } from "@/lib/db";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Acak urutan soal + urutan opsi jawaban, sambil tetap melacak index jawaban benar yang baru
function randomizeSoal(soal: Soal[]): (Soal & { jawabanBenarBaru: number })[] {
  return shuffle(soal).map((s) => {
    const opsiWithIndex = s.opsi.map((teks, idx) => ({ teks, asli: idx }));
    const acak = shuffle(opsiWithIndex);
    const jawabanBenarBaru = acak.findIndex((o) => o.asli === s.jawabanBenar);
    return { ...s, opsi: acak.map((o) => o.teks), jawabanBenarBaru };
  });
}

export default function TestPage() {
  const router = useRouter();
  const params = useParams<{ type: string; enrollmentId: string }>();
  const isPost = params.type === "post";

  const [loading, setLoading] = useState(true);
  const [programNama, setProgramNama] = useState("");
  const [passingScore, setPassingScore] = useState(70);
  const [soalAcak, setSoalAcak] = useState<(Soal & { jawabanBenarBaru: number })[]>([]);
  const [jawaban, setJawaban] = useState<Record<string, number>>({});
  const [hasil, setHasil] = useState<{ skor: number; lulus: boolean } | null>(null);

  useEffect(() => {
    db.init();
    const enrollment = db.getEnrollment(params.enrollmentId);
    if (!enrollment) { router.push("/dashboard"); return; }
    const batch = db.getBatches().find((b) => b.id === enrollment.batchId);
    const program = batch ? db.getProgram(batch.programId) : null;
    if (!program) { router.push("/dashboard"); return; }

    // Jika peserta mencoba akses post-test sebelum materi selesai, arahkan ke materi
    if (isPost && enrollment.status !== "post_test" && enrollment.status !== "lulus" && enrollment.status !== "tidak_lulus") {
      router.push(`/materi/${enrollment.id}`);
      return;
    }
    if (!isPost && enrollment.status !== "belum_mulai" && enrollment.status !== "pre_test") {
      router.push(`/materi/${enrollment.id}`);
      return;
    }

    setProgramNama(program.nama);
    setPassingScore(program.passingScore);
    setSoalAcak(randomizeSoal(isPost ? program.soalPost : program.soalPre));
    setLoading(false);
  }, [params.enrollmentId, isPost, router]);

  function submit() {
    const total = soalAcak.length;
    const benar = soalAcak.filter((s) => jawaban[s.id] === s.jawabanBenarBaru).length;
    const skor = Math.round((benar / total) * 100);
    const lulus = isPost ? skor >= passingScore : true;

    const enrollment = db.getEnrollment(params.enrollmentId)!;
    if (isPost) {
      enrollment.skorPost = skor;
      enrollment.status = lulus ? "lulus" : "tidak_lulus";
      if (lulus) {
        enrollment.sertifikatNomor = "GRCC/" + new Date().getFullYear() + "/" + Math.random().toString(36).slice(2, 8).toUpperCase();
        enrollment.tanggalLulus = new Date().toISOString();
      }
    } else {
      enrollment.skorPre = skor;
      enrollment.status = "materi";
    }
    db.saveEnrollment(enrollment);
    setHasil({ skor, lulus });
  }

  if (loading) return <main className="min-h-screen flex items-center justify-center text-sm text-navy/50">Memuat soal...</main>;

  if (hasil) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="card max-w-sm w-full p-8 text-center">
          <p className="text-xs font-mono text-navy/50 mb-2">{isPost ? "POST-TEST" : "PRE-TEST"} SELESAI</p>
          <div className="text-5xl font-extrabold font-heading mb-2">{hasil.skor}</div>
          <p className="text-sm text-navy/60 mb-6">dari 100 poin</p>
          {isPost && (
            <div className={`text-sm font-semibold rounded-lg p-3 mb-4 ${hasil.lulus ? "bg-teal-50 text-teal-700" : "bg-red-50 text-red-700"}`}>
              {hasil.lulus ? "Selamat, Anda lulus!" : `Belum mencapai passing score ${passingScore}`}
            </div>
          )}
          <button
            onClick={() => router.push(isPost && hasil.lulus ? `/sertifikat/${params.enrollmentId}` : isPost ? `/materi/${params.enrollmentId}` : `/materi/${params.enrollmentId}`)}
            className="btn-primary w-full"
          >
            {isPost ? (hasil.lulus ? "Lihat sertifikat" : "Pelajari ulang materi") : "Lanjut ke materi"}
          </button>
        </div>
      </main>
    );
  }

  const terjawab = Object.keys(jawaban).length;

  return (
    <main className="min-h-screen px-6 py-10 max-w-2xl mx-auto">
      <p className="text-xs font-mono text-teal-dk mb-1">{isPost ? "POST-TEST" : "PRE-TEST"}</p>
      <h1 className="font-heading text-2xl font-extrabold mb-1">{programNama}</h1>
      <p className="text-sm text-navy/50 mb-8">{terjawab} dari {soalAcak.length} soal terjawab</p>

      <div className="space-y-6">
        {soalAcak.map((s, i) => (
          <div key={s.id} className="card p-5">
            <p className="font-semibold mb-3">{i + 1}. {s.pertanyaan}</p>
            <div className="space-y-2">
              {s.opsi.map((opsi, idx) => (
                <label key={idx} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer text-sm ${jawaban[s.id] === idx ? "border-teal bg-teal-lt/40" : "border-slate-200"}`}>
                  <input
                    type="radio"
                    name={s.id}
                    checked={jawaban[s.id] === idx}
                    onChange={() => setJawaban({ ...jawaban, [s.id]: idx })}
                  />
                  {opsi}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        disabled={terjawab < soalAcak.length}
        onClick={submit}
        className="btn-primary w-full mt-8"
      >
        Kumpulkan jawaban
      </button>
    </main>
  );
}
