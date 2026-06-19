/* Shared sidebar toggle for participant pages. */
(function () {
  const NAV_ICONS = {
    'dashboard.html': '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    'helpdesk.html': '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    'materi.html': '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 3H20v18H6.5A2.5 2.5 0 0 1 4 18.5v-13A2.5 2.5 0 0 1 6.5 3z"/>',
    'quiz.html': '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    'exam.html': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6"/><path d="M9 17h6"/><path d="M9 9h1"/>',
    'certificate.html': '<circle cx="12" cy="8" r="5"/><path d="M8.5 12.5 7 22l5-3 5 3-1.5-9.5"/>',
    'programs.html': '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h10"/><path d="M8 3v18"/>',
    'enroll.html': '<path d="M12 5v14"/><path d="M5 12h14"/><rect x="3" y="3" width="18" height="18" rx="3"/>',
    'profile.html': '<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/>',
    'login.html': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',
  };

  function sidebarEl() {
    return document.getElementById('sidebar') || document.getElementById('dSidebar');
  }

  function overlayEl() {
    return document.getElementById('sidebarOverlay');
  }

  function isMobileLayout() {
    return window.matchMedia('(max-width: 900px)').matches;
  }

  function navKey(href) {
    try {
      return new URL(href, window.location.href).pathname.split('/').pop() || 'dashboard.html';
    } catch (error) {
      return String(href || '').split('#')[0].split('?')[0];
    }
  }

  function renderIcon(paths) {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + paths + '</svg>';
  }

  function normalizeParticipantSidebarIcons() {
    const sidebar = sidebarEl();
    if (!sidebar) return;
    sidebar.querySelectorAll('.d-nav-link').forEach(function (link) {
      const key = navKey(link.getAttribute('href'));
      const paths = NAV_ICONS[key];
      if (!paths) return;
      let icon = link.querySelector('.d-nav-icon');
      if (!icon) {
        icon = document.createElement('span');
        icon.className = 'd-nav-icon';
        link.insertBefore(icon, link.firstChild);
      }
      icon.innerHTML = renderIcon(paths);
    });
  }

  function populateProgramShortcuts() {
    const target = document.getElementById('dProgShortcuts');
    const academy = window.GRCCAcademy;
    if (!target || !academy || typeof academy.getEnrolled !== 'function') return;

    const enrolled = typeof academy.seedDemoEnrollmentsForCurrentUser === 'function'
      ? academy.seedDemoEnrollmentsForCurrentUser()
      : academy.getEnrolled();
    function escapeHtml(value) {
      return String(value).replace(/[&<>"']/g, function (char) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
      });
    }
    if (!enrolled.length) {
      target.innerHTML = '<a href="enroll.html" class="d-prog-shortcut"><div class="d-prog-shortcut-dot" style="background:#14B8A6;"></div><span class="d-prog-shortcut-title">Enroll program baru</span></a>';
      return;
    }

    const colors = ['#14B8A6', '#0B2447', '#22C55E', '#F59E0B'];
    target.innerHTML = enrolled.map(function (program, index) {
      const title = program.title || program.code || 'Program';
      const href = academy.moduleHref ? academy.moduleHref(program) : 'materi.html';
      return '<a href="' + href + '" class="d-prog-shortcut">' +
        '<div class="d-prog-shortcut-dot" style="background:' + colors[index % colors.length] + ';"></div>' +
        '<span class="d-prog-shortcut-title">' + escapeHtml(title) + '</span>' +
      '</a>';
    }).join('');
  }

  function showSidebar() {
    const sidebar = sidebarEl();
    if (!sidebar) return;
    sidebar.classList.add('open');
    document.body.classList.remove('d-sidebar-collapsed');
    if (isMobileLayout()) overlayEl()?.classList.add('show');
  }

  window.closeSidebar = function closeSidebar() {
    const sidebar = sidebarEl();
    if (!sidebar) return;
    sidebar.classList.remove('open');
    overlayEl()?.classList.remove('show');
    if (!isMobileLayout()) document.body.classList.add('d-sidebar-collapsed');
  };

  window.openSidebar = function openSidebar() {
    const sidebar = sidebarEl();
    if (!sidebar) return;

    if (isMobileLayout()) {
      if (sidebar.classList.contains('open')) {
        window.closeSidebar();
      } else {
        showSidebar();
      }
      return;
    }

    if (document.body.classList.contains('d-sidebar-collapsed')) {
      showSidebar();
    } else {
      window.closeSidebar();
    }
  };

  document.addEventListener('click', function (event) {
    const menuButton = event.target.closest('#dMenuBtn');
    if (menuButton) {
      event.preventDefault();
      window.openSidebar();
      return;
    }

    const sidebar = sidebarEl();
    if (!sidebar || !isMobileLayout() || !sidebar.classList.contains('open')) return;
    if (event.target.closest('.d-sidebar') || event.target.closest('.d-hamburger')) return;
    window.closeSidebar();
  });

  window.addEventListener('resize', function () {
    const sidebar = sidebarEl();
    if (!sidebar) return;
    overlayEl()?.classList.remove('show');
    if (!isMobileLayout()) sidebar.classList.remove('open');
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      normalizeParticipantSidebarIcons();
      populateProgramShortcuts();
    });
  } else {
    normalizeParticipantSidebarIcons();
    populateProgramShortcuts();
  }
})();
