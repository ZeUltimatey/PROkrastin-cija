<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Migration for the cat_breeds table.
     */
    public function up(): void
    {
        Schema::create('cat_breeds', function (Blueprint $table) {
            $table->id();
            $table->string('display_name');
            $table->text('feeding_info');
            $table->text('personality_info');
            $table->text('environment_info');
            $table->text('tips_info');
            $table->timestamps();
        });
    }

    /**
     * Reversing migration creation.
     */
    public function down(): void
    {
        Schema::dropIfExists('cat_breeds');
    }
};
