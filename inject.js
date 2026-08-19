const fs = require('fs');

const modalsHtml = fs.readFileSync('modals_full.html', 'utf-8');

const vanillaJS = `
<script>
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var loginWrapper      = document.getElementById('login-modal-wrapper');
    var caWrapper         = document.getElementById('create-account-modal-wrapper'); // step 1
    var caStep2Wrapper    = document.getElementById('create-account-step2-wrapper'); // step 2
    var caStep3Wrapper    = document.getElementById('create-account-step3-wrapper'); // step 3
    var chatWrapper       = document.getElementById('chat-widget-wrapper');

    /* ────── helpers ────── */
    function showOnly(el) {
      [loginWrapper, caWrapper, caStep2Wrapper, caStep3Wrapper].forEach(function(w) {
        if (w) w.style.display = 'none';
      });
      if (el) { el.style.display = 'block'; document.body.style.overflow = 'hidden'; }
      else document.body.style.overflow = '';
    }

    /* ────── Log In triggers ────── */
    document.querySelectorAll('button, a').forEach(function(el) {
      var t = (el.textContent || '').trim();
      if (t === 'Log In' || t === 'Already a member? Log In' || t === 'Open My Learning') {
        el.addEventListener('click', function(e) { e.preventDefault(); showOnly(loginWrapper); });
      }
    });

    /* ────── Create Account / sign-up triggers (outside modals) ────── */
    var skipInsideModal = function(el) {
      return el.closest('#create-account-modal-wrapper') ||
             el.closest('#create-account-step2-wrapper') ||
             el.closest('#create-account-step3-wrapper') ||
             el.closest('#login-modal-wrapper');
    };
    document.querySelectorAll('button').forEach(function(btn) {
      if (skipInsideModal(btn)) return;
      var t = (btn.textContent || '').trim();
      if (
        t === 'Create Account' ||
        t === 'Create Free Account' ||
        t === 'Explore Membership Options' ||
        t === 'Choose Premium Monthly' ||
        t === 'Choose Premium Yearly'
      ) {
        btn.addEventListener('click', function(e) { e.preventDefault(); showOnly(caWrapper); });
      }
    });

    /* ────── Inside Create Account Step 1: plan buttons → step 2 ────── */
    if (caWrapper) {
      caWrapper.querySelectorAll('.plan2-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) { e.preventDefault(); showOnly(caStep2Wrapper); });
      });
      /* close btn */
      var closeBtn1 = caWrapper.querySelector('.modal-close-btn');
      if (closeBtn1) closeBtn1.addEventListener('click', function() { showOnly(null); });
      /* overlay */
      caWrapper.addEventListener('click', function(e) {
        if (e.target === caWrapper || e.target.classList.contains('modal-overlay')) showOnly(null);
      });
    }

    /* ────── Inside Create Account Step 2: submit → step 3, change plan → step 1 ────── */
    if (caStep2Wrapper) {
      var submitBtn = caStep2Wrapper.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.addEventListener('click', function(e) { e.preventDefault(); showOnly(caStep3Wrapper); });
      var changePlanBtn = caStep2Wrapper.querySelector('.change-plan-btn');
      if (changePlanBtn) changePlanBtn.addEventListener('click', function(e) { e.preventDefault(); showOnly(caWrapper); });
      var closeBtn2 = caStep2Wrapper.querySelector('.modal-close-btn');
      if (closeBtn2) closeBtn2.addEventListener('click', function() { showOnly(null); });
      caStep2Wrapper.addEventListener('click', function(e) {
        if (e.target === caStep2Wrapper || e.target.classList.contains('modal-overlay')) showOnly(null);
      });
      /* show/hide password toggle */
      var showPwBtn = caStep2Wrapper.querySelector('.show-password-btn');
      if (showPwBtn) {
        showPwBtn.addEventListener('click', function(e) {
          e.preventDefault();
          var pwInputs = caStep2Wrapper.querySelectorAll('input[type="password"], input[type="text"].pw');
          var allInputs = caStep2Wrapper.querySelectorAll('.form-grid-2 input');
          allInputs.forEach(function(inp) {
            inp.type = inp.type === 'password' ? 'text' : 'password';
          });
          showPwBtn.textContent = showPwBtn.textContent.includes('Show') ? '👁 Hide Password' : '👁 Show Password';
        });
      }
    }

    /* ────── Inside Create Account Step 3: action buttons ────── */
    if (caStep3Wrapper) {
      var closeBtn3 = caStep3Wrapper.querySelector('.modal-close-btn');
      if (closeBtn3) closeBtn3.addEventListener('click', function() { showOnly(null); });
      caStep3Wrapper.addEventListener('click', function(e) {
        if (e.target === caStep3Wrapper || e.target.classList.contains('modal-overlay')) showOnly(null);
      });
      /* Learning path advisor tags */
      caStep3Wrapper.querySelectorAll('.adv-tag').forEach(function(tag) {
        tag.addEventListener('click', function() {
          caStep3Wrapper.querySelectorAll('.adv-tag').forEach(function(t) { t.classList.remove('selected'); });
          tag.classList.add('selected');
          var textarea = caStep3Wrapper.querySelector('textarea');
          if (textarea) {
            var texts = {
              'I am new to IT': 'I am new to IT and want to become an IT support specialist.',
              'Systems & networking': 'I want to work in systems administration and networking.',
              'Cybersecurity': 'I want to build a career in cybersecurity and security analysis.',
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
          var rec = 'IT Support Certificate Program → then Modern IT Support Training: Part 1 | A+ (220-1102)';
          if ((text.includes('network') || text.includes('systems')) && !text.includes('security'))
            rec = 'Systems Engineer Certificate Program → Cisco Core Networking | Packet Tracer';
          else if (text.includes('cyber') || text.includes('security'))
            rec = 'Cybersecurity Analyst Certificate Program → Networking Fundamentals for Cybersecurity';
          else if (text.includes('azure'))
            rec = 'Azure Cloud Engineer Certificate Program → Microsoft Azure Administrator Training (AZ-104)';
          else if (text.includes('aws') || text.includes('cloud'))
            rec = 'AWS Cloud Engineer Certificate Program → AWS Cloud Administrator | Fundamentals';
          else if (text.includes('data') && !text.includes('science'))
            rec = 'Data Analytics Certificate Program → Power BI Fundamentals | Certificate';
          else if (text.includes('science') || text.includes('ai') || text.includes('python'))
            rec = 'AI Engineering Certificate Program → Python Fundamentals - AI Engineering';
          else if (text.includes('one course'))
            rec = 'Advance IT Support | Modern Desktop Administrator (Free Course)';
          resultDiv.innerHTML = '<span><span class="rec-label">Recommended: </span>' + rec + '</span>';
        });
      }
    }

    /* ────── Login Modal: close + switch to signup ────── */
    if (loginWrapper) {
      var closeBtnL = loginWrapper.querySelector('.modal-close-btn');
      if (closeBtnL) closeBtnL.addEventListener('click', function() { showOnly(null); });
      loginWrapper.addEventListener('click', function(e) {
        if (e.target === loginWrapper || e.target.classList.contains('modal-overlay')) showOnly(null);
      });
      var switchToSignup = loginWrapper.querySelector('.new-account-box button');
      if (switchToSignup) switchToSignup.addEventListener('click', function() { showOnly(caWrapper); });
      /* Forgot password scroll */
      var forgotLink = loginWrapper.querySelector('a[href="#reset"]');
      if (forgotLink) {
        forgotLink.addEventListener('click', function(e) {
          e.preventDefault();
          var dialog = loginWrapper.querySelector('.modal-dialog');
          var resetSection = loginWrapper.querySelector('#reset-section');
          if (dialog && resetSection) dialog.scrollTop = resetSection.offsetTop;
        });
      }
      /* Send Reset Email */
      var sendResetBtn = loginWrapper.querySelector('#reset-section .btn');
      if (sendResetBtn) {
        sendResetBtn.addEventListener('click', function() {
          var inp = loginWrapper.querySelector('#reset-section input');
          if (inp && inp.value.trim()) alert('Password reset link sent to ' + inp.value.trim() + ' if the account exists.');
          else alert('Please enter your email or username.');
        });
      }
    }

    /* ────── Escape key ────── */
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') showOnly(null);
    });

    /* ────── CHAT WIDGET ────── */
    // Find the closed chat widget (the one NOT inside #chat-widget-wrapper)
    var closedChatWidget = null;
    document.querySelectorAll('.chat-widget').forEach(function(w) {
      if (!w.closest('#chat-widget-wrapper')) closedChatWidget = w;
    });

    if (closedChatWidget && chatWrapper) {
      var openBtn = closedChatWidget.querySelector('.chat-btn');
      if (openBtn) {
        openBtn.addEventListener('click', function() {
          closedChatWidget.style.display = 'none';
          chatWrapper.style.display = 'block';
        });
      }
      var closeBubble = closedChatWidget.querySelector('.chat-bubble .close');
      if (closeBubble) {
        closeBubble.addEventListener('click', function(e) {
          e.stopPropagation();
          var bubble = closedChatWidget.querySelector('.chat-bubble');
          if (bubble) bubble.style.display = 'none';
        });
      }
    }

    if (chatWrapper) {
      var minimizeBtn = chatWrapper.querySelector('.chat-btn');
      if (minimizeBtn) {
        minimizeBtn.addEventListener('click', function() {
          chatWrapper.style.display = 'none';
          if (closedChatWidget) closedChatWidget.style.display = 'block';
        });
      }
      /* Home / Messages nav buttons */
      var chatNavBtns = chatWrapper.querySelectorAll('.chat-nav-btn');
      var chatBodyEl = chatWrapper.querySelector('.chat-body');
      chatNavBtns.forEach(function(btn, i) {
        btn.addEventListener('click', function() {
          chatNavBtns.forEach(function(b) { b.classList.remove('active'); b.classList.add('dim'); });
          btn.classList.remove('dim'); btn.classList.add('active');
        });
      });
      /* New Conversation card */
      var convCard = chatWrapper.querySelector('.chat-conv-card');
      if (convCard && chatBodyEl) {
        convCard.addEventListener('click', function() {
          chatBodyEl.innerHTML = '<div class="chat-thread"><div class="chat-empty" style="padding:40px 20px">No messages yet — start the conversation below.</div></div>';
          var inputBar = chatBodyEl.parentElement.querySelector('.chat-input-bar');
          if (!inputBar) {
            inputBar = document.createElement('div');
            inputBar.className = 'chat-input-bar';
            inputBar.innerHTML = '<input placeholder="If our AI IT Assistant can\'t answer your question, leave a message with your email in this box." style="flex:1;border:none;outline:none;font-size:13px;background:transparent;padding:4px 0;" /><div class="chat-input-icons"><button aria-label="Emoji" style="background:none;border:none;cursor:pointer;color:#94a3b8;">🙂</button></div>';
            chatBodyEl.parentElement.insertBefore(inputBar, chatBodyEl.nextSibling);
          }
          var inp = inputBar.querySelector('input');
          inp.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && inp.value.trim()) {
              var thread = chatBodyEl.querySelector('.chat-thread');
              var msg = document.createElement('div');
              msg.className = 'chat-msg user';
              msg.textContent = inp.value.trim();
              thread.appendChild(msg);
              inp.value = '';
              setTimeout(function() {
                var reply = document.createElement('div');
                reply.className = 'chat-msg bot';
                reply.textContent = 'Thanks for reaching out! Our AI IT Assistant is reviewing your question and will reply in a few minutes.';
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
</script>
`;

function inject(file) {
  let content = fs.readFileSync(file, 'utf-8');

  // Remove any old injected modals-container
  content = content.replace(/<div id="modals-container">[\s\S]*?<\/div>\s*(<\/body>)/, '$1');
  // Remove any old script block we added
  content = content.replace(/<script>\s*\(function\(\)[\s\S]*?<\/script>\s*(<\/body>)/, '$1');

  // Inject before </body>
  content = content.replace('</body>', modalsHtml + '\n' + vanillaJS + '\n</body>');

  fs.writeFileSync(file, content);
  console.log('Done: ' + file);
}

inject('index.html');
inject('programs.html');
