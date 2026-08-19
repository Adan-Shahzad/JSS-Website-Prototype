import { Fragment, useEffect, useState } from "react";
import "./index.css";

const LOGO_SRC = "https://www.jobskillshare.org/wp-content/uploads/LOGO.png";
const REFERRAL_URL = "https://www.jobskillshare.org/?ref=adan-shahzad#/membership";
const CONVERSION_CTA = /\b(create (?:a )?(?:free |premium )?account|log\s*in|login|membership|access plan|start .*program|start learning|watch free course|open my learning|choose premium)\b/i;
const courseSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function Header({
  onOpenLogin,
  onOpenCreateAccount,
  onNavigate,
}: {
  onOpenLogin: () => void;
  onOpenCreateAccount: () => void;
  onNavigate: (page: "home" | "programs" | "campaign") => void;
}) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          href="#"
          className="logo"
          aria-label="Tech4D Home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("home");
          }}
        >
          <img
            src={LOGO_SRC}
            alt="EdTechID logo"
            className="header-logo-img"
            onError={(e) => {
              // Fallback if network blocks external images
              e.currentTarget.style.display = "none";
              const parent = e.currentTarget.parentElement;
              if (parent && !parent.querySelector(".fallback-logo")) {
                const fallback = document.createElement("span");
                fallback.className = "fallback-logo";
                fallback.style.fontWeight = "800";
                fallback.style.fontSize = "26px";
                fallback.style.color = "#0a2540";
                fallback.innerText = "Tech4D";
                parent.appendChild(fallback);
              }
            }}
          />
        </a>
        <nav className="main-nav" aria-label="Primary">
          <a
            href="#programs"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("programs");
            }}
          >
            Programs
          </a>
          <a
            href="#courses"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("programs");
            }}
          >
            Courses
          </a>
          <a
            href="#community"
            onClick={() => {
              onNavigate("home");
            }}
          >
            Community
          </a>
          <a
            href="#campaign"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("campaign");
            }}
          >
            Campaign
          </a>
        </nav>
        <div className="header-actions">
          <button onClick={onOpenCreateAccount} className="nav-link-btn">
            Create Account
          </button>
          <button onClick={onOpenLogin} className="btn btn-primary">
            Log In
          </button>
        </div>
      </div>
    </header>
  );
}

function OrbitGraphic() {
  const pills = [
    {
      label: "Labs",
      a: "38deg",
      r: "-45%",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M9 3h6v4l4 10a2 2 0 0 1-2 3H7a2 2 0 0 1-2-3l4-10V3z" />
          <path d="M9 3h6" />
        </svg>
      ),
    },
    {
      label: "Courses",
      a: "-58deg",
      r: "-40%",
      icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      ),
    },
    {
      label: "AI Help",
      a: "118deg",
      r: "-46%",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3l1.7 4.6L18.5 9l-4.8 1.4L12 15l-1.7-4.6L5.5 9l4.8-1.4z" />
          <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z" />
        </svg>
      ),
    },
    {
      label: "Programs",
      a: "212deg",
      r: "-41%",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1.6.8L15 16.4l-3 2.4-3-2.4-3.4 2.4A1 1 0 0 1 4 18z" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <div className="orbit-stage" aria-hidden="true">
        <span className="o-ring o-ring-1" />
        <span className="o-ring o-ring-2" />
        <span className="o-ring o-ring-3" />
        <span className="o-ring o-ring-core" />

        {/* static teal accent dots */}
        <span className="o-dot" style={{ top: "12%", left: "47%" }} />
        <span className="o-dot halo" style={{ top: "27%", left: "33%" }} />
        <span className="o-dot halo" style={{ top: "31%", left: "69%" }} />
        <span className="o-dot halo" style={{ top: "51%", left: "74%" }} />
        <span className="o-dot" style={{ top: "50%", left: "19%" }} />
        <span className="o-dot" style={{ top: "61%", left: "33%" }} />
        <span className="o-dot" style={{ top: "66%", left: "61%" }} />
        <span className="o-dot halo" style={{ top: "71%", left: "54%" }} />

        <div className="jss-core">
          <div className="jss-ball">JSS</div>
        </div>

        <div className="orbit-rotator">
          {pills.map((p, i) => (
            <div
              className="o-slot"
              key={i}
              style={{ ["--a" as string]: p.a }}
            >
              <div className="o-arm" style={{ ["--r" as string]: p.r }}>
                <div
                  className="o-unrotate"
                  style={{ ["--a" as string]: p.a }}
                >
                  <div className="orbit-pill">
                    {p.icon}
                    {p.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="orbit-caption">
        <h4>One connected learning path</h4>
        <p>60,000+ members from 60+ countries</p>
        <p>Learn → Practice → Apply</p>
      </div>
    </div>
  );
}

function Hero({
  onOpenLogin,
  onOpenCreateAccount,
}: {
  onOpenLogin: () => void;
  onOpenCreateAccount: () => void;
}) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-card">
          <div>
            <div className="eyebrow">Practical Technology Training</div>
            <h1>
              Build job-ready IT skills with guided courses, labs, and
              certificates
            </h1>
            <p className="hero-desc">
              Follow structured Certificate Programs, take focused IT Courses,
              practice in guided labs, and get lesson-grounded support as you
              move from fundamentals to real workplace skills.
            </p>
            <div className="hero-buttons">
              <button
                onClick={onOpenCreateAccount}
                className="btn btn-primary btn-large"
              >
                Create Free Account
              </button>
              <a href="#programs" className="btn btn-outline btn-large">
                Explore Certificate Programs
              </a>
            </div>
            <div>
              <button onClick={onOpenLogin} className="hero-login">
                Already a member? Log In
              </button>
            </div>
            <div className="hero-features">
              <span>Start with free access</span>
              <span>Learn in a clear sequence</span>
              <span>Practice job-ready skills</span>
            </div>
          </div>
          <div>
            <OrbitGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-inner">
          <div className="stat">
            <div className="stat-num">11</div>
            <div className="stat-label">Certificate Programs</div>
          </div>
          <div className="stat">
            <div className="stat-num">34</div>
            <div className="stat-label">Modern Courses</div>
          </div>
          <div className="stat">
            <div className="stat-num">3,200</div>
            <div className="stat-label">Course Lessons</div>
          </div>
          <div className="stat">
            <div className="stat-num">
              4.8<span className="star">★</span>
            </div>
            <div className="stat-label">Across 413 Ratings</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const programs = [
  {
    popular: true,
    level: "Beginner to Intermediate",
    title: "IT Support Certificate Program",
    desc: "Build practical skills across DNS, DHCP, Active Directory through a guided sequence of 5 Courses.",
    chips: ["DNS", "DHCP", "Active Directory"],
    meta: "5 Courses · 419 Lessons",
  },
  {
    popular: true,
    level: "Intermediate",
    title: "Cybersecurity Analyst Certificate Program",
    desc: "Build practical cybersecurity skills in Security+ 701, Risk Management, Incident Response through a guided sequence of 5 Courses.",
    chips: ["Security+ 701", "Risk Management", "Incident Response"],
    meta: "5 Courses · 408 Lessons",
  },
  {
    popular: false,
    level: "Intermediate",
    title: "Systems Engineer Certificate Program",
    desc: "Build practical skills across Cisco IOS, Wireshark, Windows Server through a guided sequence of 5 Courses.",
    chips: ["Cisco IOS", "Wireshark", "Windows Server"],
    meta: "5 Courses · 589 Lessons",
  },
  {
    popular: false,
    level: "Intermediate to Advanced",
    title: "Azure Cloud Engineer Certificate Program",
    desc: "Build practical skills across Microsoft Azure, Azure Active Directory, Azure Policies through a guided sequence of 2 Courses.",
    chips: ["Microsoft Azure", "Azure Active Directory", "Azure Policies"],
    meta: "2 Courses · 292 Lessons",
  },
  {
    popular: false,
    level: "Intermediate to Advanced",
    title: "AWS Cloud Engineer Certificate Program",
    desc: "Become an AWS Certified Cloud Engineer. Master the skills needed for AWS Cloud engineering and management, gaining expertise in architectural, operational, and DevOps tools.",
    chips: ["AWS", "EC2", "Elastic Block Storage", "VPC", "S3"],
    meta: "3 Courses · 177 Lessons · 36 hours 0 min",
  },
  {
    popular: false,
    level: "Intermediate to Advanced",
    title: "Cisco Network Engineer Certificate Program",
    desc: "Become a Certified Cisco Network Engineer. Gain essential skills and hands-on experience to excel as a Cisco Network Engineer, mastering networking concepts, configurations, and security protocols.",
    chips: ["Wireshark", "Cisco IOS", "Ethernet", "DHCP", "DNS"],
    meta: "3 Courses · 286 Lessons · 68 hours 0 min",
  },
  {
    popular: false,
    level: "Beginner-friendly",
    title: "Become a Freelancer | Skills-to-Income Program",
    desc: "Transform Your Skills into a Sustainable Freelance Career. This program provides comprehensive training to help you start and grow a successful freelance business.",
    chips: ["Fiverr", "Upwork", "LinkedIn", "Dribble", "Behance"],
    meta: "2 Courses · 63 Lessons · 15 hours 0 min",
  },
  {
    popular: false,
    level: "Beginner-friendly",
    title: "Data Analytics Certificate Program",
    desc: "Transform Data into Insights with Power BI. Learn to harness the power of Microsoft Power BI to convert raw data into actionable insights and build interactive dashboards.",
    chips: ["Microsoft Power BI", "Power Query", "DAX"],
    meta: "1 Course · 46 Lessons · 5 hours 0 min",
  },
  {
    popular: false,
    level: "Beginner",
    title: "Data Science Certificate Program",
    desc: "Become proficient in Python for data science applications. Start your journey in data science by mastering Python programming, data manipulation, and foundational programming concepts.",
    chips: ["Python"],
    meta: "1 Course · 16 Lessons · 6 hours 0 min",
  },
  {
    popular: false,
    level: "Beginner to Intermediate",
    title: "AI Engineering Certificate Program",
    desc: "Unlock the World of AI with Python Expertise. Master Python programming and foundational AI engineering skills in this hands-on certificate program, designed to equip you for automation and data-driven roles.",
    chips: ["Python", "PyGame"],
    meta: "1 Course · 20 Lessons · 31 hours 0 min",
  },
  {
    popular: false,
    level: "Beginner to Intermediate",
    title: "Working as an IT Support Technician | Free Online Program",
    desc: "Build a career in IT Support with foundational skills. This program provides essential IT support skills, core technical knowledge, and professional development for aspiring IT support technicians.",
    chips: ["Windows OS", "MacOS", "Linux", "Azure", "Active Directory"],
    meta: "5 Courses · 528 Lessons · 71 hours 54 min",
  },
];

function MedalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="15" r="6" />
      <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
      <path d="M7 3h10l-1 4H8z" />
    </svg>
  );
}

function ProgramsSection() {
  return (
    <section className="section" id="programs">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Guided Career Paths</div>
            <h2>Choose your Certificate Program</h2>
          </div>
          <p>
            Follow a recommended Course sequence built around a practical
            technology career direction.
          </p>
        </div>
        <div className="programs-grid">
          {programs.map((p, i) => (
            <div className={`program-card ${p.popular ? "popular" : ""}`} key={i}>
              <div className="program-top">
                <div className="medal-icon">
                  <MedalIcon />
                </div>
                {p.popular && <span className="badge-popular">Most Popular</span>}
              </div>
              <span className="badge-level">{p.level}</span>
              <h3>{p.title}</h3>
              <p className="program-desc">{p.desc}</p>
              <div className="chip-row">
                {p.chips.map((c, j) => (
                  <span className="chip" key={j}>
                    {c}
                  </span>
                ))}
              </div>
              <div className="card-foot">
                <div className="card-meta">{p.meta}</div>
                <a href="#" className="card-link">
                  View Program Roadmap →
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="center-cta">
          <a href="#" className="btn btn-outline btn-large">
            View All Certificate Programs
          </a>
        </div>
      </div>
    </section>
  );
}

function CommunitySection({ onOpenCreateAccount }: { onOpenCreateAccount: () => void }) {
  return (
    <section className="community-section" id="community">
      <div className="container">
        <div className="community-card">
          <div>
            <div className="eyebrow">Community</div>
            <h2>Join the JobSkillShare Discord Community</h2>
            <p>
              Ask questions, follow announcements, and learn alongside other
              members building practical IT skills.
            </p>
          </div>
          <div className="discord-box">
            <div className="discord-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.369A19.79 19.79 0 0 0 16.885 3.3a.074.074 0 0 0-.079.037c-.34.607-.719 1.4-.984 2.02a18.28 18.28 0 0 0-5.487 0 12.51 12.51 0 0 0-.997-2.02.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 5.827 4.37a.07.07 0 0 0-.032.027C2.578 9.045 1.71 13.579 2.14 18.058a.083.083 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.104 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.794 8.18 1.794 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.128 12.29 12.29 0 0 1-1.873.891.077.077 0 0 0-.041.105c.36.699.772 1.364 1.225 1.993a.076.076 0 0 0 .084.029 19.83 19.83 0 0 0 6.002-3.03.077.077 0 0 0 .031-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.331c-1.182 0-2.157-1.086-2.157-2.42s.956-2.42 2.157-2.42c1.21 0 2.176 1.096 2.157 2.42 0 1.334-.956 2.42-2.157 2.42zm7.975 0c-1.183 0-2.157-1.086-2.157-2.42s.955-2.42 2.157-2.42c1.21 0 2.176 1.096 2.157 2.42 0 1.334-.946 2.42-2.157 2.42z" />
              </svg>
            </div>
            <div className="online-row">
              <span className="dot-online" />
              Members Online Now
            </div>
            <div className="online-count">87</div>
            <div className="online-name">Jobskillshare Community</div>
            <button
              onClick={onOpenCreateAccount}
              className="btn btn-primary btn-large btn-block"
            >
              Join Discord Community
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function HelperSection() {
  return (
    <section className="helper-section">
      <div className="container">
        <div className="helper-card">
          <div>
            <div className="eyebrow">Learning Path Helper</div>
            <h2>Not sure where to begin?</h2>
            <p className="lead">
              Tell us the IT role or skill you want. The helper recommends from
              JobSkillShare Programs and Courses already available.
            </p>
            <div className="helper-tags">
              <button className="tag-btn">I am new to IT</button>
              <button className="tag-btn">IT Support or Helpdesk</button>
              <button className="tag-btn">Systems &amp; networking</button>
              <button className="tag-btn">Cybersecurity</button>
              <button className="tag-btn">Cloud</button>
            </div>
          </div>
          <div className="helper-form">
            <label>What do you want to learn?</label>
            <textarea placeholder="Example: I am new to IT and want to work in IT support." />
            <button className="btn btn-primary btn-large btn-block">
              Find My Learning Path
            </button>
            <div className="empty-line" />
          </div>
        </div>
      </div>
    </section>
  );
}

const courses = [
  {
    title: "Modern IT Support Training: Part 1 | A+ (220-1102)",
    chips: ["Setting up workstations", "Software installation", "Network connectivity"],
    meta: "35 hours 54 min · 310 Lessons",
    newVersion: true,
  },
  {
    title: "Modern IT Support Training: Part 2 | A+ (220-1101)",
    chips: ["Basic networking", "Troubleshooting", "Understanding computer components"],
    meta: "12 hours 0 min · 55 Lessons",
    newVersion: true,
  },
  {
    title: "IT Support: Active Directory and Tech Skills",
    chips: ["Active Directory management", "User and group configuration", "Group policy implementation"],
    meta: "13 hours 0 min · 119 Lessons",
    newVersion: false,
  },
  {
    title: "IT Support: People Skills for IT Professionals",
    chips: ["Customer service", "Communication skills"],
    meta: "5 hours 0 min · 24 Lessons",
    newVersion: false,
  },
  {
    title: "IT Support Resume, Applying for Jobs and Communities",
    chips: ["Resume writing", "Interview prep"],
    meta: "6 hours 0 min · 20 Lessons",
    newVersion: false,
  },
  {
    title: "Advance IT Support | Modern Desktop Administrator",
    chips: ["Desktop management", "Enterprise administration"],
    meta: "25 hours 0 min · 490 Lessons",
    newVersion: false,
  },
];

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function CoursesSection({ onOpenCourse }: { onOpenCourse: (course: IndividualCourse) => void }) {
  return (
    <section className="section" id="courses">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Focused Skill Training</div>
            <h2>Explore individual IT Courses</h2>
          </div>
          <p>
            Choose a focused Course when you want to strengthen one technology
            or workplace skill.
          </p>
        </div>
        <div className="courses-grid">
          {courses.map((c, i) => (
            <div className="course-card" key={i}>
              <div className="course-top">
                <div className="play-btn">
                  <PlayIcon />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span className="free-badge">
                    <span className="check">✓</span> Free Course
                  </span>
                  {c.newVersion && (
                    <a href="#" className="new-version">
                      New version available
                    </a>
                  )}
                </div>
              </div>
              <h3>{c.title}</h3>
              <div className="chip-row">
                {c.chips.map((chip, j) => (
                  <span className="chip" key={j}>
                    {chip}
                  </span>
                ))}
              </div>
              <div className="course-meta">{c.meta}</div>
              <a href={`#course/${courseSlug(c.title)}`}
                onClick={(event) => {
                  event.preventDefault();
                  const course = individualCourses.find((course) => course.title === c.title);
                  if (course) onOpenCourse(course);
                }}
                className="btn btn-primary btn-block"
              >
                Watch Free Course →
              </a>
            </div>
          ))}
        </div>
        <div className="center-cta">
          <a href="#" className="btn btn-outline btn-large">
            View All Individual Courses
          </a>
        </div>
      </div>
    </section>
  );
}

function PremiumSection({ onOpenCreateAccount }: { onOpenCreateAccount: () => void }) {
  const features = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      title: "Course Certificates",
      desc: "Recognize completed training and learning progress.",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      ),
      title: "Hands-On Labs",
      desc: "Practice technical skills in guided environments.",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
        </svg>
      ),
      title: "AI Lesson Tutor",
      desc: "Ask lesson-grounded questions in supported Units.",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      title: "AI Career Tools",
      desc: "Get guided support for career preparation.",
      tinted: true,
    },
  ];
  return (
    <section className="premium-section">
      <div className="container">
        <div className="premium-wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">Premium Member Features</div>
              <h2>More ways to build job-ready skills</h2>
            </div>
            <p>
              Combine structured learning with practice, completion recognition,
              and targeted AI support.
            </p>
          </div>
          <div className="premium-grid">
            {features.map((f, i) => (
              <div className={`premium-card ${f.tinted ? "tinted" : ""}`} key={i}>
                <span className="premium-badge">Premium</span>
                <div className="premium-icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
          <button
            onClick={onOpenCreateAccount}
            className="btn btn-primary btn-large"
          >
            Explore Membership Options
          </button>
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section className="testimonial-section">
      <div className="container">
        <div className="testimonial-head">
          <h2>What learners say</h2>
          <div className="rating">
            4.8 <span className="star">★</span> from 413 Course ratings
          </div>
        </div>
        <div className="testimonial-card">
          <div className="stars">★ ★ ★ ★ ★</div>
          <div className="quote">
            &ldquo;It was well informative and understood the course.&rdquo;
          </div>
          <div className="quote-author">
            <div className="avatar">L</div>
            <div>
              <div className="author-name">Learner</div>
              <div className="author-sub">
                IT Support: Active Directory and Tech Skills
              </div>
            </div>
          </div>
          <div className="pagination">
            <button className="page-btn" aria-label="Previous">
              ←
            </button>
            <span className="page-count">1 / 20</span>
            <button className="page-btn" aria-label="Next">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepsSection() {
  const steps = [
    {
      title: "Choose your path",
      desc: "Start with a complete Program or one focused Course.",
    },
    {
      title: "Learn and practice",
      desc: "Build understanding through lessons, examples, and labs.",
    },
    {
      title: "Complete and apply",
      desc: "Track progress and apply your skills with greater confidence.",
    },
  ];
  return (
    <section className="section">
      <div className="container">
        <div className="section-head" style={{ marginBottom: 28 }}>
          <div>
            <div className="eyebrow">A Clear Way Forward</div>
            <h2>Turn learning into practical progress</h2>
          </div>
          <p />
        </div>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div className="step-card" key={i}>
              <div className="step-num">{i + 1}</div>
              <div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection({ onOpenCreateAccount }: { onOpenCreateAccount: () => void }) {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-card">
          <div className="eyebrow">Start Building Your IT Career</div>
          <h2>Choose a learning path and begin today</h2>
          <p>
            Learn practical technology skills through a clear, connected
            training experience.
          </p>
          <button
            onClick={onOpenCreateAccount}
            className="btn btn-primary btn-large"
          >
            Create Free Account
          </button>
        </div>
      </div>
    </section>
  );
}

function SiteFooter({ onOpenCreateAccount }: { onOpenCreateAccount: () => void }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ marginBottom: 14 }}>
              <img
                src={LOGO_SRC}
                alt="EdTechID logo"
                className="header-logo-img"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <h3>Practical IT training for real-world careers</h3>
            <p>
              Build job-ready technology skills through structured Certificate
              Programs, focused Courses, hands-on practice, and guided learning.
            </p>
            <div className="socials">
              <a href="#" className="social-btn" aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 9.71a8.5 8.5 0 0 0-.91-4.13 2.92 2.92 0 0 0-1.72-1A78 78 0 0 0 12 4.27a78 78 0 0 0-8.34.27 2.87 2.87 0 0 0-1.46.74c-.9.83-1 2.25-1.1 3.45a48.29 48.29 0 0 0 0 6.48 9.55 9.55 0 0 0 .3 2 3.14 3.14 0 0 0 .71 1.36 2.86 2.86 0 0 0 1.49.78A45.18 45.18 0 0 0 12 19.75c2.44 0 4.62 0 7.2-.18a2.88 2.88 0 0 0 1.53-.78 2.49 2.49 0 0 0 .61-1 10.58 10.58 0 0 0 .52-3.4c.04-.56.14-3.94.14-4.68zM9.74 14.85V8.66l5.92 3.11c-1.66.92-3.85 1.96-5.92 3.08z" />
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99h-2.54V12h2.54V9.8c0-2.51 1.5-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z" />
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="Discord">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.369A19.79 19.79 0 0 0 16.885 3.3a.074.074 0 0 0-.079.037c-.34.607-.719 1.4-.984 2.02a18.28 18.28 0 0 0-5.487 0 12.51 12.51 0 0 0-.997-2.02.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 5.827 4.37a.07.07 0 0 0-.032.027C2.578 9.045 1.71 13.579 2.14 18.058a.083.083 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.104 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.794 8.18 1.794 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.128 12.29 12.29 0 0 1-1.873.891.077.077 0 0 0-.041.105c.36.699.772 1.364 1.225 1.993a.076.076 0 0 0 .084.029 19.83 19.83 0 0 0 6.002-3.03.077.077 0 0 0 .031-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h5>Explore Learning</h5>
            <ul>
              <li>
                <a href="#programs">Certificate Programs</a>
              </li>
              <li>
                <a href="#courses">Individual IT Courses</a>
              </li>
              <li>
                <a href="#">Lab Catalog 2026</a>
              </li>
              <li>
                <button onClick={onOpenCreateAccount} style={{ color: "#94a3b8", fontSize: "13px" }}>
                  Premium Membership
                </button>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Member Resources</h5>
            <ul>
              <li>
                <a href="#">Open My Learning</a>
              </li>
              <li>
                <a href="#">Practice Labs</a>
              </li>
              <li>
                <button onClick={onOpenCreateAccount} style={{ color: "#94a3b8", fontSize: "13px" }}>
                  Create an Account
                </button>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact Us</h5>
            <div className="contact-block">
              <div className="contact-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div className="contact-title">Headquarters</div>
                <div className="contact-text">
                  15524 New Hampshire Ave
                  <br />
                  Silver Spring, MD 20905
                </div>
              </div>
            </div>
            <div className="contact-block">
              <div className="contact-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
              </div>
              <div>
                <div className="contact-title">Helpdesk</div>
                <div className="contact-text">support@jobskillshare.org</div>
              </div>
            </div>
            <div className="contact-block">
              <div className="contact-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M8 2v4M16 2v4M3 10h18" />
                </svg>
              </div>
              <div>
                <div className="contact-title">Business Inquiries</div>
                <div className="contact-text">sales@jobskillshare.org</div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 JobSkillShare. All rights reserved.</div>
          <div>Learn practical skills. Build career confidence.</div>
        </div>
      </div>
    </footer>
  );
}

/* ================= PROGRAMS PAGE ================= */
type ProgramFull = {
  title: string;
  subtitle: string;
  desc: string;
  courses: string;
  lessons: string;
  time: string;
  level: string;
  chips: string[];
  inDevelopment?: boolean;
};

const allPrograms: ProgramFull[] = [
  {
    title: "IT Support Certificate Program",
    subtitle: "Empower Your IT Support Career",
    desc: "Gain comprehensive skills in IT support, from networking configurations to security protocols, enhancing both technical and professional proficiencies.",
    courses: "5",
    lessons: "419",
    time: "56 hours 0 min",
    level: "Beginner to Intermediate",
    chips: ["DNS", "DHCP", "Active Directory", "Windows 11", "Ubuntu Linux"],
  },
  {
    title: "Cybersecurity Analyst Certificate Program",
    subtitle: "Advance Your Career in Cybersecurity",
    desc: "Gain essential skills and certifications for a career as a cybersecurity analyst.",
    courses: "5",
    lessons: "408",
    time: "109 hours 0 min",
    level: "Intermediate",
    chips: ["Ethernet Switching", "802.11 Standards", "Linux", "VPN", "Intrusion Detection Systems"],
  },
  {
    title: "Systems Engineer Certificate Program",
    subtitle: "Build a Solid Foundation in Systems Engineering",
    desc: "Develop critical skills in network administration, server management, and cloud services to excel as a systems engineer.",
    courses: "5",
    lessons: "589",
    time: "91 hours 39 min",
    level: "Intermediate",
    chips: ["Cisco IOS", "Wireshark", "Windows Server 2019", "Azure", "Active Directory"],
  },
  {
    title: "Azure Cloud Engineer Certificate Program",
    subtitle: "Become a Proficient Azure Cloud Engineer",
    desc: "Master the skills needed to manage and deploy robust Azure environments and advanced DevOps practices with this comprehensive certificate program.",
    courses: "2",
    lessons: "292",
    time: "45 hours 0 min",
    level: "Intermediate to Advanced",
    chips: ["Microsoft Azure", "Azure Active Directory", "Azure Policies", "Azure Storage", "Azure Kubernetes Service"],
  },
  {
    title: "AWS Cloud Engineer Certificate Program",
    subtitle: "Become an AWS Certified Cloud Engineer",
    desc: "Master the skills needed for AWS Cloud engineering and management, gaining expertise in architectural, operational, and DevOps tools.",
    courses: "3",
    lessons: "177",
    time: "36 hours 0 min",
    level: "Intermediate to Advanced",
    chips: ["AWS", "EC2", "Elastic Block Storage", "VPC", "S3"],
  },
  {
    title: "Cisco Network Engineer Certificate Program",
    subtitle: "Become a Certified Cisco Network Engineer",
    desc: "Gain essential skills and hands-on experience to excel as a Cisco Network Engineer, mastering networking concepts, configurations, and security protocols.",
    courses: "3",
    lessons: "286",
    time: "68 hours 0 min",
    level: "Intermediate to Advanced",
    chips: ["Wireshark", "Cisco IOS", "Ethernet", "DHCP", "DNS"],
  },
  {
    title: "Become a Freelancer | Skills-to-Income Program",
    subtitle: "Transform Your Skills into a Sustainable Freelance Career",
    desc: "This program provides comprehensive training to help you start and grow a successful freelance business.",
    courses: "2",
    lessons: "63",
    time: "15 hours 0 min",
    level: "Beginner-friendly",
    chips: ["Fiverr", "Upwork", "LinkedIn", "Dribble", "Behance"],
    inDevelopment: true,
  },
  {
    title: "Data Analytics Certificate Program",
    subtitle: "Transform Data into Insights with Power BI",
    desc: "Learn to harness the power of Microsoft Power BI to convert raw data into actionable insights and build interactive dashboards.",
    courses: "1",
    lessons: "46",
    time: "5 hours 0 min",
    level: "Beginner",
    chips: ["Microsoft Power BI", "Power Query", "DAX"],
    inDevelopment: true,
  },
  {
    title: "Data Science Certificate Program",
    subtitle: "Become proficient in Python for data science applications.",
    desc: "Start your journey in data science by mastering Python programming, data manipulation, and foundational programming concepts.",
    courses: "1",
    lessons: "16",
    time: "6 hours 0 min",
    level: "Beginner to Intermediate",
    chips: ["Python"],
    inDevelopment: true,
  },
  {
    title: "AI Engineering Certificate Program",
    subtitle: "Unlock the World of AI with Python Expertise",
    desc: "Master Python programming and foundational AI engineering skills in this hands-on certificate program, designed to equip you for automation and data-driven roles.",
    courses: "1",
    lessons: "20",
    time: "31 hours 0 min",
    level: "Beginner to Intermediate",
    chips: ["Python", "PyGame"],
    inDevelopment: true,
  },
  {
    title: "Working as an IT Support Technician | Free Online Program",
    subtitle: "Build a career in IT Support with foundational skills.",
    desc: "This program provides essential IT support skills, core technical knowledge, and professional development for aspiring IT support technicians.",
    courses: "5",
    lessons: "528",
    time: "71 hours 54 min",
    level: "Beginner to Intermediate",
    chips: ["Windows OS", "MacOS", "Linux", "Azure", "Active Directory"],
  },
];

function PPMedalIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="9" r="6" />
      <path d="M9 14.5L7.5 22l4.5-2.5L16.5 22 15 14.5" />
      <path d="M12 6.5l.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2L9.1 8.6l2-.3z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function LessonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M10 8.5l5 3-5 3z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

type IndividualCourse = {
  title: string;
  desc: string;
  lessons: string;
  time: string;
  free?: boolean;
  newVer?: boolean;
  chips: string[];
  bgClass: string;
};

const individualCourses: IndividualCourse[] = [
  {
    title: "IT Support: Active Directory and Tech Skills",
    desc: "Master IT support skills, focusing on Active Directory and technical applications, to excel in managing system resources and security.",
    lessons: "119",
    time: "13 hours 0 min",
    free: true,
    chips: ["Active Directory management", "User and group configuration", "Group policy implementation"],
    bgClass: "bg-1",
  },
  {
    title: "IT Support: People Skills for IT Professionals",
    desc: "Enhance your IT support role with exceptional people skills and professional communication strategies. Dive into comprehensive modules designed to improve customer interactions and workplace efficiency.",
    lessons: "24",
    time: "5 hours 0 min",
    free: true,
    chips: ["Professional communication", "Listening skills", "Conflict resolution"],
    bgClass: "bg-2",
  },
  {
    title: "IT Support Resume, Applying for Jobs and Communities",
    desc: "Create a stronger IT support resume, prepare for applications and interviews, and learn how professional communities can support your career growth.",
    lessons: "20",
    time: "6 hours 0 min",
    free: true,
    chips: ["Resume writing", "Job applications", "Interview preparation"],
    bgClass: "bg-3",
  },
  {
    title: "Microsoft 365 for IT Professionals",
    desc: "Master Microsoft 365 administration with a focus on Entra ID, Exchange Online, and PowerShell automation for IT professionals.",
    lessons: "68",
    time: "9 hours 0 min",
    chips: ["Microsoft 365 Administration", "Exchange Online Management", "PowerShell Automation"],
    bgClass: "bg-3",
  },
  {
    title: "Microsoft Azure Administrator Training (AZ-104)",
    desc: "Master the essential skills needed to effectively implement, manage, and monitor Microsoft Azure infrastructures with our comprehensive AZ-104 training course.",
    lessons: "140",
    time: "45 hours 0 min",
    chips: ["Azure Active Directory management", "Role-Based Access Control (RBAC)", "Azure storage configuration"],
    bgClass: "bg-4",
  },
  {
    title: "Microsoft Endpoint Manager Training",
    desc: "Master Microsoft Endpoint Manager and Intune to enhance your IT management skills, essential for modern IT support roles.",
    lessons: "51",
    time: "10 hours 0 min",
    chips: ["User Management", "Device Enrollment", "App Deployment"],
    bgClass: "bg-5",
  },
  {
    title: "Microsoft Exchange Online | Administrator",
    desc: "Master the administration of Microsoft Exchange Online and elevate your email management skills. Essential training for IT professionals.",
    lessons: "44",
    time: "22 hours 0 min",
    chips: ["Microsoft Exchange Online administration", "PowerShell scripting for Exchange", "Email security and compliance"],
    bgClass: "bg-1",
  },
  {
    title: "Modern IT Support Training: 220-1201 (Core 1)",
    desc: "Master essential IT support skills with the Modern IT Support Training: 220-1201 (Core 1) course.",
    lessons: "68",
    time: "12 hours 0 min",
    chips: ["Troubleshooting", "Networking", "Hardware Management"],
    bgClass: "bg-2",
  },
  {
    title: "Modern IT Support Training: 220-1202 (Core 2)",
    desc: "Gain comprehensive IT support skills with our Modern IT Support Training: 220-1202 (Core 2) course, designed for aspiring IT professionals seeking practical expertise in operating systems, network configurations, security protocols, and troubleshooting.",
    lessons: "188",
    time: "20 hours 0 min",
    chips: ["Operating System Installation", "Network Configuration", "Security Protocol Implementation"],
    bgClass: "bg-3",
  },
  {
    title: "Modern IT Support Training: Part 1 | A+ (220-1102)",
    desc: "Gain essential IT support skills with our comprehensive introduction to Modern IT support, covering Windows OS management, networking, and security.",
    lessons: "310",
    time: "35 hours 54 min",
    free: true,
    newVer: true,
    chips: ["Setting up workstations", "Software installation", "Network connectivity"],
    bgClass: "bg-4",
  },
  {
    title: "Modern IT Support Training: Part 2 | A+ (220-1101)",
    desc: "Advance your IT support skills with our comprehensive course covering computing devices, components, networking, hardware, virtualization, and troubleshooting.",
    lessons: "55",
    time: "12 hours 0 min",
    free: true,
    newVer: true,
    chips: ["Basic networking", "Troubleshooting", "Understanding computer components"],
    bgClass: "bg-5",
  },
  {
    title: "Network & Systems Administration Core Skills",
    desc: "Master the essential skills in network and systems administration to kickstart your IT career.",
    lessons: "117",
    time: "28 hours 0 min",
    chips: ["Network configuration", "System setup", "Troubleshooting"],
    bgClass: "bg-1",
  },
  {
    title: "Networking Fundamentals for Cybersecurity",
    desc: "Build a solid foundation in networking principles essential for a cybersecurity career. Gain hands-on experience and practical insights.",
    lessons: "50",
    time: "15 hours 0 min",
    free: true,
    chips: ["Networking fundamentals", "Basic network implementations", "Network operations"],
    bgClass: "bg-2",
  },
  {
    title: "Power BI Fundamentals | Certificate",
    desc: "Transform raw data into actionable insights with Power BI, mastering dashboards and data analysis from scratch.",
    lessons: "46",
    time: "5 hours 0 min",
    chips: ["Business Intelligence Fundamentals", "Data Cleaning and Transformation", "Dashboard and Visualization Creation"],
    bgClass: "bg-3",
  },
  {
    title: "Powershell Basics & Skills",
    desc: "Master PowerShell effectively in both on-premises and cloud environments with our comprehensive course designed for IT professionals.",
    lessons: "39",
    time: "14 hours 0 min",
    chips: ["PowerShell Syntax", "Command Execution", "Scripting Policies"],
    bgClass: "bg-4",
  },
  {
    title: "Python Fundamentals - AI Engineering",
    desc: "Embark on your AI career with Python, the language driving innovation in data science, software development, and automation. Master Python from scratch through self-paced lessons and real-world projects.",
    lessons: "20",
    time: "31 hours 0 min",
    chips: ["Python installation and setup", "Programming logic", "Automation script development"],
    bgClass: "bg-5",
  },
  {
    title: "Python Fundamentals for Data Science Beginners",
    desc: "Master Python fundamentals and lay the groundwork for a career in data science and automation through our practical, hands-on course.",
    lessons: "16",
    time: "6 hours 0 min",
    chips: ["Python programming", "Data manipulation", "Logical problem solving"],
    bgClass: "bg-1",
  },
  {
    title: "The Complete Freelance Playbook (Advanced Edition)",
    desc: "Master the art of freelancing with advanced strategies to build, grow, and scale a professional freelance career. Learn to create high-value services, confidently price your offerings, secure premium clients, and establish a sustainable business model.",
    lessons: "43",
    time: "11 hours 0 min",
    chips: ["Freelance business management", "High-value service creation", "Sales and negotiation"],
    bgClass: "bg-2",
  },
  {
    title: "Windows 11 for IT Support Professionals",
    desc: "Master Windows 11 to elevate your IT support skills with enhanced productivity and security features.",
    lessons: "54",
    time: "11 hours 0 min",
    chips: ["Windows 11 deployment", "Intune device management", "Security configuration"],
    bgClass: "bg-3",
  },
  {
    title: "Windows Server Administrator | Certificate",
    desc: "Master Windows Server administration with practical, real-world skills in installation, configuration, and monitoring.",
    lessons: "156",
    time: "15 hours 43 min",
    chips: ["Server Installation and Configuration", "Active Directory Management", "Group Policy Implementation"],
    bgClass: "bg-4",
  },
  {
    title: "Advance IT Support | Modern Desktop Administrator",
    desc: "Master advanced IT support skills essential for modern desktop administrators, focusing on Windows 10 environments and preparing for the MD-100 exam.",
    lessons: "490",
    time: "25 hours 0 min",
    free: true,
    chips: ["Windows 10 Administration", "Device Management", "System Security"],
    bgClass: "bg-5",
  },
  {
    title: "AI for IT Professionals - Knowledge Sharing",
    desc: "Explore AI's role within IT settings and enhance your ability to integrate AI insights into IT support, networking, cloud, and cybersecurity tasks.",
    lessons: "13",
    time: "6 hours 0 min",
    chips: ["AI Concepts", "IT Integration", "Automation"],
    bgClass: "bg-1",
  },
  {
    title: "AWS Cloud Administrator | Fundamentals",
    desc: "Master the essentials of cloud management with our AWS Cloud Administrator Fundamentals course, designed to deliver hands-on experience across key AWS services.",
    lessons: "25",
    time: "6 hours 0 min",
    chips: ["Cloud Computing Basics", "AWS Services", "Infrastructure"],
    bgClass: "bg-2",
  },
  {
    title: "AWS DevOps Engineer Certificate",
    desc: "Become a DevOps expert with our AWS DevOps Engineer Certificate. Master technologies like Docker, Terraform, Jenkins, Kubernetes, and more.",
    lessons: "100",
    time: "20 hours 0 min",
    chips: ["DevOps Implementation", "Git Version Control", "Docker Containerization"],
    bgClass: "bg-3",
  },
  {
    title: "Cisco CCNA (200-301) Networking Skills",
    desc: "Master the essential networking skills needed to pass the Cisco CCNA (200-301) exam and elevate your career.",
    lessons: "77",
    time: "10 hours 0 min",
    chips: ["Router and switch configuration", "IP addressing and subnetting", "VLAN and network segmentation"],
    bgClass: "bg-4",
  },
];

function BrowseCoursesSection({ onOpenCourse }: { onOpenCourse: (course: IndividualCourse) => void }) {
  const [filter, setFilter] = useState<"all" | "free">("all");
  const [query, setQuery] = useState("");

  const shownCourses = individualCourses.filter((c) => {
    const matchesFilter = filter === "free" ? Boolean(c.free) : true;
    const q = query.trim().toLowerCase();
    const matchesQuery = q
      ? (c.title + " " + c.desc + " " + c.chips.join(" "))
          .toLowerCase()
          .includes(q)
      : true;
    return matchesFilter && matchesQuery;
  });

  const freeCount = individualCourses.filter((c) => c.free).length;

  return (
    <div className="browse-courses" id="courses">
      <div className="bc-head">
        <div className="eyebrow">Individual Learning Options</div>
        <h2>Browse Individual IT Courses</h2>
      </div>

      <div className="bc-filters">
        <div className="bc-search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search by Course, skill, or technology"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          className={`bc-filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All Courses
        </button>
        <button
          className={`bc-filter-btn ${filter === "free" ? "active" : ""}`}
          onClick={() => setFilter("free")}
        >
          Free Courses
        </button>
        <div className="bc-count">
          <strong>
            {filter === "free" && !query.trim()
              ? freeCount
              : query.trim() || filter === "free"
                ? shownCourses.length
                : 35}
          </strong>{" "}
          approved Courses
        </div>
      </div>

      <div className="bc-grid">
        {shownCourses.length === 0 && (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              color: "#64748b",
              fontSize: 15,
              padding: "60px 20px",
              border: "1px dashed #cbd5e1",
              borderRadius: 16,
            }}
          >
            No courses match your search. Try another keyword or clear the
            filter.
          </div>
        )}
        {shownCourses.map((c, i) => (
          <div className="bc-card" key={i}>
            <div className={`bc-card-img ${c.bgClass}`}>
              <div className="bc-jss-badge">JSS</div>
            </div>
            <div className="bc-card-body">
              <div className="bc-card-eyebrow">
                <span className="bc-ce-text">JobSkillShare Course</span>
                {c.free && <span className="bc-badge-free">Free Course</span>}
                {c.newVer && <span className="bc-badge-new">New Version Available</span>}
              </div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>

              <div className="bc-meta">
                <div className="bc-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="14" rx="2" />
                    <path d="M10 8.5l5 3-5 3z" fill="currentColor" stroke="none" />
                  </svg>
                  {c.lessons} lessons
                </div>
                <div className="bc-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  {c.time}
                </div>
              </div>

              <div className="bc-chips">
                {c.chips.map((chip, j) => (
                  <span className="bc-chip" key={j}>
                    {chip}
                  </span>
                ))}
              </div>

              <a href={`#course/${courseSlug(c.title)}`} className="btn btn-primary" onClick={(event) => { event.preventDefault(); onOpenCourse(c); }}>
                View Course Details →
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="ending-banner">
        <div>
          <div className="eyebrow">Start Your Learning Path</div>
          <h2>Build practical skills with a guided membership</h2>
        </div>
        <a className="btn btn-primary" href={REFERRAL_URL}>
          Explore Membership
        </a>
      </div>
    </div>
  );
}

function CourseDetailPage({ course, onBack }: { course: IndividualCourse; onBack: () => void }) {
  return (
    <main className="program-detail-page">
      <section className="program-detail-hero">
        <div className="container">
          <div className="program-breadcrumb"><button className="sidebar-link" onClick={onBack}>Courses</button><span>›</span><span>{course.title}</span></div>
          <div className="program-detail-hero-grid">
            <div>
              <span className="program-detail-label">{course.free ? "Free Course" : "JobSkillShare Course"}</span>
              <h1>{course.title}</h1>
              <p>{course.desc}</p>
              <div className="program-detail-actions"><a className="btn btn-primary btn-large" href={REFERRAL_URL}>Enroll in this course</a><button className="btn btn-outline btn-large" onClick={onBack}>Browse all courses</button></div>
            </div>
            <aside className="program-detail-summary"><div><strong>{course.lessons}</strong><span>Lessons</span></div><div><strong>{course.time}</strong><span>Learning time</span></div><div><strong>{course.free ? "Free" : "Premium"}</strong><span>Access</span></div></aside>
          </div>
        </div>
      </section>
      <section className="program-detail-section"><div className="container program-detail-layout"><div><div className="detail-heading"><span>What you will learn</span><h2>Build practical, job-ready skills</h2></div><p className="detail-lead">This course is structured to help you understand the essentials, practise key workflows, and apply your knowledge with confidence.</p><div className="topic-chips">{course.chips.map((chip) => <span key={chip}>{chip}</span>)}</div></div><aside className="detail-sidebar"><h3>Ready to get started?</h3><p>Join JobSkillShare to access this course and begin learning.</p><a className="btn btn-primary btn-block" href={REFERRAL_URL}>Get course access</a></aside></div></section>
    </main>
  );
}

function ProgramsPage({
  onNavigateHome,
  onOpenCreateAccount,
  onOpenCourse,
}: {
  onNavigateHome: () => void;
  onOpenCreateAccount: () => void;
  onOpenCourse: (course: IndividualCourse) => void;
}) {
  return (
    <div>
      <div className="container">
        {/* Breadcrumb */}
        <div className="pp-breadcrumb">
          <span className="home-link" onClick={onNavigateHome}>
            Home
          </span>
          <span>›</span>
          <span className="current">Certificate Programs</span>
        </div>

        {/* Hero */}
        <div className="pp-hero">
          <div>
            <div className="eyebrow">Structured IT Career Paths</div>
            <h1>IT Certificate Programs and Courses for Job-Ready Skills</h1>
            <p>
              Choose a complete Certificate Program or find an individual
              Course for your next practical IT skill.
            </p>
            <div className="pp-hero-buttons">
              <a href="#pp-list" className="btn btn-primary">
                Explore Programs
              </a>
              <button onClick={onOpenCreateAccount} className="btn btn-white">
                Explore Membership
              </button>
              <a href="#pp-list" className="btn btn-white">
                Individual Courses
              </a>
              <a href="#" className="btn btn-white">
                Lab Catalog 2026 ▾
              </a>
            </div>
          </div>
          <div className="pp-hero-stats">
            <div className="pp-stat-box">
              <span className="icon">
                <PPMedalIcon />
              </span>
              <div>
                <div className="num">11</div>
                <div className="lbl">Programs</div>
              </div>
            </div>
            <div className="pp-stat-box">
              <span className="icon">
                <BookIcon />
              </span>
              <div>
                <div className="num">28</div>
                <div className="lbl">Courses in Programs</div>
              </div>
            </div>
            <div className="pp-stat-box">
              <span className="icon">
                <LessonIcon />
              </span>
              <div>
                <div className="num">2,844</div>
                <div className="lbl">Lessons</div>
              </div>
            </div>
            <div className="pp-stat-box">
              <span className="icon">
                <ClockIcon />
              </span>
              <div>
                <div className="num">535+</div>
                <div className="lbl">Learning Hours</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section head */}
        <div className="pp-section-head" id="pp-list">
          <div>
            <div className="eyebrow">Explore Learning Paths</div>
            <h2>Certificate Programs</h2>
          </div>
          <p>
            Select a Program to view its complete roadmap, courses, skills,
            technologies, and career outcomes.
          </p>
        </div>
        <div className="pp-count">
          <strong>11</strong> Certificate Programs
        </div>

        {/* Programs grid */}
        <div className="pp-grid">
          {allPrograms.map((p, i) => (
            <div className="pp-card" key={i}>
              <div className="pp-card-banner">
                <div className="pp-medal">
                  <PPMedalIcon />
                </div>
                <span className="pp-level-badge">{p.level}</span>
              </div>
              <div className="pp-card-body">
                <div className="pp-card-eyebrow">
                  <span className="ce">Certificate Program</span>
                  {p.inDevelopment && (
                    <span className="pp-dev-badge">In Development</span>
                  )}
                </div>
                <h3>{p.title}</h3>
                <div className="pp-card-sub">{p.subtitle}</div>
                <p className="pp-card-desc">{p.desc}</p>
                <div className="pp-stat-row">
                  <div className="pp-mini-stat">
                    <span className="icon">
                      <BookIcon />
                    </span>
                    <div>
                      <div className="v">{p.courses}</div>
                      <div className="l">Courses</div>
                    </div>
                  </div>
                  <div className="pp-mini-stat">
                    <span className="icon">
                      <LessonIcon />
                    </span>
                    <div>
                      <div className="v">{p.lessons}</div>
                      <div className="l">Lessons</div>
                    </div>
                  </div>
                  <div className="pp-mini-stat">
                    <span className="icon">
                      <ClockIcon />
                    </span>
                    <div>
                      <div className="v">{p.time}</div>
                      <div className="l">Learning Time</div>
                    </div>
                  </div>
                </div>
                <div className="pp-chips">
                  {p.chips.map((c, j) => (
                    <span className="pp-chip" key={j}>
                      {c}
                    </span>
                  ))}
                </div>
                <a
                  href={
                    p.title === "IT Support Certificate Program"
                      ? "../it-support-program.html"
                      : p.title === "Cybersecurity Analyst Certificate Program"
                        ? "../cybersecurity-program.html"
                        : "#"
                  }
                  className="btn btn-primary"
                >
                  Explore Program →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Premium strip */}
        <div className="pp-premium-strip">
          <div>
            <div className="eyebrow">Premium Member Features</div>
            <h3>More ways to build job-ready skills</h3>
          </div>
          <div className="pp-premium-cards">
            <div className="pp-premium-card">
              <span className="pbadge">Premium</span>
              <div className="picon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="9" r="5" />
                  <path d="M9 13l-1.5 8 4.5-2.5L16.5 21 15 13" />
                </svg>
              </div>
              <div>
                <h5>Course Certificate</h5>
                <p>Recognize your completed training</p>
              </div>
            </div>
            <div className="pp-premium-card">
              <span className="pbadge">Premium</span>
              <div className="picon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 3h6v4l4 10a2 2 0 0 1-2 3H7a2 2 0 0 1-2-3l4-10V3z" />
                </svg>
              </div>
              <div>
                <h5>Hands-On Labs</h5>
                <p>Practice skills in guided environments</p>
              </div>
            </div>
            <div className="pp-premium-card">
              <span className="pbadge">Premium</span>
              <div className="picon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <path d="M12 8l.9 1.8 2 .3-1.45 1.4.35 2L12 12.55l-1.8.95.35-2L9.1 10.1l2-.3z" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div>
                <h5>AI Lesson Tutor</h5>
                <p>Lesson-grounded help on supported Units</p>
              </div>
            </div>
          </div>
          <button onClick={onOpenCreateAccount} className="btn btn-dark">
            Explore Premium Membership →
          </button>
        </div>

        {/* Learners say */}
        <div className="pp-learners">
          <div className="pp-learners-top">
            <div>
              <div className="eyebrow">Learner Success Stories</div>
              <h2>What Learners Say</h2>
            </div>
            <div className="pp-rating-box">
              <div className="r">
                4.8 <span className="star">★</span>
              </div>
              <div className="t">Average across all Course ratings</div>
            </div>
          </div>
          <div className="pp-review-card">
            <div className="stars">★ ★ ★ ★ ★</div>
            <div className="txt">Amazing content and interesting</div>
            <span className="pp-review-chip">
              Networking Fundamentals for Cybersecurity
            </span>
            <div className="pp-review-author">
              <span className="av">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
                </svg>
              </span>
              <div>
                <div className="nm">Learner</div>
                <div className="dt">August 2, 2026</div>
              </div>
            </div>
          </div>
          <div className="pagination">
            <button className="page-btn" aria-label="Previous">
              ←
            </button>
            <span className="page-count">1 / 382</span>
            <button className="page-btn" aria-label="Next">
              →
            </button>
          </div>
          <div className="hint" style={{ marginTop: 12 }}>
            Use the arrow buttons, swipe, or keyboard arrow keys to browse
            learner reviews.
          </div>
        </div>

        <BrowseCoursesSection onOpenCourse={onOpenCourse} />
      </div>
    </div>
  );
}

/* ================= CHAT WIDGET (tawk.to style) ================= */
type ChatView = "home" | "messages" | "chat" | "email" | "name";
type ChatMsg = { from: "user" | "bot" | "system"; text: string };

function TawkIcon({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        fill="#ffffff"
        d="M12 3.1c-5 0-9 3.8-9 8.5 0 1.9.7 3.7 1.9 5.1L3.6 21l4.8-1.5c1.1.4 2.3.6 3.6.6 5 0 9-3.8 9-8.5s-4-8.5-9-8.5z"
      />
      <path
        d="M11.6 16.1c2.1.2 4-.7 5-2.3"
        stroke="#0b2748"
        strokeWidth="1.7"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 2L11 13" />
    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
  </svg>
);
const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 10.5L12 3l9 7.5" />
    <path d="M5 9.5V21h5v-6h4v6h5V9.5" />
  </svg>
);
const MsgIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const BackIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const PencilIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
  </svg>
);
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);
const SoundIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 5L6 9H2v6h4l5 4z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
  </svg>
);
const PopoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <path d="M15 3h6v6" />
    <path d="M10 14L21 3" />
  </svg>
);
const ChatSquareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const ThumbIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 10v11H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z" />
    <path d="M7 10l4.5-7a2.4 2.4 0 0 1 2.5 2.4V9h5.2a2 2 0 0 1 2 2.4l-1.4 7a2 2 0 0 1-2 1.6H7" />
  </svg>
);
const ClipIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21.4 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.2-9.19a4 4 0 0 1 5.65 5.66l-9.2 9.19a2 2 0 0 1-2.82-2.83l8.49-8.48" />
  </svg>
);
const SmileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <path d="M9 9h.01M15 9h.01" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [bubbleClosed, setBubbleClosed] = useState(false);
  const [view, setView] = useState<ChatView>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [draft, setDraft] = useState("");
  const [userName, setUserName] = useState("");
  const [emailVal, setEmailVal] = useState("");

  const openChat = () => {
    setOpen(true);
    setView("home");
    setMenuOpen(false);
  };

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setDraft("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: "Thanks for reaching out! Our AI IT Assistant is reviewing your question and will reply in a few minutes.",
        },
      ]);
    }, 700);
  };

  return (
    <div className="chat-widget">
      {open ? (
        <>
          <div className="chat-panel">
            {/* ---------- HOME ---------- */}
            {view === "home" && (
              <>
                <div className="chat-body navy">
                  <p className="chat-home-text">
                    Issues related to lab content, guide, or devices are
                    handled by practice lab support. Submit a ticket to the
                    practice lab's support from the lab portal
                  </p>
                  <button
                    className="chat-conv-card"
                    onClick={() => setView("chat")}
                  >
                    <span>
                      <span className="t">New Conversation</span>
                      <br />
                      <span className="s">We typically reply in a few minutes</span>
                    </span>
                    <span className="send">
                      <SendIcon />
                    </span>
                  </button>
                </div>
                <div className="chat-footer-nav">
                  <button className="chat-nav-btn active" aria-label="Home">
                    <HomeIcon />
                  </button>
                  <button
                    className="chat-nav-btn dim"
                    aria-label="Messages"
                    onClick={() => setView("messages")}
                  >
                    <MsgIcon />
                  </button>
                </div>
              </>
            )}

            {/* ---------- MESSAGES ---------- */}
            {view === "messages" && (
              <>
                <div className="chat-header">
                  <div className="title">
                    <button
                      className="chat-icon-btn"
                      onClick={() => setView("home")}
                      aria-label="Back"
                    >
                      <BackIcon />
                    </button>
                    Messages
                  </div>
                </div>
                <div className="chat-body">
                  <div className="chat-section-label">Start a new chat</div>
                  <button
                    className="chat-conv-card focused"
                    style={{ margin: "0 22px", width: "calc(100% - 44px)" }}
                    onClick={() => setView("chat")}
                  >
                    <span>
                      <span className="t">New Conversation</span>
                      <br />
                      <span className="s">We typically reply in a few minutes</span>
                    </span>
                    <span className="send">
                      <SendIcon />
                    </span>
                  </button>
                  <div className="chat-section-label">Recent</div>
                  <div className="chat-empty">No recent conversations</div>
                </div>
                <div className="chat-footer-nav">
                  <button
                    className="chat-nav-btn dim"
                    aria-label="Home"
                    onClick={() => setView("home")}
                  >
                    <HomeIcon />
                  </button>
                  <button className="chat-nav-btn active" aria-label="Messages">
                    <MsgIcon />
                  </button>
                </div>
              </>
            )}

            {/* ---------- CHAT ---------- */}
            {view === "chat" && (
              <>
                <div className="chat-header">
                  <button
                    className="chat-icon-btn"
                    onClick={() => {
                      setMenuOpen(false);
                      setView("home");
                    }}
                    aria-label="Back"
                  >
                    <BackIcon />
                  </button>
                  <button
                    className="chat-icon-btn"
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label="Menu"
                  >
                    <MenuIcon />
                  </button>
                </div>

                {menuOpen && (
                  <div className="chat-menu">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setView("name");
                      }}
                    >
                      <PencilIcon /> Change Name
                    </button>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setView("email");
                      }}
                    >
                      <MailIcon /> Email transcript
                    </button>
                    <button onClick={() => setMenuOpen(false)}>
                      <SoundIcon /> Sound On
                    </button>
                    <button onClick={() => setMenuOpen(false)}>
                      <PopoutIcon /> Pop out widget
                    </button>
                    <button onClick={() => setMenuOpen(false)}>
                      <ChatSquareIcon /> Add Chat to your website
                    </button>
                  </div>
                )}

                <div className="chat-body">
                  <div className="chat-thread">
                    {messages.length === 0 && (
                      <div className="chat-empty" style={{ padding: "40px 20px" }}>
                        No messages yet — start the conversation below.
                      </div>
                    )}
                    {messages.map((m, i) => (
                      <div className={`chat-msg ${m.from}`} key={i}>
                        {m.text}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="chat-input-bar">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="If our AI IT Assistant can't answer your question, leave a message with your email in this box."
                  />
                  <div className="chat-input-icons">
                    <button aria-label="Rate answer">
                      <ThumbIcon />
                    </button>
                    <button aria-label="Attach file">
                      <ClipIcon />
                    </button>
                    <button aria-label="Emoji">
                      <SmileIcon />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ---------- EMAIL TRANSCRIPT ---------- */}
            {view === "email" && (
              <>
                <div className="chat-header">
                  <button
                    className="chat-icon-btn"
                    onClick={() => setView("chat")}
                    aria-label="Back"
                  >
                    <BackIcon />
                  </button>
                  <span />
                </div>
                <div className="chat-body">
                  <div className="chat-form-wrap">
                    <div className="chat-form-card">
                      <div className="chat-form-head">
                        <span className="chat-form-icon">
                          <MailIcon />
                        </span>
                        <span className="txt">Email transcript to :</span>
                      </div>
                      <input
                        type="email"
                        placeholder="* Email"
                        value={emailVal}
                        onChange={(e) => setEmailVal(e.target.value)}
                      />
                      <div className="chat-form-actions">
                        <button
                          className="cancel"
                          onClick={() => setView("chat")}
                        >
                          Cancel
                        </button>
                        <button
                          className="confirm"
                          onClick={() => {
                            setMessages((m) => [
                              ...m,
                              {
                                from: "system",
                                text: emailVal.trim()
                                  ? `Transcript sent to ${emailVal.trim()}.`
                                  : "Please enter a valid email address.",
                              },
                            ]);
                            setEmailVal("");
                            setView("chat");
                          }}
                        >
                          <SendIcon /> Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ---------- CHANGE NAME ---------- */}
            {view === "name" && (
              <>
                <div className="chat-header">
                  <button
                    className="chat-icon-btn"
                    onClick={() => setView("chat")}
                    aria-label="Back"
                  >
                    <BackIcon />
                  </button>
                  <span />
                </div>
                <div className="chat-body">
                  <div className="chat-form-wrap">
                    <div className="chat-form-card">
                      <div className="chat-form-head">
                        <span className="chat-form-icon">
                          <PencilIcon />
                        </span>
                        <span className="txt">
                          Please change your name so we can recognize you the
                          next time.
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="* Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                      <div className="chat-form-actions">
                        <button
                          className="cancel"
                          onClick={() => setView("chat")}
                        >
                          Cancel
                        </button>
                        <button
                          className="confirm"
                          onClick={() => {
                            if (userName.trim()) {
                              setMessages((m) => [
                                ...m,
                                {
                                  from: "system",
                                  text: `You'll now be recognized as ${userName.trim()}.`,
                                },
                              ]);
                            }
                            setView("chat");
                          }}
                        >
                          <SendIcon /> Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="tawk-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 14c0-5 4-9 9-9 3 0 6 2 7 5-2-1-4-1-6 0 3 0 5 2 5 5 0 3-3 5-7 5-5 0-8-3-8-6z"
                fill="#22a06b"
              />
              <circle cx="15" cy="13" r="1.4" fill="#fff" />
            </svg>
            Powered by tawk.to
          </div>

          <button
            className="chat-btn"
            onClick={() => setOpen(false)}
            aria-label="Minimize chat"
          >
            <ChevronDownIcon />
          </button>
        </>
      ) : (
        <>
          {!bubbleClosed && (
            <div className="chat-bubble">
              <span className="close" onClick={() => setBubbleClosed(true)}>
                ×
              </span>
              Have a Question?
              <br />
              Ask Away! 👋
            </div>
          )}
          <button
            className="chat-btn"
            onClick={openChat}
            aria-label="Open chat"
          >
            <TawkIcon />
          </button>
        </>
      )}
    </div>
  );
}

/* ================= LOGIN MODAL ================= */
function LoginModal({
  isOpen,
  onClose,
  onSwitchToSignup,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}) {
  const [resetEmail, setResetEmail] = useState("");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-dialog modal-login"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="modal-eyebrow">WELCOME BACK</div>
        <h2 className="modal-title">Continue your learning</h2>
        <p className="modal-subtitle">
          Log in here and return directly to your learning portal.
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Email or username</label>
            <input
              type="text"
              className="form-input"
              placeholder=""
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-input"
              placeholder=""
              required
            />
          </div>

          <label className="checkbox-row">
            <input type="checkbox" defaultChecked />
            <span>Keep me logged in</span>
          </label>

          <button
            type="submit"
            className="btn btn-primary btn-large btn-block"
          >
            Log In &amp; Continue
          </button>
        </form>

        <div className="modal-links">
          <a
            href="#reset"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("reset-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Forgot your password?
          </a>
          <a href="#helper" onClick={onClose}>
            Need help choosing? Open Course Helper
          </a>
        </div>

        <div className="new-account-box">
          <h5>New to JobSkillShare?</h5>
          <button onClick={onSwitchToSignup}>
            Create a free or Premium account →
          </button>
        </div>

        <div className="reset-password-section" id="reset-section">
          <p>
            Enter your email or username and we will send password-reset
            instructions.
          </p>
          <div className="form-group">
            <label>Email or username</label>
            <input
              type="text"
              className="form-input"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary btn-large btn-block"
            onClick={() => alert("Password reset link sent if account exists!")}
          >
            Send Reset Email
          </button>

          <div style={{ textAlign: "center", marginTop: 14 }}>
            <a
              href="#login-top"
              onClick={(e) => {
                e.preventDefault();
                const dialog = document.querySelector(".modal-login");
                if (dialog) dialog.scrollTop = 0;
              }}
              style={{
                color: "var(--blue)",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "underline",
              }}
            >
              Back to login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= CREATE ACCOUNT / REGISTRATION MODAL ================= */
type PlanType = {
  name: string;
  price: string;
  period: string;
  badge: string;
  badgeBlue?: boolean;
  desc: string;
  features: { label: string; ai?: boolean }[];
  cta: string;
  isPaid: boolean;
};

const planOptions: PlanType[] = [
  {
    name: "Free Access",
    price: "$0.00",
    period: "3-month access",
    badge: "START FREE",
    desc: "Explore selected foundation Courses for three months.",
    features: [
      { label: "Selected free Courses" },
      { label: "Learning portal access" },
      { label: "Progress tracking" },
    ],
    cta: "Create Free Account",
    isPaid: false,
  },
  {
    name: "Premium Monthly",
    price: "$50.00",
    period: "per month",
    badge: "FLEXIBLE",
    desc: "Full learning access with monthly billing.",
    features: [
      { label: "All Certificate Programs" },
      { label: "All premium Courses" },
      { label: "Hands-on Labs and certificates" },
      { label: "AI Career Tools", ai: true },
    ],
    cta: "Choose Premium Monthly",
    isPaid: true,
  },
  {
    name: "Premium Yearly",
    price: "$549.00",
    period: "per year",
    badge: "BEST VALUE",
    badgeBlue: true,
    desc: "Build long-term skills with yearly Premium access.",
    features: [
      { label: "All Certificate Programs" },
      { label: "All premium Courses" },
      { label: "Hands-on Labs and certificates" },
      { label: "AI Career Tools", ai: true },
    ],
    cta: "Choose Premium Yearly",
    isPaid: true,
  },
];

function FlowSteps({ current }: { current: 1 | 2 | 3 }) {
  const items = ["Choose a plan", "Secure checkout", "Start learning"];
  return (
    <div className="mm-steps">
      <div className="mm-steps-row">
        {items.map((label, i) => {
          const n = i + 1;
          const done = n < current;
          const active = n === current;
          return (
            <Fragment key={label}>
              <div
                className={`mstep ${done ? "done" : active ? "active" : ""}`}
              >
                <span className="num">{done ? "✓" : n}</span>
                <span className="lbl">{label}</span>
              </div>
              {n < items.length && <div className="mstep-line" />}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

const advisorTags = [
  "I am new to IT",
  "Systems & networking",
  "Cybersecurity",
  "Cloud",
  "AI or data",
  "I want one Course",
];

function advisoryTextFor(tag: string): string {
  switch (tag) {
    case "I am new to IT":
      return "I am new to IT and want to become an IT support specialist.";
    case "Systems & networking":
      return "I want to work in systems administration and networking.";
    case "Cybersecurity":
      return "I want to build a career in cybersecurity and security analysis.";
    case "Cloud":
      return "I want to become a cloud engineer working with Azure or AWS.";
    case "AI or data":
      return "I want to work with data analysis, Python, or AI engineering.";
    default:
      return "I want to take one focused course to strengthen a single skill.";
  }
}

function CreateAccountModal({
  isOpen,
  onClose,
  onSwitchToLogin,
  onGoPrograms,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onGoPrograms: (scrollToCourses?: boolean) => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(planOptions[0]);
  const [showPassword, setShowPassword] = useState(false);
  const [regName, setRegName] = useState("");
  const [advTag, setAdvTag] = useState("");
  const [advText, setAdvText] = useState("");
  const [advResult, setAdvResult] = useState("");

  if (!isOpen) return null;

  const handleSelectPlan = (plan: PlanType) => {
    setSelectedPlan(plan);
    setStep(2);
  };

  const handleGetRecommendation = () => {
    const text = `${advTag} ${advText}`.toLowerCase();
    let rec =
      "IT Support Certificate Program → then Modern IT Support Training: Part 1 | A+ (220-1102)";
    if (
      (text.includes("network") || text.includes("systems")) &&
      !text.includes("security")
    )
      rec =
        "Systems Engineer Certificate Program → Cisco Core Networking | Packet Tracer";
    else if (text.includes("cyber") || text.includes("security"))
      rec =
        "Cybersecurity Analyst Certificate Program → Networking Fundamentals for Cybersecurity";
    else if (text.includes("azure"))
      rec =
        "Azure Cloud Engineer Certificate Program → Microsoft Azure Administrator Training (AZ-104)";
    else if (text.includes("aws") || text.includes("cloud"))
      rec =
        "AWS Cloud Engineer Certificate Program → AWS Cloud Administrator | Fundamentals";
    else if (text.includes("data") && !text.includes("science"))
      rec = "Data Analytics Certificate Program → Power BI Fundamentals | Certificate";
    else if (text.includes("science") || text.includes("ai") || text.includes("python"))
      rec = "AI Engineering Certificate Program → Python Fundamentals - AI Engineering";
    else if (text.includes("one course"))
      rec = "Advance IT Support | Modern Desktop Administrator (Free Course)";
    setAdvResult(rec);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {step === 1 ? (
        /* STEP 1: PLAN SELECTOR */
        <div
          className="modal-dialog modal-plans"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>

          <div className="mm-head">
            <div className="modal-eyebrow">JOIN JOBSKILLSHARE</div>
            <h2 className="modal-title">Choose how you want to learn</h2>
          </div>

          <FlowSteps current={1} />

          <div className="mm-body">
            <div className="mm-subhead">
              <h3>Select your membership</h3>
              <p>
                Create your account here. Membership and payment processing
                remain securely managed by{" "}
                <span className="stripe-badge">
                  <span className="stripe-icon">✓</span> Stripe
                </span>
                .
              </p>
            </div>

            <div className="plans-grid">
              {planOptions.map((plan) => (
                <div className="plan2" key={plan.name}>
                  <span
                    className={`p-badge ${plan.badgeBlue ? "blue-badge" : ""}`}
                  >
                    {plan.badge}
                  </span>
                  <h3>{plan.name}</h3>
                  <div className="price-row">
                    <span className="price">{plan.price}</span>
                    <span className="per">{plan.period}</span>
                  </div>
                  <p className="p-desc">{plan.desc}</p>
                  <ul>
                    {plan.features.map((f) => (
                      <li key={f.label} className={f.ai ? "ai-feat" : ""}>
                        <span className={f.ai ? "ai-star" : "ck"}>
                          {f.ai ? "✦" : "✓"}
                        </span>
                        {f.label}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`plan2-btn ${plan.badgeBlue ? "solid" : "soft"}`}
                    onClick={() => handleSelectPlan(plan)}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>

            <div className="mm-assure">
              <span>
                <span className="ck">✓</span> Secure checkout
              </span>
              <span>
                <span className="ck">✓</span> Access assigned automatically
              </span>
              <span>
                <span className="ck">✓</span> Existing members can return to
                login
              </span>
            </div>
          </div>
        </div>
      ) : step === 2 ? (
        /* STEP 2: REGISTRATION FORM */
        <div
          className="modal-dialog modal-register"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>

          <div className="modal-top-nav">
            <button
              className="change-plan-btn"
              onClick={() => setStep(1)}
            >
              ← Change plan
            </button>
            <div className="selected-plan-pill">
              {selectedPlan.name} - {selectedPlan.price}
            </div>
          </div>

          <div className="modal-eyebrow">JOIN JOBSKILLSHARE</div>
          <h2 className="modal-title">Complete your secure registration</h2>
          <p className="modal-subtitle">
            Create your account here. Membership and payment processing remain
            securely managed by{" "}
            <span className="stripe-badge">
              <span className="stripe-icon">✓</span> Stripe
            </span>
            .
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            {/* Account Information Box */}
            <div className="form-box">
              <div className="form-box-title">Account Information</div>

              <div className="form-group">
                <label>Username *</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Password *</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password *</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁 {showPassword ? "Hide Password" : "Show Password"}
              </button>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" className="form-input" required />
                </div>
                <div className="form-group">
                  <label>Confirm Email Address *</label>
                  <input type="email" className="form-input" required />
                </div>
              </div>

              <div className="already-account-row">
                Already have an account?
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSwitchToLogin();
                  }}
                >
                  Log in here
                </button>
              </div>
            </div>

            {/* Additional Details Box */}
            <div className="form-box" style={{ marginTop: 20 }}>
              <div className="form-box-title">Additional Details</div>

              <div className="form-group">
                <label>What are your career goals? *</label>
                <input type="text" className="form-input" required />
              </div>

              <div className="form-group">
                <label>How did you find out about jobskillshare.org? *</label>
                <input type="text" className="form-input" required />
              </div>
            </div>

            {/* Payment Information Box (paid plans only) */}
            {selectedPlan.isPaid && (
              <div className="form-box" style={{ marginTop: 20 }}>
                <div className="form-box-title">Payment Information</div>

                <div className="form-group">
                  <label>Card Number</label>
                  <div className="pay-card-wrap">
                    <input
                      type="text"
                      className="pay-input"
                      placeholder="1234 1234 1234 1234"
                      required
                    />
                    <span className="autofill-pill">
                      Autofill <span className="af-check">✓</span>
                    </span>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Expiration Date</label>
                    <input
                      type="text"
                      className="pay-input"
                      placeholder="MM / YY"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVC</label>
                    <input
                      type="text"
                      className="pay-input"
                      placeholder="CVC"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <label className="checkbox-row" style={{ marginTop: 18 }}>
              <input type="checkbox" required />
              <span>I agree to the Terms *</span>
            </label>

            <button
              type="submit"
              className="btn btn-primary btn-large btn-block"
              style={{ marginTop: 12 }}
              onClick={() => setStep(3)}
            >
              {selectedPlan.isPaid ? "Submit and Check Out" : "Submit and Confirm"}
            </button>
          </form>
        </div>
      ) : (
        /* STEP 3: WELCOME / START LEARNING */
        <div
          className="modal-dialog modal-register"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>

          <div className="mm-head">
            <div className="modal-eyebrow">JOIN JOBSKILLSHARE</div>
            <h2 className="modal-title">Welcome to JobSkillShare</h2>
          </div>

          <FlowSteps current={3} />

          <div className="wm-body">
            <div className="wm-check">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="wm-title">
              Welcome, {regName.trim() || "new member"}!
            </h3>
            <p className="wm-sub">
              Your account and membership are ready. Tell us your goal and we
              will help you choose the best place to begin.
            </p>

            <div className="advisor-box">
              <h4>JSS Learning Path Advisor</h4>
              <p className="adv-desc">
                Tell us the role or skill you want. Recommendations use the
                Programs and Courses currently published by JobSkillShare.
              </p>
              <div className="adv-tags">
                {advisorTags.map((t) => (
                  <button
                    key={t}
                    className={`adv-tag ${advTag === t ? "selected" : ""}`}
                    onClick={() => {
                      setAdvTag(t);
                      setAdvText(advisoryTextFor(t));
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="adv-row">
                <textarea
                  value={advText}
                  onChange={(e) => setAdvText(e.target.value)}
                  placeholder="Example: I am new to IT and want to become an IT support specialist."
                />
                <button className="adv-go" onClick={handleGetRecommendation}>
                  Get My Recommendation
                </button>
              </div>
              <div className="adv-result">
                {advResult && (
                  <span>
                    <span className="rec-label">Recommended: </span>
                    {advResult}
                  </span>
                )}
              </div>
            </div>

            <div className="wm-actions">
              <button
                className="a-btn a-primary"
                onClick={() => onGoPrograms(false)}
              >
                Explore Certificate Programs
              </button>
              <button
                className="a-btn a-ghost"
                onClick={() => onGoPrograms(true)}
              >
                Browse Individual Courses
              </button>
              <button
                className="a-btn a-ghost"
                onClick={() => {
                  onClose();
                  onSwitchToLogin();
                }}
              >
                Open My Learning
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CampaignPage({
  onOpenCreateAccount,
  onOpenLogin,
  onBrowsePrograms,
}: {
  onOpenCreateAccount: () => void;
  onOpenLogin: () => void;
  onBrowsePrograms: () => void;
}) {
  return (
    <main className="campaign-page">
      <section className="campaign-hero">
        <div className="campaign-grid-pattern" aria-hidden="true" />
        <div className="container campaign-hero-inner">
          <div className="campaign-copy">
            <div className="campaign-kicker"><span /> CAREER CAMPAIGN 2026</div>
            <h1>Secure systems.<br /><em>Support people.</em><br />Start your IT career.</h1>
            <p>
              Build real-world cybersecurity and IT support skills with guided training,
              hands-on practice, and career-focused learning paths.
            </p>
            <div className="campaign-actions">
              <button className="campaign-primary" onClick={onOpenCreateAccount}>Start learning free <span>→</span></button>
              <button className="campaign-secondary" onClick={onBrowsePrograms}>Explore programs</button>
            </div>
            <div className="campaign-proof"><span>✓ No experience required</span><span>✓ Learn at your pace</span></div>
          </div>
          <div className="campaign-visual">
            <div className="campaign-photo-frame">
              <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1000&q=85" alt="Cybersecurity professional working at a computer" />
              <div className="campaign-scanline" aria-hidden="true" />
            </div>
            <div className="campaign-data-card card-shield"><span className="shield-mark">⌾</span><strong>SECURE YOUR FUTURE</strong><small>Cybersecurity & IT Support</small></div>
            <div className="campaign-data-card card-path"><span>01</span><div><strong>YOUR CAREER PATH</strong><small>Starts here</small></div></div>
            <div className="campaign-orbit orbit-one" /><div className="campaign-orbit orbit-two" />
          </div>
        </div>
      </section>

      <section className="campaign-stats">
        <div className="container campaign-stats-inner">
          <p>Built for people ready to move forward</p>
          <div><strong>60K+</strong><span>Global learners</span></div>
          <div><strong>2</strong><span>Career-ready pathways</span></div>
          <div><strong>100%</strong><span>Online and flexible</span></div>
        </div>
      </section>

      <section className="campaign-pathways container">
        <div className="campaign-section-head"><span>CHOOSE YOUR DIRECTION</span><h2>Two pathways.<br />One powerful start.</h2><p>Learn the fundamentals employers rely on, then build toward the role that fits your goals.</p></div>
        <div className="campaign-path-grid">
          <article className="campaign-path cyber-path">
            <div className="path-number">01</div><div className="path-icon">◈</div>
            <p className="path-label">CYBERSECURITY</p><h3>Defend what matters.</h3>
            <p>Learn how to identify threats, protect networks, and respond with confidence.</p>
            <ul><li>Security foundations</li><li>Risk & incident response</li><li>Network security</li></ul>
            <button onClick={onBrowsePrograms}>Explore cybersecurity <span>→</span></button>
          </article>
          <article className="campaign-path support-path">
            <div className="path-number">02</div><div className="path-icon">✦</div>
            <p className="path-label">IT SUPPORT</p><h3>Keep people connected.</h3>
            <p>Develop the technical and people skills that keep modern workplaces moving.</p>
            <ul><li>Hardware & software support</li><li>Networking essentials</li><li>Professional troubleshooting</li></ul>
            <button onClick={onBrowsePrograms}>Explore IT support <span>→</span></button>
          </article>
        </div>
      </section>

      <section className="campaign-flyer-section">
        <div className="container flyer-layout">
          <div className="campaign-flyer">
            <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=85" alt="Network infrastructure for the IT support campaign" />
            <div className="flyer-overlay"><span>JOBSKILLSHARE</span><strong>YOUR NEXT<br />MOVE IS<br /><i>TECH.</i></strong><small>Cybersecurity & IT Support</small></div>
          </div>
          <div className="flyer-copy"><span>THE RIGHT SUPPORT</span><h2>Big goals deserve a clear path.</h2><p>Our courses are shaped around practical skills, clear next steps, and a community that wants to see you succeed.</p><div className="flyer-points"><div><b>01</b> Guided learning sequences</div><div><b>02</b> Practical, job-ready skills</div><div><b>03</b> Flexible access, from anywhere</div></div><button className="campaign-primary" onClick={onOpenCreateAccount}>Create your free account <span>→</span></button></div>
        </div>
      </section>

      <section className="campaign-social container">
        <div><span>SHARE THE SIGNAL</span><h2>Career momentum looks good on you.</h2></div>
        <div className="social-cards"><div className="social-card social-dark"><small>YOUR FUTURE ISN'T WAITING.</small><strong>NEITHER<br />SHOULD<br /><i>YOU.</i></strong><span>#StartInTech</span></div><div className="social-card social-photo"><img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80" alt="Learner using a laptop" /><strong>LEARN.<br />PRACTICE.<br />THRIVE.</strong></div><div className="social-card social-light"><span className="social-symbol">⌁</span><strong>TECH CAREERS<br />START WITH<br />CURIOSITY.</strong><small>JOBSKILLSHARE</small></div></div>
      </section>

      <section className="campaign-final"><div className="container"><span>YOUR NEXT CHAPTER STARTS NOW</span><h2>Bring your curiosity.<br /><i>We'll bring the path.</i></h2><div><button className="campaign-primary" onClick={onOpenCreateAccount}>Start learning free <span>→</span></button><button className="campaign-login" onClick={onOpenLogin}>Already a member? Log in</button></div></div></section>
    </main>
  );
}

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const initialCourse = individualCourses.find((course) => window.location.hash === `#course/${courseSlug(course.title)}`) || null;
  const [page, setPage] = useState<"home" | "programs" | "campaign" | "course">(initialCourse ? "course" : "campaign");
  const [selectedCourse, setSelectedCourse] = useState<IndividualCourse | null>(initialCourse);

  const navigate = (target: "home" | "programs" | "campaign") => {
    setPage(target);
    if (window.location.hash.startsWith("#course/")) window.history.replaceState(null, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const openCourse = (course: IndividualCourse) => {
    setSelectedCourse(course);
    setPage("course");
    window.location.hash = `course/${courseSlug(course.title)}`;
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    const redirectConversionCta = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const cta = target?.closest("a, button, input[type='submit'], input[type='button']");
      if (!cta || !CONVERSION_CTA.test((cta.textContent || "").trim())) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.assign(REFERRAL_URL);
    };

    document.addEventListener("click", redirectConversionCta, true);
    return () => document.removeEventListener("click", redirectConversionCta, true);
  }, []);

  return (
    <>
      <Header
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenCreateAccount={() => setIsCreateAccountOpen(true)}
        onNavigate={navigate}
      />
      {page === "campaign" ? (
        <CampaignPage
          onOpenCreateAccount={() => setIsCreateAccountOpen(true)}
          onOpenLogin={() => setIsLoginOpen(true)}
          onBrowsePrograms={() => navigate("programs")}
        />
      ) : page === "home" ? (
        <main>
          <Hero
            onOpenLogin={() => setIsLoginOpen(true)}
            onOpenCreateAccount={() => setIsCreateAccountOpen(true)}
          />
          <Stats />
          <ProgramsSection />
          <CommunitySection
            onOpenCreateAccount={() => setIsCreateAccountOpen(true)}
          />
          <HelperSection />
          <CoursesSection onOpenCourse={openCourse} />
          <PremiumSection
            onOpenCreateAccount={() => setIsCreateAccountOpen(true)}
          />
          <TestimonialSection />
          <StepsSection />
          <CtaSection
            onOpenCreateAccount={() => setIsCreateAccountOpen(true)}
          />
        </main>
      ) : page === "course" && selectedCourse ? (
        <CourseDetailPage course={selectedCourse} onBack={() => navigate("programs")} />
      ) : (
        <main>
          <ProgramsPage
            onNavigateHome={() => navigate("home")}
            onOpenCreateAccount={() => setIsCreateAccountOpen(true)}
            onOpenCourse={openCourse}
          />
        </main>
      )}
      <SiteFooter
        onOpenCreateAccount={() => setIsCreateAccountOpen(true)}
      />
      <ChatWidget />

      {/* MODALS */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignup={() => {
          setIsLoginOpen(false);
          setIsCreateAccountOpen(true);
        }}
      />

      <CreateAccountModal
        isOpen={isCreateAccountOpen}
        onClose={() => setIsCreateAccountOpen(false)}
        onSwitchToLogin={() => {
          setIsCreateAccountOpen(false);
          setIsLoginOpen(true);
        }}
        onGoPrograms={(scrollToCourses) => {
          setIsCreateAccountOpen(false);
          navigate("programs");
          if (scrollToCourses) {
            setTimeout(() => {
              document
                .querySelector(".browse-courses")
                ?.scrollIntoView({ behavior: "smooth" });
            }, 150);
          }
        }}
      />
    </>
  );
}
