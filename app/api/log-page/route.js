import { NextResponse } from 'next/server';
import { logPageAccess } from '@/lib/pageLogger';

export async function POST(request) {
    try {
        const body = await request.json();
        const { path, userId, userEmail } = body;

        // Get client IP and user agent
        const ipAddress = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';

        await logPageAccess({
            path,
            userId,
            userEmail,
            ipAddress,
            userAgent,
            metadata: {
                referer: request.headers.get('referer'),
                timestamp: new Date().toISOString()
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in page logger API:', error);
        return NextResponse.json(
            { error: 'Failed to log page access' },
            { status: 500 }
        );
    }
}
