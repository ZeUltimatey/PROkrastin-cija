<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Migration for the cats table.
     */
    public function up(): void
    {
        Schema::create('cats', function (Blueprint $table) {
            $table->unsignedBigInteger('cat_id');  // mazs apjukums par šo
            $table->primary('cat_id');
            $table->foreign('cat_id')
                ->references('id')
                ->on('products')
                ->onDelete('cascade'); // delete cat if base product was deleted

            $table->unsignedBigInteger('breed_id');
            $table->foreign('breed_id')
                ->references('id')
                ->on('cat_breeds');

            $table->date('birthdate');
            $table->string('color');
            $table->timestamps();
        });
    }

    /**
     * Reversing migration creation.
     */
    public function down(): void
    {
        Schema::dropIfExists('cats');
    }
};
