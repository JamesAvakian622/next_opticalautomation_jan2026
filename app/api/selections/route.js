import { NextResponse } from 'next/server';
import { getSelectionsCollection, getUsersCollection } from '@/lib/mongodb';
import { verifyToken, getSelectionLimit } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(request) {
    try {
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

        const selections = await getSelectionsCollection();
        const userSelections = await selections.findOne({
            userId: new ObjectId(decoded.userId)
        });

        return NextResponse.json({
            selections: userSelections?.selectedApps || [],
            selectionCount: userSelections?.selectionCount || 0,
            maxAllowed: userSelections?.maxAllowed || getSelectionLimit(decoded.subscriptionTier)
        });

    } catch (error) {
        console.error('Get selections error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
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

        const { selectedApps } = await request.json();

        // Get user to check subscription tier
        const users = await getUsersCollection();
        const user = await users.findOne({ _id: new ObjectId(decoded.userId) });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const maxAllowed = getSelectionLimit(user.subscriptionTier);

        // Validate selection count
        if (selectedApps.length > maxAllowed) {
            return NextResponse.json(
                { error: `You can only select up to ${maxAllowed} apps with your ${user.subscriptionTier} tier` },
                { status: 400 }
            );
        }

        const selections = await getSelectionsCollection();

        const selectionData = {
            userId: new ObjectId(decoded.userId),
            clientId: user.clientId,
            selectedApps,
            selectionCount: selectedApps.length,
            maxAllowed,
            lastUpdated: new Date()
        };

        // Upsert selections
        await selections.updateOne(
            { userId: new ObjectId(decoded.userId) },
            { $set: selectionData },
            { upsert: true }
        );

        return NextResponse.json({
            success: true,
            message: 'Selections saved successfully',
            selectionCount: selectedApps.length,
            maxAllowed
        });

    } catch (error) {
        console.error('Save selections error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
