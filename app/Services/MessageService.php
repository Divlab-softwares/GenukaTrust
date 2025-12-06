<?php

namespace App\Services;

use Twilio\Rest\Client;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MessageService
{
    protected Client $client;

    public function __construct()
    {
        $this->client = new Client(
            env('TWILIO_SID'),
            env('TWILIO_TOKEN')
        );
    }

    /**
     * Envoyer un SMS via Twilio
     */
    public function sendSMS(string $to, string $message): void
    {
        try {
            if (! str_starts_with($to, '+')) {
                $to = '+'.$to;
            }

            $sms = $this->client->messages->create(
                $to,
                [
                    'from' => env('TWILIO_FROM'),
                    'body' => $message,
                ]
            );

            Log::info('SMS envoyé', ['to' => $to, 'sid' => $sms->sid]);
        } catch (\Exception $e) {
            Log::error('Erreur SMS', ['to' => $to, 'message' => $e->getMessage()]);
        }
    }

    /**
     * Envoyer un message WhatsApp via Meta Cloud API
     */
    public function sendWhatsApp(string $to, string $message): void
    {
        try {
            if (! str_starts_with($to, '+')) {
                $to = '+'.$to;
            }

            $url = "https://graph.facebook.com/v17.0/" . env('WHATSAPP_PHONE_NUMBER_ID') . "/messages";

            $response = Http::withToken(env('WHATSAPP_TOKEN'))
                ->post($url, [
                    "messaging_product" => "whatsapp",
                    "to" => $to,
                    "type" => "text",
                    "text" => ["body" => $message]
                ]);

            Log::info("WhatsApp envoyé", [
                'to' => $to,
                'response' => $response->json()
            ]);

        } catch (\Exception $e) {
            Log::error("Erreur WhatsApp", ['to' => $to, 'error' => $e->getMessage()]);
        }
    }
}
