<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('images', function (Blueprint $table) {
            $table->id('image_id');
            $table->unsignedBigInteger('attachments_id')->nullable();
            $table->foreign('attachments_id')
                ->references('attachments_id')
                ->on('attachment_groups');

//            $table->string('filepath');
            $table->binary('image_binary'); // sqlite 1GB limitation, mysql 65kb
            $table->string('resolution');
            $table->unsignedInteger('filesize');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};
