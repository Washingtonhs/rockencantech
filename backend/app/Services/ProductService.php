<?php

namespace App\Services;

use App\Repositories\Contracts\ProductRepositoryInterface;

class ProductService
{
    public function __construct(protected ProductRepositoryInterface $productRepository) {}

    public function listProducts(int $perPage = 15, ?int $categoryId = null, ?string $search = null)
    {
        return $this->productRepository->getAll($perPage, $categoryId, $search);
    }

    public function getProduct(int $id)
    {
        return $this->productRepository->findById($id);
    }

    public function createProduct(array $data)
    {
        // Regra de negócio: formata o preço garantindo 2 casas decimais
        if (isset($data['price'])) {
            $data['price'] = round((float) $data['price'], 2);
        }

        return $this->productRepository->create($data);
    }

    public function updateProduct(int $id, array $data)
    {
        if (isset($data['price'])) {
            $data['price'] = round((float) $data['price'], 2);
        }

        return $this->productRepository->update($id, $data);
    }

    public function deleteProduct(int $id): bool
    {
        return $this->productRepository->delete($id);
    }
}

