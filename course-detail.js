(function () {
  if (!document.querySelector('script[src="mobile-nav.js"]')) {
    var mobileNav = document.createElement('script');
    mobileNav.src = 'mobile-nav.js';
    document.head.appendChild(mobileNav);
  }

  var courseKey = window.COURSE_KEY || new URLSearchParams(window.location.search).get('course');
  var courses = {
    'active-directory-tech-skills': ['IT Support: Active Directory and Tech Skills', 'IT Support', 'Build practical skills for managing users, devices, and core Windows-based IT environments.'],
    'people-skills-it-professionals': ['IT Support: People Skills for IT Professionals', 'IT Support', 'Develop the communication, service, and problem-solving habits used by trusted IT professionals.'],
    'it-support-resume-careers': ['IT Support Resume, Applying for Jobs and Communities', 'IT Career Readiness', 'Prepare a professional resume, job-search approach, and community connections for your IT career.'],
    'microsoft-365-it-professionals': ['Microsoft 365 for IT Professionals', 'Microsoft 365', 'Learn the Microsoft 365 tools and administration concepts used to support productive teams.'],
    'azure-administrator-az-104': ['Microsoft Azure Administrator Training (AZ-104)', 'Microsoft Azure', 'Build the cloud administration knowledge needed to configure and manage Azure environments.'],
    'microsoft-endpoint-manager': ['Microsoft Endpoint Manager Training', 'Endpoint Management', 'Learn how to manage, protect, and support modern workplace devices.'],
    'exchange-online-administrator': ['Microsoft Exchange Online | Administrator', 'Microsoft Exchange Online', 'Develop the skills to administer mail, users, and collaboration settings in Exchange Online.'],
    'it-support-220-1201': ['Modern IT Support Training: 220-1201 (Core 1)', 'IT Support', 'Build foundational knowledge of modern devices, networking, and troubleshooting.'],
    'it-support-220-1202': ['Modern IT Support Training: 220-1202 (Core 2)', 'IT Support', 'Strengthen your support skills with operating systems, security, and professional practices.'],
    'it-support-a-plus-220-1102': ['Modern IT Support Training: Part 1 | A+ (220-1102)', 'IT Support', 'Learn practical troubleshooting, operating system, and support essentials.'],
    'it-support-a-plus-220-1101': ['Modern IT Support Training: Part 2 | A+ (220-1101)', 'IT Support', 'Build core knowledge of hardware, networking, and modern IT support workflows.'],
    'network-systems-administration': ['Network & Systems Administration Core Skills', 'Systems Administration', 'Learn the networking and systems concepts that keep business infrastructure reliable.'],
    'networking-fundamentals-cybersecurity': ['Networking Fundamentals for Cybersecurity', 'Cybersecurity', 'Understand the network concepts that support secure systems and effective threat analysis.'],
    'power-bi-fundamentals': ['Power BI Fundamentals | Certificate', 'Data Analytics', 'Turn raw information into clear reports, dashboards, and practical business insights.'],
    'powershell-basics': ['Powershell Basics & Skills', 'PowerShell', 'Learn command-line and scripting foundations for efficient IT administration.'],
    'python-ai-engineering': ['Python Fundamentals - AI Engineering', 'AI Engineering', 'Build Python foundations for automation, problem solving, and AI engineering work.'],
    'python-data-science': ['Python Fundamentals for Data Science Beginners', 'Data Science', 'Start using Python to solve problems and prepare for data-focused work.'],
    'freelance-playbook': ['The Complete Freelance Playbook (Advanced Edition)', 'Freelancing', 'Create a practical strategy for positioning your skills, attracting clients, and growing your work.'],
    'windows-11-it-support': ['Windows 11 for IT Support Professionals', 'IT Support', 'Support and configure Windows 11 devices with confidence.'],
    'windows-server-administrator': ['Windows Server Administrator | Certificate', 'Windows Server', 'Learn core Windows Server installation, configuration, and administration skills.'],
    'advanced-it-support-desktop-admin': ['Advance IT Support | Modern Desktop Administrator', 'IT Support', 'Advance your Windows device management and modern desktop administration skills.'],
    'ai-it-professionals': ['AI for IT Professionals - Knowledge Sharing', 'AI for IT', 'Explore practical ways AI can support IT workflows, documentation, and knowledge sharing.'],
    'aws-cloud-administrator': ['AWS Cloud Administrator | Fundamentals', 'AWS Cloud', 'Learn essential AWS services and the foundations of cloud administration.'],
    'aws-devops-engineer': ['AWS DevOps Engineer Certificate', 'AWS DevOps', 'Build the automation, delivery, and cloud operations skills used by DevOps teams.'],
    'cisco-ccna-networking': ['Cisco CCNA (200-301) Networking Skills', 'Cisco Networking', 'Learn routing, switching, addressing, and troubleshooting foundations for Cisco networks.']
  };
  var c = courses[courseKey];
  if (!c) { window.location.replace('programs.html#courses'); return; }
  document.title = c[0] + ' | JobSkillShare';
  var signup = 'https://www.jobskillshare.org/?ref=adan-shahzad#/membership';
  var headerInner = document.querySelector('.site-header .header-inner');
  if (headerInner && !headerInner.querySelector('.header-actions')) {
    var headerActions = document.createElement('div');
    headerActions.className = 'header-actions';
    headerActions.innerHTML = '<a class="btn btn-primary" href="programs.html?modal=signup">Create Account</a><a class="btn btn-outline header-login" href="programs.html?modal=login">Log In</a>';
    headerInner.appendChild(headerActions);
  }
  document.getElementById('course-page').innerHTML = '<section class="course-detail-hero"><div class="container"><div class="course-breadcrumb"><a href="index.html">Home</a><span>›</span><a href="programs.html#courses">Courses</a><span>›</span><span>' + c[0] + '</span></div><div class="course-detail-grid"><div><span class="course-label">Individual Course</span><h1>' + c[0] + '</h1><p>' + c[2] + '</p><div class="course-actions"><a class="btn btn-primary btn-large" href="' + signup + '">Start this course</a><a class="btn btn-outline btn-large" href="#curriculum">Explore what you will learn</a></div></div><aside class="course-summary"><span>FOCUSED LEARNING</span><strong>' + c[1] + '</strong><p>Self-paced lessons with practical, career-relevant skills.</p></aside></div></div></section><section class="course-detail-section"><div class="container course-detail-layout"><div><div class="detail-heading"><span>About this course</span><h2>Build practical ' + c[1] + ' skills</h2></div><p class="detail-lead">This standalone course gives you a focused way to develop useful skills at your own pace. Lessons are designed to help you understand the essentials, apply them in realistic situations, and make progress toward your learning goal.</p><div class="outcomes-grid"><article><h3>Understand the essentials</h3><p>Learn the core concepts, terminology, and workflows that create a solid foundation.</p></article><article><h3>Apply your knowledge</h3><p>Connect new information to practical examples and common workplace scenarios.</p></article><article><h3>Build confidence</h3><p>Progress through structured lessons that make the next step easier to take.</p></article><article><h3>Keep moving forward</h3><p>Use this focused course on its own or as part of a broader learning path.</p></article></div></div><aside class="detail-sidebar"><h3>Course format</h3><ul><li>Self-paced online lessons</li><li>Practical, focused learning</li><li>Career-relevant topics</li><li>Accessible from your learning portal</li></ul><a class="btn btn-primary btn-block" href="' + signup + '">Choose access</a></aside></div></section><section id="curriculum" class="course-detail-section detail-surface"><div class="container"><div class="detail-heading"><span>Course curriculum</span><h2>A clear, focused learning experience</h2><p>Work through the lessons in order to build understanding and put each new concept into context.</p></div><div class="course-module-grid"><article><span>01</span><h3>Foundations</h3><p>Start with the concepts and vocabulary you need for the rest of the course.</p></article><article><span>02</span><h3>Core skills</h3><p>Develop the practical knowledge used in common ' + c[1] + ' tasks.</p></article><article><span>03</span><h3>Real-world application</h3><p>Connect the material to realistic workplace scenarios and next steps.</p></article></div></div></section><section class="course-detail-cta"><div class="container"><div><span>Ready to begin?</span><h2>Start learning ' + c[1] + ' today.</h2><p>Create an account to access your learning path.</p></div><a class="btn btn-primary btn-large" href="' + signup + '">Start this course</a></div></section>';
  var breadcrumb = document.querySelector('.course-breadcrumb');
  var hero = document.querySelector('.course-detail-hero');
  if (breadcrumb && hero) {
    var courseBar = document.createElement('section');
    courseBar.className = 'course-catalog-bar';
    var barContainer = document.createElement('div');
    barContainer.className = 'container';
    breadcrumb.setAttribute('aria-label', 'Breadcrumb');
    barContainer.appendChild(breadcrumb);
    courseBar.appendChild(barContainer);
    hero.parentNode.insertBefore(courseBar, hero);
  }
})();

(function () {
  var script = document.createElement('script');
  script.src = 'scroll-reveal.js';
  document.body.appendChild(script);
})();

(function () {
  var page = document.getElementById('course-page');
  var cta = page && page.querySelector('.course-detail-cta');
  if (!cta) return;

  var courseTitle = page.querySelector('.course-detail-hero h1').textContent;
  var subject = page.querySelector('.course-summary strong').textContent;
  var details = '<section class="course-progress-section"><div class="container"><div class="course-section-intro"><span>Learning experience</span><h2>Designed for practical progress</h2><p>' + courseTitle + ' is structured to help you build momentum and turn new knowledge into useful skills.</p></div><div class="course-progress-grid"><article><div class="course-step-number">01</div><h3>Learn in clear steps</h3><p>Short, focused lessons make it easier to understand each idea before moving forward.</p></article><article><div class="course-step-number">02</div><h3>Connect skills to work</h3><p>Use realistic examples to see how ' + subject + ' knowledge is applied in everyday roles.</p></article><article><div class="course-step-number">03</div><h3>Keep building</h3><p>Finish with a stronger foundation and a clear next step for your learning path.</p></article></div></div></section><section class="course-resources-section"><div class="container course-resources-layout"><div><div class="course-section-intro"><span>Built around your goals</span><h2>Useful beyond the final lesson</h2></div><div class="course-benefits-list"><div><strong>Flexible learning</strong><p>Study from your learning portal when it works for your schedule.</p></div><div><strong>Career-relevant focus</strong><p>Strengthen skills that connect directly to modern ' + subject + ' work.</p></div><div><strong>Part of a bigger path</strong><p>Pair this course with related training when you are ready for the next challenge.</p></div></div></div><aside class="course-faq"><h3>Questions before you start?</h3><details open><summary>Who is this course for?</summary><p>It is designed for learners who want a focused way to build practical ' + subject + ' knowledge.</p></details><details><summary>Can I learn at my own pace?</summary><p>Yes. Your learning is self-paced, so you can work through the lessons on a schedule that suits you.</p></details><details><summary>What should I do after finishing?</summary><p>Continue with a related course or choose a certificate program to develop a broader skill set.</p></details></aside></div></section>';
  cta.insertAdjacentHTML('beforebegin', details);
})();
