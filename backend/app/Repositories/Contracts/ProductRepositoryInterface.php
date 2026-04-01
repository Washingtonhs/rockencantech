<?php

namespace App\Repositories\Contracts;

interface ProductRepositoryInterface
{
    public function getAll(int $perPage = 15, ?int $categoryId = null, ?string $search = null);
    public function findById(int $id);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id): bool;
}

