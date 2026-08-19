# Week 4 — Membership & Registration Page UX
### Web Development & UI/UX Internship · JobSkillShare (JSS) Prototype
**Dates:** July 27 – 31 · **Deliverable:** Prototype + change documentation

> Note: This work is an independent prototype built for review. It recreates the
> live jobskillshare.org experience from screenshots and applies the agreed
> Week 1 audit improvements. No live-site code was accessed.

---

## Monday — Revised Improvement Brief

From the Week 1 audit, **four improvements** were prioritized:

1. **Multi-step registration with a visible progress indicator.**
   The original flow dropped users into one long form. A 3-step bar
   (Choose a plan → Secure checkout → Start learning) sets expectations,
   shows progress, and reduces abandonment on a form-heavy page.

2. **Trust signals and a visible benefit list at the decision point.**
   "60,000+ members from 60+ countries", the Stripe security badge, and
   per-plan benefit checklists now appear exactly where users hesitate,
   lowering perceived risk before payment.

3. **Clearer plan comparison and transparent pricing.**
   Free Access / Premium Monthly / Premium Yearly are now differentiated
   with badges (START FREE, FLEXIBLE, BEST VALUE), inline price periods,
   and a highlighted best-value card — so the value jump to Premium is
   obvious in one glance.

4. **A post-registration guidance screen instead of a dead-end.**
   After checkout, members land on a Welcome screen with the JSS Learning
   Path Advisor, which recommends a real Program or Course based on their
   goal — converting a finished signup into an actual first learning step.

A supporting change: **progressive disclosure of payment fields** — card
inputs render only when a paid plan is selected, keeping the free path short.

## Tuesday — Membership Page Wireframe

The wireframe (implemented structure) is:

- **Header:** "Join JobSkillShare / Choose how you want to learn" + step bar.
- **Step 1:** 3 plan cards in a row, assurance row beneath
  (Secure checkout · Access assigned automatically · Existing members can return to login).
- **Step 2:** "Change plan" control + selected-plan summary on the right;
  stacked form boxes: Membership/Account Information → Additional Details →
  Payment Information (paid only) → terms checkbox → Submit and Check Out.
- **Step 3:** success check, personalized welcome, advisor box with goal
  tags + textarea + recommendation result, three exit actions.

## Wednesday — Frontend Prototype (HTML/CSS/JS)

Built as a single-page app (React + Vite, compiled to one static
`dist/index.html`), styled with one consolidated CSS file:

- Exact brand match: official `LOGO.png` from jobskillshare.org, navy/blue
  palette, full landing page (hero with animated JSS orbit, stats,
  11 certificate programs, community, helper, courses, premium, reviews,
  steps, CTA, footer) plus a dedicated **Programs/Courses page** with all
  11 programs, the premium strip, learner reviews, and a searchable,
  filterable grid of individual courses.
- The complete membership flow above, responsive down to mobile.
- Functional tawk.to-style support widget (home → messages → chat with
  dropdown menu → change-name and email-transcript forms).

## Thursday — Affiliate Integration & Conversion Flow Testing

Every entry CTA is wired and was click-tested end to end:

- **Entry points:** header "Create Account", hero "Create Free Account",
  Discord card, premium section, footer links, ending banner
  "Explore Membership" → all open the membership modal.
- **Flow test:** CTA click → plan select (selection persists as state) →
  registration → payment (paid plans only) → Submit → Welcome screen →
  "Explore Certificate Programs" / "Browse Individual Courses" correctly
  route to the Programs page (the latter auto-scrolls to the course grid).
- **Affiliate pattern:** because the selected plan travels through every
  step as state, an affiliate parameter (e.g. `?aff=`) can be attached at
  checkout without restructuring — the integration point is the plan-select
  handler and the Submit action.
- Login path also tested: "Log in here" links switch modals cleanly;
  forgot-password reset section works inside the login dialog.

## Friday — Submission

- **Files:** `index.html`, `src/App.tsx`, `src/index.css` (prototype),
  `WEEK4-REPORT.md` (this documentation).
- **What changed and why (one line each):** step bar → reduces form
  anxiety; trust signals → lowers risk at checkout; plan badges → faster
  comparison; payment-only-when-paid → shorter free signup; Welcome
  advisor → turns signup into first lesson; working filters/search →
  faster course discovery.

*Week 5 report submitted alongside.*
