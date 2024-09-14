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
                'amount' => 12,
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
                'amount' => 1,
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

        DB::table('reviews')->insert([
            [
                'review_id' => 1,
                'product_id' => 1,
                'content' => 'Wow very good bed for me, my cat doesn\'t like it though..',
                'rating' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        DB::table('card_information')->insert([
            [
                'card_id' => 1,
                'card_number' => '5550130966726224',
                'expiration_date' => '12/24',
                'cvc_number' => '271',
                'card_name' => 'RYAN GOSLING',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        DB::table('locations')->insert([
            [
                'location_id' => 1,
                'city' => 'Washington',
                'street' => '2608 84th Street Ct S',
                'apartment_number' => null,
                'zip_code' => '98499',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        DB::table('transactions')->insert([
            [
                'transaction_id' => 1,
                'location_id' => 1,
                'total_pricing' => 45.00,
                'check_content' => '1x CAT HAMMOCK BED\t45.00 EUR\n------------------------------\nTOTAL:\t45.00 EUR\n\nTHANK YOU FOR SHOPPING AT MURRĀTUVE!',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
