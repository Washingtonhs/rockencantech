/**
 * products.js — Lógica da página de listagem (index.html)
 */
$(document).ready(function () {

  // Estado da página
  let state = {
    page:       1,
    perPage:    16,
    categoryId: null,
    search:     '',
  };

  // ── Carregar categorias ──────────────────────────────────────────────────
  function loadCategories() {
    API.getCategories().done(function (res) {
      const $list = $('#category-list');

      res.data.forEach(function (cat) {
        $list.append(`
          <li class="list-group-item list-group-item-action d-flex align-items-center gap-2"
              data-id="${cat.id}" style="cursor:pointer">
            <i class="bi bi-tag text-primary"></i>${cat.name}
          </li>
        `);
      });

      // Evento de clique nas categorias
      $list.on('click', 'li', function () {
        $list.find('li').removeClass('active-cat');
        $(this).addClass('active-cat');
        state.categoryId = $(this).data('id') || null;
        state.page = 1;
        loadProducts();
      });
    });
  }

  // ── Carregar produtos ────────────────────────────────────────────────────
  function loadProducts() {
    $('#loading-spinner').removeClass('d-none');
    $('#products-grid').empty();
    $('#no-results').addClass('d-none');
    $('#pagination').empty();

    const params = { page: state.page, per_page: state.perPage };
    if (state.categoryId) params.category = state.categoryId;
    if (state.search)     params.search   = state.search;

    API.getProducts(params)
      .done(function (res) {
        $('#loading-spinner').addClass('d-none');

        const products = res.data;
        const meta     = res.meta;

        // Info de resultado
        $('#result-info').text(
          `Exibindo ${meta.from ?? 0}–${meta.to ?? 0} de ${meta.total} produto(s)`
        );

        if (!products.length) {
          $('#no-results').removeClass('d-none');
          return;
        }

        products.forEach(function (p) {
          $('#products-grid').append(buildProductCard(p));
        });

        buildPagination(meta);
      })
      .fail(function () {
        $('#loading-spinner').addClass('d-none');
        $('#products-grid').html(`
          <div class="col-12 text-center text-danger py-4">
            <i class="bi bi-exclamation-triangle me-2"></i>Erro ao carregar produtos. Tente novamente.
          </div>`);
      });
  }

  // ── Montar card de produto ───────────────────────────────────────────────
  function buildProductCard(p) {
    const price    = parseFloat(p.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const imgSrc   = p.image_url || 'https://picsum.photos/seed/' + p.id + '/400/300';
    const catName  = p.category ? p.category.name : '';

    return `
      <div class="col">
        <div class="card product-card shadow-sm h-100"
             onclick="window.location.href='product.html?id=${p.id}'">
          <div class="card-img-wrapper">
            <img src="${imgSrc}" class="card-img-top" alt="${p.name}"
                 onerror="this.src='https://picsum.photos/seed/${p.id}/400/300'" />
          </div>
          <div class="card-body d-flex flex-column">
            <span class="badge bg-primary bg-opacity-10 text-primary product-category-badge mb-2 align-self-start">
              ${catName}
            </span>
            <h6 class="card-title fw-bold mb-1 text-truncate-2">${p.name}</h6>
            <p class="card-text text-muted small flex-grow-1 text-truncate-2">${p.description}</p>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <span class="product-price">${price}</span>
              <button class="btn btn-primary btn-sm">
                <i class="bi bi-eye me-1"></i>Ver
              </button>
            </div>
          </div>
        </div>
      </div>`;
  }

  // ── Paginação ────────────────────────────────────────────────────────────
  function buildPagination(meta) {
    if (meta.last_page <= 1) return;

    const $ul = $('#pagination');

    // Anterior
    $ul.append(`
      <li class="page-item ${meta.current_page === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${meta.current_page - 1}">
          <i class="bi bi-chevron-left"></i>
        </a>
      </li>`);

    // Páginas
    for (let i = 1; i <= meta.last_page; i++) {
      if (
        i === 1 || i === meta.last_page ||
        (i >= meta.current_page - 2 && i <= meta.current_page + 2)
      ) {
        $ul.append(`
          <li class="page-item ${i === meta.current_page ? 'active' : ''}">
            <a class="page-link" href="#" data-page="${i}">${i}</a>
          </li>`);
      } else if (i === meta.current_page - 3 || i === meta.current_page + 3) {
        $ul.append('<li class="page-item disabled"><span class="page-link">…</span></li>');
      }
    }

    // Próximo
    $ul.append(`
      <li class="page-item ${meta.current_page === meta.last_page ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${meta.current_page + 1}">
          <i class="bi bi-chevron-right"></i>
        </a>
      </li>`);

    $ul.on('click', '.page-link', function (e) {
      e.preventDefault();
      const page = $(this).data('page');
      if (page && page !== state.page) {
        state.page = page;
        loadProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // ── Busca ────────────────────────────────────────────────────────────────
  let searchTimer;
  $('#search-input').on('input', function () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () {
      state.search = $('#search-input').val().trim();
      state.page   = 1;
      loadProducts();
    }, 500);
  });

  $('#btn-search').on('click', function () {
    state.search = $('#search-input').val().trim();
    state.page   = 1;
    loadProducts();
  });

  $('#search-input').on('keydown', function (e) {
    if (e.key === 'Enter') $('#btn-search').trigger('click');
  });

  // ── Per page ─────────────────────────────────────────────────────────────
  $('#per-page-select').on('change', function () {
    state.perPage = parseInt($(this).val());
    state.page    = 1;
    loadProducts();
  });

  // ── Init ─────────────────────────────────────────────────────────────────
  loadCategories();
  loadProducts();
});

