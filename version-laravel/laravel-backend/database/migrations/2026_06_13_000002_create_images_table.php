<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('images', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 20);
            $table->string('type', 6);
            $table->integer('size');
            $table->binary('bin_img');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};
