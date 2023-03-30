import React, { useEffect } from "react";
import Backup from "@/data/backup-props";
import fileIcon from "../../../public/img/fileIcon.svg";
import Paginate from "@/paginate";
import { listBackups } from "@/redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";

export function Leads() {
  const { backups } = useSelector((state) => state?.universitiesReducer);
  console.log("Backups from System Reports", backups);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listBackups());
  }, []);
  return (
    <div className="mt-[30px] w-full bg-[#E8E9EB]">
      <div>
        <div className=" rounded-[34px] bg-white p-6 md:p-12">
          <div className="flex w-full flex-row justify-between pb-6">
            <p className="text-3xl font-bold text-[#333]">Backup List</p>
          </div>
          <div className="flex flex-col overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="border-hidden bg-white">
                <tr>
                  <th
                    scope="col"
                    className="w-1/2 py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="w-1/3 px-6 py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="w-[100px] px-6 py-3 text-left text-base font-medium text-[#92929D]  "
                  >
                    Size
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {backups?.backups?.map((item, index) => (
                  <tr key={index} className="border-hidden">
                    <td className="flex flex-row whitespace-nowrap py-4 text-lg font-medium text-[#333]">
                      <img
                        className="h-[28px] w-[24px]"
                        src={fileIcon}
                        alt="..."
                      />
                      <p className="mx-6">{item?.file}</p>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-lg text-[#333]">
                      {new Date(item?.time).toLocaleDateString(undefined, {
                        dateStyle: "medium",
                      })}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-lg font-semibold text-[#333]">
                      {item.size || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <Paginate method={listBackups} pagination={backups?.data?.pagination}>
            List Application By Level
          </Paginate> */}
        </div>
      </div>
    </div>
  );
}

export default Leads;
