/**
 * login.js — Lógica da página de login (login.html)
 */
$(document).ready(function () {

  // Redireciona se já estiver logado
  if (Auth.isLoggedIn()) {
    window.location.href = 'index.html';
    return;
  }

  // Toggle visibilidade de senha
  $(document).on('click', '.toggle-password', function () {
    const $input = $($(this).data('target'));
    const isPass = $input.attr('type') === 'password';
    $input.attr('type', isPass ? 'text' : 'password');
    $(this).find('i').toggleClass('bi-eye bi-eye-slash');
  });

  // Submit do formulário
  $('#login-form').on('submit', function (e) {
    e.preventDefault();

    const email    = $('#email').val().trim();
    const password = $('#password').val();

    // Validação básica
    let valid = true;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      $('#email').addClass('is-invalid');
      valid = false;
    } else {
      $('#email').removeClass('is-invalid').addClass('is-valid');
    }

    if (!password) {
      $('#password').addClass('is-invalid');
      valid = false;
    } else {
      $('#password').removeClass('is-invalid').addClass('is-valid');
    }

    if (!valid) return;

    // Loading
    setLoading(true);
    hideAlert();

    API.login({ email, password })
      .done(function (res) {
        Auth.saveSession(res.data.token, res.data.user);
        window.location.href = 'index.html';
      })
      .fail(function (xhr) {
        setLoading(false);
        const msg = xhr.responseJSON?.message || 'Credenciais inválidas. Tente novamente.';
        showAlert(msg, 'danger');
      });
  });

  function setLoading(loading) {
    $('#btn-login').prop('disabled', loading);
    $('#login-spinner').toggleClass('d-none', !loading);
  }

  function showAlert(msg, type = 'danger') {
    $('#login-alert')
      .removeClass('d-none alert-danger alert-success')
      .addClass('alert-' + type)
      .text(msg);
  }

  function hideAlert() {
    $('#login-alert').addClass('d-none');
  }
});

