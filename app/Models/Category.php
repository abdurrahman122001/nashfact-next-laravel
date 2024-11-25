<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    // Specify the table name if it doesn't follow Laravel's naming convention
    protected $table = 'categories';

    // Specify the primary key if it is not "id"
    protected $primaryKey = 'id';

    // Define the fields that are mass assignable
    protected $fillable = [
        'name',
        'category_slug',
        'created_at',
        'updated_at',
    ];

    // Optionally, disable timestamps if not used in the table
    // public $timestamps = false;
}
