<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Http\Traits\ApiResponse;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use ApiResponse;

    public function __construct(protected ProductService $productService) {}

    public function index(Request $request): ProductCollection
    {
        $perPage    = (int) $request->get('per_page', 15);
        $categoryId = $request->get('category') ? (int) $request->get('category') : null;
        $search     = $request->get('search');

        $products = $this->productService->listProducts($perPage, $categoryId, $search);

        return new ProductCollection($products);
    }

    public function show(int $id): JsonResponse
    {
        $product = $this->productService->getProduct($id);

        return $this->success(new ProductResource($product));
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'        => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'price'       => ['required', 'numeric', 'min:0'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'image_url'   => ['nullable', 'url', 'max:2048'],
        ]);

        $product = $this->productService->createProduct($validated);

        return $this->created(new ProductResource($product->load('category')), 'Produto criado com sucesso.');
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'name'        => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'string'],
            'price'       => ['sometimes', 'numeric', 'min:0'],
            'category_id' => ['sometimes', 'integer', 'exists:categories,id'],
            'image_url'   => ['nullable', 'url', 'max:2048'],
        ]);

        $product = $this->productService->updateProduct($id, $validated);

        return $this->success(new ProductResource($product->load('category')), 'Produto atualizado com sucesso.');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->productService->deleteProduct($id);

        return $this->success(null, 'Produto excluído com sucesso.');
    }
}

