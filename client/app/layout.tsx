import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './globals.css';
import type {Metadata} from 'next';
import {Montserrat} from 'next/font/google';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-datepicker/dist/react-datepicker.css';

const montserrat = Montserrat({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: 'Qirim Media',
    description: 'Новини світу та Криму'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang='en'>
            <body className={montserrat.className}>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
