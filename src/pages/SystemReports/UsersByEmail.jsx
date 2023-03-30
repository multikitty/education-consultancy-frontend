import React, { useEffect } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Checkbox,
} from "@material-tailwind/react";
import filterIcon from "../../../public/img/filterIcon.svg";
import Userprops from "@/data/user-props";
import dropdown from "../../../public/img/dropdown.svg";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "@/redux/actions/actions";
import Paginate from "@/paginate";

export function UsersByEmail() {
  // Anasite - Edits
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state?.universitiesReducer);
  console.log("users from SystemReports ====>", users);
  useEffect(() => {
    dispatch(listUsers());
  }, []);
  // END
  return (
    <div className="mt-[30px] w-full bg-[#E8E9EB] font-display">
      <div>
        <div className=" rounded-[34px] bg-white p-6 md:p-12">
          <p className=" text-3xl font-bold text-[#280559]">Users</p>
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
                    ID User
                  </th>
                  <th
                    scope="col"
                    className="w-[83px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="w-[346px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="w-[113px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="w-[115px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    Position
                  </th>
                  <th
                    scope="col"
                    className="w-[115px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    Branch
                  </th>
                </tr>
              </thead>
              <tbody className="border-none">
                {users?.data?.faqs.map(
                  ({ id, name, email, number: phone, position, branch }) => (
                    <tr key={id + name + email}>
                      <td className="whitespace-nowrap py-3 pr-6">
                        <Checkbox />
                      </td>
                      <td className="whitespace-nowrap py-4 text-lg font-normal text-[#333]">
                        #{id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-lg font-bold text-[#333]">
                        {name}
                      </td>
                      <td className="px-6 py-4 text-lg text-[#333] underline">
                        {email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-lg font-normal text-[#333]">
                        {phone}
                      </td>
                      <td className="px-6 py-4 text-lg font-normal text-[#333]">
                        {position}
                      </td>
                      <td className="px-6 py-4 text-lg font-normal text-[#333]">
                        {branch || "No Branch"}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          {/* <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[20px] bg-[#F8F9FB] py-4 px-6 md:flex-row md:gap-0">
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
          </div> */}

          <Paginate method={listUsers} pagination={users?.data?.pagination}>
            List Application By Level
          </Paginate>
        </div>
      </div>
    </div>
  );
}

export default UsersByEmail;
