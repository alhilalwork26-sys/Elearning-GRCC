/* ================================================
   GRCC ACADEMY - Admin, Participant & Instructor Data
   ================================================ */
(function () {
  const PARTICIPANT_KEY = 'grcc_admin_participants';
  const INSTRUCTOR_KEY = 'grcc_admin_instructors';
  const PROGRAM_KEY = 'grcc_admin_programs';
  const MODULE_KEY = 'grcc_admin_modules';
  const QUESTION_KEY = 'grcc_admin_questions';

  const defaultParticipants = [
    {
      id: 'p-siti-rahmawati',
      name: 'Siti Rahmawati, S.H.',
      email: 'siti.r@kemenkeu.go.id',
      institution: 'Kementerian Keuangan',
      program: 'ERM Fundamental',
      instructorId: 'i-hendri',
      progress: 0,
      status: 'Menunggu',
      joined: '07 Mei 2026',
      certificateIssued: false,
    },
    {
      id: 'p-budi-santoso',
      name: 'Budi Santoso, M.M.',
      email: 'bsantoso@pertamina.co.id',
      institution: 'PT Pertamina (Persero)',
      program: 'Internal Audit',
      instructorId: 'i-ratna',
      progress: 0,
      status: 'Menunggu',
      joined: '06 Mei 2026',
      certificateIssued: false,
    },
    {
      id: 'p-dewi-anggraini',
      name: 'Dewi Anggraini',
      email: 'dewi.a@bri.co.id',
      institution: 'PT Bank BRI',
      program: 'Compliance Management',
      instructorId: 'i-maya',
      progress: 14,
      status: 'Menunggu',
      joined: '05 Mei 2026',
      certificateIssued: false,
    },
    {
      id: 'p-ahmad-fauzi',
      name: 'Ahmad Fauzi, S.E.',
      email: 'a.fauzi@gmail.com',
      institution: 'Individual',
      program: 'ERM Fundamental',
      instructorId: 'i-hendri',
      progress: 68,
      status: 'Aktif',
      joined: '01 Mar 2026',
      certificateIssued: false,
    },
    {
      id: 'p-reza-putra',
      name: 'Reza Putra, S.T.',
      email: 'reza.p@pln.co.id',
      institution: 'PT PLN (Persero)',
      program: 'GRC for Government',
      instructorId: 'i-hendri',
      progress: 45,
      status: 'Aktif',
      joined: '28 Feb 2026',
      certificateIssued: false,
    },
    {
      id: 'p-maya-kusuma',
      name: 'Maya Kusuma, M.Ak.',
      email: 'm.kusuma@bpk.go.id',
      institution: 'BPK RI',
      program: 'ERM Fundamental',
      instructorId: 'i-hendri',
      progress: 100,
      status: 'Lulus',
      joined: '15 Jan 2026',
      certificateIssued: false,
    },
    {
      id: 'p-hendra-wijaya',
      name: 'Hendra Wijaya',
      email: 'hendra.w@bankmandiri.co.id',
      institution: 'Bank Mandiri',
      program: 'Internal Audit',
      instructorId: 'i-ratna',
      progress: 100,
      status: 'Remedial',
      joined: '12 Jan 2026',
      certificateIssued: false,
    },
    {
      id: 'p-sari-dewi',
      name: 'Sari Dewi',
      email: 'sari.dewi@ojk.go.id',
      institution: 'OJK',
      program: 'Compliance Management',
      instructorId: 'i-maya',
      progress: 100,
      status: 'Lulus',
      joined: '10 Jan 2026',
      certificateIssued: false,
    },
  ];

  const defaultInstructors = [
    {
      id: 'i-hendri',
      name: 'Dr. Hendri Kurniawan',
      role: 'Instruktur Senior',
      programs: ['ERM Fundamental', 'GRC for Government'],
      rating: 4.9,
      status: 'Aktif',
    },
    {
      id: 'i-ratna',
      name: 'Ratna Prameswari, CIA',
      role: 'Instruktur Audit',
      programs: ['Internal Audit'],
      rating: 4.8,
      status: 'Aktif',
    },
    {
      id: 'i-maya',
      name: 'Maya Wulandari, CRMP',
      role: 'Instruktur Compliance',
      programs: ['Compliance Management'],
      rating: 4.7,
      status: 'Aktif',
    },
  ];

  const defaultPrograms = [
    { id: 'prog-erm', name: 'ERM Fundamental', category: 'Risk Management', modules: 8, status: 'Aktif', instructorId: 'i-hendri' },
    { id: 'prog-audit', name: 'Internal Audit', category: 'Audit', modules: 6, status: 'Aktif', instructorId: 'i-ratna' },
    { id: 'prog-compliance', name: 'Compliance Management', category: 'Compliance', modules: 7, status: 'Aktif', instructorId: 'i-maya' },
    { id: 'prog-gov', name: 'GRC for Government', category: 'Governance', modules: 5, status: 'Aktif', instructorId: 'i-hendri' },
    { id: 'prog-esg', name: 'ESG & Keberlanjutan', category: 'ESG', modules: 4, status: 'Aktif', instructorId: 'i-maya' },
    { id: 'prog-coso', name: 'GRC Advanced — COSO 2017', category: 'Risk Management', modules: 0, status: 'Draft', instructorId: 'i-hendri' },
  ];

  const defaultModules = [
    { id: 'mod-erm-1', title: 'Pengantar GRC & Kerangka Kerja', program: 'ERM Fundamental', order: 1, files: 'PDF, PPTX', status: 'Aktif' },
    { id: 'mod-erm-2', title: 'Corporate Governance', program: 'ERM Fundamental', order: 2, files: 'PDF, PPTX', status: 'Aktif' },
    { id: 'mod-erm-3', title: 'Identifikasi & Penilaian Risiko', program: 'ERM Fundamental', order: 3, files: 'PDF, XLSX', status: 'Aktif' },
    { id: 'mod-erm-4', title: 'Risk Appetite & Tolerance', program: 'ERM Fundamental', order: 4, files: 'PDF', status: 'Aktif' },
    { id: 'mod-erm-6', title: 'Risk Treatment & Mitigasi', program: 'ERM Fundamental', order: 6, files: 'PDF, PPTX', status: 'Aktif' },
    { id: 'mod-erm-8', title: 'Studi Kasus ERM Indonesia', program: 'ERM Fundamental', order: 8, files: '—', status: 'Draft' },
  ];

  const defaultQuestions = [
    { id: 'Q-001', question: 'Perusahaan X mengidentifikasi risiko dengan Risk Score = 16...', type: 'Pilihan Ganda', exam: 'Quiz M6', module: 'Modul 6', moduleId: 'mod-erm-6', difficulty: 'Sedang' },
    { id: 'Q-002', question: 'Manakah pernyataan yang BENAR mengenai Residual Risk?', type: 'Pilihan Ganda', exam: 'Quiz M6', module: 'Modul 6', moduleId: 'mod-erm-6', difficulty: 'Mudah' },
    { id: 'Q-003', question: 'Pemilihan risk treatment harus mempertimbangkan cost-benefit...', type: 'Benar/Salah', exam: 'Quiz M6', module: 'Modul 6', moduleId: 'mod-erm-6', difficulty: 'Mudah' },
    { id: 'Q-004', question: 'PT Bank Nusantara membeli asuransi untuk melindungi gedung...', type: 'Pilihan Ganda', exam: 'Post-Test', module: 'Modul 6', moduleId: 'mod-erm-6', difficulty: 'Sedang' },
    { id: 'Q-005', question: '[STUDI KASUS] PT Maju Sejahtera rencana ekspansi ke negara...', type: 'Studi Kasus', exam: 'Final Exam', module: 'Modul 6-8', moduleId: 'mod-erm-8', difficulty: 'Sulit' },
  ];

  function canStore() {
    try {
      localStorage.setItem('__grcc_test__', '1');
      localStorage.removeItem('__grcc_test__');
      return true;
    } catch (error) {
      return false;
    }
  }

  const storageReady = canStore();
  const memoryStore = {};

  function readJson(key, fallback) {
    try {
      const raw = storageReady ? localStorage.getItem(key) : memoryStore[key];
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    const payload = JSON.stringify(value);
    try {
      if (storageReady) localStorage.setItem(key, payload);
      else memoryStore[key] = payload;
    } catch (error) {
      memoryStore[key] = payload;
    }
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function normalizeName(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/,\s*[^,]+$/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  function resolveQuestionModule(question, modules) {
    if (question.moduleId && modules.some((module) => module.id === question.moduleId)) {
      return question.moduleId;
    }
    const label = String(question.module || '').toLowerCase();
    const normalizedLabel = normalizeName(label);
    const numericMatches = label.match(/\d+/g) || [];
    const lastModuleNumber = Number(numericMatches[numericMatches.length - 1]);
    const matched = modules.find((module) => module.order === lastModuleNumber)
      || modules.find((module) => normalizedLabel.includes(normalizeName(module.title)));
    return matched?.id || modules[0]?.id || '';
  }

  function normalizeQuestions(questions) {
    const modules = getModules();
    let changed = false;
    const next = questions.map((question) => {
      const moduleId = resolveQuestionModule(question, modules);
      const module = modules.find((item) => item.id === moduleId);
      const normalized = {
        ...question,
        moduleId,
        module: module ? `Modul ${module.order}` : (question.module || 'Modul 1'),
      };
      if (normalized.moduleId !== question.moduleId || normalized.module !== question.module) changed = true;
      return normalized;
    });
    return { questions: next, changed };
  }

  function getParticipants() {
    const stored = readJson(PARTICIPANT_KEY, null);
    if (stored) return stored;
    const seeded = clone(defaultParticipants);
    writeJson(PARTICIPANT_KEY, seeded);
    return seeded;
  }

  function saveParticipants(participants) {
    writeJson(PARTICIPANT_KEY, participants);
    return participants;
  }

  function getInstructors() {
    const stored = readJson(INSTRUCTOR_KEY, null);
    if (stored) return stored;
    const seeded = clone(defaultInstructors);
    writeJson(INSTRUCTOR_KEY, seeded);
    return seeded;
  }

  function getPrograms() {
    const stored = readJson(PROGRAM_KEY, null);
    if (stored) return stored;
    const seeded = clone(defaultPrograms);
    writeJson(PROGRAM_KEY, seeded);
    return seeded;
  }

  function getModules() {
    const stored = readJson(MODULE_KEY, null);
    if (stored) return stored;
    const seeded = clone(defaultModules);
    writeJson(MODULE_KEY, seeded);
    return seeded;
  }

  function getQuestions() {
    const stored = readJson(QUESTION_KEY, null);
    if (stored) {
      const normalized = normalizeQuestions(stored);
      if (normalized.changed) writeJson(QUESTION_KEY, normalized.questions);
      return normalized.questions;
    }
    const seeded = clone(defaultQuestions);
    const normalized = normalizeQuestions(seeded).questions;
    writeJson(QUESTION_KEY, normalized);
    return normalized;
  }

  function saveQuestions(questions) {
    writeJson(QUESTION_KEY, questions);
    return questions;
  }

  function getQuestionSummary() {
    const questions = getQuestions();
    return {
      quiz: questions.filter((question) => String(question.exam || '').startsWith('Quiz')).length,
      pre: questions.filter((question) => question.exam === 'Pre-Test').length,
      post: questions.filter((question) => question.exam === 'Post-Test').length,
      final: questions.filter((question) => question.exam === 'Final Exam').length,
      total: questions.length,
    };
  }

  function saveModules(modules) {
    writeJson(MODULE_KEY, modules);
    return modules;
  }

  function getModuleSummary() {
    const participants = getParticipants();
    return getModules().map((module) => {
      const enrolled = participants.filter((participant) => normalizeName(participant.program) === normalizeName(module.program));
      const completedCount = enrolled.filter((participant) => {
        const modules = getPrograms().find((program) => normalizeName(program.name) === normalizeName(module.program))?.modules || 1;
        const participantCompleted = Math.floor((Number(participant.progress || 0) / 100) * modules);
        return participantCompleted >= Number(module.order || 0);
      }).length;
      return { ...module, completedCount };
    });
  }

  function savePrograms(programs) {
    writeJson(PROGRAM_KEY, programs);
    return programs;
  }

  function publishProgram(name) {
    const query = normalizeName(name);
    const programs = getPrograms().map((program) => {
      const normalized = normalizeName(program.name);
      return normalized.includes(query) || query.includes(normalized)
        ? { ...program, status: 'Aktif', publishedAt: new Date().toISOString() }
        : program;
    });
    savePrograms(programs);
    return programs.find((program) => {
      const normalized = normalizeName(program.name);
      return normalized.includes(query) || query.includes(normalized);
    }) || null;
  }

  function assignProgramToInstructor(programName, instructorId, previousName) {
    if (!programName || !instructorId) return null;
    const namesToRemove = [programName, previousName].filter(Boolean).map(normalizeName);
    const instructors = getInstructors().map((instructor) => {
      const currentPrograms = (instructor.programs || []).filter((program) => {
        const normalized = normalizeName(program);
        return !namesToRemove.some((name) => normalized === name);
      });
      if (instructor.id !== instructorId) return { ...instructor, programs: currentPrograms };
      const programs = Array.from(new Set([...currentPrograms, programName]));
      return { ...instructor, programs };
    });
    saveInstructors(instructors);
    return instructors.find((instructor) => instructor.id === instructorId) || null;
  }

  function getProgramSummary() {
    const participants = getParticipants();
    const instructors = getInstructors();
    const modules = getModules();
    return getPrograms().map((program) => {
      const normalizedProgram = normalizeName(program.name);
      const moduleCount = modules.filter((module) => normalizeName(module.program) === normalizedProgram).length;
      const enrolled = participants.filter((participant) => {
        const normalizedParticipantProgram = normalizeName(participant.program);
        return normalizedParticipantProgram.includes(normalizedProgram) || normalizedProgram.includes(normalizedParticipantProgram);
      });
      const graduated = enrolled.filter((participant) => participant.status === 'Lulus').length;
      return {
        ...program,
        modules: Math.max(Number(program.modules || 0), moduleCount),
        instructorName: (instructors.find((instructor) => instructor.id === program.instructorId)
          || instructors.find((instructor) => (instructor.programs || []).some((item) => normalizeName(item) === normalizeName(program.name)))
          || {}).name || 'Belum ditentukan',
        participantCount: enrolled.length,
        graduateCount: graduated,
        graduateRate: enrolled.length ? Math.round((graduated / enrolled.length) * 100) : 0,
      };
    });
  }

  function saveInstructors(instructors) {
    writeJson(INSTRUCTOR_KEY, instructors);
    return instructors;
  }

  function findParticipantIndex(participants, query) {
    const normalized = normalizeName(query);
    return participants.findIndex((participant) => {
      const name = normalizeName(participant.name);
      return name.includes(normalized) || normalized.includes(name);
    });
  }

  function updateParticipantByName(name, patch) {
    const participants = getParticipants();
    const index = findParticipantIndex(participants, name);
    if (index < 0) return null;
    participants[index] = { ...participants[index], ...patch };
    saveParticipants(participants);
    return participants[index];
  }

  function approveParticipant(name) {
    return updateParticipantByName(name, {
      status: 'Aktif',
      approvedAt: new Date().toISOString(),
    });
  }

  function issueCertificate(name) {
    return updateParticipantByName(name, {
      status: 'Lulus',
      progress: 100,
      certificateIssued: true,
      certificateNo: 'GRCC-' + Date.now().toString().slice(-8),
      certificateIssuedAt: new Date().toISOString(),
    });
  }

  function getInstructorSummary() {
    const participants = getParticipants();
    return getInstructors().map((instructor) => {
      const assigned = participants.filter((participant) => participant.instructorId === instructor.id);
      const graduates = assigned.filter((participant) => participant.status === 'Lulus').length;
      const averageProgress = assigned.length
        ? Math.round(assigned.reduce((sum, participant) => sum + Number(participant.progress || 0), 0) / assigned.length)
        : 0;
      return {
        ...instructor,
        participantCount: assigned.length,
        pendingCount: assigned.filter((participant) => participant.status === 'Menunggu').length,
        graduates,
        averageProgress,
      };
    });
  }

  function getParticipantsForInstructor(instructorId) {
    return getParticipants().filter((participant) => participant.instructorId === instructorId);
  }

  window.GRCCAdminData = {
    getParticipants,
    saveParticipants,
    getInstructors,
    saveInstructors,
    getPrograms,
    savePrograms,
    getModules,
    saveModules,
    getModuleSummary,
    getQuestions,
    saveQuestions,
    getQuestionSummary,
    publishProgram,
    assignProgramToInstructor,
    getProgramSummary,
    approveParticipant,
    issueCertificate,
    getInstructorSummary,
    getParticipantsForInstructor,
    normalizeName,
  };
})();
