// import Header from './components/header/Header';
// import Footer from './components/footer/Footer';
// import './globals.css';
// import type {Metadata} from 'next';
// import {Montserrat} from 'next/font/google';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import 'react-datepicker/dist/react-datepicker.css';
//
// const montserrat = Montserrat({
//     weight: ['400', '500', '600', '700'],
//     subsets: ['latin']
// });
//
// export const metadata: Metadata = {
//     title: 'Qirim Media',
//     description: 'Новини світу та Криму',
//     icons: {
//         icon: ['./favicon.ico']
//     }
// };
//
// export default function RootLayout({children}: {children: React.ReactNode}) {
//     return (
//         <html lang='en'>
//             <head>
//                 <script
//                     async
//                     src='https://www.googletagmanager.com/gtag/js?id=G-0D1MKQXYQK'
//                 ></script>
//                 <script async src='/gtag.js'></script>
//             </head>
//             <body className={montserrat.className}>
//                 <Header />
//                 <main>{children}</main>
//                 <Footer />
//             </body>
//         </html>
//     );
// }


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
    variable: '--font-montserrat'
});

export const metadata: Metadata = {
    title: 'Qirim Media',
    description: 'Новини світу та Криму',
    icons: {
        icon: ['./favicon.ico']
    }
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
