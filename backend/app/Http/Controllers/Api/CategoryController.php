<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\CategoryResource;
use App\Http\Traits\ApiResponse;
use App\Services\CategoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    use ApiResponse;

    public function __construct(protected CategoryService $categoryService) {}

    public function index(): CategoryCollection
    {
        $categories = $this->categoryService->listCategories();
        return new CategoryCollection($categories);
    }

    public function show(int $id): JsonResponse
    {
        $category = $this->categoryService->getCategory($id);
        return $this->success(new CategoryResource($category));
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:categories'],
        ]);

        $category = $this->categoryService->createCategory($validated);

        return $this->created(new CategoryResource($category), 'Categoria criada com sucesso.');
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:categories,name,' . $id],
        ]);

        $category = $this->categoryService->updateCategory($id, $validated);

        return $this->success(new CategoryResource($category), 'Categoria atualizada com sucesso.');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->categoryService->deleteCategory($id);
        return $this->success(null, 'Categoria excluída com sucesso.');
    }
}

