import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    // Only apply to routes starting with /admin
    if (req.nextUrl.pathname.startsWith('/admin')) {
        const basicAuth = req.headers.get('authorization');
        if (basicAuth) {
            const authValue = basicAuth.split(' ')[1];
            const [user, pwd] = atob(authValue).split(':');

            if (user === 'daril' && pwd === 'darilhd12') {
                return NextResponse.next();
            }
        }

        return new NextResponse('Auth Required', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Secure CMS Area"',
            },
        });
    }

    // Not an admin route
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
