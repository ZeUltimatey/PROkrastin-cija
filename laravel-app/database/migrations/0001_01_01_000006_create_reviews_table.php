<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Migration for the reviews table.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id('review_id');
            $table->unsignedBigInteger('reviewer_id');
            $table->foreign('reviewer_id')
                ->references('user_id')
                ->on('users');
            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')
                ->references('product_id')
                ->on('products');
            $table->unsignedBigInteger('attachments_id')->nullable();
            $table->foreign('attachments_id')
                ->references('attachments_id')
                ->on('attachment_groups');

            $table->text('content');
            $table->unsignedInteger('rating');
            $table->timestamps();
        });
    }

    /**
     * Reversing migration creation.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
