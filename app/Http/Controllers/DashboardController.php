<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feedback;

class DashboardController extends Controller
{
    /**
     * Dashboard des avis pour une entreprise donnée.
     */
    public function index(Request $request)
    {
        // Paramètres injectés par ValidateGenukaParams
        $companyId = $request->attributes->get('genuka_company_id');

        // ✅ 1. Tous les avis pour cette entreprise
        $feedbacks = Feedback::where('company_id', $companyId)->get();

        // ✅ 2. Statistiques globales
        $totalReviews = $feedbacks->count();

        $averageRating = $feedbacks->avg('rating') ?? 0;

        $ratingDistribution = [
            '1' => $feedbacks->where('rating', 1)->count(),
            '2' => $feedbacks->where('rating', 2)->count(),
            '3' => $feedbacks->where('rating', 3)->count(),
            '4' => $feedbacks->where('rating', 4)->count(),
            '5' => $feedbacks->where('rating', 5)->count(),
        ];

        // ✅ 3. Derniers avis (pour affichage dans le dashboard)
        $latestReviews = Feedback::where('company_id', $companyId)
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        // ✅ 4. Réponse API structurée pour le front
        return response()->json([
            'success' => true,
            'data' => [
                'company_id' => $companyId,

                // Statistiques globales
                'statistics' => [
                    'total_reviews'   => $totalReviews,
                    'average_rating'  => round($averageRating, 2),
                    'distribution'    => $ratingDistribution,
                ],

                // Avis récents
                'latest_reviews' => $latestReviews,
            ]
        ]);
    }
}
