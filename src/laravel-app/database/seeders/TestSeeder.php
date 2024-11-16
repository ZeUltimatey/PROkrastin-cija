<?php

namespace Database\Seeders;
//namespace Database\Factories;

use App\Models\BoughtProducts;
use App\Models\CardInformation;
use App\Models\Cat;
use App\Models\CatBreed;
use App\Models\Location;
use App\Models\Review;
use App\Models\Transaction;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Product;

class TestSeeder extends Seeder
{
    /**
     * Add some products, cat_breeds, cats to the database.
     * Run the seeder by using `php artisan db:seed --class=TestSeeder --force`
     */
    public function run(): void
    {

        Product::create([
            'product_type' => 'FURNITURE',
            'display_name' => 'Cat Hammock Bed',
            'description' => 'Hanging bed for cats to relax and enjoy their nap time.',
            'pricing' => 45.00,
            'discount_pricing' => null,
            'stock' => 12,
        ]);
        Product::create([
            'product_type' => 'CATS',
            'display_name' => 'Asteroid Destroyer',
            'description' => 'This kitten was found abandoned in the sewers of Seattle, Washington, D.C.',
            'pricing' => 1200.00,
            'discount_pricing' => 69.99,
            'stock' => 1,
        ]);
        Product::create([
            "product_type" => "FOOD",
            "display_name" => "Kaķu utilizators",
            "description" => "Pēc šī kaķis nebūs izsalcis ļoooooti ilgi..",
            "pricing" => 0.01,
            "discount_pricing" => null,
            "stock" => 9999999,
        ]);

        Product::create([
            "product_type" => "FURNITURE",
            "display_name" => "Cat Scratching Post",
            "description" => "Durable scratching post for cats to keep their claws healthy.",
            "pricing" => 29.99,
            "discount_pricing" => null,
            "stock" => 5,
        ]);
        Product::create([
            "product_type" => "TOYS",
            "display_name" => "Catnip Mouse Toy",
            "description" => "Soft, plush mouse toy filled with premium catnip.",
            "pricing" => 5.99,
            "discount_pricing" => null,
            "stock" => 6836,
        ]);
        Product::create([
            "product_type" => "FOOD",
            "display_name" => "Automatic Cat Feeder",
            "description" => "Programmable feeder for portion-controlled meals.",
            "pricing" => 89.99,
            "discount_pricing" => null,
            "stock" => 4220,
        ]);
        Product::create([
            "product_type" => "FURNITURE",
            "display_name" => "Cat Hammock Bed",
            "description" => "Hanging bed for cats to relax and enjoy their nap time.",
            "pricing" => 45.99,
            "discount_pricing" => null,
            "stock" => 1485,
        ]);
        Product::create([
            "product_type" => "FURNITURE",
            "display_name" => "Self-Cleaning Litter Box",
            "description" => "Automatic litter box that cleans itself after each use.",
            "pricing" => 159.99,
            "discount_pricing" => null,
            "stock" => 4580,
        ]);
        Product::create([
            "product_type" => "FURNITURE",
            "display_name" => "Cat Window Perch",
            "description" => "Comfortable window-mounted seat for cats to watch the outside world.",
            "pricing" => 35.99,
            "discount_pricing" => null,
            "stock" => 7187,
        ]);
        Product::create([
            "product_type" => "FOOD",
            "display_name" => "Cat Water Fountain",
            "description" => "Flowing water fountain to encourage hydration.",
            "pricing" => 25.99,
            "discount_pricing" => null,
            "stock" => 550,
        ]);
        Product::create([
            "product_type" => "TOYS",
            "display_name" => "Laser Pointer Toy",
            "description" => "Interactive laser pointer to keep cats entertained.",
            "pricing" => 12.99,
            "discount_pricing" => null,
            "stock" => 4359,
        ]);
        Product::create([
            "product_type" => "FURNITURE",
            "display_name" => "Cat Carrier Bag",
            "description" => "Comfortable, lightweight carrier for transporting your cat.",
            "pricing" => 49.99,
            "discount_pricing" => null,
            "stock" => 6774,
        ]);
        Product::create([
            "product_type" => "FURNITURE",
            "display_name" => "Cat Grooming Glove",
            "description" => "Silicone grooming glove to gently remove loose fur while petting.",
            "pricing" => 15.99,
            "discount_pricing" => null,
            "stock" => 8001,
        ]);
        Product::create([
            "product_type" => "FURNITURE",
            "display_name" => "Cat Tree with Hideaway",
            "description" => "Multi-level cat tree with hideaway spots and scratching posts.",
            "pricing" => 110.99,
            "discount_pricing" => null,
            "stock" => 914,
        ]);
        Product::create([
            "product_type" => "TOYS",
            "display_name" => "Organic Catnip",
            "description" => "100% organic, high-quality catnip for playtime.",
            "pricing" => 7.99,
            "discount_pricing" => null,
            "stock" => 7620,
        ]);
//        Product::factory()->count(1000)->create();

        CatBreed::create([
            "display_name" => "Munchkin",
            "feeding_info" => "Munchkins should be fed high-quality cat food that provides balanced nutrition. They enjoy both wet and dry food, with a focus on protein-rich ingredients.",
            "personality_info" => "Munchkins are known for their playful and outgoing nature. They are friendly, sociable, and tend to get along well with children and other pets.",
            "environment_info" => "They thrive in indoor environments but appreciate having safe outdoor access if possible. They enjoy interactive toys and need space to play and explore.",
            "tips_info" => "Regular playtime is essential to keep them stimulated. Provide scratching posts and climbing structures to satisfy their natural instincts.",
        ]);
        CatBreed::create([
            "display_name" => "Maine Coon",
            "feeding_info" => "Maine Coons require a diet rich in protein and fat to support their large size. High-quality dry food and occasional wet food will keep them healthy.",
            "personality_info" => "They are gentle giants, known for their affectionate and playful demeanor. Maine Coons are intelligent and can be trained to follow commands.",
            "environment_info" => "These cats adapt well to various living situations but prefer a home where they have space to roam. They enjoy being around people and can be quite social.",
            "tips_info" => "Regular grooming is necessary to prevent matting in their long fur. Ensure they have plenty of toys to engage their curiosity.",
        ]);
        CatBreed::create([
            "display_name" => "Bengal",
            "feeding_info" => "Bengals benefit from a high-protein diet that mimics their wild ancestors. Look for grain-free options and high-quality meat-based foods.",
            "personality_info" => "Bengals are energetic, playful, and highly intelligent. They are known for their love of climbing and exploring, often requiring a lot of stimulation.",
            "environment_info" => "They thrive in active households where they have opportunities to play and explore. Providing vertical spaces and interactive toys is essential.",
            "tips_info" => "Invest in durable toys as they tend to be rough players. Spend time engaging with them daily to keep their energy levels in check.",
        ]);
        CatBreed::create([
            "display_name" => "Siamese",
            "feeding_info" => "Siamese cats thrive on a balanced diet that includes both wet and dry food. Make sure the food is rich in protein and low in fillers.",
            "personality_info" => "Siamese are vocal and social cats that enjoy interacting with their human companions. They are affectionate and can form strong bonds with their owners.",
            "environment_info" => "They do well in households where they are not left alone for long periods. Siamese cats appreciate companionship, whether from humans or other pets.",
            "tips_info" => "Provide mental stimulation through toys and puzzles. Regular social interaction is important to keep them happy and engaged.",
        ]);

        Cat::create([
            "id" => 2,
            "breed_id" => 1,
            "birthdate" => "2021-09-11",
            "color" => "Black and White"
        ]);

        User::create([
            'email' => 'admin@murratava.lv',
            'password' => Hash::make('safe123'),
            'display_name' => 'Admin',
            'name' => 'Admin',
            'surname' => 'Admin',
            'phone_number' => '+37125565817',
            'user_role' => 'Admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        User::create([
            'email' => 'vardsuzvards@gmail.com',
            'password' => Hash::make('asd'),
            'display_name' => 'Vards Uzvards',
            'name' => 'Vards',
            'surname' => 'Uzvards',
            'phone_number' => '+37125565816',
            'user_role' => 'User',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Review::create([
            "reviewer_id" => 2,
            "product_id" => 1,
            "content" => "Wow very good bed for me, my cat doesn\'t like it though..",
            "is_anonymous" => false,
            "rating" => 3,
        ]);
        Review::create([
            "reviewer_id" => 1,
            "product_id" => 1,
            "content" => "My cat likes it, I can't sleep at night because she is snoring in it. But good product 👍",
            "is_anonymous" => false,
            "rating" => 5,
        ]);
        Review::create([
            "reviewer_id" => 2,
            "product_id" => 1,
            "content" => "I am anonymous",
            "is_anonymous" => true,
            "rating" => 5,
        ]);

        CardInformation::create([
            "cardholder_id" => 2,
            "card_number" => Crypt::encryptString('5550130966726224'),
            "expiration_date" => Crypt::encryptString('12/24'),
            "card_name" => "Visa",
            "cardOwnerName" => "RYAN",
            "cardOwnerSurname" => "GOSLING",
        ]);

        Location::create([
            "creator_id" => 1,
            "city" => "Rīga",
            "street" => "Krišjāņa Valdemāra iela 1C",
            "apartment_number" => null,
            "location_name" => "Rīgas Valsts tehnikums",
            "zip_code" => "LV-1010",
        ]);
        Location::create([
            "creator_id" => 2,
            "city" => "Washington",
            "street" => "2608 84th Street Ct S",
            "apartment_number" => null,
            "location_name" => "My house",
            "zip_code" => "98499",
        ]);

        Transaction::create([
            "transactor_id" => 1,
            "location_id" => 1,
            "total_pricing" => 159.99,
            "check_content" => "2x CAT HAMMOCK BED\t90.00 EUR\n1x ASTEROID DESTROYER\t69.99 EUR\n------------------------------\nTOTAL:\t159.99 EUR\n\nTHANK YOU FOR SHOPPING AT MURRĀTAVA!",
        ]);
        Transaction::create([
            "transactor_id" => 2,
            "location_id" => 1,
            "total_pricing" => 45.00,
            "check_content" => "1x CAT HAMMOCK BED\t45.00 EUR\n------------------------------\nTOTAL:\t45.00 EUR\n\nTHANK YOU FOR SHOPPING AT MURRĀTAVA!",
        ]);

        BoughtProducts::create([
            "product_id" => 1,
            "transaction_id" => 1,
            "display_name" => 'Cat Hammock Bed',
            "amount" => 2,
            "price_per_product" => 45.00,
            "total_price" => 90.00,
        ]);
        BoughtProducts::create([
            "product_id" => 2,
            "transaction_id" => 1,
            "display_name" => 'Asteroid Destroyer',
            "amount" => 1,
            "price_per_product" => 69.99,
            "total_price" => 69.99,
        ]);


        DB::table('product_images')->insert([
             [
                 'product_id' => 1,
                 'url' => '/storage/images/profile/6R7ftJWczFUuQHDax5L8x3p63YJe5HyyXge7YRpA.jpg',
                 'created_at' => now(),
                 'updated_at' => now(),
             ]
        ]);

        // DB::table('selected_products')->insert([
        //     [
        //         'id' => 1,
        //         'user_id' => 2,
        //         'product_id' => 1,
        //         'amount' => 3,
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        //     [
        //         'id' => 2,
        //         'user_id' => 2,
        //         'product_id' => 2,
        //         'amount' => 1,
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        // ]);
    }
}
