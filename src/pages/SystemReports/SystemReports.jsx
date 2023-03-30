import { useState, useEffect } from "react";
import LeadsByStatus from "./LeadsByStatus";
import ApplicationByDate from "./ApplicationByDate";
import ApplicationByLevel from "./ApplicationByLevel";
import UsersByEmail from "./UsersByEmail";
import CommissionInvoices from "./CommissionInvoices";
import HQBranchInvoices from "./HQBranchInvoices";
import LogActivities from "./LogActivities";
import BackupList from "./BackupList";
import ListUniversities from "./ListUniversities";
import { useDispatch } from "react-redux";
import { listInterestedPrograms, listLeads, listQualificationTypes, listUniversities, listProgramLevels, listApplicationModuleStatuss } from "@/redux/actions/actions";

export function SystemReports() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listInterestedPrograms("limit=100000"));
    // dispatch(listLeads("limit=100000"));
    dispatch(listQualificationTypes("limit=100000"));
    dispatch(listUniversities("limit=100000"));
    dispatch(listProgramLevels("limit=100000"));
    dispatch(listApplicationModuleStatuss("limit=100000"));
  }, []);
  const tabsData = [
    {
      label: "Leads by Status, Date, Program, University and branch. ",
      content: <LeadsByStatus />,
    },
    {
      label: "Applications by date, status, University and branch.",
      content: <ApplicationByDate />,
    },
    {
      label: "Application by level, category, university and branch. ",
      content: <ApplicationByLevel />,
    },
    {
      label: "Users by email, phone, position and branch. ",
      content: <UsersByEmail />,
    },
    {
      label: "Commission Invoices by Date, Status and University.",
      content: <CommissionInvoices />,
    },
    {
      label: "HQ - Branch Invoices by date, status and branch.",
      content: <HQBranchInvoices />,
    },
    {
      label: "Log activities by user and date.",
      content: <LogActivities />,
    },
    {
      label: "Backup List by Date and Backup File",
      content: <BackupList />,
    },
    {
      label:
        "List Universities offer same Academic program by intake, fees and duration",
      content: <ListUniversities />,
    },
  ];
  return (
    <div className="mt-12 w-full bg-[#E8E9EB] pr-8 font-display">
      <div className="my-10 grid grid-cols-1">
        <p className=" text-4xl font-semibold text-[#280559] mb-2">System Reports</p>
        <p className=" font text-base text-[#9898A3]">View System Reports</p>
      </div>
      <div className=" mb-7 rounded-[34px] bg-white px-8">
        <div className="w-full flex flex-nowrap gap-10 overflow-x-auto bg-white px-5 xl:px-[64px]">
          {tabsData.map((tab, idx) => {
            return (
              <button
                key={idx}
                className={` border-t-4  py-6 transition-colors duration-300 ${
                  idx === activeTabIndex
                    ? "border-[#280559]"
                    : "border-transparent hover:border-gray-200 "
                }`}
                onClick={() => setActiveTabIndex(idx)}
              >
                <p
                  className={` ${
                    idx === tabsData.length - 1 ? "w-[420px]" : "w-[350px]"
                  }  text-[24px] font-semibold ${
                    idx === activeTabIndex
                      ? "text-[#280559]"
                      : "text-[#92929D] "
                  }`}
                >
                  {tab.label}
                </p>
              </button>
            );
          })}
        </div>
      </div>
      <div>{tabsData[activeTabIndex].content}</div>
    </div>
  );
}

export default SystemReports;
