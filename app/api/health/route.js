import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Check environment variables
        const envCheck = {
            hasMongoUri: !!process.env.MONGODB_URI,
            hasMongoDb: !!process.env.MONGODB_DB,
            hasJwtSecret: !!process.env.JWT_SECRET,
            mongoUriPrefix: process.env.MONGODB_URI?.substring(0, 20) + '...',
            mongoDb: process.env.MONGODB_DB,
        };

        // Try to connect to MongoDB
        let connectionStatus = 'not attempted';
        let error = null;

        try {
            const { getDatabase } = await import('@/lib/mongodb');
            const db = await getDatabase();
            const collections = await db.listCollections().toArray();
            connectionStatus = 'success';

            return NextResponse.json({
                status: 'ok',
                environment: envCheck,
                mongodb: {
                    connected: true,
                    database: process.env.MONGODB_DB,
                    collections: collections.map(c => c.name)
                }
            });
        } catch (err) {
            connectionStatus = 'failed';
            error = err.message;

            return NextResponse.json({
                status: 'error',
                environment: envCheck,
                mongodb: {
                    connected: false,
                    error: error
                }
            }, { status: 500 });
        }
    } catch (err) {
        return NextResponse.json({
            status: 'error',
            message: err.message
        }, { status: 500 });
    }
}
