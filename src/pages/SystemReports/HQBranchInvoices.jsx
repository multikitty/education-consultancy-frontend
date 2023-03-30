import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Checkbox,
} from "@material-tailwind/react";
import filterIcon from "../../../public/img/filterIcon.svg";
import down from "../../../public/img/downIcon.svg";
import Commission_voice_data from "@/data/Commission-voice-data";
import print from "../../../public/img/print.svg";
import { read, utils, writeFile } from 'xlsx';
import dropdown from "../../../public/img/dropdown.svg";

export function HQBranchInvoices() {

  const handleExportXlsx = () => {
    const headings = [[
      ...Object.keys(Commission_voice_data[0])
    ]];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, Commission_voice_data, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, 'Movie Report.xlsx');
  }

  const handleExportCsv = () => {
    const headings = [[
      ...Object.keys(Commission_voice_data[0])
    ]];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, Commission_voice_data, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, 'Movie Report.csv');
  }

  return (
    <div className="mt-[30px] w-full bg-[#E8E9EB] font-display">
      <div>
        <div className=" rounded-[34px] bg-white p-6 md:p-12">
          <p className=" text-3xl font-bold text-[#280559]">
            HQ Branch Invoices
          </p>
          <div className="mb-3 mt-12 flex flex-col items-center justify-center gap-3 rounded-[20px] bg-[#F8F9FB] p-5 lg:flex-row">
            <form className="h-full w-full">
              <div className="relative h-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 bottom-0 left-3 my-auto h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full rounded-[15px] border-[1px] border-[#cbd2dc]/50 bg-white py-3 pt-4 pl-12 pr-4 text-gray-500 shadow-md focus:bg-white"
                />
              </div>
            </form>
            <div className="flex h-full w-full flex-wrap justify-center gap-3 sm:flex-nowrap lg:w-auto lg:justify-start">
              <button className="flex h-[57px] w-[135px] flex-row items-center justify-center rounded-2xl border-[1px] border-[#cbd2dc]/50 bg-white shadow-md">
                <img className="w-[20px]" src={filterIcon} alt="..." />
                <p className="mx-3 text-[16px] ">Filters</p>
              </button>

              <Menu>
                <MenuHandler>
                  <button className="flex h-[57px] w-[135px] flex-row items-center justify-center rounded-2xl border-[1px] border-[#cbd2dc]/50 bg-white shadow-md">
                    <img className="w-[20px]" src={down} alt="..." />
                    <p className="mx-3 ">Export</p>
                  </button>
                </MenuHandler>
                <MenuList>
                  <MenuItem onClick={() => handleExportCsv()} className="text-base font-medium text-[#280559] hover:bg-[#F2F4F8] hover:text-[#280559]">
                    Export as .csv
                  </MenuItem>
                  <MenuItem onClick={() => handleExportXlsx()} className="text-base font-medium text-[#280559] hover:bg-[#F2F4F8] hover:text-[#280559]">
                    Export as .xlsx
                  </MenuItem>
                </MenuList>
              </Menu>
              <button className="flex h-[57px] w-[135px] flex-row items-center justify-center rounded-2xl border-[1px] border-[#cbd2dc]/50 bg-white shadow-md">
                <img src={print} />
                <p className="mx-3 ">Print</p>
              </button>
            </div>
          </div>
          <div className="flex flex-col overflow-x-auto">
            <table className="w-full border-none">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="w-[50px] py-3 pr-6 text-left text-base font-medium text-[#92929D]"
                  >
                    <Checkbox />
                  </th>
                  <th
                    scope="col"
                    className="w-[100px] py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    ID Invoice
                  </th>
                  <th
                    scope="col"
                    className="w-[100px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="w-[200px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    Recipient
                  </th>
                  <th
                    scope="col"
                    className="w-[200px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    University
                  </th>
                  <th
                    scope="col"
                    className="w-[150px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    Service
                  </th>
                  <th
                    scope="col"
                    className="w-[150px] px-6 py-3 text-center text-base font-medium text-[#92929D]"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="w-[100px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="border-none">
                {Commission_voice_data.map(
                  ({
                    ID,
                    ItemDate,
                    Recipient,
                    university,
                    Service,
                    Amount,
                    Status,
                    color,
                  }) => (
                    <tr key={ID}>
                      <td className="whitespace-nowrap py-3 pr-6">
                        <Checkbox />
                      </td>
                      <td className="whitespace-nowrap py-4 text-lg font-normal text-[#333]">
                        {ID}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-lg font-normal text-[#333]">
                        {new Date(ItemDate).toLocaleDateString(undefined, {
                          dateStyle: "medium",
                        })}
                      </td>
                      <td className="px-6 py-4 text-lg font-semibold text-[#333]">
                        {Recipient}
                      </td>
                      <td className="px-6 py-4 text-lg font-normal text-[#333]">
                        {university}
                      </td>
                      <td className="px-6 py-4 text-lg font-normal text-[#333]">
                        {Service}
                      </td>
                      <td className="px-6 py-4 text-center text-lg font-semibold text-[#333]">
                        {Amount}
                      </td>
                      <td>
                        <p
                          className="mx-auto w-fit rounded-2xl px-5 py-2 text-center text-xs font-medium normal-case"
                          style={{
                            color,
                            backgroundColor: `${color}10`,
                          }}
                        >
                          {Status}
                        </p>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[20px] bg-[#F8F9FB] py-4 px-6 md:flex-row md:gap-0">
            <p className="px-5 text-base text-[#92929D]">
              <span className="text-[#280559]">1</span>-5 of 56
            </p>
            <div className="flex flex-row items-center justify-center">
              <p className="mr-3 text-base text-[#92929D]">
                The page you’re on
              </p>
              <div className=" mr-2 w-[77px]">
                <Menu>
                  <MenuHandler>
                    <button className="flex h-[40px] w-[77px] flex-row items-center justify-center rounded-2xl border-[1px] border-[#cbd2dc]/50 bg-white shadow-md">
                      <p className="mx-3 font-medium text-[#280559]">1</p>
                      <img src={dropdown} />
                    </button>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem>1</MenuItem>
                    <MenuItem>2</MenuItem>
                    <MenuItem>3</MenuItem>
                    <MenuItem>4</MenuItem>
                    <MenuItem>5</MenuItem>
                  </MenuList>
                </Menu>
              </div>
              <button className="mr-2 flex h-10 w-10 items-center justify-center rounded-xl border-[1px] border-[#cbd2dc]/50 shadow-md">
                <svg
                  width={24}
                  height={24}
                  stroke="#280559"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                  />
                </svg>
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border-[1px] border-[#cbd2dc]/50 shadow-md">
                <svg
                  width={24}
                  height={24}
                  stroke="#280559"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HQBranchInvoices;
