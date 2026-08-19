const fs = require('fs');

const chatBubbleCSS = `<style id="chat-bubble-style">
#chat-bubble-widget { position: fixed; bottom: 24px; right: 24px; z-index: 9998; display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
#chat-bubble-widget .chat-bubble { background: #fff; border-radius: 20px; padding: 8px 16px; box-shadow: 0 2px 12px rgba(0,0,0,.15); display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #1e293b; }
#chat-bubble-widget .chat-bubble .close { cursor: pointer; color: #94a3b8; font-size: 12px; }
#chat-bubble-widget .chat-btn { background:#1e40af; border:none; border-radius:50%; width:56px; height:56px; cursor:pointer; box-shadow:0 4px 16px rgba(0,0,0,.25); display:flex; align-items:center; justify-content:center; transition: transform .15s; }
#chat-bubble-widget .chat-btn:hover { transform: scale(1.08); }
</style>`;

const chatBubble = `<div id="chat-bubble-widget" class="chat-widget">
  <div class="chat-bubble">
    <span class="close" aria-label="Close">✕</span>
    <span class="chat-bubble-text">Chat with us</span>
  </div>
  <button class="chat-btn" aria-label="Open chat">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  </button>
</div>`;

const modalsBlock = `<div id="modals-container">
  <!-- LOGIN MODAL -->
  <div id="login-modal-wrapper" style="display: none;">
    <div class="modal-overlay"><div class="modal-dialog modal-login"><button class="modal-close-btn" aria-label="Close modal">&#x2715;</button><div class="modal-eyebrow">WELCOME BACK</div><h2 class="modal-title">Continue your learning</h2><p class="modal-subtitle">Log in here and return directly to your learning portal.</p><form><div class="form-group"><label>Email or username</label><input type="text" class="form-input" placeholder="" required/></div><div class="form-group"><label>Password</label><input type="password" class="form-input" placeholder="" required/></div><label class="checkbox-row"><input type="checkbox" checked/><span>Keep me logged in</span></label><button type="submit" class="btn btn-primary btn-large btn-block">Log In &amp; Continue</button></form><div class="modal-links"><a href="#reset">Forgot your password?</a><a href="#helper">Need help choosing? Open Course Helper</a></div><div class="new-account-box"><h5>New to JobSkillShare?</h5><button>Create a free or Premium account &#x2192;</button></div><div class="reset-password-section" id="reset-section"><p>Enter your email or username and we will send password-reset instructions.</p><div class="form-group"><label>Email or username</label><input type="text" class="form-input" value=""/></div><button type="button" class="btn btn-primary btn-large btn-block">Send Reset Email</button><div style="text-align:center;margin-top:14px"><a href="#login-top" style="color:var(--color-blue, #2563eb);font-size:13px;font-weight:600;text-decoration:underline">Back to login</a></div></div></div></div>
  </div>
  <!-- CREATE ACCOUNT - STEP 1: Plan Picker -->
  <div id="create-account-modal-wrapper" style="display: none;">
    <div class="modal-overlay"><div class="modal-dialog modal-plans-v2"><button class="modal-close-btn" aria-label="Close">&#x2715;</button><div class="mm-head"><div class="modal-eyebrow">JOIN JOBSKILLSHARE</div><h2 class="modal-title">Choose how you want to learn</h2></div><div class="membership-steps"><div class="ms-step active"><span class="num">1</span><span class="lbl">Choose a plan</span></div><div class="ms-line"></div><div class="ms-step"><span class="num">2</span><span class="lbl">Secure checkout</span></div><div class="ms-line"></div><div class="ms-step"><span class="num">3</span><span class="lbl">Start learning</span></div></div><div class="mm-body"><div class="mpv2-subhead">Select your membership</div><p class="mpv2-note">Create your account here. Membership and payment processing remain securely managed by <span class="stripe-badge"><span class="stripe-icon">&#x2713;</span> Stripe</span>.</p><div class="plans-grid-v2"><div class="plan-card-v2"><span class="plan-pill light">START FREE</span><h3>Free Access</h3><div class="plan-price-row"><span class="p">$0.00</span><span class="per">3-month access</span></div><div class="plan-desc">Explore selected foundation Courses for three months.</div><ul class="plan-feats-v2"><li><span class="ck">&#x2713;</span>Selected free Courses</li><li><span class="ck">&#x2713;</span>Learning portal access</li><li><span class="ck">&#x2713;</span>Progress tracking</li></ul><button class="btn-plan-ghost plan2-btn">Create Free Account</button></div><div class="plan-card-v2"><span class="plan-pill light">FLEXIBLE</span><h3>Premium Monthly</h3><div class="plan-price-row"><span class="p">$50.00</span><span class="per">per month</span></div><div class="plan-desc">Full learning access with monthly billing.</div><ul class="plan-feats-v2"><li><span class="ck">&#x2713;</span>All Certificate Programs</li><li><span class="ck">&#x2713;</span>All premium Courses</li><li><span class="ck">&#x2713;</span>Hands-on Labs and certificates</li><li class="purple"><span class="ck">&#x2726;</span>AI Career Tools</li></ul><button class="btn-plan-ghost plan2-btn">Choose Premium Monthly</button></div><div class="plan-card-v2 best"><span class="plan-pill solid">BEST VALUE</span><h3>Premium Yearly</h3><div class="plan-price-row"><span class="p">$549.00</span><span class="per">per year</span></div><div class="plan-desc">Build long-term skills with yearly Premium access.</div><ul class="plan-feats-v2"><li><span class="ck">&#x2713;</span>All Certificate Programs</li><li><span class="ck">&#x2713;</span>All premium Courses</li><li><span class="ck">&#x2713;</span>Hands-on Labs and certificates</li><li class="purple"><span class="ck">&#x2726;</span>AI Career Tools</li></ul><button class="btn-plan-solid plan2-btn">Choose Premium Yearly</button></div></div><div class="plans-trust"><span>Secure checkout</span><span>Access assigned automatically</span><span>Existing members can return to login</span></div></div></div></div>
  </div>
  <!-- CREATE ACCOUNT - STEP 2: Registration Form -->
  <div id="create-account-step2-wrapper" style="display: none;">
    <div class="modal-overlay"><div class="modal-dialog modal-register"><button class="modal-close-btn" aria-label="Close">&#x2715;</button><div class="modal-top-nav"><button class="change-plan-btn">&#x2190; Change plan</button><div class="selected-plan-pill">Free Access - $0.00</div></div><div class="membership-steps"><div class="ms-step done"><span class="num">&#x2713;</span><span class="lbl">Choose a plan</span></div><div class="ms-line"></div><div class="ms-step active"><span class="num">2</span><span class="lbl">Secure checkout</span></div><div class="ms-line"></div><div class="ms-step"><span class="num">3</span><span class="lbl">Start learning</span></div></div><div class="mm-body"><div class="form-box-title">Create your account</div><div class="form-grid-2"><div class="form-group"><label>First name</label><input type="text" class="form-input" placeholder=""/></div><div class="form-group"><label>Last name</label><input type="text" class="form-input" placeholder=""/></div></div><div class="form-group"><label>Email address</label><input type="email" class="form-input" placeholder=""/></div><div class="form-group"><label>Create password</label><input type="password" class="form-input" placeholder=""/></div><div class="form-group"><label>Confirm password</label><input type="password" class="form-input" placeholder=""/></div><button class="show-password-btn" type="button" style="background:none;border:none;color:#64748b;font-size:13px;cursor:pointer;margin-bottom:12px;box-shadow:none;">&#x1F441; Show Password</button><div class="form-box" style="margin-bottom: 24px; margin-top: 10px;"><div class="form-box-title">Additional Details</div><div class="form-group"><label>What are your career goals? <span style="color:#b91c1c">*</span></label><input type="text" class="form-input" placeholder=""/></div><div class="form-group"><label>How did you find out about jobskillshare.org? <span style="color:#b91c1c">*</span></label><input type="text" class="form-input" placeholder=""/></div></div><label class="checkbox-row" style="margin-bottom: 24px;"><input type="checkbox" required/><span>I agree to the <a href="#" style="color:var(--muted);text-decoration:underline;">Terms</a> <span style="color:#b91c1c">*</span></span></label><button type="submit" class="btn btn-primary btn-large btn-block" style="border-radius: 8px;">Submit and Confirm</button></div></div></div>
  </div>
  <!-- CREATE ACCOUNT - STEP 3: Welcome Screen -->
  <div id="create-account-step3-wrapper" style="display: none;">
    <div class="modal-overlay"><div class="modal-dialog modal-register"><button class="modal-close-btn" aria-label="Close">&#x2715;</button><div class="membership-steps"><div class="ms-step done"><span class="num">&#x2713;</span><span class="lbl">Choose a plan</span></div><div class="ms-line"></div><div class="ms-step done"><span class="num">&#x2713;</span><span class="lbl">Secure checkout</span></div><div class="ms-line"></div><div class="ms-step active"><span class="num">3</span><span class="lbl">Start learning</span></div></div><div class="welcome-wrap"><div class="welcome-check">&#x2713;</div><h2>Welcome to JobSkillShare!</h2><p class="sub">Your account is ready. Tell us what you want to learn so we can recommend the best starting point for you.</p></div><div class="advisor-box"><h4>Learning Path Advisor</h4><p class="desc">Select a goal to see our recommended starting point.</p><div class="advisor-tags"><button class="advisor-tag tag-btn">I am new to IT</button><button class="advisor-tag tag-btn">IT Support or Helpdesk</button><button class="advisor-tag tag-btn">Systems &amp; networking</button><button class="advisor-tag tag-btn">Cybersecurity</button><button class="advisor-tag tag-btn">Cloud</button><button class="advisor-tag tag-btn">AI or data</button><button class="advisor-tag tag-btn">I want one Course</button></div><div class="advisor-input-row"><textarea class="form-input" placeholder="Tell us your goal&#x2026;"></textarea><button class="advisor-go adv-go">Get My Learning Path &#x2192;</button></div><div class="advisor-result adv-result"></div></div></div></div>
  </div>
  <!-- CHAT WIDGET PANEL (open/expanded state) -->
  <div id="chat-widget-wrapper" style="display: none; position:fixed; bottom:88px; right:24px; z-index:9999;">
    <div class="chat-widget"><div class="chat-panel"><div class="chat-body navy"><p class="chat-home-text">Issues related to lab content, guide, or devices are handled by practice lab support. Submit a ticket to the practice lab support from the lab portal.</p><button class="chat-conv-card"><span><span class="t">New Conversation</span><br/><span class="s">We typically reply in a few minutes</span></span><span class="send"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg></span></button></div><div class="chat-footer-nav"><button class="chat-nav-btn active" aria-label="Home"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10.5L12 3l9 7.5"></path><path d="M5 9.5V21h5v-6h4v6h5V9.5"></path></svg></button><button class="chat-nav-btn dim" aria-label="Messages"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></button></div></div><div class="tawk-pill"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 14c0-5 4-9 9-9 3 0 6 2 7 5-2-1-4-1-6 0 3 0 5 2 5 5 0 3-3 5-7 5-5 0-8-3-8-6z" fill="#22a06b"></path><circle cx="15" cy="13" r="1.4" fill="#fff"></circle></svg>Powered by tawk.to</div><button class="chat-btn" aria-label="Minimize chat"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"></path></svg></button></div>
  </div>
</div>`;

const script = `<script>
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var loginWrapper     = document.getElementById('login-modal-wrapper');
    var caWrapper        = document.getElementById('create-account-modal-wrapper');
    var caStep2Wrapper   = document.getElementById('create-account-step2-wrapper');
    var caStep3Wrapper   = document.getElementById('create-account-step3-wrapper');
    var chatWrapper      = document.getElementById('chat-widget-wrapper');
    var chatBubbleWidget = document.getElementById('chat-bubble-widget');

    function showOnly(el) {
      [loginWrapper, caWrapper, caStep2Wrapper, caStep3Wrapper].forEach(function(w) {
        if (w) w.style.display = 'none';
      });
      if (el) { el.style.display = 'block'; document.body.style.overflow = 'hidden'; }
      else document.body.style.overflow = '';
    }

    /* Log In triggers */
    document.querySelectorAll('button, a').forEach(function(el) {
      var t = (el.textContent || '').trim();
      if (t === 'Log In' || t === 'Already a member? Log In' || t === 'Open My Learning') {
        el.addEventListener('click', function(e) { e.preventDefault(); showOnly(loginWrapper); });
      }
    });

    /* Create Account triggers (outside modals) */
    var skipInsideModal = function(el) {
      return el.closest('#create-account-modal-wrapper') ||
             el.closest('#create-account-step2-wrapper') ||
             el.closest('#create-account-step3-wrapper') ||
             el.closest('#login-modal-wrapper');
    };
    document.querySelectorAll('button').forEach(function(btn) {
      if (skipInsideModal(btn)) return;
      var t = (btn.textContent || '').trim();
      if (t === 'Create Account' || t === 'Create Free Account' ||
          t === 'Explore Membership Options' || t === 'Explore Membership' ||
          t === 'Explore Premium Membership \u2192' ||
          t === 'Choose Premium Monthly' || t === 'Choose Premium Yearly') {
        btn.addEventListener('click', function(e) { e.preventDefault(); showOnly(caWrapper); });
      }
    });

    /* Step 1 plan buttons -> Step 2 */
    if (caWrapper) {
      caWrapper.querySelectorAll('.plan2-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) { e.preventDefault(); showOnly(caStep2Wrapper); });
      });
      var closeBtn1 = caWrapper.querySelector('.modal-close-btn');
      if (closeBtn1) closeBtn1.addEventListener('click', function() { showOnly(null); });
      caWrapper.addEventListener('click', function(e) {
        if (e.target === caWrapper || e.target.classList.contains('modal-overlay')) showOnly(null);
      });
    }

    /* Step 2 -> Step 3 */
    if (caStep2Wrapper) {
      var registrationPasswords = caStep2Wrapper.querySelectorAll('input[type="password"]');
      if (registrationPasswords.length >= 2) {
        var passwordRule = 'Use 8+ characters with uppercase, lowercase, number, and special character.';
        registrationPasswords.forEach(function (input) {
          input.minLength = 8;
          input.title = passwordRule;
        });
        registrationPasswords[0].closest('.form-group').insertAdjacentHTML('beforeend', '<p class="password-requirements">' + passwordRule + '</p>');
      }
      var submitBtn = caStep2Wrapper.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
          e.preventDefault();
          var inputs = caStep2Wrapper.querySelectorAll('.form-input');
          if (inputs.length < 5) return;
          var fname = inputs[0].value.trim();
          var lname = inputs[1].value.trim();
          var email = inputs[2].value.trim();
          var pass = inputs[3].value;
          var passConf = inputs[4].value;
          var chk = caStep2Wrapper.querySelector('input[type="checkbox"]');
          if (!email || !pass || !chk || !chk.checked) {
            alert('Please fill out all required fields and agree to the Terms.');
            return;
          }
          if (pass !== passConf) {
            alert('Passwords do not match.');
            return;
          }
          if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(pass)) {
            alert('Password must be at least 8 characters and include an uppercase letter, lowercase letter, number, and special character.');
            return;
          }
          var originalText = submitBtn.textContent;
          submitBtn.textContent = 'Creating Account...';
          submitBtn.disabled = true;
          window.getSupabase().auth.signUp({
            email: email,
            password: pass,
            options: { emailRedirectTo: window.location.origin + window.location.pathname, data: { full_name: fname + ' ' + lname } }
          }).then(function(res) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            if (res.error) alert(res.error.message);
            else {
              alert('Account created! Please check your email to verify if required.');
              showOnly(caStep3Wrapper);
            }
          });
        });
      }
      var changePlanBtn = caStep2Wrapper.querySelector('.change-plan-btn');
      if (changePlanBtn) changePlanBtn.addEventListener('click', function(e) { e.preventDefault(); showOnly(caWrapper); });
      var closeBtn2 = caStep2Wrapper.querySelector('.modal-close-btn');
      if (closeBtn2) closeBtn2.addEventListener('click', function() { showOnly(null); });
      caStep2Wrapper.addEventListener('click', function(e) {
        if (e.target === caStep2Wrapper || e.target.classList.contains('modal-overlay')) showOnly(null);
      });
      var showPwBtn = caStep2Wrapper.querySelector('.show-password-btn');
      if (showPwBtn) {
        var passwordsVisible = false;
        showPwBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          passwordsVisible = !passwordsVisible;
          registrationPasswords.forEach(function(input) { input.type = passwordsVisible ? 'text' : 'password'; });
          showPwBtn.textContent = passwordsVisible ? '👁 Hide Password' : '👁 Show Password';
        }, true);
        showPwBtn.addEventListener('click', function(e) {
          e.preventDefault();
          caStep2Wrapper.querySelectorAll('input[type="password"]').forEach(function(inp) { inp.type = 'text'; });
          showPwBtn.textContent = '\uD83D\uDC41 Hide Password';
          showPwBtn.addEventListener('click', function toggle() {
            caStep2Wrapper.querySelectorAll('input[type="password"], input[type="text"]').forEach(function(inp) {
              if (inp.type === 'password') inp.type = 'text'; else inp.type = 'password';
            });
            showPwBtn.removeEventListener('click', toggle);
          }, { once: true });
        }, { once: true });
      }
    }

    /* Step 3 */
    if (caStep3Wrapper) {
      var closeBtn3 = caStep3Wrapper.querySelector('.modal-close-btn');
      if (closeBtn3) closeBtn3.addEventListener('click', function() { showOnly(null); });
      caStep3Wrapper.addEventListener('click', function(e) {
        if (e.target === caStep3Wrapper || e.target.classList.contains('modal-overlay')) showOnly(null);
      });
      caStep3Wrapper.querySelectorAll('.advisor-tag, .adv-tag').forEach(function(tag) {
        tag.addEventListener('click', function() {
          caStep3Wrapper.querySelectorAll('.advisor-tag, .adv-tag').forEach(function(t) { t.classList.remove('selected', 'sel'); });
          tag.classList.add('selected', 'sel');
          var textarea = caStep3Wrapper.querySelector('textarea');
          if (textarea) {
            var texts = {
              'I am new to IT': 'I am new to IT and want to become an IT support specialist.',
              'IT Support or Helpdesk': 'I want to work in IT support or helpdesk.',
              'Systems & networking': 'I want to work in systems administration and networking.',
              'Cybersecurity': 'I want to build a career in cybersecurity.',
              'Cloud': 'I want to become a cloud engineer working with Azure or AWS.',
              'AI or data': 'I want to work with data analysis, Python, or AI engineering.',
              'I want one Course': 'I want to take one focused course to strengthen a single skill.'
            };
            textarea.value = texts[tag.textContent.trim()] || '';
          }
        });
      });
      var advGoBtn = caStep3Wrapper.querySelector('.adv-go');
      if (advGoBtn) {
        advGoBtn.addEventListener('click', function() {
          var textarea = caStep3Wrapper.querySelector('textarea');
          var resultDiv = caStep3Wrapper.querySelector('.adv-result');
          if (!textarea || !resultDiv) return;
          var text = textarea.value.toLowerCase();
          var rec = 'IT Support Certificate Program \u2192 Modern IT Support Training: Part 1';
          if ((text.includes('network') || text.includes('systems')) && !text.includes('security'))
            rec = 'Systems Engineer Certificate Program \u2192 Cisco Core Networking';
          else if (text.includes('cyber') || text.includes('security'))
            rec = 'Cybersecurity Analyst Certificate Program \u2192 Networking Fundamentals for Cybersecurity';
          else if (text.includes('azure'))
            rec = 'Azure Cloud Engineer Certificate Program \u2192 Microsoft Azure Administrator Training (AZ-104)';
          else if (text.includes('aws') || text.includes('cloud'))
            rec = 'AWS Cloud Engineer Certificate Program \u2192 AWS Cloud Administrator | Fundamentals';
          else if (text.includes('data') && !text.includes('science'))
            rec = 'Data Analytics Certificate Program \u2192 Power BI Fundamentals | Certificate';
          else if (text.includes('science') || text.includes('ai') || text.includes('python'))
            rec = 'AI Engineering Certificate Program \u2192 Python Fundamentals - AI Engineering';
          resultDiv.innerHTML = '<span><strong style="color:#1e40af;">Recommended: </strong>' + rec + '</span>';
          resultDiv.classList.add('show');
        });
      }
    }

    /* Login Modal */
    if (loginWrapper) {
      var closeBtnL = loginWrapper.querySelector('.modal-close-btn');
      if (closeBtnL) closeBtnL.addEventListener('click', function() { showOnly(null); });
      loginWrapper.addEventListener('click', function(e) {
        if (e.target === loginWrapper || e.target.classList.contains('modal-overlay')) showOnly(null);
      });
      var loginForm = loginWrapper.querySelector('form');
      if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
          e.preventDefault();
          var inputs = loginForm.querySelectorAll('input');
          var email = inputs[0].value.trim();
          var pass = inputs[1].value;
          if (!email || !pass) return alert('Please enter both email and password.');
          var btn = loginForm.querySelector('button[type="submit"]');
          var originalText = btn.textContent;
          btn.textContent = 'Logging in...';
          btn.disabled = true;
          window.getSupabase().auth.signInWithPassword({ email: email, password: pass }).then(function(res) {
            btn.textContent = originalText;
            btn.disabled = false;
            if (res.error) alert(res.error.message);
            else {
              alert('Successfully logged in!');
              showOnly(null);
            }
          });
        });
      }
      var switchToSignup = loginWrapper.querySelector('.new-account-box button');
      if (switchToSignup) switchToSignup.addEventListener('click', function() { showOnly(caWrapper); });
      var forgotLink = loginWrapper.querySelector('a[href="#reset"]');
      if (forgotLink) {
        forgotLink.addEventListener('click', function(e) {
          e.preventDefault();
          var dialog = loginWrapper.querySelector('.modal-dialog');
          var resetSection = loginWrapper.querySelector('#reset-section');
          if (dialog && resetSection) dialog.scrollTop = resetSection.offsetTop;
        });
      }
      var sendResetBtn = loginWrapper.querySelector('#reset-section button[type="button"]');
      if (sendResetBtn) {
        sendResetBtn.addEventListener('click', function() {
          var inp = loginWrapper.querySelector('#reset-section input');
          if (inp && inp.value.trim()) {
            var email = inp.value.trim();
            var originalText = sendResetBtn.textContent;
            sendResetBtn.textContent = 'Sending...';
            sendResetBtn.disabled = true;
            window.getSupabase().auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + window.location.pathname }).then(function(res) {
              sendResetBtn.textContent = originalText;
              sendResetBtn.disabled = false;
              if (res.error) alert(res.error.message);
              else alert('If an account exists for this email, a password-reset link has been sent.');
            });
          }
          else alert('Please enter your email address.');
        });
      }
    }

    /* Escape key */
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') showOnly(null);
    });

    /* CHAT WIDGET */
    if (chatBubbleWidget && chatWrapper) {
      var openBtn = chatBubbleWidget.querySelector('.chat-btn');
      if (openBtn) {
        openBtn.addEventListener('click', function() {
          chatBubbleWidget.style.display = 'none';
          chatWrapper.style.display = 'block';
        });
      }
      var closeBubble = chatBubbleWidget.querySelector('.chat-bubble .close');
      if (closeBubble) {
        closeBubble.addEventListener('click', function(e) {
          e.stopPropagation();
          var bubble = chatBubbleWidget.querySelector('.chat-bubble');
          if (bubble) bubble.style.display = 'none';
        });
      }
    }

    if (chatWrapper) {
      var minimizeBtn = chatWrapper.querySelector('.chat-btn');
      if (minimizeBtn) {
        minimizeBtn.addEventListener('click', function() {
          chatWrapper.style.display = 'none';
          if (chatBubbleWidget) chatBubbleWidget.style.display = 'flex';
        });
      }
      var chatNavBtns = chatWrapper.querySelectorAll('.chat-nav-btn');
      chatNavBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          chatNavBtns.forEach(function(b) { b.classList.remove('active'); b.classList.add('dim'); });
          btn.classList.remove('dim'); btn.classList.add('active');
        });
      });
      var convCard = chatWrapper.querySelector('.chat-conv-card');
      var chatBodyEl = chatWrapper.querySelector('.chat-body');
      if (convCard && chatBodyEl) {
        convCard.addEventListener('click', function() {
          chatBodyEl.innerHTML = '<div class="chat-thread"><div class="chat-empty" style="padding:40px 20px;color:#64748b;font-size:13px;">No messages yet \u2014 start the conversation below.</div></div>';
          var inputBar = chatBodyEl.parentElement.querySelector('.chat-input-bar');
          if (!inputBar) {
            inputBar = document.createElement('div');
            inputBar.className = 'chat-input-bar';
            inputBar.style.cssText = 'display:flex;align-items:center;padding:8px 12px;border-top:1px solid #e2e8f0;gap:8px;';
            inputBar.innerHTML = '<input placeholder="Leave a message and we will get back to you\u2026" style="flex:1;border:none;outline:none;font-size:13px;background:transparent;padding:4px 0;" />';
            chatBodyEl.parentElement.insertBefore(inputBar, chatBodyEl.nextSibling);
          }
          var inp = inputBar.querySelector('input');
          inp.addEventListener('keydown', function(ev) {
            if (ev.key === 'Enter' && inp.value.trim()) {
              var thread = chatBodyEl.querySelector('.chat-thread');
              var msg = document.createElement('div');
              msg.className = 'chat-msg user';
              msg.textContent = inp.value.trim();
              thread.appendChild(msg);
              inp.value = '';
              setTimeout(function() {
                var reply = document.createElement('div');
                reply.className = 'chat-msg bot';
                reply.textContent = 'Thanks for reaching out! Our support team will reply shortly.';
                thread.appendChild(reply);
                thread.scrollTop = thread.scrollHeight;
              }, 700);
            }
          });
          inp.focus();
        });
      }
    }
  });
})();
</script>`;

function fixHtml(file) {
  let html = fs.readFileSync(file, 'utf-8');

  // Remove ALL existing modals-container blocks
  html = html.replace(/(<\/div>\s*\n\s*\n\s*)?<div id="modals-container">[\s\S]*?<\/div>\s*\n(?=\s*\n\s*<div id="modals-container">)/g, '');
  html = html.replace(/<div id="modals-container">[\s\S]*?(?=\s*<script>)/g, '');

  // Remove old script blocks (IIFE pattern)
  html = html.replace(/<script>\s*\(function\(\)\s*\{[\s\S]*?\}\)\(\);\s*<\/script>/g, '');

  // Remove old chat-bubble-widget
  html = html.replace(/<div id="chat-bubble-widget"[\s\S]*?<\/div>\s*\n/g, '');

  // Remove old chat-bubble-style
  html = html.replace(/<style id="chat-bubble-style">[\s\S]*?<\/style>\s*\n/g, '');

  // Remove any leftover empty lines at end of body
  html = html.replace(/\s*<\/body><\/html>$/, '\n</body></html>');

  // Remove old supabase scripts if present
  html = html.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/@supabase\/supabase-js@2"><\/script>\s*\n/g, '');
  html = html.replace(/<script src="supabase-config\.js"><\/script>\s*\n/g, '');
  html = html.replace(/<script src="auth-common\.js"><\/script>\s*\n/g, '');
  html = html.replace(/<script src="auth-recovery\.js"><\/script>\s*\n/g, '');

  // Inject before </body></html>
  const supabaseScripts = `
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-config.js"></script>
<script src="auth-common.js"></script>
<script src="auth-recovery.js"></script>
`;
  html = html.replace('</body></html>',
    chatBubbleCSS + '\n' + chatBubble + '\n' + modalsBlock + '\n' + supabaseScripts + '\n' + script + '\n</body></html>');

  fs.writeFileSync(file, html);
  console.log('Fixed: ' + file + ' (' + html.length + ' bytes)');

  // Verify
  const matches = (html.match(/id="login-modal-wrapper"/g) || []).length;
  console.log('  login-modal-wrapper count: ' + matches + (matches === 1 ? ' ✓' : ' ✗ DUPLICATE!'));
}

fixHtml('index.html');
fixHtml('programs.html');
console.log('Done!');
