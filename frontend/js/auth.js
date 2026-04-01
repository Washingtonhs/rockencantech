/**
 * auth.js — Gerenciamento de sessão e navbar dinâmica
 */
const Auth = (function () {

  function getToken()    { return localStorage.getItem('auth_token'); }
  function getUser()     { try { return JSON.parse(localStorage.getItem('auth_user')); } catch { return null; } }
  function isLoggedIn()  { return !!getToken(); }

  function saveSession(token, user) {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user',  JSON.stringify(user));
  }

  function clearSession() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }

  function logout() {
    API.logout().always(function () {
      clearSession();
      window.location.href = 'login.html';
    });
  }

  /** Renderiza a área de auth na navbar */
  function renderNavbar() {
    const $area = $('#nav-auth-area');
    if (!$area.length) return;

    if (isLoggedIn()) {
      const user = getUser();
      $area.html(`
        <span class="text-white small me-2">
          <i class="bi bi-person-circle me-1"></i>${user ? user.name : 'Usuário'}
        </span>
        <button class="btn btn-outline-light btn-sm" id="btn-logout">
          <i class="bi bi-box-arrow-right me-1"></i>Sair
        </button>
      `);
      $('#btn-logout').on('click', logout);
    } else {
      $area.html(`
        <a href="login.html"    class="btn btn-outline-light btn-sm me-1">
          <i class="bi bi-box-arrow-in-right me-1"></i>Entrar
        </a>
        <a href="register.html" class="btn btn-warning btn-sm fw-bold">
          <i class="bi bi-person-plus me-1"></i>Cadastrar
        </a>
      `);
    }
  }

  // Inicializa navbar ao carregar o DOM
  $(document).ready(renderNavbar);

  return { getToken, getUser, isLoggedIn, saveSession, clearSession, logout, renderNavbar };
})();

