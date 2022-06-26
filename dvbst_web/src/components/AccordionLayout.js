import React from 'react';

import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'

const AccordionLayout = ({ name, dept, year, section, bio, plans, index, activeIndex, setActiveIndex }) => {
    const handleSetIndex = (index) => (activeIndex !== index) && setActiveIndex(index);

    return (
        <>
            <div onClick={() => handleSetIndex(index)} className='flex w-1/2 justify-between p-2 mt-2 rounded bg-green-400'>
                <div class='flex flex-col justify-center items-start'>
                    <div>
                        Full Name: {name}
                    </div>
                    <div>
                        School/Center: {dept}
                    </div>
                    <div>
                        Year: {year}
                    </div>
                    <div>
                        Section: {section}
                    </div>

                </div>
                <div className="flex items-center justify-center">
                    {
                        (activeIndex === index)
                            ? <BsFillArrowDownCircleFill className='w-8 h-8' />
                            : <BsFillArrowUpCircleFill className='w-8 h-8' />
                    }
                </div>
            </div>

            {(activeIndex === index) && (
                <>
                    <div className="shadow-3xl rounded-2xl shadow-cyan-500/50 p-4 mb-6">
                        {bio}
                    </div>
                    <div className="shadow-3xl rounded-2xl shadow-cyan-500/50 p-4 mb-6">
                        {plans}
                    </div>
                </>
            )}
        </>
    );
};

export default AccordionLayout;