/**
 * product-detail.js — Lógica da página de detalhe (product.html)
 */
$(document).ready(function () {

  // Pega o ID da URL: product.html?id=3
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));

  if (!id) {
    showError();
    return;
  }

  API.getProduct(id)
    .done(function (res) {
      const p = res.data;

      const price   = parseFloat(p.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      const imgSrc  = p.image_url || 'https://picsum.photos/seed/' + p.id + '/400/300';
      const catName = p.category ? p.category.name : 'Sem categoria';

      // Breadcrumb
      $('#bc-category').html(
        p.category
          ? `<a href="index.html?category=${p.category.id}">${catName}</a>`
          : catName
      );
      $('#bc-product').text(p.name);

      // Preenche a página
      $('#product-image').attr({ src: imgSrc, alt: p.name })
        .on('error', function () {
          $(this).attr('src', 'https://picsum.photos/seed/' + p.id + '/400/300');
        });

      $('#product-category-badge').text(catName);
      $('#product-name').text(p.name);
      $('#product-price').text(price);
      $('#product-description').text(p.description);

      // Atualiza título da aba
      document.title = 'ShopCatalog | ' + p.name;

      // Exibe
      $('#loading-spinner').addClass('d-none');
      $('#product-detail').removeClass('d-none');
    })
    .fail(function () {
      showError();
    });

  function showError() {
    $('#loading-spinner').addClass('d-none');
    $('#product-error').removeClass('d-none');
  }
});

