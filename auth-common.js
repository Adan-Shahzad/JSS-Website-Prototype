(function (window) {
    'use strict';

    var AuthCommon = window.AuthCommon = {};

    AuthCommon.getSupabase = function () {
        return window.getSupabase();
    };

    AuthCommon.siteBase = function () {
        return window.location.protocol + '//' + window.location.host;
    };

    AuthCommon.showError = function (el, message) {
        if (!el) return;
        el.textContent = message;
        el.classList.add('active');
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    AuthCommon.clearError = function (el) {
        if (!el) return;
        el.textContent = '';
        el.classList.remove('active');
    };

    AuthCommon.setButtonLoading = function (btn, loading, label) {
        if (!btn) return;
        if (loading) {
            btn.dataset.originalText = btn.textContent;
            btn.disabled = true;
            btn.classList.add('loading');
            btn.textContent = label || 'Please wait...';
        } else {
            btn.disabled = false;
            btn.classList.remove('loading');
            btn.textContent = label || btn.dataset.originalText || btn.textContent;
        }
    };

    AuthCommon.initCodeInputs = function () {
        var inputs = document.querySelectorAll('.code-input');
        Array.prototype.forEach.call(inputs, function (input, index) {
            input.addEventListener('input', function () {
                this.value = this.value.replace(/[^0-9]/g, '').slice(0, 1);
                if (this.value && index < inputs.length - 1) inputs[index + 1].focus();
            });
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Backspace' && !this.value && index > 0) inputs[index - 1].focus();
            });
        });
    };

    AuthCommon.getCode = function () {
        var inputs = document.querySelectorAll('.code-input');
        var code = '';
        Array.prototype.forEach.call(inputs, function (i) { code += i.value; });
        return code;
    };

    AuthCommon.verifyOtpWithTypes = function (supabase, email, token, types, cb) {
        var tried = 0;
        function next() {
            if (tried >= types.length) {
                cb({ error: { message: 'The code is invalid or has expired. Please request a new one.' } });
                return;
            }
            var type = types[tried++];
            supabase.auth.verifyOtp({ email: email, token: token, type: type }).then(function (res) {
                if (res.error && res.error.message && /invalid|expired|otp|token/i.test(res.error.message)) {
                    next();
                } else {
                    cb(res);
                }
            });
        }
        next();
    };

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function injectCss() {
        var style = document.createElement('style');
        style.textContent = [
            '.user-menu{position:relative;display:inline-block;}',
            '.user-btn{display:inline-flex !important;align-items:center;gap:6px;cursor:pointer;}',
            '.user-btn .caret{border:4px solid transparent;border-top-color:currentColor;margin-top:2px;}',
            '.user-dropdown{position:absolute;right:0;top:calc(100% + 8px);min-width:210px;background:#141932;border:1px solid rgba(100,200,255,.25);border-radius:10px;box-shadow:0 15px 40px rgba(0,0,0,.5);padding:8px;display:none;z-index:200;}',
            '.user-dropdown.open{display:block;}',
            '.user-dropdown .ud-name{color:#f0f4ff;font-weight:600;font-size:13px;padding:8px 10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
            '.user-dropdown .ud-email{color:#7f8bb0;font-size:12px;padding:0 10px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-bottom:1px solid rgba(100,200,255,.15);margin-bottom:6px;}',
            '.user-dropdown a.ud-logout{display:block;padding:8px 10px;color:#ff7b8a;text-decoration:none;font-size:13px;font-weight:600;border-radius:8px;transition:background .2s;}',
            '.user-dropdown a.ud-logout:hover{background:rgba(255,123,138,.12);}',
            'button.btn-login.loading, button.loading{opacity:.7;cursor:wait;}'
        ].join('\n');
        document.head.appendChild(style);
    }

    function renderHeader(session) {
        var btn = document.querySelector('.header-actions .btn-login');
        if (!btn) return;
        if (session && session.user) {
            var user = session.user;
            var meta = user.user_metadata || {};
            var name = meta.full_name || meta.name || user.email || 'My Account';
            var email = user.email || '';
            var wrap = document.createElement('div');
            wrap.className = 'user-menu';
            var btnEl = document.createElement('button');
            btnEl.className = 'btn-login user-btn';
            btnEl.type = 'button';
            btnEl.setAttribute('aria-haspopup', 'true');
            btnEl.innerHTML = '<span>' + escapeHtml(name) + '</span><span class="caret"></span>';
            var dd = document.createElement('div');
            dd.className = 'user-dropdown';
            dd.innerHTML = '<div class="ud-name">' + escapeHtml(name) + '</div>' +
                (email ? '<div class="ud-email">' + escapeHtml(email) + '</div>' : '') +
                '<a href="#" class="ud-logout">Logout</a>';
            wrap.appendChild(btnEl);
            wrap.appendChild(dd);
            btn.parentNode.replaceChild(wrap, btn);
            btnEl.addEventListener('click', function (e) {
                e.preventDefault();
                dd.classList.toggle('open');
            });
            document.addEventListener('click', function (e) {
                if (!wrap.contains(e.target)) dd.classList.remove('open');
            });
            dd.querySelector('.ud-logout').addEventListener('click', function (e) {
                e.preventDefault();
                AuthCommon.getSupabase().auth.signOut().then(function () {
                    window.location.href = 'index.html';
                });
            });
        } else {
            btn.href = '#login';
            var span = btn.querySelector('span');
            if (span) span.textContent = 'Login';
        }
    }

    function initHeader() {
        if (!document.querySelector('.header-actions .btn-login')) return;
        injectCss();
        var supabase = AuthCommon.getSupabase();
        supabase.auth.getSession().then(function (res) {
            renderHeader(res.data.session);
        });
        supabase.auth.onAuthStateChange(function (event, session) {
            if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED') {
                renderHeader(session);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeader);
    } else {
        initHeader();
    }

})(window);
