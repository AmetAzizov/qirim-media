type ArrowProps = {
    direction: 'prev' | 'next';
    onClick: () => void;
};

const Arrow = ({direction, onClick}: ArrowProps) => {
    return (
        <button className={'px-2.5 py-1 rounded-md'} onClick={onClick}>
            <div
                style={{...styles.arrow, ...styles[direction]}}
                className={`arrow ${direction} inline-block w-[10px] h-[10px] cursor-pointer rounded-[10%]`}
            ></div>
        </button>
    );
};

const styles = {
    arrow: {
        borderTop: '2px solid white',
        borderRight: '2px solid white'
    },
    prev: {
        transform: 'rotate(-135deg)'
    },
    next: {
        transform: 'rotate(45deg)'
    }
};

type ArrowsProps = {
    sliderRef: any;
};

const Arrows = ({sliderRef}: ArrowsProps) => {
    return (
        <div className='hidden justify-between items-center w-[88px] h-[33px] mt-7 mb-1 rounded-md border-[1px] border-solid border-[#DBDBDB] xl:flex'>
            <Arrow direction='prev' onClick={() => sliderRef.current?.slickPrev()} />
            <Arrow direction='next' onClick={() => sliderRef.current?.slickNext()} />
        </div>
    );
};

export default Arrows;
