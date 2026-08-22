(function () {
  'use strict';

  if (!document.querySelector('script[src="mobile-nav.js"]')) {
    var mobileNav = document.createElement('script');
    mobileNav.src = 'mobile-nav.js';
    document.head.appendChild(mobileNav);
  }
  if (!document.querySelector('script[src="site-content.js"]')) {
    var siteContent = document.createElement('script');
    siteContent.src = 'site-content.js';
    document.head.appendChild(siteContent);
  }

  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var referralUrl = 'programs.html?modal=signup&returnTo=' + encodeURIComponent(currentPage + window.location.search + window.location.hash);
  var conversionCta = /\b(create (?:a )?(?:free |premium )?account|log\s*in|login|membership|access plan|start .*program|start learning|watch free course|open my learning|choose premium)\b/i;

  function isMembershipNavigation(element) {
    return !!(element && element.matches && element.matches('a.membership-nav-link, a[href*="modal=signup"]'));
  }

  function isConversionCta(element) {
    if (!element || !element.matches || !element.matches('a, button, input[type="submit"], input[type="button"]')) return false;
    return conversionCta.test((element.textContent || element.value || '').trim());
  }

  function setReferralHref(element) {
    if (element && element.tagName === 'A' && isConversionCta(element) && !isMembershipNavigation(element)) {
      element.href = referralUrl;
    }
  }

  function updateLinks(root) {
    (root || document).querySelectorAll('a, button, input[type="submit"], input[type="button"]').forEach(setReferralHref);
  }

  document.addEventListener('click', function (event) {
    var cta = event.target.closest && event.target.closest('a, button, input[type="submit"], input[type="button"]');
    if (!isConversionCta(cta) || isMembershipNavigation(cta)) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.assign(referralUrl);
  }, true);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { updateLinks(); });
  else updateLinks();
})();
