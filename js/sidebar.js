/* Shared sidebar toggle for participant pages. */
(function () {
  function sidebarEl() {
    return document.getElementById('sidebar') || document.getElementById('dSidebar');
  }

  function overlayEl() {
    return document.getElementById('sidebarOverlay');
  }

  function isMobileLayout() {
    return window.matchMedia('(max-width: 900px)').matches;
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
    document.addEventListener('DOMContentLoaded', populateProgramShortcuts);
  } else {
    populateProgramShortcuts();
  }
})();
