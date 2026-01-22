import { getDatabase } from './mongodb';

/**
 * Log page access to MongoDB
 * @param {Object} data - Page access data
 * @param {string} data.path - Page path (e.g., '/subscription', '/dashboard')
 * @param {string} data.userId - User ID if logged in (optional)
 * @param {string} data.userEmail - User email if logged in (optional)
 * @param {string} data.ipAddress - Client IP address (optional)
 * @param {string} data.userAgent - Browser user agent (optional)
 * @param {Object} data.metadata - Additional metadata (optional)
 */
export async function logPageAccess(data) {
    try {
        const db = await getDatabase();
        const collection = db.collection('page_access_logs');

        const logEntry = {
            path: data.path,
            userId: data.userId || null,
            userEmail: data.userEmail || null,
            ipAddress: data.ipAddress || null,
            userAgent: data.userAgent || null,
            metadata: data.metadata || {},
            timestamp: new Date(),
            date: new Date().toISOString().split('T')[0], // For easy date-based queries
            hour: new Date().getHours()
        };

        await collection.insertOne(logEntry);
        return { success: true };
    } catch (error) {
        console.error('Error logging page access:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get page access analytics
 * @param {Object} filters - Query filters
 * @param {string} filters.startDate - Start date (ISO format)
 * @param {string} filters.endDate - End date (ISO format)
 * @param {string} filters.path - Specific page path
 * @param {string} filters.userId - Specific user ID
 * @param {number} filters.limit - Limit results
 */
export async function getPageAccessLogs(filters = {}) {
    try {
        const db = await getDatabase();
        const collection = db.collection('page_access_logs');

        const query = {};

        if (filters.startDate || filters.endDate) {
            query.timestamp = {};
            if (filters.startDate) {
                query.timestamp.$gte = new Date(filters.startDate);
            }
            if (filters.endDate) {
                query.timestamp.$lte = new Date(filters.endDate);
            }
        }

        if (filters.path) {
            query.path = filters.path;
        }

        if (filters.userId) {
            query.userId = filters.userId;
        }

        const logs = await collection
            .find(query)
            .sort({ timestamp: -1 })
            .limit(filters.limit || 100)
            .toArray();

        return { success: true, logs };
    } catch (error) {
        console.error('Error fetching page access logs:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get page access statistics
 */
export async function getPageAccessStats(filters = {}) {
    try {
        const db = await getDatabase();
        const collection = db.collection('page_access_logs');

        const matchStage = {};
        if (filters.startDate || filters.endDate) {
            matchStage.timestamp = {};
            if (filters.startDate) {
                matchStage.timestamp.$gte = new Date(filters.startDate);
            }
            if (filters.endDate) {
                matchStage.timestamp.$lte = new Date(filters.endDate);
            }
        }

        // Get page visit counts
        const pageStats = await collection.aggregate([
            ...(Object.keys(matchStage).length > 0 ? [{ $match: matchStage }] : []),
            {
                $group: {
                    _id: '$path',
                    count: { $sum: 1 },
                    uniqueUsers: { $addToSet: '$userId' }
                }
            },
            {
                $project: {
                    path: '$_id',
                    visits: '$count',
                    uniqueUsers: { $size: '$uniqueUsers' },
                    _id: 0
                }
            },
            { $sort: { visits: -1 } }
        ]).toArray();

        // Get hourly distribution
        const hourlyStats = await collection.aggregate([
            ...(Object.keys(matchStage).length > 0 ? [{ $match: matchStage }] : []),
            {
                $group: {
                    _id: '$hour',
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray();

        // Get daily stats
        const dailyStats = await collection.aggregate([
            ...(Object.keys(matchStage).length > 0 ? [{ $match: matchStage }] : []),
            {
                $group: {
                    _id: '$date',
                    count: { $sum: 1 },
                    uniqueUsers: { $addToSet: '$userId' }
                }
            },
            {
                $project: {
                    date: '$_id',
                    visits: '$count',
                    uniqueUsers: { $size: '$uniqueUsers' },
                    _id: 0
                }
            },
            { $sort: { date: -1 } },
            { $limit: 30 }
        ]).toArray();

        // Get total counts
        const totalVisits = await collection.countDocuments(matchStage);
        const uniqueVisitors = await collection.distinct('userId', matchStage);

        return {
            success: true,
            stats: {
                totalVisits,
                uniqueVisitors: uniqueVisitors.filter(id => id !== null).length,
                pageStats,
                hourlyStats,
                dailyStats
            }
        };
    } catch (error) {
        console.error('Error fetching page access stats:', error);
        return { success: false, error: error.message };
    }
}
