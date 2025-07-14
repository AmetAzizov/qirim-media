import React from 'react';
import Navbar from './Navbar';
import TopBanner from './TopBanner';

const Header = () => {
    return (
        <header className='header'>
            <TopBanner />
            <Navbar />
        </header>
    );
};

export default Header;


// 'use client';
//
// import { useEffect, useState } from 'react';
// import TopBanner from './TopBanner';
// import Navbar from './Navbar';
//
// const Header = () => {
//     const [showBanner, setShowBanner] = useState(true);
//     const [lastScrollY, setLastScrollY] = useState(0);
//
//     useEffect(() => {
//         const handleScroll = () => {
//             const currentScrollY = window.scrollY;
//
//             // Если скроллим вниз
//             if (currentScrollY > lastScrollY && currentScrollY > 60) {
//                 setShowBanner(false);
//             }
//             // Если скроллим вверх
//             else if (currentScrollY < lastScrollY) {
//                 setShowBanner(true);
//             }
//
//             setLastScrollY(currentScrollY);
//         };
//
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, [lastScrollY]);
//
//     return (
//         <header className="fixed top-0 left-0 right-0 z-50 w-full">
//             {/* TopBanner (плавно уходит вверх при скролле вниз) */}
//             <div
//                 className={`transition-transform duration-300 ${
//                     showBanner ? 'translate-y-0' : '-translate-y-full'
//                 }`}
//             >
//                 <TopBanner />
//             </div>
//
//             {/* Navbar (всегда на экране) */}
//             <div className="sticky top-0 z-40">
//                 <Navbar />
//             </div>
//         </header>
//     );
// };
//
// export default Header;