<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TestSeeder extends Seeder
{
    /**
     * Add some products, cat_breeds, cats to the database.
     * Run the seeder by using `php artisan db:seed --class=TestSeeder --force`
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'id' => 1,
                'product_type' => 'Furniture',
                'display_name' => 'Cat Hammock Bed',
                'description' => 'Hanging bed for cats to relax and enjoy their nap time.',
                'pricing' => 45.00,
                'discount_pricing' => null,
                'stock' => 12,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'product_type' => 'Cat',
                'display_name' => 'Asteroid Destroyer',
                'description' => 'This kitten was found abandoned in the sewers of Seattle, Washington, D.C.',
                'pricing' => 1199.99,
                'discount_pricing' => 1200.00,
                'stock' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                "id" => 3,
                "product_type" => "Food",
                "display_name" => "Kaķu utilizators",
                "description" => "Pēc šī kaķis nebūs izsalcis ļoooooti ilgi..",
                "pricing" => 0.01,
                "discount_pricing" => null,
                "stock" => 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
                "updated_at" => now(),
                "created_at" => now(),
            ]
        ]);

        DB::table('cat_breeds')->insert([
            [
                'id' => 1,
                'display_name' => 'Munchkin',
                'breed_information' => 'A cat breed known for its short legs, black and white color combination and fur pattern. etc.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'display_name' => 'Maine Coon',
                'breed_information' => 'Maine Coons are one of the largest domesticated cat breeds, known for their tufted ears, bushy tails, and friendly personalities. They have a long, shaggy coat that helps them thrive in colder climates, and they are often described as "gentle giants." Their playful and sociable nature makes them great companions for families.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'display_name' => 'Bengal',
                'breed_information' => 'Bengal cats are known for their striking spotted or marbled coat, resembling that of a wild leopard. They are energetic, playful, and highly intelligent, often requiring stimulation and interaction. Bengals have a strong, athletic build and are known for their love of water, often playing in sinks or bathtubs.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'display_name' => 'Siamese',
                'breed_information' => 'Siamese cats are one of the oldest and most recognizable breeds, known for their striking blue almond-shaped eyes, short coat, and distinctive color points on their ears, face, paws, and tail. They are social, vocal, and affectionate, often forming strong bonds with their human companions. Siamese cats are intelligent and can be trained to perform tricks or respond to commands.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        DB::table('cats')->insert([
            [
                'id' => 2,
                'breed_id' => 1,
                'birthdate' => '2021-09-11',
                'color' => 'Black and White',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        DB::table('users')->insert([
            [
                'id' => 1,
                'email' => 'admin@murratava.lv',
                'password' => Hash::make('safe123'),
                'display_name' => 'Admin',
                'name' => 'Admin',
                'surname' => 'Admin',
                'phone_number' => '+37125565817',
                'user_role' => 'Admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'email' => 'vardsuzvards@gmail.com',
                'password' => Hash::make('asd'),
                'display_name' => 'Vards Uzvards',
                'name' => 'Vards',
                'surname' => 'Uzvards',
                'phone_number' => '+37125565816',
                'user_role' => 'User',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        DB::table('reviews')->insert([
            [
                'id' => 1,
                'reviewer_id' => 2,
                'product_id' => 1,
                'content' => 'Wow very good bed for me, my cat doesn\'t like it though..',
                'rating' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        DB::table('card_information')->insert([
            [
                'id' => 1,
                'cardholder_id' => 2,
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
                'id' => 1,
                'creator_id' => 2,
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
                'id' => 1,
                'transactor_id' => 2,
                'location_id' => 1,
                'total_pricing' => 45.00,
                'check_content' => '1x CAT HAMMOCK BED\t45.00 EUR\n------------------------------\nTOTAL:\t45.00 EUR\n\nTHANK YOU FOR SHOPPING AT MURRĀTAVA!',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        DB::table('bought_products')->insert([
            [
                'product_id' => 1,
                'transaction_id' => 1,
                'display_name' => 'Cat Hammock Bed',
                'amount' => 2,
                'price_per_product' => 45.00,
                'total_price' => 90.00,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        DB::table('selected_products')->insert([
            [
                'id' => 1,
                'user_id' => 2,
                'product_id' => 1,
                'amount' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'user_id' => 2,
                'product_id' => 2,
                'amount' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
