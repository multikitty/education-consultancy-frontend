import { useState, useEffect } from "react";

import Branch from "./branch";
import Properties from "./properties";
import { useParams } from 'react-router-dom';
import Settings from "./settings";
import StatusManagement from "./statusmanagement";
import User from "./user";
import Profiles from "./profiles";
// import AddField from './Addfield';
// import AddUser from "./adduser";
// import AddBranch from "./addbranch";
// import AddStatus from "./addstatus";

export function SettingsManagement() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { id } = useParams();
  console.log(id)
  useEffect(()=>{
    id === '*' ? setActiveTabIndex(0) : setActiveTabIndex(id)
  },[id])
  const tabsData = [
    {
      label: "User",
      content: <User />,
    },
    {
      label: "Branch",
      content: <Branch />,
    },
    // {
    //   label: "Profile",
    //   content: <Profiles />,
    // },
    {
      label: "Status",
      content: <StatusManagement />,
    },
    {
      label: "Properties",
      content: <Properties />,
    },
    {
      label: "Activity Log",
      content: <Settings />,
    },
  ];
  return (
    <div className="mt-12 w-full bg-[#E8E9EB] pr-8 font-display">
      <div className="my-10 grid grid-cols-1">
        <p className=" mb-2 text-4xl font-semibold text-[#280559]">Settings</p>
        <p className=" font text-base text-[#9898A3]">View all settings</p>
      </div>
      <div className="mb-7 flex items-center gap-10 overflow-x-auto rounded-[34px] bg-white px-8 xl:px-[64px]">
        {tabsData.map((tab, idx) => {
          return (
            <button
              key={idx}
              className={`whitespace-nowrap border-t-4 py-9 transition-colors duration-300 ${
                idx === activeTabIndex
                  ? "border-[#280559]"
                  : "border-transparent hover:border-gray-200 "
              }`}
              onClick={() => setActiveTabIndex(idx)}
            >
              <p
                className={`text-lg font-semibold xl:text-2xl ${
                  idx === activeTabIndex ? "text-[#280559]" : "text-[#92929D] "
                }`}
              >
                {tab.label}
              </p>
            </button>
          );
        })}
      </div>
      <div className="overflow-x-hidden">
        {tabsData[activeTabIndex].content}
      </div>
    </div>
  );
}

export default SettingsManagement;
