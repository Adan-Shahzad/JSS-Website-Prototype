(function () {
  'use strict';

  var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  function showRecoveryForm() {
    if (document.getElementById('password-recovery-modal')) return;

    var overlay = document.createElement('div');
    overlay.id = 'password-recovery-modal';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = '<div class="modal-dialog auth-recovery-dialog" role="dialog" aria-modal="true" aria-labelledby="recovery-title">' +
      '<button type="button" class="modal-close-btn" aria-label="Close">&#x2715;</button>' +
      '<div class="modal-eyebrow">PASSWORD RECOVERY</div>' +
      '<h2 id="recovery-title" class="modal-title">Create a new password</h2>' +
      '<p class="modal-subtitle">Choose a secure password for your account.</p>' +
      '<form><div class="form-group"><label>New password</label><input class="form-input" type="password" autocomplete="new-password" required></div>' +
      '<p class="password-requirements">Use 8+ characters with uppercase, lowercase, number, and special character.</p>' +
      '<div class="form-group"><label>Confirm new password</label><input class="form-input" type="password" autocomplete="new-password" required></div>' +
      '<button type="submit" class="btn btn-primary btn-large btn-block">Update Password</button></form></div>';
    document.body.appendChild(overlay);

    var dialog = overlay.querySelector('.modal-dialog');
    var close = function () { overlay.remove(); };
    overlay.querySelector('.modal-close-btn').addEventListener('click', close);
    overlay.addEventListener('click', function (event) { if (event.target === overlay) close(); });
    dialog.querySelector('input').focus();

    dialog.querySelector('form').addEventListener('submit', function (event) {
      event.preventDefault();
      var inputs = dialog.querySelectorAll('input');
      var password = inputs[0].value;
      var confirmation = inputs[1].value;
      if (!passwordPattern.test(password)) {
        alert('Password must be at least 8 characters and include an uppercase letter, lowercase letter, number, and special character.');
        return;
      }
      if (password !== confirmation) {
        alert('Passwords do not match.');
        return;
      }
      var submit = dialog.querySelector('button[type="submit"]');
      var originalText = submit.textContent;
      submit.disabled = true;
      submit.textContent = 'Updating Password...';
      window.getSupabase().auth.updateUser({ password: password }).then(function (result) {
        submit.disabled = false;
        submit.textContent = originalText;
        if (result.error) {
          alert(result.error.message);
          return;
        }
        window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
        alert('Your password has been updated. You can now sign in.');
        close();
      });
    });
  }

  function initialiseRecovery() {
    if (!window.getSupabase) return;
    var hasRecoveryHash = /(?:^|[&#?])type=recovery(?:&|$)/.test(window.location.hash + '&' + window.location.search);
    if (hasRecoveryHash) showRecoveryForm();
    window.getSupabase().auth.onAuthStateChange(function (event) {
      if (event === 'PASSWORD_RECOVERY') showRecoveryForm();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialiseRecovery);
  else initialiseRecovery();
})();
