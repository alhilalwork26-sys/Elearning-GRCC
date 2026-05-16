/* ================================================
   GRCC ACADEMY - Shared Data & Enrollment Helpers
   ================================================ */
(function () {
  const PROGRAMS = [
    {
      code: 'ERM-2026',
      title: 'Enterprise Risk Management (ERM) — Fundamental',
      category: 'Risk Management',
      level: 'Intermediate',
      icon: '⚖️',
      iconClass: 'risk',
      desc: 'Memahami prinsip-prinsip ERM, kerangka COSO 2017, ISO 31000:2018, dan implementasi manajemen risiko di organisasi.',
      modules: 8,
      hours: '24 jam',
      participants: '1.240',
      badgeClass: 'badge-gold',
    },
    {
      code: 'COMP-REG',
      title: 'Kepatuhan Regulasi Perbankan & Keuangan',
      category: 'Compliance',
      level: 'Intermediate',
      icon: '🏦',
      iconClass: 'comp',
      desc: 'Memahami regulasi OJK, BI, dan LPS. Meliputi POJK terbaru, kepatuhan AML/CFT, dan tata kelola bank.',
      modules: 10,
      hours: '30 jam',
      participants: '876',
      badgeClass: 'badge-teal',
    },
    {
      code: 'GCG-BASIC',
      title: 'Tata Kelola Perusahaan yang Baik (GCG)',
      category: 'Governance',
      level: 'Basic',
      icon: '🏛️',
      iconClass: 'gov',
      desc: 'Prinsip-prinsip Good Corporate Governance (TARIF), peran Dewan Komisaris & Direksi, serta implementasi di BUMN dan swasta.',
      modules: 6,
      hours: '18 jam',
      participants: '2.100',
      badgeClass: 'badge-info',
    },
    {
      code: 'ISO-31000',
      title: 'Implementasi ISO 31000:2018',
      category: 'Risk Management',
      level: 'Advanced',
      icon: '📋',
      iconClass: 'risk',
      desc: 'Panduan implementasi standar ISO 31000:2018 secara mendalam. Mencakup framework, proses, dan integrasi dengan sistem manajemen lainnya.',
      modules: 5,
      hours: '15 jam',
      participants: '543',
      badgeClass: 'badge-gold',
    },
    {
      code: 'AML-2026',
      title: 'Anti-Money Laundering & KYC Praktis',
      category: 'Compliance',
      level: 'Intermediate',
      icon: '🔍',
      iconClass: 'comp',
      desc: 'Teknik AML/CFT, prosedur KYC/CDD sesuai FATF, pelaporan STR/CTR, serta studi kasus kasus nyata di Indonesia.',
      modules: 7,
      hours: '21 jam',
      participants: '1.050',
      badgeClass: 'badge-teal',
    },
    {
      code: 'ESG-GRCC',
      title: 'ESG & Sustainability Reporting',
      category: 'ESG',
      level: 'Advanced',
      icon: '🌱',
      iconClass: 'esg',
      desc: 'Memahami standar GRI, SASB, TCFD, dan ISSB. Menyusun laporan keberlanjutan dan mengintegrasikan ESG dalam strategi bisnis.',
      modules: 6,
      hours: '20 jam',
      participants: '718',
      badgeClass: 'badge-success',
    },
    {
      code: 'ITHD-2026',
      title: 'IT Risk & Keamanan Siber untuk Praktisi GRC',
      category: 'IT Risk',
      level: 'Intermediate',
      icon: '🔐',
      iconClass: 'it',
      desc: 'Mengelola risiko teknologi informasi, keamanan siber (ISO 27001), dan integrasi IT risk ke dalam kerangka ERM organisasi.',
      modules: 7,
      hours: '22 jam',
      participants: '634',
      badgeClass: 'badge-navy',
    },
    {
      code: 'OPS-RISK',
      title: 'Manajemen Risiko Operasional',
      category: 'Risk Management',
      level: 'Intermediate',
      icon: '⚙️',
      iconClass: 'risk',
      desc: 'Identifikasi, asesmen, dan pengendalian risiko operasional. Mencakup RCSA, KRI, Loss Database, dan Basel III.',
      modules: 6,
      hours: '18 jam',
      participants: '927',
      badgeClass: 'badge-gold',
    },
    {
      code: 'AUDIT-INT',
      title: 'Audit Internal Berbasis Risiko',
      category: 'Governance',
      level: 'Advanced',
      icon: '🔎',
      iconClass: 'gov',
      desc: 'Perencanaan dan pelaksanaan audit berbasis risiko (RBIA) sesuai standar IIA. Termasuk penyusunan program audit dan laporan temuan.',
      modules: 8,
      hours: '26 jam',
      participants: '482',
      badgeClass: 'badge-info',
    },
    {
      code: 'TAXRISK',
      title: 'Manajemen Risiko Pajak & Transfer Pricing',
      category: 'Compliance',
      level: 'Advanced',
      icon: '📊',
      iconClass: 'fin',
      desc: 'Identifikasi dan mitigasi risiko pajak, aturan transfer pricing Indonesia (OECD BEPS), serta dokumentasi TP yang benar.',
      modules: 5,
      hours: '16 jam',
      participants: '361',
      badgeClass: 'badge-teal',
    },
    {
      code: 'FRAUD-GRC',
      title: 'Fraud Prevention & Anti-Korupsi',
      category: 'Compliance',
      level: 'Basic',
      icon: '🛡️',
      iconClass: 'comp',
      desc: 'Memahami skema fraud (ACFE Fraud Tree), red flags, investigasi internal, whistleblowing system, dan UU Tipikor.',
      modules: 6,
      hours: '19 jam',
      participants: '1.380',
      badgeClass: 'badge-teal',
    },
    {
      code: 'BCMS-ISO',
      title: 'Business Continuity Management (ISO 22301)',
      category: 'Risk Management',
      level: 'Advanced',
      icon: '🔄',
      iconClass: 'risk',
      desc: 'Menyusun BCP & DRP, analisis BIA, strategi pemulihan, dan sertifikasi ISO 22301 untuk ketahanan organisasi.',
      modules: 7,
      hours: '23 jam',
      participants: '409',
      badgeClass: 'badge-gold',
    },
  ];

  const MODULE_DATA = {
    'ERM-2026': [
      'Pengantar Enterprise Risk Management',
      'Kerangka Kerja ERM & ISO 31000',
      'Identifikasi & Penilaian Risiko',
      'Risk Appetite & Toleransi Risiko',
      'Strategi Mitigasi Risiko',
      'Risk Monitoring & Pelaporan',
      'Integrasi ERM dengan Governance',
      'Studi Kasus & Simulasi ERM',
    ],
    'COMP-REG': [
      'Kerangka Regulasi Perbankan Indonesia',
      'OJK & Bank Indonesia: Peran & Kewenangan',
      'Compliance Function dalam Bank',
      'Manajemen Risiko Kepatuhan',
      'Anti Pencucian Uang (APU) & PPT',
      'Know Your Customer (KYC) & CDD',
      'Pelaporan Regulasi & LTKM',
      'Sanksi & Penegakan Hukum',
      'Digital Banking & RegTech',
      'Simulasi Audit Kepatuhan',
    ],
    'GCG-BASIC': [
      'Prinsip Dasar Good Corporate Governance',
      'Board Structure & Komite',
      'Hak Pemegang Saham & Transparansi',
      'Akuntabilitas & Tanggung Jawab Direksi',
      'Pengungkapan & Keterbukaan Informasi',
      'GCG Assessment & Implementasi',
    ],
    'ISO-31000': [
      'Sejarah & Konteks ISO 31000:2018',
      'Prinsip-Prinsip Manajemen Risiko',
      'Kerangka Kerja ISO 31000',
      'Proses Manajemen Risiko',
      'Implementasi & Pemantauan',
    ],
    'AML-2026': [
      'Pengantar Anti-Money Laundering',
      'Tipologi & Modus Pencucian Uang',
      'Regulasi APU/PPT di Indonesia',
      'Customer Due Diligence (CDD)',
      'Transaction Monitoring & STR',
      'KYC Enhanced Due Diligence',
      'Studi Kasus AML Internasional',
    ],
    'ESG-GRCC': [
      'Pengantar ESG & Sustainability',
      'Environmental Reporting (GRI & TCFD)',
      'Social Impact & Human Rights',
      'Governance dalam Kerangka ESG',
      'ESG Scoring & Rating',
      'Menyusun Sustainability Report',
    ],
    'ITHD-2026': [
      'Lanskap Ancaman Siber Terkini',
      'Kerangka Keamanan: NIST & ISO 27001',
      'IT Risk Assessment',
      'Data Privacy & PDPA',
      'Incident Response & Business Continuity',
      'Cloud Security & Third-Party Risk',
      'Audit Keamanan Siber',
    ],
    'OPS-RISK': [
      'Pengantar Risiko Operasional',
      'Kerangka Basel III & Risiko Operasional',
      'Identifikasi & Pemetaan Risiko Ops',
      'Key Risk Indicators (KRI)',
      'Business Continuity Planning',
      'Loss Data Collection & Analisis',
    ],
    'AUDIT-INT': [
      'Standar Audit Internal (IPPF & IIA)',
      'Perencanaan Audit Berbasis Risiko',
      'Prosedur & Teknik Audit',
      'Audit IT & Sistem Informasi',
      'Audit Kepatuhan & Regulasi',
      'Komunikasi Hasil Audit',
      'Quality Assurance & Improvement',
      'Studi Kasus Audit Internal',
    ],
    'TAXRISK': [
      'Pengantar Manajemen Risiko Pajak',
      "Transfer Pricing: Prinsip Arm's Length",
      'Dokumentasi Transfer Pricing',
      'Tax Controversy & Sengketa Pajak',
      'Tax Risk Assessment & Mitigasi',
    ],
    'FRAUD-GRC': [
      'Konsep Dasar Fraud & Korupsi',
      'Fraud Risk Assessment',
      'Sistem Pengendalian Internal Anti-Fraud',
      'Investigasi Fraud',
      'Whistleblowing & Speak-Up Culture',
      'Studi Kasus Fraud Korporasi',
    ],
    'BCMS-ISO': [
      'Pengantar Business Continuity Management',
      'ISO 22301: Struktur & Persyaratan',
      'Business Impact Analysis (BIA)',
      'Strategi BCM & Recovery',
      'Pengembangan & Pengujian BCP',
      'Latihan & Simulasi BCM',
      'Sertifikasi & Pemeliharaan BCMS',
    ],
  };

  const CAT_BADGE = {
    'Risk Management': '<span class="badge badge-gold">Risk Management</span>',
    'Compliance': '<span class="badge badge-teal">Compliance</span>',
    'Governance': '<span class="badge badge-info">Governance</span>',
    'ESG': '<span class="badge badge-success">ESG</span>',
    'IT Risk': '<span class="badge badge-navy">IT Risk</span>',
  };

  const LEVEL_BADGE = {
    Basic: '<span class="badge" style="background:#f0f9ff;color:#0369a1;border:1px solid #bae6fd;">Basic</span>',
    Intermediate: '<span class="badge" style="background:#fefce8;color:#854d0e;border:1px solid #fef08a;">Intermediate</span>',
    Advanced: '<span class="badge" style="background:#fdf4ff;color:#7e22ce;border:1px solid #e9d5ff;">Advanced</span>',
  };

  const DEMO_ENROLLMENTS = [
    { code: 'ERM-2026', progress: 68, currentModule: 6, status: 'active', completedModules: [1, 2, 3, 4, 5] },
    { code: 'COMP-REG', progress: 15, currentModule: 2, status: 'active', completedModules: [1] },
    { code: 'GCG-BASIC', progress: 100, currentModule: 6, status: 'done', completedModules: [1, 2, 3, 4, 5, 6], quizPassed: true, finalPassed: true, certificateIssued: true, finalScore: 92 },
  ];

  function getProgram(code) {
    return PROGRAMS.find((program) => program.code === code) || null;
  }

  function getProgramModules(code) {
    const program = getProgram(code);
    return MODULE_DATA[code] || Array.from({ length: program ? program.modules : 5 }, (_, index) => `Modul ${index + 1}`);
  }

  function getEnrollmentKey() {
    const email = (localStorage.getItem('grcc_email') || localStorage.getItem('grcc_user_key') || 'guest').toLowerCase();
    return `grcc_enrolled_${email}`;
  }

  function normalizeEnrollment(enrollment) {
    const program = getProgram(enrollment.code) || {};
    const modulesCount = enrollment.modules || program.modules || getProgramModules(enrollment.code).length;
    const completedFromProgress = Math.floor((Number(enrollment.progress || 0) / 100) * modulesCount);
    const completedModules = Array.isArray(enrollment.completedModules)
      ? enrollment.completedModules.map(Number).filter((n) => n >= 1 && n <= modulesCount)
      : Array.from({ length: completedFromProgress }, (_, index) => index + 1);
    const uniqueCompleted = [...new Set(completedModules)].sort((a, b) => a - b);
    const progress = modulesCount ? Math.round((uniqueCompleted.length / modulesCount) * 100) : Number(enrollment.progress || 0);
    const status = enrollment.certificateIssued || progress >= 100 && enrollment.finalPassed ? 'done' : (enrollment.status || 'active');

    return {
      code: enrollment.code,
      title: enrollment.title || program.title || enrollment.code,
      category: enrollment.category || program.category || 'GRC',
      level: enrollment.level || program.level || 'Intermediate',
      icon: enrollment.icon || program.icon || '📘',
      modules: modulesCount,
      hours: enrollment.hours || program.hours || '18 jam',
      enrolledAt: enrollment.enrolledAt || new Date().toISOString(),
      progress,
      currentModule: Math.min(Number(enrollment.currentModule || uniqueCompleted.length + 1 || 1), modulesCount),
      status,
      completedModules: uniqueCompleted,
      quizScore: enrollment.quizScore || null,
      quizPassed: Boolean(enrollment.quizPassed),
      quizCompletedAt: enrollment.quizCompletedAt || null,
      pretestScore: enrollment.pretestScore || null,
      pretestCompletedAt: enrollment.pretestCompletedAt || null,
      posttestScore: enrollment.posttestScore || null,
      posttestCompletedAt: enrollment.posttestCompletedAt || null,
      finalScore: enrollment.finalScore || null,
      finalPassed: Boolean(enrollment.finalPassed),
      finalCompletedAt: enrollment.finalCompletedAt || null,
      certificateIssued: Boolean(enrollment.certificateIssued),
      certificateIssuedAt: enrollment.certificateIssuedAt || null,
    };
  }

  function getEnrolled() {
    try {
      const key = getEnrollmentKey();
      let stored = localStorage.getItem(key);
      const legacy = localStorage.getItem('grcc_enrolled');

      if (!stored && legacy) {
        stored = legacy;
        localStorage.setItem(key, legacy);
      }

      const raw = JSON.parse(stored || '[]');
      return Array.isArray(raw) ? raw.map(normalizeEnrollment) : [];
    } catch (error) {
      return [];
    }
  }

  function saveEnrolled(enrollments) {
    localStorage.setItem(getEnrollmentKey(), JSON.stringify(enrollments.map(normalizeEnrollment)));
  }

  function isEnrolled(code) {
    return getEnrolled().some((enrollment) => enrollment.code === code);
  }

  function enrollProgram(code) {
    const program = getProgram(code);
    if (!program || isEnrolled(code)) return false;

    const next = getEnrolled();
    next.push(normalizeEnrollment({
      code: program.code,
      enrolledAt: new Date().toISOString(),
      progress: 0,
      currentModule: 1,
      status: 'active',
    }));
    saveEnrolled(next);
    return true;
  }

  function updateEnrollment(code, updater) {
    const next = getEnrolled();
    const idx = next.findIndex((enrollment) => enrollment.code === code);
    if (idx === -1) return null;

    const draft = normalizeEnrollment(next[idx]);
    const updated = normalizeEnrollment(typeof updater === 'function' ? updater(draft) : { ...draft, ...updater });
    next[idx] = updated;
    saveEnrolled(next);
    return updated;
  }

  function completeModule(code, moduleNumber) {
    return updateEnrollment(code, (enrollment) => {
      const modulesCount = enrollment.modules || getProgramModules(code).length;
      const completed = new Set(enrollment.completedModules || []);
      const safeModule = Math.max(1, Math.min(Number(moduleNumber || 1), modulesCount));
      completed.add(safeModule);
      const completedModules = [...completed].sort((a, b) => a - b);
      const nextModule = Math.min(modulesCount, Math.max(enrollment.currentModule || 1, safeModule + 1));
      const progress = Math.round((completedModules.length / modulesCount) * 100);

      return {
        ...enrollment,
        completedModules,
        currentModule: progress >= 100 ? modulesCount : nextModule,
        progress,
        status: progress >= 100 && enrollment.finalPassed ? 'done' : 'active',
      };
    });
  }

  function getActiveEnrollment(code) {
    const enrolled = getEnrolled();
    if (code) {
      const match = enrolled.find((enrollment) => enrollment.code === code);
      if (match) return match;
    }
    return enrolled.find((enrollment) => !enrollment.certificateIssued)
      || enrolled[0]
      || null;
  }

  function recordQuizResult(code, score, passingScore) {
    const target = getActiveEnrollment(code);
    if (!target) return null;
    if (target.progress < 100) return null;
    const pass = Number(score) >= Number(passingScore || 60);
    return updateEnrollment(target.code, (enrollment) => ({
      ...enrollment,
      quizScore: Number(score),
      quizPassed: pass,
      quizCompletedAt: new Date().toISOString(),
    }));
  }

  function recordExamResult(code, type, score, passingScore) {
    const target = getActiveEnrollment(code);
    if (!target) return null;
    const normalizedType = type || 'final';
    if (normalizedType === 'posttest' && target.progress < 100) return null;
    if (normalizedType === 'final' && (target.progress < 100 || !target.quizPassed)) return null;
    const pass = passingScore ? Number(score) >= Number(passingScore) : true;
    const now = new Date().toISOString();

    return updateEnrollment(target.code, (enrollment) => {
      const patch = { ...enrollment };
      if (normalizedType === 'pretest') {
        patch.pretestScore = Number(score);
        patch.pretestCompletedAt = now;
      } else if (normalizedType === 'posttest') {
        patch.posttestScore = Number(score);
        patch.posttestCompletedAt = now;
      } else {
        patch.finalScore = Number(score);
        patch.finalPassed = pass;
        patch.finalCompletedAt = now;
        patch.certificateIssued = pass;
        patch.certificateIssuedAt = pass ? now : enrollment.certificateIssuedAt;
        patch.status = pass ? 'done' : 'active';
        if (pass) {
          patch.completedModules = Array.from({ length: patch.modules }, (_, index) => index + 1);
          patch.progress = 100;
          patch.currentModule = patch.modules;
        }
      }
      return patch;
    });
  }

  function getCertificateEnrollment() {
    return getEnrolled().find((enrollment) => enrollment.certificateIssued)
      || null;
  }

  function seedDemoEnrollmentsForCurrentUser() {
    const email = (localStorage.getItem('grcc_email') || localStorage.getItem('grcc_user_key') || 'guest').toLowerCase();
    if (email !== 'peserta@grcc.id') return getEnrolled();

    const existing = getEnrolled();
    if (existing.length > 0) return existing;

    const seeded = DEMO_ENROLLMENTS.map(normalizeEnrollment);
    saveEnrolled(seeded);
    return seeded;
  }

  function moduleHref(program) {
    if (!program || !program.code) return 'materi.html';
    return `materi.html#prog=${encodeURIComponent(program.code)}&mod=${encodeURIComponent(program.currentModule || 1)}`;
  }

  window.GRCCAcademy = {
    PROGRAMS,
    MODULE_DATA,
    CAT_BADGE,
    LEVEL_BADGE,
    DEMO_ENROLLMENTS,
    getProgram,
    getProgramModules,
    getEnrollmentKey,
    getEnrolled,
    saveEnrolled,
    isEnrolled,
    enrollProgram,
    updateEnrollment,
    completeModule,
    getActiveEnrollment,
    recordQuizResult,
    recordExamResult,
    getCertificateEnrollment,
    seedDemoEnrollmentsForCurrentUser,
    moduleHref,
  };
})();
