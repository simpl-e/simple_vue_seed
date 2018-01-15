<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller {

    public function update(Request $request) {
        $access_token = $request->access_token;
        $user_id = $request->user_id;

        $json = file_get_contents("https://api.instagram.com/v1/users/self/?access_token=$access_token");
        $data = json_decode($json);

        $profile = $data->data;
        $counts = $profile->counts;
        $total = $counts->media + $counts->follows + $counts->followed_by;

        $user = User::firstOrNew(array('id' => $profile->id));
        $user->username = $profile->username;
        $user->full_name = $profile->full_name;
        $user->profile_picture = $profile->profile_picture;
        $user->points = $total;
        $user->save();

        return User::select(["id", "username", "full_name", "profile_picture", "points"])->get();
    }

    public function search(Request $request) {
        $access_token = $request->access_token;
        $q = $request->q;

        $json = file_get_contents("https://api.instagram.com/v1/users/search/?q=$q&access_token=$access_token");
        $data = json_decode($json);

        return $json;
    }

}
