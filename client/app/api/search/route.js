import { searchNewsPosts } from '@/app/lib/newsPosts';
import {NextResponse} from 'next/server';

export async function GET(request) {
    const query = request.nextUrl.searchParams.get('query');
    const newsPosts = await searchNewsPosts(query);
    return NextResponse.json(newsPosts);
}
