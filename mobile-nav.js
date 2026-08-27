(function () {
  'use strict';

  function setupMobileNavigation() {
    var header = document.querySelector('.site-header');
    var headerInner = header && header.querySelector('.header-inner');
    var nav = header && header.querySelector('.main-nav');
    if (!header || !headerInner || !nav || header.querySelector('.mobile-nav-toggle')) return;

    var actions = header.querySelector('.header-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'header-actions';
      actions.innerHTML = '<a class="btn btn-primary" href="https://www.jobskillshare.org/?ref=adan-shahzad#/membership">Create Account</a><a class="btn btn-primary" href="https://www.jobskillshare.org/?ref=adan-shahzad#/membership">Log In</a>';
    }

    var membershipLink = nav.querySelector('.membership-nav-link');
    if (!membershipLink) {
      membershipLink = document.createElement('a');
      membershipLink.className = 'membership-nav-link';
      membershipLink.textContent = 'Membership';
      nav.appendChild(membershipLink);
    }
    if (membershipLink) {
      membershipLink.href = 'membership-plans.html';
      if ((window.location.pathname.split('/').pop() || 'index.html') === 'programs.html' &&
          new URLSearchParams(window.location.search).get('modal') === 'signup') {
        membershipLink.classList.add('active');
      }
    }

    var toggle = document.createElement('button');
    toggle.className = 'mobile-nav-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Open navigation menu');
    toggle.setAttribute('aria-controls', 'mobile-menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<svg class="hamburger-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16"></path><path d="M4 12h16"></path><path d="M4 17h16"></path></svg>';

    var menu = document.createElement('div');
    menu.className = 'mobile-menu';
    menu.id = 'mobile-menu';
    headerInner.appendChild(toggle);
    headerInner.appendChild(menu);

    function closeMenu() {
      header.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
    }

    var mobileQuery = window.matchMedia('(max-width: 950px)');
    function applyNavigationLayout() {
      if (mobileQuery.matches) {
        menu.appendChild(nav);
        menu.appendChild(actions);
      } else {
        headerInner.insertBefore(nav, toggle);
        headerInner.insertBefore(actions, toggle);
        closeMenu();
      }
    }

    toggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a, button')) closeMenu();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });
    mobileQuery.addEventListener('change', applyNavigationLayout);
    applyNavigationLayout();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupMobileNavigation);
  else setupMobileNavigation();
})();
