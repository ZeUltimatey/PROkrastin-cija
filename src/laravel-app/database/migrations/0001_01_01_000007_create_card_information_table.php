<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Migration for the card_information table.
     */
    public function up(): void
    {
        Schema::create('card_information', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cardholder_id');
            $table->foreign('cardholder_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->string('card_number');
            $table->string('expiration_date');
            $table->string('card_name');
            $table->string('cardOwnerName');
            $table->string('cardOwnerSurname');
            $table->timestamps();
        });
    }

    /**
     * Reversing migration creation.
     */
    public function down(): void
    {
        Schema::dropIfExists('card_information');
    }
};
