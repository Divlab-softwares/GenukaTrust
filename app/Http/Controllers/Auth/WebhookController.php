<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Services\MessageService;

class WebhookController extends Controller
{
    protected MessageService $messages;

    public function __construct(MessageService $messages)
    {
        $this->messages = $messages;
    }

    public function __invoke(Request $request): JsonResponse
    {
        try {
            $event = $request->all();

            // Ignore signature en local
            $this->validateWebhookSignature($request);

            // Routing des événements
            $this->processWebhookEvent($event);

            return response()->json([
                'success' => true,
                'message' => 'Webhook processed successfully'
            ]);

        } catch (\Exception $e) {

            Log::error('Webhook processing error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'error' => 'Failed to process webhook'
            ], 500);
        }
    }

    /**
     * Validation signature (sauf en local)
     */
    protected function validateWebhookSignature(Request $request): void
    {
        if (app()->environment('local')) {
            return; // ON IGNORE EN LOCAL POUR NGROK
        }

        $signature = $request->header('X-Genuka-Signature');
        if (! $signature) {
            throw new \Exception('Missing webhook signature');
        }

        $payload = $request->getContent();
        $expected = hash_hmac('sha256', $payload, config('genuka.client_secret'));

        if (! hash_equals($expected, $signature)) {
            throw new \Exception('Invalid webhook signature');
        }
    }

    /**
     * Routing des événements
     */
    protected function processWebhookEvent(array $event): void
    {
        $eventType = $event['event'] ?? null;

        Log::info("Received Event: ". $eventType);

        match ($eventType) {
            'order.created', 'order.updated' => $this->handleOrder($event),

            'company.updated'                => $this->handleCompanyUpdated($event),
            'company.deleted'                => $this->handleCompanyDeleted($event),

            'subscription.created'           => $this->handleSubscriptionCreated($event),
            'subscription.updated'           => $this->handleSubscriptionUpdated($event),
            'subscription.cancelled'         => $this->handleSubscriptionCancelled($event),

            'payment.succeeded'              => $this->handlePaymentSucceeded($event),
            'payment.failed'                 => $this->handlePaymentFailed($event),

            default                          => $this->handleUnknownEvent($event),
        };
    }

    /**
     * TRAITEMENT DES COMMANDES
     */
    protected function handleOrder(array $event): void
    {
        Log::debug("Order Event Raw Data", $event);

        $order = $event['entity'] ?? $event['data'] ?? null;
        if (! $order) {
            Log::warning("Order event received but no entity or data field.");
            return;
        }

        $orderId = $order['id'] ?? 'unknown';

        // LOG ID commande + status
        Log::info("Processing Order ID: " . $orderId);
        Log::info("Order Status: " . ($order['status'] ?? 'no-status'));

        // Récupération du client
        $customer = $order['customer'] ?? null;

        if (! $customer) {
            Log::warning("Order has no customer information", $order);
            return;
        }

        $phone = $customer['phone'] ?? null;
        $whatsapp = $customer['whatsapp'] ?? null;

        // Message envoyé au client avec l'ID de commande en paramètre
        $message = "Merci pour votre commande ! Donnez votre avis ici : "
                 . "https://realistically-homophonous-julien.ngrok-free.dev/client-review?order_id=" . $orderId;

        // Envoi SMS
        if ($phone) {
            Log::info("Sending SMS to $phone");
            $this->messages->sendSMS($phone, $message);
        }

        // Envoi WhatsApp
        if ($whatsapp) {
            Log::info("Sending WhatsApp to $whatsapp");
            $this->messages->sendWhatsApp($whatsapp, $message);
        }

        Log::info('Notification envoyée pour la commande ' . $orderId);
    }

    protected function handleCompanyUpdated(array $event): void
    {
        Log::info('Company updated event', $event);
    }

    protected function handleCompanyDeleted(array $event): void
    {
        Log::info('Company deleted event', $event);
    }

    protected function handleSubscriptionCreated(array $event): void
    {
        Log::info('Subscription created event', $event);
    }

    protected function handleSubscriptionUpdated(array $event): void
    {
        Log::info('Subscription updated event', $event);
    }

    protected function handleSubscriptionCancelled(array $event): void
    {
        Log::info('Subscription cancelled event', $event);
    }

    protected function handlePaymentSucceeded(array $event): void
    {
        Log::info('Payment succeeded event', $event);
    }

    protected function handlePaymentFailed(array $event): void
    {
        Log::info('Payment failed event', $event);
    }

    protected function handleUnknownEvent(array $event): void
    {
        Log::warning('Unknown webhook event type', $event);
    }
}
