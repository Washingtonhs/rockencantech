<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name'       => 'Admin',
                'email'      => 'admin@rock.com',
                'password'   => Hash::make('Password@963'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Cliente Teste',
                'email'      => 'cliente@rock.com',
                'password'   => Hash::make('Password@963'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('users')->insert($users);
    }
}
