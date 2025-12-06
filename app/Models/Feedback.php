<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $fillable = [
        'order_id',
        'customer_id',
        'rating',
        'comment'
    ];
}
