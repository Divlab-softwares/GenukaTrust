<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReviewLink extends Model
{
    protected $table = 'reviews_links';

    protected $fillable = [
        'order_id',
        'link',
    ];
}
