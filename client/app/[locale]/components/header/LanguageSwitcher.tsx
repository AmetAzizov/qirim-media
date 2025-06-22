'use client';

import {useState, useEffect} from 'react';
import '../../styles/navbar.scss';

type Language = {
    code: string;
    label: string;
    external?: boolean;
    url?: string;
};

const languages: Language[] = [
    {code: 'uk', label: 'UA'}, // Ukrainian
    {code: 'en', label: 'EN'}, // English
    {code: 'tr', label: 'TR', external: true, url: 'https://www.qha.com.tr/'} // Turkish external
];

interface LanguageSwitcherProps {
    onClick?: (languageCode: any) => void,
    textColor?: string
}

const LanguageSwitcher = ({onClick, textColor}: LanguageSwitcherProps) => {
    const [activeLanguage, setActiveLanguage] = useState('uk');
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href);
        }
    }, []);

    const handleClick = (languageCode: string) => {
        if (languageCode === 'en') {
            const translateUrl = `https://translate.google.com/translate?hl=uk&sl=auto&tl=en&u=${encodeURIComponent(currentUrl)}`;
            window.open(translateUrl, '_blank');
        } else {
            setActiveLanguage(languageCode);
        }
    };

    return (
        <div>
            {languages.map(language => {
                const isActive = language.code === activeLanguage;

                if (language.external && language.url) {
                    return (
                        <a
                            href={language.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`language-switcher p-2 text-sm font-semibold rounded lg:text-base lg:font-medium ${
                                isActive ? 'active-language' : ''
                            }`}
                            key={language.code}
                        >
                            {language.label}
                        </a>
                    );
                }

                return (
                    <button
                        key={language.code}
                        className={`language-switcher p-2 text-sm font-semibold rounded lg:text-base lg:font-medium ${
                            isActive ? 'active-language' : ''
                        }`}
                        onClick={() => handleClick(language.code)}
                    >
                        {language.label}
                    </button>
                );
            })}
        </div>
    );
};

export default LanguageSwitcher;


// 'use client';
//
// import { useEffect, useState } from 'react';
//
// export default function TranslateButton({ lang = 'en' }: { lang: string }) {
//     const [url, setUrl] = useState('');
//
//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             setUrl(window.location.href);
//         }
//     }, []);
//
//     if (!url) return null;
//
//     return (
//         <a
//             href={`https://translate.google.com/translate?hl=uk&sl=auto&tl=${lang}&u=${encodeURIComponent(url)}`}
//             target="_blank"
//             rel="noopener noreferrer"
//         >
//             Перевести страницу на {lang.toUpperCase()}
//         </a>
//     );
// }
//
//
//
//
// import {useState} from 'react';
// import '../../styles/navbar.scss';
//
// type LanguageSwitcherProps = {
//     onClick: (languageCode: string) => void;
//     textColor: string;
// };
//
// const languages = [
//     {code: 'ua', label: 'UA'},
//     // {code: 'en', label: 'EN'},
//     {code: 'tr', label: 'TR'}
//     // { code: 'qt', label: 'QT' }
// ];
//
// const LanguageSwitcher = ({onClick}: LanguageSwitcherProps) => {
//     const [activeLanguage, setActiveLanguage] = useState('uk');
//
//     const handleLanguageClick = (languageCode: string) => {
//         if (languageCode !== 'tr') {
//             setActiveLanguage(languageCode);
//             onClick(languageCode);
//         }
//     };
//
//     return (
//         <div>
//             {languages.map(language =>
//                 language.code === 'tr' ? (
//                     <a
//                         href='https://www.qha.com.tr/'
//                         target='_blank'
//                         rel='noopener noreferrer'
//                         className={`language-switcher p-2 text-sm font-semibold rounded lg:text-base lg:font-medium ${
//                             language.code === activeLanguage ? 'active-language' : ''
//                         }`}
//                         key={language.code}
//                     >
//                         {language.label}
//                     </a>
//                 ) : (
//                     <button
//                         className={`language-switcher p-2 text-sm font-semibold rounded lg:text-base lg:font-medium ${
//                             language.code === activeLanguage ? 'active-language' : ''
//                         }`}
//                         key={language.code}
//                         onClick={() => handleLanguageClick(language.code)}
//                     >
//                         {language.label}
//                     </button>
//                 )
//             )}
//         </div>
//     );
// };
//
// export default LanguageSwitcher;
