<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Etudiant extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'etudiants';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'login', 'pass', 'nom', 'note1', 'note2', 'moyenne', 'longitude', 'latitude',
    ];

    protected $hidden = [
        'pass',
    ];

    protected $casts = [
        'note1' => 'integer',
        'note2' => 'integer',
        'moyenne' => 'float',
        'longitude' => 'float',
        'latitude' => 'float',
    ];
}
