(function () {
  'use strict';

  function addHomepageContent() {
    var isHome = (window.location.pathname.split('/').pop() || 'index.html') === 'index.html';
    var stats = document.querySelector('.stats');
    if (!isHome || !stats || document.querySelector('.site-trust-section')) return;

    var section = document.createElement('section');
    var plansHref = 'membership-plans.html';
    section.className = 'site-trust-section';
    section.id = 'membership';
    section.innerHTML =
      '<div class="container">' +
        '<div class="site-trust-intro"><div><span class="eyebrow">Why JobSkillShare</span><h2>One membership. A clearer path into IT.</h2><p>Choose a program, learn at your pace, and build practical skills with structured courses, labs, and career-focused guidance.</p></div><a class="btn btn-primary membership-nav-link" href="' + plansHref + '">View membership plans</a></div>' +
        '<div class="membership-metrics"><div><strong>60,000+</strong><span>members learning with JSS</span></div><div><strong>120+</strong><span>countries represented</span></div><div><strong>3,200+</strong><span>practical course lessons</span></div></div>' +
        '<div class="site-value-grid"><article><h3>Structured learning</h3><p>Follow a guided program or choose a single course that fits your next goal.</p></article><article><h3>Practical skills</h3><p>Learn technology concepts and workflows that connect directly to real IT work.</p></article><article><h3>Career momentum</h3><p>Build confidence step by step, from your first lesson to your next opportunity.</p></article></div>' +
      '</div>';
    stats.insertAdjacentElement('afterend', section);

    var primaryCta = document.querySelector('.hero-buttons .btn-primary');
    if (primaryCta && primaryCta.tagName === 'BUTTON') {
      var membershipCta = document.createElement('a');
      membershipCta.className = primaryCta.className + ' membership-nav-link';
      membershipCta.href = plansHref;
      membershipCta.textContent = 'View membership plans';
      primaryCta.replaceWith(membershipCta);
    }
  }

  function ensureMembershipNavigation() {
    var nav = document.querySelector('.site-header .main-nav');
    if (!nav || nav.querySelector('.membership-nav-link')) return;
    var link = document.createElement('a');
    link.className = 'membership-nav-link';
    link.href = 'membership-plans.html';
    link.textContent = 'Membership';
    nav.appendChild(link);
  }

  function rememberMembershipOrigin() {
    document.querySelectorAll('.membership-nav-link').forEach(function (link) {
      if (link.dataset.membershipOriginBound) return;
      link.dataset.membershipOriginBound = 'true';
      link.addEventListener('click', function () {
        var href = link.getAttribute('href') || '';
        var returnMatch = href.match(/[?&]returnTo=([^&]+)/);
        if (returnMatch) sessionStorage.setItem('membershipReturnTo', decodeURIComponent(returnMatch[1]));
      });
    });
  }

  function addProgramFilters() {
    var count = document.querySelector('.pp-count');
    var grid = document.querySelector('.pp-grid');
    if (!count || !grid || document.querySelector('.pp-catalog-tools')) return;

    var tools = document.createElement('div');
    tools.className = 'pp-catalog-tools';
    tools.setAttribute('role', 'search');
    tools.innerHTML = '<label class="pp-search"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.3-4.3"></path></svg><input type="search" placeholder="Search programs by role, skill, or technology" aria-label="Search certificate programs"></label><div class="pp-filter-buttons" aria-label="Filter programs by level"><button type="button" class="pp-filter-btn active" data-filter="all">All levels</button><button type="button" class="pp-filter-btn" data-filter="beginner">Beginner</button><button type="button" class="pp-filter-btn" data-filter="intermediate">Intermediate+</button></div>';
    count.parentNode.insertBefore(tools, count);

    var input = tools.querySelector('input');
    var buttons = Array.prototype.slice.call(tools.querySelectorAll('button'));
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.pp-card'));
    var activeFilter = 'all';
    var empty = document.createElement('p');
    empty.className = 'pp-no-results';
    empty.textContent = 'No programs match your search. Try another skill or level.';
    empty.hidden = true;
    grid.appendChild(empty);

    function filterPrograms() {
      var query = input.value.toLowerCase().trim();
      var matches = 0;
      cards.forEach(function (card) {
        var text = card.textContent.toLowerCase();
        var level = (card.querySelector('.pp-level-badge') || {}).textContent || '';
        var matchesQuery = !query || text.indexOf(query) !== -1;
        var matchesLevel = activeFilter === 'all' || (activeFilter === 'beginner' ? level.toLowerCase().indexOf('beginner') !== -1 : level.toLowerCase().indexOf('intermediate') !== -1);
        var match = matchesQuery && matchesLevel;
        card.hidden = !match;
        card.style.display = match ? '' : 'none';
        if (match) matches += 1;
      });
      count.innerHTML = '<strong>' + matches + '</strong> Certificate Program' + (matches === 1 ? '' : 's');
      empty.hidden = matches !== 0;
    }
    input.addEventListener('input', filterPrograms);
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        activeFilter = button.dataset.filter;
        buttons.forEach(function (item) { item.classList.toggle('active', item === button); });
        filterPrograms();
      });
    });
  }

  function init() {
    ensureMembershipNavigation();
    addHomepageContent();
    rememberMembershipOrigin();
    addProgramFilters();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
