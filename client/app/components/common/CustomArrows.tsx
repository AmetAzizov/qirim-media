import React from 'react';

type CustomArrowsProps = {
    direction: string;
};
const CustomArrows = ({direction}: CustomArrowsProps) => {
    return (
        <div className={`custom-arrow custom-${direction}-arrow`}>
            {direction === 'prev' ? '<' : '>'}
        </div>
    );
};

export default CustomArrows;
