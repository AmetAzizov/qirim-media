'use client';

import React, {forwardRef} from 'react';
import DateIcon from '@/public/date-picker.svg'

// eslint-disable-next-line react/display-name
const CustomInput = forwardRef<HTMLInputElement, any>(
    ({value, onClick, onChange, placeholder}, ref) => (
        <div
            onClick={onClick}
            className="flex items-center gap-2 p-2.5 rounded-lg bg-[--secondary-color-4] hover:bg-[#DBDBDB] cursor-pointer max-w-[155px] w-full"
        >
            <span className='rounded-lg bg-[#D9EDFC] p-2'>
               <DateIcon/>
            </span>
            <div>
                <input
                    onChange={onChange}
                    value={value}
                    placeholder={placeholder}
                    className="bg-transparent border-none outline-none text-xs placeholder-[#000] font-medium cursor-pointer"
                    readOnly
                />
            </div>

        </div>
    )
);

export default CustomInput;
