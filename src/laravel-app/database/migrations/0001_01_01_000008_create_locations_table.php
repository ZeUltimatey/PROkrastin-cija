<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Migration for the locations table.
     */
    public function up(): void
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('creator_id');
            $table->foreign('creator_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->string('city');
            $table->string('street');
            $table->string('apartment_number')->nullable();
            $table->string('zip_code');
            $table->string('location_name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reversing migration creation.
     */
    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};
