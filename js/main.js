/* ================================================
   GRCC ACADEMY — Main JavaScript
   ================================================ */

// ── Navbar scroll effect ──
const topnav = document.querySelector('.topnav');
if (topnav) {
  window.addEventListener('scroll', () => {
    topnav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ── Mobile nav ──
const burger = document.querySelector('.nav-burger');
const mobileNav = document.querySelector('.mobile-nav');
const mobileClose = document.querySelector('.mobile-nav-close');
if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  if (mobileClose) {
    mobileClose.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── Sidebar toggle (app layout) ──
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.sidebar-overlay');
if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
  });
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    });
  }
}

// ── FAQ Accordion ──
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  if (btn) {
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  }
});

// ── Tabs ──
document.querySelectorAll('[data-tabs]').forEach(tabsEl => {
  const btnSel = tabsEl.getAttribute('data-tabs');
  const panelSel = tabsEl.getAttribute('data-panels') || '[data-panel]';
  const buttons = tabsEl.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll(panelSel);
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      panels.forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-panel') === target);
      });
    });
  });
});

// ── Auth tabs ──
document.querySelectorAll('.auth-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-auth');
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.auth-form').forEach(f => {
      f.classList.toggle('active', f.getAttribute('data-auth') === target);
    });
  });
});

// ── Filter pills ──
document.querySelectorAll('.filter-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    const group = pill.closest('.filter-pills');
    if (!group) return;
    group.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    filterPrograms(pill.getAttribute('data-cat'));
  });
});

function filterPrograms(cat) {
  const cards = document.querySelectorAll('.prog-card[data-cat]');
  cards.forEach(card => {
    const show = !cat || cat === 'all' || card.getAttribute('data-cat') === cat;
    card.style.display = show ? '' : 'none';
  });
}

// ── Fade-in on scroll ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Animated counters ──
function animateCounter(el) {
  const target = +el.getAttribute('data-to');
  const suffix = el.getAttribute('data-suffix') || '';
  const prefix = el.getAttribute('data-prefix') || '';
  const dur = 2000;
  const step = 16;
  const inc = target / (dur / step);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + inc, target);
    el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
    if (current >= target) clearInterval(timer);
  }, step);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-to]').forEach(el => counterObserver.observe(el));

// ── Curriculum accordion (program detail) ──
document.querySelectorAll('.curriculum-header').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.curriculum-item');
    item.classList.toggle('open');
  });
});

// ── Quiz Logic ──
let currentQ = 0;
let answers = {};
let quizMode = 'quiz'; // quiz | pretest | posttest | exam

function initQuiz() {
  const container = document.querySelector('.quiz-content');
  if (!container) return;
  quizMode = container.getAttribute('data-mode') || 'quiz';
  showQuestion(0);
  updateDots();
  updateProgress();
}

function showQuestion(idx) {
  document.querySelectorAll('.quiz-question-wrap').forEach((q, i) => {
    q.style.display = i === idx ? 'block' : 'none';
  });
  currentQ = idx;
  updateDots();
  updateProgress();
  const prev = document.getElementById('quiz-prev');
  const next = document.getElementById('quiz-next');
  const submit = document.getElementById('quiz-submit');
  const total = document.querySelectorAll('.quiz-question-wrap').length;
  if (prev) prev.disabled = idx === 0;
  if (next) next.style.display = idx < total - 1 ? 'inline-flex' : 'none';
  if (submit) submit.style.display = idx === total - 1 ? 'inline-flex' : 'none';
}

function updateDots() {
  const dots = document.querySelectorAll('.quiz-dot');
  dots.forEach((dot, i) => {
    dot.classList.remove('current', 'answered');
    if (i === currentQ) dot.classList.add('current');
    else if (answers[i] !== undefined) dot.classList.add('answered');
  });
}

function updateProgress() {
  const total = document.querySelectorAll('.quiz-question-wrap').length;
  const bar = document.querySelector('.quiz-progress-bar');
  const label = document.querySelector('.quiz-prog');
  if (bar) bar.style.width = ((currentQ + 1) / total * 100) + '%';
  if (label) label.textContent = `Soal ${currentQ + 1} dari ${total}`;
}

document.addEventListener('click', e => {
  const option = e.target.closest('.quiz-option');
  if (option) {
    const wrap = option.closest('.quiz-question-wrap');
    const qIdx = +wrap.getAttribute('data-q');
    wrap.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
    option.classList.add('selected');
    answers[qIdx] = option.getAttribute('data-answer');
    updateDots();
  }
  const tfBtn = e.target.closest('.quiz-tf-btn');
  if (tfBtn) {
    const wrap = tfBtn.closest('.quiz-question-wrap');
    const qIdx = +wrap.getAttribute('data-q');
    wrap.querySelectorAll('.quiz-tf-btn').forEach(b => b.classList.remove('selected'));
    tfBtn.classList.add('selected');
    answers[qIdx] = tfBtn.getAttribute('data-answer');
    updateDots();
  }
  if (e.target.id === 'quiz-next') {
    const total = document.querySelectorAll('.quiz-question-wrap').length;
    if (currentQ < total - 1) showQuestion(currentQ + 1);
  }
  if (e.target.id === 'quiz-prev') {
    if (currentQ > 0) showQuestion(currentQ - 1);
  }
  const dot = e.target.closest('.quiz-dot');
  if (dot) {
    const idx = +dot.getAttribute('data-i');
    showQuestion(idx);
  }
  if (e.target.id === 'quiz-submit') submitQuiz();
});

function submitQuiz() {
  const questions = document.querySelectorAll('.quiz-question-wrap');
  let correct = 0;
  questions.forEach((q, i) => {
    const correctAns = q.getAttribute('data-correct');
    const userAns = answers[i];
    q.querySelectorAll('.quiz-option').forEach(opt => {
      const ans = opt.getAttribute('data-answer');
      if (ans === correctAns) opt.classList.add('correct');
      if (ans === userAns && ans !== correctAns) opt.classList.add('wrong');
    });
    q.querySelectorAll('.quiz-tf-btn').forEach(btn => {
      const ans = btn.getAttribute('data-answer');
      if (ans === correctAns) btn.style.border = '2px solid var(--success)';
      if (ans === userAns && ans !== correctAns) btn.style.border = '2px solid var(--danger)';
    });
    if (userAns === correctAns) correct++;
    q.style.display = '';
  });
  showResults(correct, questions.length);
}

function showResults(correct, total) {
  const score = Math.round(correct / total * 100);
  const pass = score >= 70;
  const resultEl = document.getElementById('quiz-result');
  const quizMain = document.getElementById('quiz-main');
  if (resultEl && quizMain) {
    quizMain.style.display = 'none';
    resultEl.style.display = 'block';
    document.getElementById('result-score').textContent = score;
    const circle = document.getElementById('result-circle');
    if (circle) { circle.classList.add(pass ? 'pass' : 'fail'); }
    const statusEl = document.getElementById('result-status');
    if (statusEl) statusEl.textContent = pass ? 'LULUS' : 'TIDAK LULUS';
    document.getElementById('result-correct').textContent = correct;
    document.getElementById('result-wrong').textContent = total - correct;
    document.getElementById('result-total').textContent = total;
    const badge = document.getElementById('result-badge');
    if (badge) {
      badge.className = 'badge ' + (pass ? 'badge-success' : 'badge-danger');
      badge.textContent = pass ? 'Lulus' : 'Tidak Lulus';
    }
  }
}

// ── Exam Timer ──
let timerInterval = null;
function startTimer(seconds) {
  const timerEl = document.getElementById('exam-timer');
  if (!timerEl) return;
  let remaining = seconds;
  function update() {
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    timerEl.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    if (remaining <= 300) timerEl.closest('.exam-timer').classList.add('warning');
    if (remaining <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }
    remaining--;
  }
  update();
  timerInterval = setInterval(update, 1000);
}

// ── Toast ──
function showToast(msg, type = 'success') {
  const icons = {
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
  };
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = (icons[type] || '') + `<span>${msg}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => { requestAnimationFrame(() => toast.classList.add('show')); });
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ── Password toggle ──
document.querySelectorAll('.pw-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = btn.previousElementSibling;
    if (!input) return;
    const isText = input.type === 'text';
    input.type = isText ? 'password' : 'text';
    btn.innerHTML = isText
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
  });
});

// ── Form submit handlers ──
document.querySelectorAll('form[data-form]').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const type = form.getAttribute('data-form');
    if (type === 'login') {
      showToast('Login berhasil! Mengalihkan ke dashboard...', 'success');
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 1200);
    } else if (type === 'register') {
      showToast('Akun berhasil dibuat! Silakan cek email Anda.', 'success');
    } else if (type === 'contact') {
      showToast('Pesan terkirim. Tim kami akan menghubungi Anda.', 'success');
      form.reset();
    }
  });
});

// ── Certificate QR (simple SVG pattern) ──
function generateQRPattern() {
  const qr = document.getElementById('cert-qr-svg');
  if (!qr) return;
  const size = 13;
  let paths = '';
  const seed = 42;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const isCorner = (r < 3 && c < 3) || (r < 3 && c >= size-3) || (r >= size-3 && c < 3);
      const val = isCorner || (((r * 7 + c * 13 + seed) % 3) === 0);
      if (val) {
        const x = c * (72/size); const y = r * (72/size); const s = (72/size) - 0.5;
        paths += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${s.toFixed(1)}" height="${s.toFixed(1)}" fill="white"/>`;
      }
    }
  }
  qr.innerHTML = `<rect width="72" height="72" fill="#0B2447"/>${paths}`;
}

// ── Print certificate ──
const printBtn = document.getElementById('print-cert');
if (printBtn) {
  printBtn.addEventListener('click', () => { window.print(); });
}

// ── Download certificate ──
const dlBtn = document.getElementById('download-cert');
if (dlBtn) {
  dlBtn.addEventListener('click', () => {
    showToast('Sertifikat sedang diunduh...', 'info');
    setTimeout(() => showToast('Sertifikat berhasil diunduh!', 'success'), 1500);
  });
}

// ── Scroll to top ──
const btt = document.getElementById('btt');
if (btt) {
  window.addEventListener('scroll', () => {
    btt.style.opacity = window.scrollY > 400 ? '1' : '0';
    btt.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
  });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Role-aware navigation ──
function applyRoleNav() {
  const role  = localStorage.getItem('grcc_role')  || 'peserta';
  const name  = localStorage.getItem('grcc_name')  || 'Ahmad Fauzi, S.E.';
  const email = localStorage.getItem('grcc_email') || 'peserta@grcc.id';

  const dashMap = {
    peserta:    'dashboard.html',
    admin:      'admin.html',
    instruktur: 'instruktur.html'
  };
  const roleLabels = {
    peserta:    'Peserta Aktif',
    admin:      'Super Admin',
    instruktur: 'Instruktur Senior'
  };
  const avatarColors = {
    peserta:    'var(--teal)',
    admin:      'var(--danger)',
    instruktur: 'var(--gold)'
  };

  const targetDash = dashMap[role] || 'dashboard.html';

  // Update ALL links pointing to any dashboard page → correct dashboard for this role
  document.querySelectorAll('a[href="dashboard.html"], a[href="admin.html"], a[href="instruktur.html"]').forEach(a => {
    const href = a.getAttribute('href');
    // Only reroute links that ARE a dashboard-home shortcut (sidebar "Dashboard" or topnav "Dashboard" btn)
    const isDashLink = href === 'dashboard.html' || href === 'admin.html' || href === 'instruktur.html';
    const looksLikeDash = /dashboard|dasbor/i.test(a.textContent.trim()) || a.closest('.sidebar-nav');
    if (isDashLink && looksLikeDash) a.href = targetDash;
  });

  // ── Sidebar user block ──
  const nameEls = document.querySelectorAll('.sidebar-username, .sidebar-user-name');
  nameEls.forEach(el => { el.textContent = name; });

  const roleEls = document.querySelectorAll('.sidebar-role, .sidebar-user-role');
  roleEls.forEach(el => { el.textContent = roleLabels[role] || 'Peserta Aktif'; });

  // Avatar initials
  const avatarEls = document.querySelectorAll('.sidebar-avatar');
  avatarEls.forEach(el => {
    const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
    el.textContent = initials;
    el.style.background = avatarColors[role] || 'var(--teal)';
    if (role === 'instruktur') el.style.color = 'var(--navy)';
  });

  // ── Logout link handler ──
  document.querySelectorAll('a[href*="login.html"], .sidebar-logout, [data-action="logout"]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      localStorage.removeItem('grcc_role');
      localStorage.removeItem('grcc_name');
      localStorage.removeItem('grcc_email');
      localStorage.removeItem('grcc_user_key');
      window.location.href = 'login.html';
    });
  });
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  applyRoleNav();
  initQuiz();
  generateQRPattern();
  // Open first FAQ
  const firstFaq = document.querySelector('.faq-item');
  if (firstFaq) firstFaq.classList.add('open');
  // Start exam timer if present
  const examContainer = document.querySelector('[data-exam-duration]');
  if (examContainer) {
    startTimer(+examContainer.getAttribute('data-exam-duration') * 60);
  }
  // Activate first curriculum item
  const firstCurr = document.querySelector('.curriculum-item');
  if (firstCurr) firstCurr.classList.add('open');
});
