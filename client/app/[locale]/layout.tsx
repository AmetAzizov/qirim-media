import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SearchBar from "@/app/[locale]/components/header/SearchBar";
import './globals.css';
import type {Metadata} from 'next';
import {Montserrat} from 'next/font/google';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-datepicker/dist/react-datepicker.css';
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {getMessages} from "next-intl/server";

const montserrat = Montserrat({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    // variable: '--font-montserrat'
});

const SITE_URL = 'https://qirim.news';

const SITE_TEXT = {
    uk: {
        title: 'Qirim Media — новини світу та Криму',
        description: 'Qirim Media — актуальні новини світу та Криму: війна, політика, суспільство, публікації та відео.',
        ogLocale: 'uk_UA'
    },
    en: {
        title: 'Qirim Media — world and Crimea news',
        description: 'Qirim Media — latest news from the world and Crimea: war, politics, society, publications and videos.',
        ogLocale: 'en_US'
    }
} as const;

export async function generateMetadata({params: {locale}}: {params: {locale: string}}): Promise<Metadata> {
    const text = SITE_TEXT[locale as 'uk' | 'en'] ?? SITE_TEXT.uk;
    return {
        metadataBase: new URL(SITE_URL),
        title: {default: text.title, template: '%s | Qirim Media'},
        description: text.description,
        applicationName: 'Qirim Media',
        alternates: {
            canonical: locale === 'uk' ? '/' : `/${locale}`,
            languages: {uk: '/', en: '/en', 'x-default': '/'}
        },
        icons: {
            icon: [
                {url: '/favicon.ico', sizes: '48x48'},
                {url: '/icon-48.png', type: 'image/png', sizes: '48x48'},
                {url: '/icon-192.png', type: 'image/png', sizes: '192x192'}
            ],
            shortcut: '/favicon.ico',
            apple: [{url: '/apple-touch-icon.png', sizes: '180x180'}]
        },
        openGraph: {
            type: 'website',
            siteName: 'Qirim Media',
            title: text.title,
            description: text.description,
            url: locale === 'uk' ? '/' : `/${locale}`,
            locale: text.ogLocale,
            images: [{url: '/og-default.png', width: 1200, height: 630, alt: 'Qirim Media'}]
        },
        twitter: {
            card: 'summary_large_image',
            title: text.title,
            description: text.description,
            images: ['/og-default.png']
        }
    };
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL,
            name: 'Qirim Media',
            alternateName: ['Qirim News', 'qirim.news'],
            inLanguage: ['uk', 'en'],
            publisher: {'@id': `${SITE_URL}/#organization`},
            potentialAction: {
                '@type': 'SearchAction',
                target: {'@type': 'EntryPoint', urlTemplate: `${SITE_URL}/search?query={search_term_string}`},
                'query-input': 'required name=search_term_string'
            }
        },
        {
            '@type': 'NewsMediaOrganization',
            '@id': `${SITE_URL}/#organization`,
            name: 'Qirim Media',
            url: SITE_URL,
            logo: {'@type': 'ImageObject', url: `${SITE_URL}/icon-192.png`, width: 192, height: 192}
        }
    ]
};

export default async function LocaleLayout({children, params: {locale}}:
                                           Readonly<{
                                               children: React.ReactNode;
                                               params: { locale: string };
                                           }>
) {
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }
    const messages = await getMessages();

    return (
        <html lang={locale}>
        <head>
            <script
                async
                src='https://www.googletagmanager.com/gtag/js?id=G-0D1MKQXYQK'
            ></script>
            <script async src='/gtag.js'></script>
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
        </head>
        <body className={montserrat.className}>
        <NextIntlClientProvider messages={messages}>
            <Header />
            <main>{children}</main>
            <SearchBar />
            <Footer />
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
