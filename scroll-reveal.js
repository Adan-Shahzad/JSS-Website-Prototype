(function () {
  'use strict';

  var selector = [
    'main h1',
    'main h2',
    'main .eyebrow',
    'main .hero-desc',
    'main .detail-lead',
    'main .section-head p',
    'main .program-visual-head p',
    'main .program-card',
    'main .course-card',
    'main .premium-card',
    'main .outcomes-grid article',
    'main .course-module-grid article',
    'main .course-progress-grid article',
    'main .roadmap-item',
    'main .program-highlight-card'
  ].join(', ');

  function initScrollReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var elements = Array.prototype.filter.call(document.querySelectorAll(selector), function (element) {
      return !element.closest('.hero');
    });
    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (element) { element.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -32px' });

    elements.forEach(function (element, index) {
      element.classList.add('scroll-reveal');
      element.style.transitionDelay = (index % 4) * 70 + 'ms';
      observer.observe(element);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initScrollReveal);
  else initScrollReveal();
})();
