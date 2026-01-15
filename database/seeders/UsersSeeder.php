<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'names' => 'Admin User',
            'email' => 'admin@agentdesk.com',
            'password' => Hash::make('admin12345'),
            'role' => User::ADMIN,
            'status' => User::ACTIVE,
            'email_verified_at' => now(),
        ]);

        // Create 14 manager users
        for ($i = 1; $i <= 14; $i++) {
            User::create([
                'names' => fake()->name(),
                'email' => fake()->unique()->safeEmail(),
                'password' => Hash::make('password'),
                'role' => User::MANAGER,
                'status' => User::ACTIVE,
                'email_verified_at' => now(),
            ]);
        }
    }
}
