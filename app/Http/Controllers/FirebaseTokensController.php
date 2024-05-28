<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FirebaseTokens;
use App\Services\Firebase;
use App\Models\District;
use DB;
class FirebaseTokensController extends Controller
{
    protected $firebase;
    public function __construct(){
        $this->firebase = new Firebase();
    }


    public function store(Request $request)
    {
        DB::table('firebase_tokens')->updateOrInsert([
            'token' => $request->token
        ], [
            'device' => 'online',
            'user_id' => $request->user_id
        ]);

        return response()->json(null, 200);
    }

    public function getCityTopic(Request $request){
        $tokenInformation = $this->firebase->tokenInformation($request->token);
        $allTopics = $tokenInformation['rel']['topics'] ?? null;
        
        if ($allTopics !== null){
            $topics = array_keys($allTopics);
            $city_id = $this->getCityIdInArray($topics);
            return District::find($city_id);
        }
    
        return null;
    }

    public function setCityTopic(Request $request){
        $this->firebase->clearAllTopics($request->token);
        $this->firebase->subscribeToTopic("city_$request->city_id", $request->token);

        return $this->getCityTopic($request);
    }


    public function getCityIdInArray($inputArray){
        $output = null;
        foreach ($inputArray as $element) {
            if (strpos($element, 'city') !== false) {
                // Извлекаем только числа из строки, содержащей 'city'
                preg_match('/\d+/', $element, $matches);
                if (!empty($matches)) {
                    $output = $matches[0];
                    break; // Завершаем цикл, так как нашли нужное значение
                }
            }
        }

        return $output;
    }
}
