import { useState } from 'react';
import Academic from "./Academic";
import University from "./University";


export function Universitymodule() {

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const tabsData = [
        {
          label: 'University',
          content:<University/>
        },
        {
          label: 'Academic Programs',
          content:<Academic/>
        },
      ];
    return (
        <div className="mt-12 w-full bg-[#E8E9EB] pr-8 font-display">
            <div className="grid grid-cols-1 my-10">
                <p className=" text-4xl font-semibold text-[#280559] mb-2">University Module</p>
                <p className=" text-base font text-[#9898A3]">View all University and programs</p>
            </div>
            <div className="overflow-x-auto bg-white flex items-center px-8 xl:px-[64px] mb-7 gap-10 rounded-[34px]">
                {tabsData.map((tab, idx) => {
                return (

                    <button
                    key={idx}
                    className={`whitespace-nowrap py-9 border-t-4 transition-colors duration-300 ${
                        idx === activeTabIndex
                        ? 'border-[#280559]'
                        : 'border-transparent hover:border-gray-200 '
                    }`}
                    onClick={() => setActiveTabIndex(idx)}
                    >
                    <p className={`text-lg xl:text-2xl font-semibold ${
                        idx === activeTabIndex
                        ? 'text-[#280559]'
                        : 'text-[#92929D] '
                    }`}>{tab.label}</p> 
                    </button>
            
                );
                })}
            </div>
            <div className='overflow-x-hidden'>
            {tabsData[activeTabIndex].content}
            </div>
        </div>

    )
}

export default Universitymodule;


   