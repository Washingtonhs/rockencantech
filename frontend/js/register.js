/**
 * register.js — Lógica da página de cadastro (register.html)
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

  // Medidor de força de senha
  $('#password').on('input', function () {
    const val = $(this).val();
    if (!val) {
      $('#password-strength-wrapper').hide();
      return;
    }
    $('#password-strength-wrapper').show();

    let score = 0;
    if (val.length >= 8)          score++;
    if (/[A-Z]/.test(val))        score++;
    if (/[a-z]/.test(val))        score++;
    if (/[0-9]/.test(val))        score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const levels = [
      { label: 'Muito fraca', color: 'bg-danger',  pct: 20 },
      { label: 'Fraca',       color: 'bg-warning', pct: 40 },
      { label: 'Média',       color: 'bg-info',    pct: 60 },
      { label: 'Forte',       color: 'bg-primary', pct: 80 },
      { label: 'Muito forte', color: 'bg-success', pct: 100 },
    ];
    const level = levels[Math.max(0, score - 1)];

    $('#password-strength-bar')
      .attr('class', 'progress-bar ' + level.color)
      .css('width', level.pct + '%');
    $('#password-strength-label').text(level.label);
  });

  // Submit
  $('#register-form').on('submit', function (e) {
    e.preventDefault();

    const name     = $('#name').val().trim();
    const email    = $('#email').val().trim();
    const password = $('#password').val();
    const confirm  = $('#password_confirmation').val();

    let valid = true;

    if (!name) {
      $('#name').addClass('is-invalid'); valid = false;
    } else {
      $('#name').removeClass('is-invalid').addClass('is-valid');
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      $('#email').addClass('is-invalid'); valid = false;
    } else {
      $('#email').removeClass('is-invalid').addClass('is-valid');
    }

    if (!password || password.length < 8) {
      $('#password').addClass('is-invalid'); valid = false;
    } else {
      $('#password').removeClass('is-invalid').addClass('is-valid');
    }

    if (password !== confirm) {
      $('#password_confirmation').addClass('is-invalid'); valid = false;
    } else {
      $('#password_confirmation').removeClass('is-invalid').addClass('is-valid');
    }

    if (!valid) return;

    setLoading(true);
    hideAlert();

    API.register({ name, email, password, password_confirmation: confirm })
      .done(function (res) {
        Auth.saveSession(res.data.token, res.data.user);
        showAlert('Conta criada com sucesso! Redirecionando...', 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 1200);
      })
      .fail(function (xhr) {
        setLoading(false);
        const errors  = xhr.responseJSON?.errors;
        const message = xhr.responseJSON?.message || 'Erro ao criar conta.';

        if (errors) {
          // Exibe erros de validação do Laravel nos campos
          Object.keys(errors).forEach(function (field) {
            const $field = $('#' + field);
            if ($field.length) {
              $field.addClass('is-invalid');
              $field.siblings('.invalid-feedback').text(errors[field][0]);
            }
          });
        }
        showAlert(message, 'danger');
      });
  });

  function setLoading(loading) {
    $('#btn-register').prop('disabled', loading);
    $('#register-spinner').toggleClass('d-none', !loading);
  }

  function showAlert(msg, type = 'danger') {
    $('#register-alert')
      .removeClass('d-none alert-danger alert-success alert-info')
      .addClass('alert-' + type)
      .text(msg);
  }

  function hideAlert() {
    $('#register-alert').addClass('d-none');
  }
});

