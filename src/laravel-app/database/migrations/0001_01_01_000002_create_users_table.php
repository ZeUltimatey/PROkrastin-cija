<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Migration for the users table.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('image_url')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('display_name');
            $table->string('name');
            $table->string('surname');
            $table->string('phone_number')->nullable(); // temp nullable because frontend
            $table->enum('user_role', ['User', 'Admin'])->default('User');
            $table->boolean('display_lowest_price')->nullable();
            $table->boolean('display_only_available')->nullable();
            $table->boolean('recieve_notifications')->nullable();
            $table->boolean('deactivated')->default(false);
            $table->boolean('deleted')->default(false);
            $table->timestamps();
            $table->timestamp('email_verified_at')->nullable();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index()->onDelete('cascade');
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
