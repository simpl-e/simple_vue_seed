<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        // php artisan migrate --path=/app/database/migrations/

        if (!Schema::hasTable('users')) {
            Schema::create('users', function (Blueprint $table) {
                $table->bigInteger('id');
                $table->string('username');
                $table->string('full_name');
                $table->string('profile_picture');
                $table->integer('points');
                $table->timestamps();
            });
        }
        
        if (!Schema::hasTable('messages')) {
            Schema::create('messages', function (Blueprint $table) {
                $table->increments('id');
                $table->bigInteger('from');
                $table->string('from_name');
                $table->bigInteger('to');                
                $table->string('to_name');
                $table->string('subject');
                $table->text('message');
                $table->timestamps();
            });
        }
    }

}
