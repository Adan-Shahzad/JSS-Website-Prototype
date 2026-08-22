(function () {
  'use strict';

  var covers = {
    cybersecurity: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
    cloud: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    networking: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    data: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    programming: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
    server: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    support: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    career: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80'
  };

  var courseCovers = {
    'IT Support: Active Directory and Tech Skills': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    'IT Support: People Skills for IT Professionals': 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
    'Microsoft 365 for IT Professionals': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    'Microsoft Azure Administrator Training (AZ-104)': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    'Microsoft Endpoint Manager Training': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    'Microsoft Exchange Online | Administrator': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    'Modern IT Support Training: 220-1201 (Core 1)': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'Modern IT Support Training: 220-1202 (Core 2)': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    'Modern IT Support Training: Part 1 | A+ (220-1102)': 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80',
    'Modern IT Support Training: Part 2 | A+ (220-1101)': 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    'Network & Systems Administration Core Skills': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    'Networking Fundamentals for Cybersecurity': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
    'Power BI Fundamentals | Certificate': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    'Powershell Basics & Skills': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    'Python Fundamentals - AI Engineering': 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
    'Python Fundamentals for Data Science Beginners': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    'The Complete Freelance Playbook (Advanced Edition)': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    'Windows 11 for IT Support Professionals': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    'Windows Server Administrator | Certificate': 'https://images.unsplash.com/photo-1560732488-6b0df240254a?auto=format&fit=crop&w=1200&q=80',
    'Advance IT Support | Modern Desktop Administrator': 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1200&q=80',
    'AI for IT Professionals - Knowledge Sharing': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    'AWS Cloud Administrator | Fundamentals': 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=1200&q=80',
    'AWS DevOps Engineer Certificate': 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
    'Cisco CCNA (200-301) Networking Skills': 'https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=1200&q=80'
  };

  function categoryFor(title) {
    var text = title.toLowerCase();
    if (/cyber|security|risk|incident/.test(text)) return 'cybersecurity';
    if (/aws|azure|cloud|devops|kubernetes|terraform/.test(text)) return 'cloud';
    if (/cisco|network|ccna|router|switch|wireshark/.test(text)) return 'networking';
    if (/power bi|data science|analytics|business intelligence/.test(text)) return 'data';
    if (/python|powershell|ai engineering|artificial intelligence/.test(text)) return 'programming';
    if (/server|active directory|exchange|microsoft 365|endpoint/.test(text)) return 'server';
    if (/resume|freelance|people skills|career/.test(text)) return 'career';
    return 'support';
  }

  function addCovers() {
    document.querySelectorAll('.bc-card').forEach(function (card) {
      var title = (card.querySelector('h3') || {}).textContent || 'IT course';
      var cover = card.querySelector('.bc-card-img');
      if (!cover || cover.querySelector('img')) return;
      var image = document.createElement('img');
      image.src = courseCovers[title.trim()] || covers[categoryFor(title)];
      image.alt = title.trim() + ' course cover';
      image.loading = 'lazy';
      cover.insertBefore(image, cover.firstChild);
    });

    document.querySelectorAll('.course-card').forEach(function (card) {
      if (card.querySelector('.course-card-visual')) return;
      var title = (card.querySelector('h3') || {}).textContent || 'IT course';
      var visual = document.createElement('div');
      var image = document.createElement('img');
      visual.className = 'course-card-visual';
      image.src = courseCovers[title.trim()] || covers[categoryFor(title)];
      image.alt = title.trim() + ' course cover';
      image.loading = 'lazy';
      visual.appendChild(image);
      card.insertBefore(visual, card.firstChild);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addCovers);
  else addCovers();
})();
