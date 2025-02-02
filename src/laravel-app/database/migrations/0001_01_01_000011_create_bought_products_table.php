<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bought_products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('transaction_id');
            $table->foreign('product_id')
                ->references('id')
                ->on('products');
            $table->foreign('transaction_id')
                ->references('id')
                ->on('transactions')
                ->onDelete('cascade');

            $table->string('display_name');
            $table->enum('product_type', ['UNLISTED', 'CATS', 'ACCESSORIES', 'FOOD', 'CARE', 'TOYS', 'FURNITURE']);
            $table->unsignedInteger('amount');
            $table->float('price_per_product');
            $table->float('total_price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bought_products');
    }
};
