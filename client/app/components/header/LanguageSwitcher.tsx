// import {useState} from 'react';
// import '../../styles/navbar.scss';

// type LanguageSwitcherProps = {
//     onClick: (languageCode: string) => void;
//     textColor: string;
// };

// const languages = [
//     {code: 'ua', label: 'UA'},
//     // {code: 'en', label: 'EN'},
//     {code: 'tr', label: 'TR'}
//     // { code: 'qt', label: 'QT' }
// ];

// const LanguageSwitcher = () => {
//     // const currentLocale = useLocale();
//     const [activeLanguage, setActiveLanguage] = useState('ua');
//     const handleLanguageClick = () => {
//         // router.replace({pathname}, {locale: currentLocale === 'uk'? 'en': 'uk'});
//     };

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
//                         onClick={() => handleLanguageClick}
//                     >
//                         {language.label}
//                     </button>
//                 )
//             )}
//         </div>
//     );
// };

// export default LanguageSwitcher;

import {useState} from 'react';
import '../../styles/navbar.scss';

type LanguageSwitcherProps = {
    onClick: (languageCode: string) => void;
    textColor: string;
};

const languages = [
    {code: 'ua', label: 'UA'},
    // {code: 'en', label: 'EN'},
    {code: 'tr', label: 'TR'}
    // { code: 'qt', label: 'QT' }
];

const LanguageSwitcher = ({onClick}: LanguageSwitcherProps) => {
    const [activeLanguage, setActiveLanguage] = useState('ua');

    const handleLanguageClick = (languageCode: string) => {
        if (languageCode !== 'tr') {
            setActiveLanguage(languageCode);
            onClick(languageCode);
        }
    };

    return (
        <div>
            {languages.map(language =>
                language.code === 'tr' ? (
                    <a
                        href='https://www.qha.com.tr/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className={`language-switcher p-2 text-sm font-semibold rounded lg:text-base lg:font-medium ${
                            language.code === activeLanguage ? 'active-language' : ''
                        }`}
                        key={language.code}
                    >
                        {language.label}
                    </a>
                ) : (
                    <button
                        className={`language-switcher p-2 text-sm font-semibold rounded lg:text-base lg:font-medium ${
                            language.code === activeLanguage ? 'active-language' : ''
                        }`}
                        key={language.code}
                        onClick={() => handleLanguageClick(language.code)}
                    >
                        {language.label}
                    </button>
                )
            )}
        </div>
    );
};

export default LanguageSwitcher;
