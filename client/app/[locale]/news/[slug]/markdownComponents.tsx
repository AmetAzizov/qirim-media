import React from 'react';
import type {Components} from 'react-markdown';

const FILE_RE = /\.(mp4|webm|ogv|mov|m4v)(\?.*)?$/i;

type Video = {kind: 'iframe'; src: string} | {kind: 'file'; src: string};

export function parseVideo(url?: string): Video | null {
    if (!url) return null;
    const href = url.trim();
    if (FILE_RE.test(href)) return {kind: 'file', src: href};
    let u: URL;
    try {
        u = new URL(href);
    } catch {
        return null;
    }
    const host = u.hostname.replace(/^(www|m)\./, '');
    let id: string | null = null;
    if (host === 'youtu.be') id = u.pathname.slice(1);
    else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
        if (u.pathname === '/watch') id = u.searchParams.get('v');
        else {
            const m = u.pathname.match(/^\/(embed|shorts|live)\/([\w-]+)/);
            if (m) id = m[2];
        }
    }
    if (id && /^[\w-]{6,}$/.test(id)) {
        return {kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${id}`};
    }
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
        const m = u.pathname.match(/(\d{5,})/);
        if (m) return {kind: 'iframe', src: `https://player.vimeo.com/video/${m[1]}`};
    }
    return null;
}

export function VideoEmbed({video}: {video: Video}) {
    if (video.kind === 'file') {
        return (
            <span className='video-embed video-embed--file'>
                <video src={video.src} controls playsInline preload='metadata' />
            </span>
        );
    }
    return (
        <span className='video-embed'>
            <iframe
                src={video.src}
                title='Video'
                loading='lazy'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen'
                allowFullScreen
            />
        </span>
    );
}


export const markdownComponents: Components = {
    // [text](video-url) or an uploaded video inserted as ![](file.mp4)
    a({href, children, node: _n, ...rest}) {
        const video = parseVideo(href);
        return video ? <VideoEmbed video={video} /> : <a href={href} {...rest}>{children}</a>;
    },
    img({src, alt, node: _n, ...rest}) {
        const video = typeof src === 'string' && FILE_RE.test(src) ? parseVideo(src) : null;
        // eslint-disable-next-line @next/next/no-img-element
        return video ? <VideoEmbed video={video} /> : <img src={src} alt={alt} {...rest} />;
    },
    // a bare video URL on its own line
    // (also when it follows text via a single line break, which Markdown keeps in the same paragraph)
    p({children, node: _n, ...rest}) {
        let found = false;
        const out: React.ReactNode[] = [];
        React.Children.toArray(children).forEach((child, i) => {
            if (typeof child !== 'string') return void out.push(child);
            let buf: string[] = [];
            const flush = () => {
                if (buf.length) out.push(buf.join('\n'));
                buf = [];
            };
            child.split('\n').forEach((line, j) => {
                const video = parseVideo(line);
                if (!video) return void buf.push(line);
                found = true;
                flush();
                out.push(<VideoEmbed key={`${i}-${j}`} video={video} />);
            });
            flush();
        });
        return <p {...rest}>{found ? out : children}</p>;
    }
};
