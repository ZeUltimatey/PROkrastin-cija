<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Migration for the transactions table.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id('transaction_id');
//            $table->unsignedBigInteger('transactor_id');
//            $table->foreign('transactor_id')
//                ->references('user_id')
//                ->on('users');
            $table->unsignedBigInteger('location_id')->nullable();
            $table->foreign('location_id')
                ->references('location_id')
                ->on('locations');

            $table->float('total_pricing');
            $table->text('check_content');
            $table->timestamps();
        });
    }

    /**
     * Reversing migration creation.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
