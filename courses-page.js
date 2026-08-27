(function () {
  var courses = [
    ['Modern IT Support Training: 220-1201 (Core 1)', 'course-it-support-220-1201.html', 'IT Support', 'Foundations for devices, networking, and troubleshooting.'],
    ['Modern IT Support Training: 220-1202 (Core 2)', 'course-it-support-220-1202.html', 'IT Support', 'Operating systems, security, and professional support practices.'],
    ['IT Support: Active Directory and Tech Skills', 'course-active-directory-tech-skills.html', 'IT Support', 'Manage users, devices, and Windows-based environments.'],
    ['Microsoft 365 for IT Professionals', 'course-microsoft-365-it-professionals.html', 'Microsoft 365', 'Support productive teams with Microsoft 365 administration skills.'],
    ['Microsoft Azure Administrator Training (AZ-104)', 'course-azure-administrator-az-104.html', 'Cloud', 'Configure and manage Microsoft Azure environments.'],
    ['AWS Cloud Administrator | Fundamentals', 'course-aws-cloud-administrator.html', 'Cloud', 'Learn the essential AWS services and administration concepts.'],
    ['Cisco CCNA (200-301) Networking Skills', 'course-cisco-ccna-networking.html', 'Networking', 'Build routing, switching, and troubleshooting foundations.'],
    ['Networking Fundamentals for Cybersecurity', 'course-networking-fundamentals-cybersecurity.html', 'Cybersecurity', 'Understand the networking concepts that underpin secure systems.'],
    ['Power BI Fundamentals | Certificate', 'course-power-bi-fundamentals.html', 'Data Analytics', 'Turn raw data into reports, dashboards, and useful insights.'],
    ['Python Fundamentals - AI Engineering', 'course-python-ai-engineering.html', 'AI Engineering', 'Build Python foundations for automation and AI work.'],
    ['Python Fundamentals for Data Science Beginners', 'course-python-data-science.html', 'Data Science', 'Start using Python for practical data-focused work.'],
    ['The Complete Freelance Playbook (Advanced Edition)', 'course-freelance-playbook.html', 'Freelancing', 'Position your skills, attract clients, and grow your work.']
  ];
  var target = document.getElementById('course-catalog');
  if (!target) return;
  target.innerHTML = courses.map(function (course) {
    return '<article class="course-card catalog-course-card"><span class="badge-level">' + course[2] + '</span><h3>' + course[0] + '</h3><p>' + course[3] + '</p><a class="btn btn-primary btn-block" href="' + course[1] + '">View course details <span aria-hidden="true">→</span></a></article>';
  }).join('');
})();
