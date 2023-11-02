'use client'
import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import '../../styles/loading.scss';

const Loader = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const animationConfig = config.stiff;

    const barSprings = [...Array(4).keys()].map(index => {
        const isActive = index === activeIndex;
        const width = isActive ? '100%' : '0%';
        const backgroundColor = isActive ? '#3498db' : '#f3f3f3';
        return useSpring({
            width,
            backgroundColor,
            config: animationConfig,
        });
    });

    const onAnimationComplete = () => {
        setActiveIndex(prevIndex => (prevIndex === 3 ? 0 : prevIndex + 1));
    };

    return (
        <div className='loader-container'>
            {barSprings.map((spring, index) => (
                <animated.div
                    key={index}
                    className='loader-bar'
                    style={{
                        width: spring.width,
                        backgroundColor: spring.backgroundColor,
                    }}
                    onReset={onAnimationComplete}
                />
            ))}
        </div>
    );
};

export default Loader;
