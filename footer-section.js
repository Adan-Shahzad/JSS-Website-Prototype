(function () {
  function init() {
    var footer = document.querySelector('.site-footer');
    if (!footer) return;
    var referralUrl = 'https://www.jobskillshare.org/?ref=adan-shahzad#/membership';
    footer.innerHTML = '<div class="container"><div class="footer-grid"><div class="footer-brand"><img alt="JobSkillShare logo" class="header-logo-img" src="https://www.jobskillshare.org/wp-content/uploads/LOGO.png"><h3>Practical IT training for real-world careers</h3><p>Build job-ready technology skills through structured programs, focused courses, and guided learning.</p></div><div class="footer-col"><h5>Explore Learning</h5><ul><li><a href="programs.html">Certificate Programs</a></li><li><a href="programs.html#courses">Individual IT Courses</a></li><li><a href="index.html#community">Community</a></li></ul></div><div class="footer-col"><h5>Member Resources</h5><ul><li><a href="' + referralUrl + '">Create an Account</a></li><li><a href="' + referralUrl + '">Log In</a></li><li><a href="' + referralUrl + '">Open My Learning</a></li></ul></div><div class="footer-col"><h5>Contact Us</h5><div class="contact-text">support@jobskillshare.org</div><div class="contact-text">sales@jobskillshare.org</div></div><div class="footer-bottom"><div>© 2026 JobSkillShare. All rights reserved.</div><div>Learn practical skills. Build career confidence.</div></div></div></div>';
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
