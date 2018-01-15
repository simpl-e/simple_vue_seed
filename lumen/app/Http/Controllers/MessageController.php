<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Message;

class MessageController extends Controller {

    public function get(Request $request) {
        $access_token = $request->access_token;
        $user_id = explode(".", $access_token)[0];

        return Message::where(['from' => $user_id])->orWhere(['to' => $user_id])->get();
    }

    public function send(Request $request) {
        $access_token = $request->access_token;
        $to = $request->to;
        $subject = $request->subject;
        $message = $request->message;

        if (empty($access_token) || empty($to) || empty($subject) || empty($message)) {
            return false;
        }

        $user_id = explode(".", $access_token)[0];

        $from_name = "";
        try {
            $jsonFrom = file_get_contents("https://api.instagram.com/v1/users/$user_id/?access_token=$access_token");
            $dataFrom = json_decode($jsonFrom);
            $from_name = $dataFrom->data->full_name;
        } catch (\Exception $e) {
            //
        }

        $to_name = "";
        try {
            $jsonTo = file_get_contents("https://api.instagram.com/v1/users/$to/?access_token=$access_token");
            $dataTo = json_decode($jsonTo);
            $to_name = $dataTo->data->full_name;
        } catch (\Exception $e) {
            //
        }

        Message::create([
            'from' => $user_id,
            'to' => $to,
            'from_name' => $from_name,
            'to_name' => $to_name,
            'subject' => $subject,
            'message' => $message
        ]);
    }

}
