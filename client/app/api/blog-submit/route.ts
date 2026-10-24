import {NextRequest, NextResponse} from 'next/server';

// Приём блогов от читателей. Запись создаётся в Strapi как ЧЕРНОВИК (status=draft),
// модератор проверяет её в админке и нажимает Publish.
// Токен Strapi остаётся на сервере и в браузер не попадает.

const MAX_IMAGE_SIZE = 1024 * 1024; // 1 MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg'];
const LOCALES = ['uk', 'en'];

// Простейший лимит: 3 отправки в час с одного IP (в памяти процесса)
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter(t => now - t < 60 * 60 * 1000);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > 3;
}

function bad(message: string, status = 400) {
    return NextResponse.json({ok: false, message}, {status});
}

function validImage(file: FormDataEntryValue | null): file is File {
    return file instanceof File && file.size > 0 && file.size <= MAX_IMAGE_SIZE && ALLOWED_TYPES.includes(file.type);
}

// Загрузки идут по одной и с одним повтором: на Windows Strapi иногда падает с EPERM
// при удалении временного файла sharp (500), повторный запрос обычно проходит.
async function upload(apiUrl: string, token: string, file: File): Promise<number> {
    for (let attempt = 0; attempt < 2; attempt++) {
        const body = new FormData();
        body.append('files', file, file.name);
        const res = await fetch(`${apiUrl}/upload`, {
            method: 'POST',
            headers: {Authorization: `Bearer ${token}`},
            body
        });
        if (res.ok) {
            const [uploaded] = await res.json();
            return uploaded.id;
        }
        if (attempt === 1) throw new Error(`upload failed: ${res.status}`);
    }
    throw new Error('upload failed');
}

export async function POST(request: NextRequest) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = process.env.BLOG_SUBMIT_TOKEN;
    if (!apiUrl || !token) return bad('Server is not configured', 500);

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
    if (rateLimited(ip)) return bad('Too many requests', 429);

    const form = await request.formData();

    // honeypot: боты заполняют скрытое поле, людям оно не видно
    if (form.get('website')) return NextResponse.json({ok: true});

    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const title = String(form.get('title') || '').trim();
    const text = String(form.get('text') || '').trim();
    const locale = LOCALES.includes(String(form.get('locale'))) ? String(form.get('locale')) : 'uk';
    const avatar = form.get('avatar');

    if (!name || !title || !text) return bad('Fill in all required fields');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad('Invalid email');
    if (name.length > 100 || title.length > 200 || text.length > 30000) {
        return bad('Text is too long');
    }
    if (!validImage(avatar)) return bad('Avatar must be PNG/JPG up to 1 MB');

    try {
        const avatarId = await upload(apiUrl, token, avatar);

        const res = await fetch(`${apiUrl}/blogs?locale=${locale}&status=draft`, {
            method: 'POST',
            headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                data: {
                    title,
                    authorBlog: name,
                    authorEmail: email,
                    text,
                    image: [avatarId], // на сайте блоги показывают это поле как фото автора
                    authorAvatar: avatarId,
                    slug: `blog-${Date.now().toString(36)}`,
                    publish_at: new Date().toISOString()
                }
            })
        });
        if (!res.ok) throw new Error(`create failed: ${res.status} ${await res.text()}`);
        return NextResponse.json({ok: true});
    } catch (error) {
        console.error('blog-submit error', error);
        return bad('Could not submit the post', 502);
    }
}
