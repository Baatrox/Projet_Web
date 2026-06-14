<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('etudiants', function (Blueprint $table) {
            $table->increments('id');
            $table->string('login', 20);
            $table->string('pass', 256);
            $table->string('nom', 20);
            $table->integer('note1');
            $table->integer('note2');
            $table->float('moyenne');
            $table->float('longitude');
            $table->float('latitude');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('etudiants');
    }
};
