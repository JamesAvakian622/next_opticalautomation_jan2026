#!/usr/bin/env node
/**
 * Setup MongoDB Indexes & Validators for Multi-Tenant SaaS
 *
 * Usage:
 *   npm run setup-indexes
 *   node scripts/setup-indexes.js
 */

import 'dotenv/config';
import { ensureIndexes, applyValidators } from '../lib/db/collections.js';
import connectToDatabase from '../lib/mongodb.js';

async function main() {
    console.log('🔗 Connecting to MongoDB...');
    await connectToDatabase();

    console.log('\n📐 Applying collection validators...');
    const validatorResults = await applyValidators();
    for (const [collection, status] of Object.entries(validatorResults)) {
        const icon = status.includes('error') || status.includes('failed') ? '❌' : '✅';
        console.log(`  ${icon} ${collection}: ${status}`);
    }

    console.log('\n📇 Creating indexes...');
    const indexResults = await ensureIndexes();
    for (const [collection, indexes] of Object.entries(indexResults)) {
        console.log(`  📁 ${collection}:`);
        for (const idx of indexes) {
            if (idx.error) {
                console.log(`    ❌ ${idx.index}: ${idx.error}`);
            } else {
                console.log(`    ✅ ${idx.index}: ${idx.result}`);
            }
        }
    }

    console.log('\n✨ Done! All indexes and validators are set up.');
    process.exit(0);
}

main().catch((err) => {
    console.error('❌ Setup failed:', err);
    process.exit(1);
});
