
import { MongoClient } from 'mongodb';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

async function testConnections() {
    console.log('--- Testing Connections ---');

    // 1. Test MongoDB
    console.log('\n1. Testing MongoDB...');
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('❌ MONGODB_URI is not set in .env.local');
    } else {
        let client;
        try {
            client = new MongoClient(uri);
            await client.connect();
            console.log('✅ MongoDB connection successful!');
            const db = client.db(process.env.MONGODB_DB || 'optical_automation');
            const collections = await db.listCollections().toArray();
            console.log('✅ Found collections:', collections.map(c => c.name).join(', '));

            const usersCount = await db.collection('users').countDocuments();
            console.log('✅ Users count:', usersCount);
        } catch (error) {
            console.error('❌ MongoDB connection failed:', error.message);
        } finally {
            if (client) await client.close();
        }
    }

    // 2. Test Resend
    console.log('\n2. Testing Resend...');
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
        console.error('❌ RESEND_API_KEY is not set in .env.local');
    } else {
        const resend = new Resend(resendKey);
        try {
            console.log('Testing Resend API with key:', resendKey.substring(0, 7) + '...');
            const apiRes = await fetch('https://api.resend.com/domains', {
                headers: {
                    'Authorization': `Bearer ${resendKey}`,
                    'Content-Type': 'application/json'
                }
            });
            const domains = await apiRes.json();

            if (apiRes.ok) {
                console.log('✅ Resend API call successful!');
                console.log('✅ Domains:', JSON.stringify(domains, null, 2));
            } else {
                console.error('❌ Resend API call failed:', domains.message || JSON.stringify(domains));
            }
        } catch (error) {
            console.error('❌ Resend API call failed:', error.message);
        }
    }

    console.log('\n--- Test Finished ---');
}

testConnections();
