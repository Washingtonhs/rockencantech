/**
 * api.js — Módulo central de comunicação com a API Laravel
 */
const API = (function () {
  const BASE_URL = 'http://localhost:8000/api';

  /** Retorna os headers padrão, incluindo token se existir */
  function getHeaders() {
    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' };
    const token = localStorage.getItem('auth_token');
    if (token) headers['Authorization'] = 'Bearer ' + token;
    return headers;
  }

  /**
   * Método base de requisição
   * @param {string} method  - GET | POST | PUT | DELETE
   * @param {string} endpoint
   * @param {object|null} body
   * @returns {Promise}
   */
  function request(method, endpoint, body = null) {
    const options = { method, headers: getHeaders() };
    if (body) options.body = JSON.stringify(body);

    return $.ajax({
      url: BASE_URL + endpoint,
      method,
      headers: getHeaders(),
      contentType: 'application/json',
      data: body ? JSON.stringify(body) : undefined,
      dataType: 'json',
    });
  }

  return {
    get:    (endpoint)        => request('GET',    endpoint),
    post:   (endpoint, body)  => request('POST',   endpoint, body),
    put:    (endpoint, body)  => request('PUT',    endpoint, body),
    delete: (endpoint)        => request('DELETE', endpoint),

    // Atalhos semânticos
    getProducts(params = {}) {
      const qs = $.param(params);
      return this.get('/products' + (qs ? '?' + qs : ''));
    },
    getProduct(id)         { return this.get('/products/' + id); },
    getCategories()        { return this.get('/categories'); },
    login(data)            { return this.post('/login', data); },
    register(data)         { return this.post('/register', data); },
    logout()               { return this.post('/logout'); },
    me()                   { return this.get('/me'); },
  };
})();

