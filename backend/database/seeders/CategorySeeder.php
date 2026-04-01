<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Eletrônicos',   'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Roupas',        'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Livros',        'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Esportes',      'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Casa e Jardim', 'created_at' => now(), 'updated_at' => now()],
        ];

        DB::table('categories')->insert($categories);
    }
}
