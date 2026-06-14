<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $table = 'images';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'name', 'type', 'size', 'bin_img',
    ];
}
