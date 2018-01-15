<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model {

    protected $fillable = [
        'from', 'from_name', 'to', 'to_name', 'subject', 'message'
    ];

}
