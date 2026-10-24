import {revalidateTag} from 'next/cache';
import {NextRequest, NextResponse} from 'next/server';

// Strapi дергает этот эндпоинт при публикации/изменении/удалении — кэш сбрасывается сразу.
export async function POST(request: NextRequest) {
    const secret = process.env.REVALIDATE_SECRET;
    if (!secret || request.headers.get('x-revalidate-secret') !== secret) {
        return NextResponse.json({ok: false}, {status: 401});
    }
    revalidateTag('news');
    revalidateTag('blogs');
    return NextResponse.json({ok: true});
}
