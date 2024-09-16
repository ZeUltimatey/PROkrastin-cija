<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Migration for the attachment_groups table.
     */
    public function up(): void
    {
        Schema::create('attachment_groups', function (Blueprint $table) {
            $table->id('attachments_id');

            $table->unsignedInteger('image_amount');
            $table->timestamps();
        });
    }

    /**
     * Reversing migration creation.
     */
    public function down(): void
    {
        Schema::dropIfExists('attachment_groups');
    }
};
