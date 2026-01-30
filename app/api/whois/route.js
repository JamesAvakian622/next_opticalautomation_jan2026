import { NextResponse } from 'next/server';
import * as whois from 'whois';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');

    if (!domain) {
        return new NextResponse('Missing domain parameter.', { status: 400 });
    }

    return new Promise((resolve) => {
        whois.lookup(domain, (err, data) => {
            if (err) {
                resolve(new NextResponse('WHOIS lookup failed.', { status: 500 }));
            } else {
                // whois library might return data even on error sometimes, or text.
                // It's a simple text response.
                resolve(new NextResponse(data, { status: 200 }));
            }
        });
    });
}
