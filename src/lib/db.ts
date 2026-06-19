// ============================================================
// Data layer LMS — saat ini disimpan di localStorage (lokal).
// Struktur tipe & fungsi sengaja dibuat mirip skema Supabase
// supaya nanti tinggal diganti ke supabase-js tanpa ubah UI.
// ============================================================

export type Soal = {
  id: string;
  pertanyaan: string;
  opsi: string[];
  jawabanBenar: number; // index opsi yang benar
};

export type Program = {
  id: string;
  kode: string; // ERM, GCG, ISO31000, AMLKYC, ESG
  nama: string;
  deskripsi: string;
  materi: { tipe: "pdf" | "video"; judul: string; url: string }[];
  soalPre: Soal[];
  soalPost: Soal[];
  passingScore: number; // persen
};

export type Batch = {
  id: string;
  programId: string;
  namaBatch: string;
  kodeAkses: string;
  tanggal: string;
  aktif: boolean;
};

export type User = {
  id: string;
  nama: string;
  email: string;
  instansi: string;
  password: string; // demo only — plaintext, ganti hashing saat pindah ke Supabase Auth
};

export type Enrollment = {
  id: string;
  userId: string;
  batchId: string;
  status: "belum_mulai" | "pre_test" | "materi" | "post_test" | "lulus" | "tidak_lulus";
  skorPre: number | null;
  skorPost: number | null;
  materiSelesai: string[]; // judul materi yang sudah ditandai selesai
  sertifikatNomor: string | null;
  tanggalLulus: string | null;
};

const KEYS = {
  programs: "grcc_programs",
  batches: "grcc_batches",
  users: "grcc_users",
  enrollments: "grcc_enrollments",
  session: "grcc_session",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// ── Seed data awal (8 program sesuai diskusi) ──
const SEED_PROGRAMS: Program[] = [
  {
    id: "p-erm",
    kode: "ERM",
    nama: "Enterprise Risk Management",
    deskripsi: "Kerangka identifikasi dan mitigasi risiko korporasi.",
    materi: [
      { tipe: "pdf", judul: "Modul ERM — Pengantar", url: "#" },
      { tipe: "video", judul: "Studi Kasus ERM", url: "#" },
    ],
    soalPre: [
      { id: "erm-pre-1", pertanyaan: "Apa kepanjangan dari ERM?", opsi: ["Enterprise Risk Management", "External Risk Mitigation", "Enterprise Resource Management", "Economic Risk Model"], jawabanBenar: 0 },
      { id: "erm-pre-2", pertanyaan: "Tahap pertama dalam proses manajemen risiko adalah?", opsi: ["Mitigasi", "Identifikasi risiko", "Pelaporan", "Asuransi"], jawabanBenar: 1 },
    ],
    soalPost: [
      { id: "erm-post-1", pertanyaan: "Risk appetite adalah?", opsi: ["Jumlah risiko yang bisa diterima organisasi", "Daftar risiko historis", "Asuransi perusahaan", "Audit tahunan"], jawabanBenar: 0 },
      { id: "erm-post-2", pertanyaan: "Heat map risiko menggambarkan?", opsi: ["Suhu kantor", "Kemungkinan vs dampak risiko", "Lokasi kantor cabang", "Anggaran tahunan"], jawabanBenar: 1 },
    ],
    passingScore: 70,
  },
  {
    id: "p-gcg",
    kode: "GCG",
    nama: "Good Corporate Governance",
    deskripsi: "Prinsip tata kelola perusahaan yang baik.",
    materi: [{ tipe: "pdf", judul: "Modul GCG — Lima Pilar", url: "#" }],
    soalPre: [{ id: "gcg-pre-1", pertanyaan: "Salah satu pilar GCG adalah?", opsi: ["Transparansi", "Promosi", "Iklan", "Diskon"], jawabanBenar: 0 }],
    soalPost: [{ id: "gcg-post-1", pertanyaan: "Dewan komisaris bertugas?", opsi: ["Mengawasi direksi", "Menjual produk", "Mengelola kas kecil", "Membuat iklan"], jawabanBenar: 0 }],
    passingScore: 70,
  },
  {
    id: "p-iso31000",
    kode: "ISO31000",
    nama: "ISO 31000 — Manajemen Risiko",
    deskripsi: "Standar internasional manajemen risiko.",
    materi: [{ tipe: "pdf", judul: "Modul ISO 31000", url: "#" }],
    soalPre: [{ id: "iso-pre-1", pertanyaan: "ISO 31000 adalah standar tentang?", opsi: ["Manajemen risiko", "Keamanan pangan", "Manajemen mutu", "Lingkungan"], jawabanBenar: 0 }],
    soalPost: [{ id: "iso-post-1", pertanyaan: "Prinsip ISO 31000 menekankan risiko sebagai?", opsi: ["Bagian integral pengambilan keputusan", "Hal yang harus dihindari sepenuhnya", "Tanggung jawab auditor saja", "Isu IT semata"], jawabanBenar: 0 }],
    passingScore: 70,
  },
  {
    id: "p-amlkyc",
    kode: "AML/KYC",
    nama: "Anti Pencucian Uang & KYC",
    deskripsi: "Prosedur know-your-customer & pelaporan transaksi mencurigakan.",
    materi: [{ tipe: "pdf", judul: "Modul AML/KYC", url: "#" }],
    soalPre: [{ id: "aml-pre-1", pertanyaan: "KYC adalah singkatan dari?", opsi: ["Know Your Customer", "Keep Your Cash", "Know Your Company", "Keep Your Customer"], jawabanBenar: 0 }],
    soalPost: [{ id: "aml-post-1", pertanyaan: "Transaksi mencurigakan wajib dilaporkan ke?", opsi: ["PPATK", "Dinas Pajak Daerah", "Bank sentral negara lain", "Media sosial"], jawabanBenar: 0 }],
    passingScore: 70,
  },
  {
    id: "p-esg",
    kode: "ESG",
    nama: "ESG Reporting",
    deskripsi: "Pelaporan keberlanjutan sesuai POJK 51 & standar IDX.",
    materi: [{ tipe: "pdf", judul: "Modul ESG Reporting", url: "#" }],
    soalPre: [{ id: "esg-pre-1", pertanyaan: "ESG adalah singkatan dari?", opsi: ["Environmental, Social, Governance", "Economic, Social, Global", "Energy, Sustainability, Growth", "Equity, Strategy, Governance"], jawabanBenar: 0 }],
    soalPost: [{ id: "esg-post-1", pertanyaan: "POJK 51 mengatur tentang?", opsi: ["Keuangan berkelanjutan", "Pajak penghasilan", "Izin usaha mikro", "Pasar modal syariah saja"], jawabanBenar: 0 }],
    passingScore: 70,
  },
];

const SEED_BATCHES: Batch[] = [
  { id: "b-erm-1", programId: "p-erm", namaBatch: "ERM Batch 1 — Juni 2026", kodeAkses: "ERM-JUN26", tanggal: "2026-06-20", aktif: true },
  { id: "b-esg-1", programId: "p-esg", namaBatch: "ESG Batch 1 — Juni 2026", kodeAkses: "ESG-JUN26", tanggal: "2026-06-25", aktif: true },
];

function ensureSeed() {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(KEYS.programs)) write(KEYS.programs, SEED_PROGRAMS);
  if (!localStorage.getItem(KEYS.batches)) write(KEYS.batches, SEED_BATCHES);
  if (!localStorage.getItem(KEYS.users)) write<User[]>(KEYS.users, []);
  if (!localStorage.getItem(KEYS.enrollments)) write<Enrollment[]>(KEYS.enrollments, []);
}

export const db = {
  init: ensureSeed,

  getPrograms: (): Program[] => read(KEYS.programs, SEED_PROGRAMS),
  getProgram: (id: string) => db.getPrograms().find((p) => p.id === id) || null,

  getBatches: (): Batch[] => read(KEYS.batches, SEED_BATCHES),
  getBatchByKode: (kode: string) =>
    db.getBatches().find((b) => b.kodeAkses.toLowerCase() === kode.trim().toLowerCase() && b.aktif) || null,

  getUsers: (): User[] => read<User[]>(KEYS.users, []),
  registerUser: (u: Omit<User, "id">): User => {
    const users = db.getUsers();
    if (users.some((x) => x.email.toLowerCase() === u.email.toLowerCase())) {
      throw new Error("Email sudah terdaftar");
    }
    const newUser: User = { ...u, id: "u-" + Date.now() };
    write(KEYS.users, [...users, newUser]);
    return newUser;
  },
  loginUser: (email: string, password: string): User => {
    const user = db.getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) throw new Error("Email atau password salah");
    write(KEYS.session, user.id);
    return user;
  },
  logout: () => localStorage.removeItem(KEYS.session),
  currentUser: (): User | null => {
    const id = read<string | null>(KEYS.session, null);
    if (!id) return null;
    return db.getUsers().find((u) => u.id === id) || null;
  },

  getEnrollments: (): Enrollment[] => read<Enrollment[]>(KEYS.enrollments, []),
  getEnrollmentsForUser: (userId: string) => db.getEnrollments().filter((e) => e.userId === userId),
  getEnrollment: (id: string) => db.getEnrollments().find((e) => e.id === id) || null,
  saveEnrollment: (e: Enrollment) => {
    const all = db.getEnrollments();
    const idx = all.findIndex((x) => x.id === e.id);
    if (idx >= 0) all[idx] = e;
    else all.push(e);
    write(KEYS.enrollments, all);
  },
  enroll: (userId: string, kodeAkses: string): Enrollment => {
    const batch = db.getBatchByKode(kodeAkses);
    if (!batch) throw new Error("Kode akses tidak ditemukan atau tidak aktif");
    const existing = db.getEnrollments().find((e) => e.userId === userId && e.batchId === batch.id);
    if (existing) return existing;
    const enrollment: Enrollment = {
      id: "e-" + Date.now(),
      userId,
      batchId: batch.id,
      status: "belum_mulai",
      skorPre: null,
      skorPost: null,
      materiSelesai: [],
      sertifikatNomor: null,
      tanggalLulus: null,
    };
    db.saveEnrollment(enrollment);
    return enrollment;
  },
};
