'use client';
import React, {useState, useEffect} from 'react';
import Loader from 'react-loader-spinner';

const backgrounds = ['background1.jpg', 'background2.jpg', 'background3.jpg']; // Замените на пути к вашим изображениям

const texts = ['Loading Step 1', 'Loading Step 2', 'Loading Step 3'];

const LoadingContainer = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((step + 1) % backgrounds.length);
        }, 3000); // Смена каждые 3 секунды

        return () => clearInterval(timer);
    }, [step]);

    return (
        <div className='loading-container' style={{backgroundImage: `url(${backgrounds[step]})`}}>
            <div className='loading-text'>{texts[step]}</div>
            <Loader
                type='TailSpin' // Тип анимации (здесь используется TailSpin, но можно выбрать другой)
                color='#0070f3' // Цвет анимации
                height={80} // Высота анимации
                width={80} // Ширина анимации
            />
        </div>
    );
};

export default LoadingContainer;
