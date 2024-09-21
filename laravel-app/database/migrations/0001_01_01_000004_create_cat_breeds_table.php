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
            $table->id('breed_id');
            $table->unsignedBigInteger('attachments_id')->nullable();
            $table->foreign('attachments_id')
                ->references('attachments_id')
                ->on('attachment_groups');

            $table->string('display_name');
            $table->text('breed_information');
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
