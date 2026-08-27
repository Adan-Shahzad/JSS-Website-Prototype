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

  var officialUrl = 'https://www.jobskillshare.org/';
  var membershipPlansUrl = 'membership-plans.html';
  var conversionCta = /\b(create (?:a )?(?:free |premium )?account|log\s*in|login|membership|access plan|start .*?(?:program|course)|start learning|watch free course|open my learning|choose premium|explore membership)\b/i;

  function isConversionCta(element) {
    if (!element || !element.matches || !element.matches('a, button, input[type="submit"], input[type="button"]')) return false;
    if (element.closest('#modals-container')) return false;
    return conversionCta.test((element.textContent || element.value || '').trim());
  }

  function destinationFor(element) {
    if (/membership/i.test((element.textContent || element.value || '').trim())) return membershipPlansUrl;
    return officialUrl;
  }

  function setReferralHref(element) {
    if (element && element.tagName === 'A' && isConversionCta(element)) {
      element.href = destinationFor(element);
    }
  }

  function updateLinks(root) {
    (root || document).querySelectorAll('a, button, input[type="submit"], input[type="button"]').forEach(setReferralHref);
  }

  document.addEventListener('click', function (event) {
    var cta = event.target.closest && event.target.closest('a, button, input[type="submit"], input[type="button"]');
    if (!isConversionCta(cta)) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.assign(destinationFor(cta));
  }, true);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { updateLinks(); });
  else updateLinks();
})();
