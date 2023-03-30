import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Checkbox,
} from "@material-tailwind/react";
import filterIcon from "../../../public/img/filterIcon.svg";
import saveIcon from "../../../public/img/saveIcon.svg";
import Userprops from "@/data/user-props";
import dropdown from "../../../public/img/dropdown.svg";
import { useSelector, useDispatch } from "react-redux";
// import universitiesReducer from "../../redux/reducers/reducer";
import { listActivities } from "@/redux/actions/actions";
import Paginate from "@/paginate";
export function Settings() {
  const dispatch = useDispatch();
  // const activities = useSelector(
  //   (state) => state?.universitiesReducer?.activities
  // );
  useEffect(() => {
    dispatch(listActivities());
  }, []);
  const activitiesData = useSelector(
    (state) => state?.universitiesReducer?.activities
  );

  const pagination = useSelector(
    (state) => state?.universitiesReducer?.activities?.data?.pagination
  );

  console.log("activities array in logactivities module ==>", activitiesData);
  return (
    <div className="mt-[30px] w-full bg-[#E8E9EB] font-display">
      <div>
        <div className=" rounded-[34px] bg-white p-6 md:p-12">
          <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <p className=" text-3xl font-semibold text-[#280559]">
              Activity Log
            </p>
          </div>
          <div className="mb-3 mt-12 flex flex-col items-center justify-between gap-3 rounded-[20px] bg-[#F8F9FB] p-5 md:flex-row">
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
            <button className="flex h-[57px] w-[135px] items-center justify-center rounded-2xl border-[1px] border-[#cbd2dc]/50 bg-white shadow-md">
              <img className="w-[20px]" src={filterIcon} alt="..." />
              <p className="mx-3 text-[16px] ">Filters</p>
            </button>
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
                    className="w-[200px] py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="w-[83px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    className="w-[346px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    Action
                  </th>
                  <th scope="col" className="w-[200px] px-6 py-3" />
                  <th
                    scope="col"
                    className="w-[113px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="w-[115px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="border-none">
                {activitiesData?.data?.faqs.map((ele, ind) => (
                  <tr key={ind}>
                    <td className="whitespace-nowrap py-3 pr-6">
                      <Checkbox />
                    </td>
                    <td className="whitespace-nowrap py-4 text-lg font-normal text-[#333]">
                      {/* {date} Anasite - Edits: Put Date on Time and Vice Versa */}
                      {ele?.createdAt
                        ? new Date(ele.createdAt).toLocaleDateString("en-GB")
                        : ""}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-lg font-normal text-[#333]">
                      {/* {time} */}
                      {ele?.createdAt
                        ? new Date(ele.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-lg text-[#333]">
                      {ele?.action}
                    </td>
                    <td className="px-6 py-4">&nbsp;</td>
                    <td className="whitespace-nowrap px-6 py-4 text-lg font-semibold text-[#333]">
                      {ele?.name}
                      {/* name */}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-lg font-normal text-[#333]">
                      {ele?.role}
                      {/* role */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Paginate pagination={pagination} method={listActivities} />
        </div>
      </div>
    </div>
  );
}

export default Settings;
