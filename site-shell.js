(function () {
  'use strict';

  // Dedicated membership-plan page used by the primary navigation.
  var membershipUrl = 'membership-plans.html';
  var officialUrl = 'https://www.jobskillshare.org/';
  var page = window.location.pathname.split('/').pop() || 'index.html';
  var communityInView = false;

  function updateActiveNavLink() {
    var nav = document.querySelector('.site-header .main-nav');
    if (!nav) return;
    var communityIsOpen = page === 'index.html' && (window.location.hash === '#community' || communityInView);
    var membershipIsOpen = page === 'membership-plans.html' ||
      Array.prototype.some.call(document.querySelectorAll('#create-account-modal-wrapper, #create-account-step2-wrapper, #create-account-step3-wrapper'), function (modal) {
        return window.getComputedStyle(modal).display !== 'none';
      });

    nav.querySelectorAll('a').forEach(function (link) {
      var href = link.getAttribute('href');
      link.classList.toggle('active',
        (page === 'programs.html' && href === 'programs.html') ||
        (page === 'courses.html' && href === 'courses.html') ||
        (href === 'index.html#community' && communityIsOpen) ||
        (href === membershipUrl && membershipIsOpen)
      );
    });
  }

  function makeHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var nav = header.querySelector('.main-nav');
    if (!nav) return;
    nav.innerHTML = '<a href="programs.html">Programs</a><a href="courses.html">Courses</a><a href="index.html#community">Community</a><a href="' + membershipUrl + '" class="membership-nav-link">Membership plans</a>';
    updateActiveNavLink();

    var actions = header.querySelector('.header-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'header-actions';
      header.querySelector('.header-inner').appendChild(actions);
    }
    actions.innerHTML = '<a class="btn btn-outline header-login" href="' + officialUrl + '">Log in</a><a class="btn btn-primary" href="' + officialUrl + '">Start learning</a>';
  }

  function makeFooter() {
    var footer = document.querySelector('.site-footer');
    if (!footer) {
      footer = document.createElement('footer');
      footer.className = 'site-footer';
      document.body.appendChild(footer);
    }
    footer.innerHTML = '<div class="container"><div class="footer-grid"><div class="footer-brand"><a href="index.html" class="footer-logo"><img alt="JobSkillShare" class="header-logo-img" src="https://www.jobskillshare.org/wp-content/uploads/LOGO.png" loading="lazy"></a><h3>Practical IT training for real-world careers</h3><p>Build job-ready technology skills through structured programs and focused courses.</p></div><div class="footer-col"><h5>Explore</h5><ul><li><a href="programs.html">Certificate Programs</a></li><li><a href="courses.html">Individual Courses</a></li><li><a href="index.html#community">Community</a></li></ul></div><div class="footer-col"><h5>Get started</h5><ul><li><a href="' + membershipUrl + '">Membership plans</a></li><li><a href="' + officialUrl + '">Create an account</a></li><li><a href="' + officialUrl + '">Open my learning</a></li></ul></div><div class="footer-col"><h5>Contact</h5><ul><li><a href="mailto:support@jobskillshare.org">support@jobskillshare.org</a></li><li><a href="mailto:sales@jobskillshare.org">sales@jobskillshare.org</a></li></ul></div></div><div class="footer-bottom"><div>&copy; 2026 JobSkillShare. All rights reserved.</div><div>Learn practical skills. Build career confidence.</div></div></div>';
  }

  function repairLinks() {
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      if (link.closest('.program-card, .pp-card')) return;
      link.href = officialUrl;
    });
    document.querySelectorAll('a, button').forEach(function (item) {
      var label = (item.textContent || '').trim();
      var isMembershipPlansCta = label === 'View membership plans' ||
        label === 'Explore Membership Options' ||
        label === 'Explore Membership';
      if (!isMembershipPlansCta) return;
      if (item.tagName === 'A') {
        item.href = membershipUrl;
        item.classList.add('membership-nav-link');
        return;
      }
      if (item.dataset.membershipPlansBound) return;
      item.dataset.membershipPlansBound = 'true';
      item.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        window.location.assign(membershipUrl);
      }, true);
    });
    document.querySelectorAll('.hero-buttons .btn-primary, .hero-login, .ending-banner .btn, .btn-plan-solid, .btn-plan-ghost').forEach(function (item) {
      if (item.tagName === 'A') item.href = /membership/i.test(item.textContent) ? membershipUrl : officialUrl;
    });
    document.querySelectorAll('.center-cta a[href*="#courses"]').forEach(function (link) { link.href = 'courses.html'; });
    var discordButton = Array.prototype.find.call(document.querySelectorAll('button, a'), function (item) {
      return item.textContent.trim() === 'Join Discord Community';
    });
    if (discordButton) {
      discordButton.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        window.location.assign('https://discord.com/');
      }, true);
      var count = document.querySelector('.online-count');
      var label = document.querySelector('.online-row');
      if (count) count.textContent = '60,000+';
      if (label) label.textContent = 'Members worldwide';
    }
  }

  function init() {
    if (!document.querySelector('link[rel="icon"]')) {
      var favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/svg+xml';
      favicon.href = 'favicon.svg';
      document.head.appendChild(favicon);
    }
    makeHeader();
    makeFooter();
    repairLinks();
    window.addEventListener('hashchange', updateActiveNavLink);
    if (page === 'index.html') {
      var community = document.getElementById('community');
      if (community && 'IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          communityInView = entries[0].isIntersecting;
          updateActiveNavLink();
        }, { threshold: 0.35 }).observe(community);
      }
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
