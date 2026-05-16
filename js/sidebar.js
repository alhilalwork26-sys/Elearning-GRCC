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
})();
