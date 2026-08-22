(function () {
  'use strict';

  function addFaqBeforeFooter() {
    var isHome = (window.location.pathname.split('/').pop() || 'index.html') === 'index.html';
    var footer = document.querySelector('.site-footer');
    if (!isHome || !footer || document.querySelector('.faq-section')) return;

    var section = document.createElement('section');
    section.className = 'faq-section';
    section.setAttribute('aria-labelledby', 'faq-heading');
    section.innerHTML =
      '<div class="container site-faq">' +
        '<div><span class="eyebrow">FAQs</span><h2 id="faq-heading">Questions before you begin?</h2></div>' +
        '<div><details><summary>What is included in membership?</summary><p>Membership gives you access to the learning paths and courses included in your selected plan.</p></details><details><summary>Can I start with no IT experience?</summary><p>Yes. Beginner-friendly programs start with foundations and progress in clear steps.</p></details><details><summary>Can I learn at my own pace?</summary><p>Yes. You can complete your learning on a schedule that works for you.</p></details></div>' +
      '</div>';
    footer.insertAdjacentElement('beforebegin', section);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addFaqBeforeFooter);
  else addFaqBeforeFooter();
})();
