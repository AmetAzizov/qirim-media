

// export default Loader;
import React, { useEffect, useState } from 'react';
import '../../styles/loading.css'
const Loader = () => {
    const [barWidths, setBarWidths] = useState([0, 0, 0, 0]);

    useEffect(() => {
        const barAnimations = barWidths.map((_, index) => {
            return setInterval(() => {
                setBarWidths(prevWidths => {
                    const updatedWidths = [...prevWidths];
                    updatedWidths[index] = Math.min(100, updatedWidths[index] + 1);
                    return updatedWidths;
                });
            }, 50);  // Это будет скорость анимации
        });

        return () => {
            barAnimations.forEach(interval => clearInterval(interval));
        };
    }, []);

    return (
        <div className='loader-container'>
            {barWidths.map((width, index) => (
                <div 
                    key={index} 
                    className='loader-bar' 
                    style={{ width: `${width}%`, backgroundColor: width < 100 ? '#f3f3f3' : '#3498db' }}
                />
            ))}
        </div>
    );
};

export default Loader;
