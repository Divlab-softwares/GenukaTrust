<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ValidateGenukaParams
{
    public function handle(Request $request, Closure $next)
    {
        $companyId = $request->query('company_id');
        $timestamp = $request->query('timestamp');
        $hmac      = $request->query('hmac');

        if (!$companyId || !$timestamp || !$hmac) {
            return response()->json([
                'success' => false,
                'message' => 'Missing Genuka parameters'
            ], 400);
        }

        // Inject into request for controllers
        $request->attributes->set('genuka_company_id', $companyId);
        $request->attributes->set('genuka_timestamp', $timestamp);
        $request->attributes->set('genuka_hmac', $hmac);

        return $next($request);
    }
}
