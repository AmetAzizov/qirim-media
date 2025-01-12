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
