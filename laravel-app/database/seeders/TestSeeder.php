<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestSeeder extends Seeder
{
    /**
     * Add some products, cat_breeds, cats to the database.
     * Run the seeder by using `php artisan db:seed --class=TestSeeder`
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'product_id' => 1,
                'product_type' => 'Furniture',
                'display_name' => 'Cat Hammock Bed',
                'description' => 'Hanging bed for cats to relax and enjoy their nap time.',
                'pricing' => 45.00,
                'discount_pricing' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 2,
                'product_type' => 'Cat',
                'display_name' => 'Asteroid Destroyer',
                'description' => 'This kitten was found abandoned in the sewers of Seattle, Washington, D.C.',
                'pricing' => 1199.99,
                'discount_pricing' => 1200.00,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        DB::table('cat_breeds')->insert([
            [
                'breed_id' => 1,
                'display_name' => 'Munchkin',
                'breed_information' => 'A cat breed known for its short legs, black and white color combination and fur pattern. etc.',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        DB::table('cats')->insert([
            [
                'cat_id' => 2,
                'breed_id' => 1,
                'birthdate' => '2021-09-11',
                'color' => 'Black and White',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
