<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        // Define the product types as an array
        $productTypes = ['FOOD', 'FURNITURE', 'ACCESSORIES', 'CARE'];

        return [
            'product_type' => $this->faker->randomElement($productTypes),
            'display_name' => $this->faker->sentence($this->faker->numberBetween(1, 3)),
            'description' => $this->faker->text($this->faker->numberBetween(200, 65535)),
            'pricing' => $this->faker->randomFloat(2, 10, 1000),
            'discount_pricing' => $this->faker->optional()->randomFloat(2, 5, 999.99),
            'stock' => $this->faker->numberBetween(0, 100),
        ];
    }
}
