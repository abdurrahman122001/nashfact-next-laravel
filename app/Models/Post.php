<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'title', 'content', 'categories', 'status'];

    /**
     * Cast categories column to an array for automatic JSON serialization/deserialization.
     */
    protected $casts = [
        'categories' => 'array',
    ];

    // Thumbnail relationship
    public function thumbnail()
    {
        return $this->hasOne(Thumbnail::class);
    }
}
