<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model {

    protected $fillable = [
        'id', 'username', 'full_name', 'profile_picture', 'points'
    ];

}
