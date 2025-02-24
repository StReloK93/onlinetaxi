<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FirebaseTokens;
use App\Services\Firebase;
use App\Models\District;


class FirebaseTokensController extends Controller
{
    protected $firebase;
    public function __construct(){
        $this->firebase = new Firebase();
    }

    public function getCityTopic(Request $request){
        if($request->token === null) return response()->json([
            'error' => 'error',
            'message' => 'token not found'
        ], 500);
        ;

        $tokenInformation = $this->firebase->tokenInformation($request->token);
        $allTopics = $tokenInformation['rel']['topics'] ?? null;
        
        if ($allTopics !== null){
            $topics = array_keys($allTopics);
            $city_id = $this->getCityIdInArray($topics);

            FirebaseTokens::updateOrCreate([
                'token' => $request->token
            ], [
                'user_id' => $request->user()->id,
                'device' => $city_id,
            ]);
    
            return District::find($city_id);
        }
        FirebaseTokens::updateOrCreate([
            'token' => $request->token
        ], [
            'user_id' => $request->user()->id,
        ]);

        return null;
    }

    public function setCityTopic(Request $request){
        if($request->token === null) return null;

        $this->firebase->clearAllTopics($request->token);
        $this->firebase->subscribeToTopic("city_$request->city_id", $request->token);

        return $this->getCityTopic($request);
    }



    private function getCityIdInArray($inputArray){
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
