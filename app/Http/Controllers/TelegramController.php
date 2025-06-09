<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Telegram\Bot\Api;
use App\Models\User;
use Telegram\Bot\Objects\Update;
use Telegram\Bot\Laravel\Facades\Telegram;

class TelegramController extends Controller
{
    public function handle(Request $request)
    {
        $telegram = new Api(env('TELEGRAM_BOT_TOKEN'));
        $update = $telegram->getWebhookUpdate();
        $user = $update->message->contact;


        $message = $update->getMessage();
        $chatId = $message?->getChat()?->getId();
        $text = $message?->getText();

        if ($text === '/start') {

            Telegram::sendMessage([
                'chat_id' => $chatId, // foydalanuvchining Telegram ID'si
                'text' => "Mini App'ni ochish uchun tugmani bosing:",
                'reply_markup' => json_encode([
                    'inline_keyboard' => [
                        [
                            [
                                'text' => "Mini App'ni ochish",
                                'web_app' => [
                                    'url' => 'https://onlinetaxi.loca.lt', // HTTPS bo'lishi shart
                                ]
                            ]
                        ]
                    ]
                ])
            ]);
        }

        return response('OK', 200);
    }


}


// Telegram::sendMessage([
//     'chat_id' => $chatId,
//     'text' => "📱 Iltimos, raqamingizni yuboring:",
//     'reply_markup' => json_encode([
//         'keyboard' => [
//             [
//                 [
//                     'text' => '📲 Raqamni yuborish',
//                     'request_contact' => true,
//                 ]
//             ]
//         ],
//         'resize_keyboard' => true,
//         'one_time_keyboard' => true,
//     ])
// ]);
// if ($update->message && $update->message->contact) {


//     if (str_starts_with($user->phone_number, "998")) {
//         $phone = substr($user->phone_number, 3);
//     }

//     $user = User::updateOrCreate(
//         ['phone' => $phone],
//         ['name' => "$user->first_name $user->last_name", 'telegram_user_id' => $user->user_id],
//     );
// }