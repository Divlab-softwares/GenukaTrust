// app/api/feedback/route.ts
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();

        // Forward the request to the external API (ngrok)
        const backendRes = await fetch('https://452b385caae3.ngrok-free.app/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // tu peux ajouter authorization si nécessaire
            },
            body: JSON.stringify(body),
        });

        const text = await backendRes.text();
        return new NextResponse(text, {
            status: backendRes.status,
            headers: { 'Content-Type': backendRes.headers.get('content-type') ?? 'text/plain' },
        });
    } catch (err) {
        return new NextResponse(JSON.stringify({ success: false, message: err.message }), { status: 500 });
    }
}
