<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Telegram\Bot\Laravel\Facades\Telegram;

class SetTelegramWebhook extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'telegram:set-webhook';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Telegram uchun webhook URLni o‘rnatadi';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $url = config('app.url') . '/api/webhook';

        $this->info("Webhook URL: $url");

        $response = Telegram::setWebhook(['url' => $url]);

        if ($response) {
            $this->info('✅ Webhook muvaffaqiyatli o‘rnatildi.');
        } else {
            $this->error('❌ Webhookni o‘rnatishda xatolik.');
        }
    }
}
