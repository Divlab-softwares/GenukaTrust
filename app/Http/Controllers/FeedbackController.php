<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feedback;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class FeedbackController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'order_id'    => 'required|string',
            'customer_id' => 'nullable|string',
            'rating'      => 'nullable|integer|min:0|max:5',
            'comment'     => 'nullable|string',
        ]);

        try {
            $feedback = Feedback::create([
                'order_id'    => $request->order_id,
                'customer_id' => $request->customer_id,
                'rating'      => $request->rating,
                'comment'     => $request->comment,
            ]);

            Log::info("New feedback stored", ['feedback_id' => $feedback->id]);

            return response()->json([
                'success' => true,
                'message' => 'Feedback enregistré avec succès',
                'data'    => $feedback
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'enregistrement du feedback', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Impossible d\'enregistrer le feedback'
            ], 500);
        }
    }


public function index(): JsonResponse
{
    try {
        $feedbacks = Feedback::latest()->get();

        $average = Feedback::avg('rating');          // moyenne
        $count   = Feedback::count();                // total
        $distribution = Feedback::select('rating')
                        ->selectRaw('count(*) as total')
                        ->groupBy('rating')
                        ->orderBy('rating', 'desc')
                        ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'feedbacks'     => $feedbacks,
                'average'       => round($average, 2),
                'count'         => $count,
                'distribution'  => $distribution,
            ]
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
        ], 500);
    }
}



}
