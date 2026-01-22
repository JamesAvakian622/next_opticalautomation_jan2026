import { NextResponse } from 'next/server';
import { getPageAccessLogs, getPageAccessStats } from '@/lib/pageLogger';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
    try {
        // Verify admin access (you can customize this)
        const token = request.headers.get('authorization')?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type') || 'logs';
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const path = searchParams.get('path');
        const userId = searchParams.get('userId');
        const limit = parseInt(searchParams.get('limit') || '100');

        const filters = {
            startDate,
            endDate,
            path,
            userId,
            limit
        };

        let result;
        if (type === 'stats') {
            result = await getPageAccessStats(filters);
        } else {
            result = await getPageAccessLogs(filters);
        }

        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: 500 }
            );
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error in analytics API:', error);
        return NextResponse.json(
            { error: 'Failed to fetch analytics' },
            { status: 500 }
        );
    }
}
