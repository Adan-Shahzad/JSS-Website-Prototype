(function () {
  var reviews = [
    {
      text: 'I recommended',
      course: 'IT Support: Active Directory and Tech Skills',
      date: 'August 6, 2026'
    },
    {
      text: 'Clear, practical, and easy to follow.',
      course: 'Certificate Program learning path',
      date: 'July 28, 2026'
    },
    {
      text: 'The roadmap helped me stay focused and build confidence.',
      course: 'JobSkillShare Certificate Program',
      date: 'July 15, 2026'
    }
  ];

  function getProgramName() {
    var heading = document.querySelector('.program-detail-hero h1');
    return heading ? heading.textContent.replace(/ Certificate Program.*$/i, '') : 'this program';
  }

  function renderReview(review, index, total) {
    var programName = getProgramName();
    return '<section class="program-reviews" aria-labelledby="program-reviews-title">' +
      '<div class="container">' +
      '<div class="program-reviews-top"><div><span class="program-detail-label">Feedback across the curriculum</span><h2 id="program-reviews-title">Program Reviews</h2></div>' +
      '<div class="program-rating-box"><strong>4.8 <span aria-hidden="true">★</span></strong><small>Program average across all Course ratings</small></div></div>' +
      '<article class="program-review-card"><div class="program-review-stars" aria-label="5 out of 5 stars">★★★★★</div><p class="program-review-text">' + review.text + '</p><span class="program-review-chip">' + (review.course === 'IT Support: Active Directory and Tech Skills' ? programName + ': Active Directory and Tech Skills' : review.course) + '</span><div class="program-review-author"><span class="program-review-avatar" aria-hidden="true">●</span><div><strong>Learner</strong><small>' + review.date + '</small></div></div></article>' +
      '<div class="program-review-controls"><button type="button" class="program-review-arrow" data-review-direction="prev" aria-label="Previous review">←</button><strong>' + (index + 1) + ' / ' + total + '</strong><button type="button" class="program-review-arrow" data-review-direction="next" aria-label="Next review">→</button></div>' +
      '</div></section>';
  }

  function init() {
    var main = document.querySelector('.program-detail-page');
    if (!main || main.querySelector('.program-reviews')) return;
    var mount = document.createElement('div');
    var index = 0;
    mount.innerHTML = renderReview(reviews[index], index, reviews.length);
    var review = mount.firstElementChild;
    var cta = main.querySelector('.program-detail-cta');
    if (cta) main.insertBefore(review, cta); else main.appendChild(review);
    review.querySelector('.program-review-controls').addEventListener('click', function (event) {
      var button = event.target.closest('[data-review-direction]');
      if (!button) return;
      index = button.dataset.reviewDirection === 'next' ? (index + 1) % reviews.length : (index - 1 + reviews.length) % reviews.length;
      var replacement = document.createElement('div');
      replacement.innerHTML = renderReview(reviews[index], index, reviews.length);
      var next = replacement.firstElementChild;
      review.replaceWith(next);
      review = next;
      review.querySelector('.program-review-controls').addEventListener('click', arguments.callee);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
