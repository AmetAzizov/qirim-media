
type LanguageSwitcherProps = {
    onClick: (languageCode: string) => void;
    textColor: string;
};

const languages = [
    {code: 'ua', label: 'UA'},
    {code: 'en', label: 'EN'},
    {code: 'tr', label: 'TR'},
    {code: 'qt', label: 'QT'}
];

// const LanguageSwitcher = ({onClick, textColor}: LanguageSwitcherProps) => {
    

//     return (
//         <div>
//             {languages.map(language => (
//                 <button
//                     className={`${textColor} language-switcher p-2 mr-1.5 min-w-[40px] text-sm font-semibold bg-[--secondary-color-4] last:mr-0 focus:bg-[--primary-color-4] focus:text-[--accent-color] rounded lg:text-base lg:bg-[transparent] lg:font-medium`}
//                     key={language.code}
//                     onClick={() => onClick(language.code)}
//                 >
//                     {language.label}
//                 </button>
//             ))}
//         </div>
//     );
// };

// export default LanguageSwitcher;

const LanguageSwitcher = ({ onClick, textColor }: LanguageSwitcherProps) => {
    const activeLanguage = 'ua'; // Украинский язык активный по умолчанию

    return (
        <div>
            {languages.map(language => (
                <button
                    className={`${textColor} language-switcher p-2 mr-1.5 min-w-[40px] text-sm font-semibold bg-[--secondary-color-4] last:mr-0 focus:bg-[--primary-color-4] focus:text-[--accent-color] rounded lg:text-base lg:bg-[transparent] lg:font-medium ${language.code === activeLanguage ? 'active-language' : ''}`}
                    key={language.code}
                    onClick={() => onClick(language.code)}
                >
                    {language.label}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
