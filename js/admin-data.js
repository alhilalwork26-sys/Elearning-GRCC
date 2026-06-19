/* ================================================
   GRCC ACADEMY - Admin, Participant & Instructor Data
   ================================================ */
(function () {
  const PARTICIPANT_KEY = 'grcc_admin_participants';
  const INSTRUCTOR_KEY = 'grcc_admin_instructors';
  const PROGRAM_KEY = 'grcc_admin_programs';
  const MODULE_KEY = 'grcc_admin_modules';
  const QUESTION_KEY = 'grcc_admin_questions';

  const defaultParticipants = [];

  const defaultInstructors = [];

  const defaultPrograms = [];

  const academyProgramCodes = {
    'erm fundamental': 'ERM-2026',
    'internal audit': 'AUDIT-INT',
    'compliance management': 'COMP-REG',
    'grc for government': 'GCG-BASIC',
    'esg keberlanjutan': 'ESG-GRCC',
  };

  const defaultModules = [];

  const defaultQuestions = [];

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

  function participantKey(participant) {
    return participant.id
      || `${String(participant.email || '').toLowerCase()}::${normalizeName(participant.program)}`;
  }

  function mergeDefaultParticipants(stored) {
    const merged = [...stored];
    const keys = new Set(merged.map(participantKey));
    defaultParticipants.forEach((participant) => {
      const key = participantKey(participant);
      if (!keys.has(key)) {
        merged.push(clone(participant));
        keys.add(key);
      }
    });
    return merged;
  }

  function academyCodeForProgram(programName) {
    const normalized = normalizeName(programName);
    return academyProgramCodes[normalized]
      || Object.entries(academyProgramCodes).find(([name]) => normalized.includes(name) || name.includes(normalized))?.[1]
      || 'ERM-2026';
  }

  function syncParticipantEnrollmentToAcademy(participant) {
    const email = String(participant.email || '').toLowerCase();
    if (!email || email === '-') return null;
    const code = academyCodeForProgram(participant.program);
    const program = getPrograms().find((item) => normalizeName(item.name) === normalizeName(participant.program));
    const modules = Math.max(Number(program?.modules || 0), 1);
    const key = `grcc_enrolled_${email}`;
    const enrollments = readJson(key, []);
    const now = new Date().toISOString();
    const progress = Number(participant.progress || 0);
    const index = enrollments.findIndex((enrollment) => enrollment.code === code);
    const base = index >= 0 ? enrollments[index] : {
      code,
      title: participant.program || code,
      category: program?.category || 'GRC',
      level: 'Intermediate',
      icon: '📘',
      modules,
      hours: `${modules * 3} jam`,
      enrolledAt: now,
      currentModule: 1,
      completedModules: [],
      status: 'active',
    };
    const completedCount = participant.certificateIssued
      ? modules
      : Math.floor((progress / 100) * modules);
    const next = {
      ...base,
      title: base.title || participant.program || code,
      modules: base.modules || modules,
      progress,
      currentModule: participant.certificateIssued ? modules : Math.max(1, Math.min(modules, completedCount + 1)),
      completedModules: Array.from({ length: completedCount }, (_, idx) => idx + 1),
      status: participant.certificateIssued ? 'done' : (progress > 0 ? 'active' : base.status || 'active'),
      quizPassed: participant.certificateIssued ? true : Boolean(base.quizPassed),
      finalPassed: participant.certificateIssued ? true : Boolean(base.finalPassed),
      finalScore: participant.certificateIssued ? (base.finalScore || 100) : (base.finalScore || null),
      finalCompletedAt: participant.certificateIssued ? (base.finalCompletedAt || participant.certificateIssuedAt || now) : (base.finalCompletedAt || null),
      certificateIssued: Boolean(participant.certificateIssued),
      certificateIssuedAt: participant.certificateIssuedAt || base.certificateIssuedAt || null,
    };
    if (index >= 0) enrollments[index] = next;
    else enrollments.unshift(next);
    writeJson(key, enrollments);
    return next;
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
    if (stored) {
      const merged = mergeDefaultParticipants(stored);
      if (merged.length !== stored.length) writeJson(PARTICIPANT_KEY, merged);
      return merged;
    }
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
    const participant = updateParticipantByName(name, {
      status: 'Aktif',
      approvedAt: new Date().toISOString(),
    });
    if (participant) syncParticipantEnrollmentToAcademy(participant);
    return participant;
  }

  function issueCertificate(name) {
    const participant = updateParticipantByName(name, {
      status: 'Lulus',
      progress: 100,
      certificateIssued: true,
      certificateNo: 'GRCC-' + Date.now().toString().slice(-8),
      certificateIssuedAt: new Date().toISOString(),
    });
    if (participant) syncParticipantEnrollmentToAcademy(participant);
    return participant;
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
