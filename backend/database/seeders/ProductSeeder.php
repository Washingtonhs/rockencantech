<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // Eletrônicos (category_id: 1)
            [
                'name'        => 'Smartphone XZ Pro',
                'description' => 'Smartphone top de linha com câmera 108MP e bateria de 5000mAh.',
                'price'       => 2999.99,
                'category_id' => 1,
                'image_url'   => 'https://picsum.photos/seed/phone/400/300',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'name'        => 'Notebook UltraSlim',
                'description' => 'Notebook leve com Intel i7, 16GB RAM e SSD de 512GB.',
                'price'       => 4599.90,
                'category_id' => 1,
                'image_url'   => 'https://picsum.photos/seed/laptop/400/300',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'name'        => 'Fone Bluetooth Pro',
                'description' => 'Fone com cancelamento de ruído ativo e 30h de bateria.',
                'price'       => 399.00,
                'category_id' => 1,
                'image_url'   => 'https://picsum.photos/seed/headphone/400/300',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'name'        => 'Smart TV 50"',
                'description' => 'TV 4K com Android TV integrado e HDR10+.',
                'price'       => 2199.00,
                'category_id' => 1,
                'image_url'   => 'https://picsum.photos/seed/tv/400/300',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            // Roupas (category_id: 2)
            [
                'name'        => 'Camiseta Premium',
                'description' => 'Camiseta 100% algodão penteado, disponível em várias cores.',
                'price'       => 89.90,
                'category_id' => 2,
                'image_url'   => 'https://picsum.photos/seed/shirt/400/300',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'name'        => 'Jaqueta Jeans',
                'description' => 'Jaqueta jeans estilo casual, confortável e durável.',
                'price'       => 259.00,
                'category_id' => 2,
                'image_url'   => 'https://picsum.photos/seed/jacket/400/300',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            // Livros (category_id: 3)
            [
                'name'        => 'Clean Code',
                'description' => 'Guia de boas práticas para escrever código limpo e sustentável.',
                'price'       => 79.90,
                'category_id' => 3,
                'image_url'   => 'https://picsum.photos/seed/book1/400/300',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'name'        => 'Domain-Driven Design',
                'description' => 'Referência clássica sobre arquitetura de software orientada a domínio.',
                'price'       => 99.90,
                'category_id' => 3,
                'image_url'   => 'https://picsum.photos/seed/book2/400/300',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            // Esportes (category_id: 4)
            [
                'name'        => 'Tênis Running X500',
                'description' => 'Tênis para corrida com amortecimento responsivo e cabedal respirável.',
                'price'       => 349.90,
                'category_id' => 4,
                'image_url'   => 'https://picsum.photos/seed/shoes/400/300',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'name'        => 'Bicicleta Speed 21v',
                'description' => 'Bicicleta leve com câmbio Shimano e quadro de alumínio.',
                'price'       => 1299.00,
                'category_id' => 4,
                'image_url'   => 'https://picsum.photos/seed/bike/400/300',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            // Casa e Jardim (category_id: 5)
            [
                'name'        => 'Jogo de Panelas Inox',
                'description' => 'Kit 5 peças em aço inoxidável com tampa de vidro temperado.',
                'price'       => 489.90,
                'category_id' => 5,
                'image_url'   => 'https://picsum.photos/seed/pan/400/300',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'name'        => 'Luminária LED Smart',
                'description' => 'Luminária inteligente com controle por aplicativo e 16 milhões de cores.',
                'price'       => 149.90,
                'category_id' => 5,
                'image_url'   => 'https://picsum.photos/seed/lamp/400/300',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
        ];

        DB::table('products')->insert($products);
    }
}
