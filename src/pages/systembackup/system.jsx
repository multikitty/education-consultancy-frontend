// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { Button } from "@material-tailwind/react/components/Button";
// import Backup from "@/data/backup-props";
// import fileIcon from "../../../public/img/fileIcon.svg";
// import plus from "../../../public/img/plus.svg";
// import downloadIcon from "../../../public/img/backup btns/download.svg";
// import deleteIcon from "../../../public/img/backup btns/delete.svg";
// import restoreIcon from "../../../public/img/backup btns/restore.svg";
// import { useSelector, useDispatch } from "react-redux";
// import { listBackups } from "@/redux/actions/actions";

// export function System() {
//   const dispatch = useDispatch();

//   const backupsData = useSelector(
//     (state) => state?.universitiesReducer?.backups
//   );
//   console.log(
//     "backups data for update,view,delete in create backups compo",
//     backupsData
//   );

//   useEffect(() => {
//     dispatch(listBackups());
//   }, []);

//   return (
//     <div className="mt-12 w-full bg-[#E8E9EB] pr-8 font-display">
//       <div className="flex w-full flex-col gap-8 bg-[#E8E9EB] font-display">
//         <div className="mb-12">
//           <div className="mb-10">
//             <div className="flex items-center justify-between">
//               <p className=" text-4xl font-semibold text-[#280559]">Backup</p>
//               <div className="hidden md:block">
//                 <NavLink to="">
//                   <Button className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6">
//                     <img className="m-1 w-[20px]" src={plus} alt="..." />
//                     <p className="m-1 text-sm font-medium normal-case text-white sm:text-base">
//                       Generate New Backup
//                     </p>
//                   </Button>
//                 </NavLink>
//               </div>
//             </div>
//             <p className=" font text-base text-[#9898A3]">Backup Management</p>
//             <div className="ml-auto mt-6 block w-full md:hidden">
//               <NavLink to="">
//                 <Button className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6">
//                   <img className="m-1 w-[20px]" src={plus} alt="..." />
//                   <p className="m-1 text-sm font-medium normal-case text-white sm:text-base">
//                     Generate New Backup
//                   </p>
//                 </Button>
//               </NavLink>
//             </div>
//           </div>
//           <div>
//             <div className=" rounded-[34px] bg-white p-6 md:p-12">
//               <div className="flex w-full flex-row justify-between pb-6">
//                 <p className="text-[32px] font-semibold text-[#333]">
//                   Backup List
//                 </p>
//               </div>
//               <div className="flex flex-col overflow-hidden">
//                 <table className="min-w-full">
//                   <thead className="border-hidden bg-white">
//                     <tr>
//                       <th
//                         scope="col"
//                         className="w-[500px] py-3 text-left text-lg font-bold text-gray-500  "
//                       >
//                         Name
//                       </th>
//                       <th
//                         scope="col"
//                         className="w-[100px] px-6 py-3 text-left text-lg font-bold text-gray-500  "
//                       >
//                         Date
//                       </th>
//                       <th
//                         scope="col"
//                         className="w-[200px] px-6 py-3 text-left text-lg font-bold text-gray-500  "
//                       >
//                         Size
//                       </th>
//                       <th
//                         scope="col"
//                         className="w-[250px] px-6 py-3 text-center text-lg font-bold text-gray-500  "
//                       >
//                         Action
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {Backup.map((items, index) => (
//                       <tr key={index} className="border-hidden">
//                         <td className="flex flex-row whitespace-nowrap py-4 text-lg font-medium text-gray-800 ">
//                           <img
//                             className="h-[28px] w-[24px]"
//                             src={fileIcon}
//                             alt="..."
//                           />
//                           <p className="mx-6">{items.name}</p>
//                         </td>
//                         <td className="whitespace-nowrap px-6 py-4 text-lg text-gray-800">
//                           {items.date}
//                         </td>
//                         <td className="whitespace-nowrap px-6 py-4 text-lg text-gray-800">
//                           {items.size}
//                         </td>
//                         <td className="flex items-center justify-center">
//                           <div className="mx-2 flex">
//                             <Button className="flex h-[42px] w-[42px] items-center rounded-full bg-[#65BF83] p-0 ease-in hover:w-[120px]">
//                               <div className="flex items-center gap-3 p-3">
//                                 <img src={restoreIcon} />
//                                 <p className="text-lg font-semibold capitalize">
//                                   Restore
//                                 </p>
//                               </div>
//                             </Button>
//                           </div>
//                           <div className="mx-2 flex">
//                             <Button className="flex h-[42px] w-[42px] items-center rounded-full bg-[#280559] p-0 ease-in hover:w-[140px]">
//                               <div className="flex items-center gap-2.5 p-2.5">
//                                 <img src={downloadIcon} />
//                                 <p className="text-lg font-semibold capitalize">
//                                   Download
//                                 </p>
//                               </div>
//                             </Button>
//                           </div>
//                           <div className="mx-2 flex">
//                             <Button className="flex h-[42px] w-[42px] items-center rounded-full bg-[#DB0D4B] p-0 ease-in hover:w-[105px]">
//                               <div className="flex items-center gap-3 p-3">
//                                 <img src={deleteIcon} />
//                                 <p className="text-lg font-semibold capitalize">
//                                   Delete
//                                 </p>
//                               </div>
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default System;

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react/components/Button";
import Backup from "@/data/backup-props";
import fileIcon from "../../../public/img/fileIcon.svg";
import plus from "../../../public/img/plus.svg";
import downloadIcon from "../../../public/img/backup btns/download.svg";
import deleteIcon from "../../../public/img/backup btns/delete.svg";
import restoreIcon from "../../../public/img/backup btns/restore.svg";
import { useSelector, useDispatch } from "react-redux";
// import { listBackups } from "@/redux/actions/actions";
// import { removeBackupFile } from "@/redux/actions/actions";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { ENV } from "@/config";


import {
  listBackups,
  removeBackupFile,
  downloadBackupFile,
  restoreBackupFile,
} from "@/redux/actions/actions";

import axios from "axios";
import { toast } from "react-toastify";



export function System() {
  const dispatch = useDispatch();
  // const params = useParams();
  // // const navigate = useNavigate();

  const {
    backups: backupsData,
    deleteBackupFile,
    downloadBackupFile: downBackFile,
    restoreBackupFile: restoreBackFile,
  } = useSelector((state) => state?.universitiesReducer);
  console.log("list backups data  backups compo", backupsData);

  useEffect(() => {
    dispatch(listBackups());
  }, []);
  useEffect(() => {
    dispatch(listBackups());
  }, [deleteBackupFile, downBackFile, restoreBackFile]);

  //   router.route("/create").post(uploadSingle, controller.create);
  // router.route("/list").get(controller.list);
  // router.route("/restore/:fileName").put(uploadSingle, controller.restore);
  // router.route("/delete/:fileName").delete(controller.delete);
  // router.route("/download/:fileName").get(controller.download);
  const handleRestore = (file) => {
    console.log("restore function clickeds", file);
    let parts = file.split(".");
    // console.log("parts ==>", parts[0]);
    // console.log("parts ==>", parts[0]);
    let splittedUrl = parts[0];
    // navigate(`/dashboard/system/${splittedUrl}`);
    dispatch(restoreBackupFile(splittedUrl));
    dispatch(listBackups());
  };

  const handleDownload = (file) => {
    console.log("download function clickeds", file);
    let parts = file.split(".");
    // console.log("parts ==>", parts[0]);
    let splittedUrl = parts[0];
    // navigate(`/dashboard/system/${splittedUrl}`);
    dispatch(downloadBackupFile(splittedUrl));
    dispatch(listBackups());
  };

  const handleDelete = (file) => {
    console.log("file name in delete function ", file);
    let parts = file.split(".");
    // console.log("parts ===>", parts[0]);
    let splittedUrl = parts[0];
    // navigate(`/dashboard/system/${splittedUrl}`);
    dispatch(removeBackupFile(splittedUrl));
    dispatch(listBackups());
    // console.log("file Deleted");
  };

  // useEffect(() => {
  //   // const paramsFile = splittedUrl;
  //   // console.log("paramsFileeeeev =====>", paramsFile);

  //   // const splitedFile = paramsFile.split("/");
  //   // console.log("splited file ==>", splitedFile);
  //   dispatch(removeBackupFile(splittedUrl));
  // }, [splittedUrl]);

  return (
    <div className="mt-12 w-full bg-[#E8E9EB] pr-8 font-display">
      <div className="flex w-full flex-col gap-8 bg-[#E8E9EB] font-display">
        <div className="mb-12">
          <div className="mb-10">
            <div className="flex items-center justify-between">
              <p className=" text-4xl font-semibold text-[#280559]">Backup</p>
              <div className="hidden md:block">


               {/* <NavLink to="">

                  <Button className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6">
                    <img className="m-1 w-[20px]" src={plus} alt="..." />
                    <p className="m-1 text-sm font-medium normal-case text-white sm:text-base">
                      Generate New Backup
                    </p>
                  </Button>

                </NavLink> ** See This */}
                {/* <NavLink to=""> */}
                <Button
                  onClick={async () => {
                    const config = {
                      headers: { "content-type": "multipart/form-data" },
                    };
                    const apiCall = await axios["post"](
                      `${ENV.baseUrl}/backups/create`,

                      config
                    );

                    // setIsLoading(false);
                    if (apiCall.data?.success) {
                      let { message } = apiCall.data;
                      toast.success(message, {
                        position: toast.POSITION.TOP_RIGHT,
                        hideProgressBar: false,
                        autoClose: 3000,
                        key:
                          "_" +
                          Math.random() * 1000000 +
                          "_" +
                          Math.random() * 1000000,
                      });
                    }
                    dispatch(listBackups());
                  }}
                  className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6"
                >
                  <img className="m-1 w-[20px]" src={plus} alt="..." />
                  <p className="m-1 text-sm font-medium normal-case text-white sm:text-base">
                    Generate New Backup
                  </p>
                </Button>
                {/* </NavLink> */}

              </div>
            </div>
            <p className=" font text-base text-[#9898A3]">Backup Management</p>
            <div className="ml-auto mt-6 block w-full md:hidden">
              <NavLink to="">
                <Button className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6">
                  <img className="m-1 w-[20px]" src={plus} alt="..." />
                  <p className="m-1 text-sm font-medium normal-case text-white sm:text-base">
                    Generate New Backup
                  </p>
                </Button>
              </NavLink>
            </div>
          </div>
          <div>
            <div className=" rounded-[34px] bg-white p-6 md:p-12">
              <div className="flex w-full flex-row justify-between pb-6">
                <p className="text-[32px] font-semibold text-[#333]">
                  Backup List
                </p>
              </div>
              <div className="flex flex-col overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-hidden bg-white">
                    <tr>
                      <th
                        scope="col"
                        className="w-[500px] py-3 text-left text-lg font-bold text-gray-500  "
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="w-[100px] px-6 py-3 text-left text-lg font-bold text-gray-500  "
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="w-[200px] px-6 py-3 text-left text-lg font-bold text-gray-500  "
                      >
                        Size
                      </th>
                      <th
                        scope="col"
                        className="w-[250px] px-6 py-3 text-center text-lg font-bold text-gray-500  "
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {backupsData?.backups?.map((ele, index) => (
                      <tr key={index} className="border-hidden">
                        <td className="flex flex-row whitespace-nowrap py-4  font-medium text-gray-800 ">
                          <img
                            className="h-[28px] w-[24px]"
                            src={fileIcon}
                            alt="..."
                          />
                          <p className="mx-6">{ele?.file}</p>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4   text-gray-800">
                          {/* {items.time} */}
                          {new Date(ele?.time).toLocaleDateString(undefined, {
                            dateStyle: "medium",
                          })}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4   text-gray-800">
                          {ele?.size}
                        </td>
                        <style>
                          {`
                          tr.border-hidden .temp-btn{
                            display: none;
                          }
                          tr.border-hidden:hover .temp-btn{
                            display: flex;
                          }`}
                        </style>
                        <td className="flex items-center justify-center">
                          <div className="temp-btn mx-1 flex">
                            <Button
                              className="flex h-[42px] w-[42px] items-center rounded-full bg-[#65BF83] p-0 ease-in hover:w-[120px]"
                              onClick={() => handleRestore(ele?.file)}
                            >
                              <div className="flex items-center gap-3 p-3">
                                <img src={restoreIcon} />
                                <p
                                  // onClick={handleRestore}
                                  className="text-lg font-semibold capitalize"
                                  // onClick={() => handleRestore(ele?.file)}
                                >
                                  Restore
                                </p>
                              </div>
                            </Button>
                          </div>
                          <div className="temp-btn mx-1 flex">
                            <Button
                              className="flex h-[42px] w-[42px] items-center rounded-full bg-[#280559] p-0 ease-in hover:w-[140px]"
                              onClick={() => handleDownload(ele?.file)}
                            >
                              <div className="flex items-center gap-2.5 p-2.5">
                                <img src={downloadIcon} />
                                <p
                                  className="text-lg font-semibold capitalize"
                                  // onClick={handleDownload}
                                >
                                  Download
                                </p>
                              </div>
                            </Button>
                          </div>
                          <div className="temp-btn mx-1 flex">
                            <Button
                              className="flex h-[42px] w-[42px] items-center rounded-full bg-[#DB0D4B] p-0 ease-in hover:w-[140px]"
                              onClick={() => handleDelete(ele?.file)}
                            >
                              <div className="flex items-center gap-2.5 p-2.5">
                                <img src={deleteIcon} />
                                <p
                                  className="text-lg font-semibold capitalize"
                                  // onClick={handleDownload}
                                  // onClick={() => handleDelete(ele?.file)}
                                >
                                  {" "}
                                  Delete
                                </p>
                              </div>
                            </Button>
                          </div>
                          {/* <div className="mx-1 flex">
                            <button
                              onClick={() => handleDelete(ele?.file)}
                              className="flex h-[42px] w-[42px] items-center rounded-full bg-[#DB0D4B] p-0 ease-in hover:w-[105px]"
                            >
                              <div className="flex items-center gap-3 p-3">
                                <img src={deleteIcon} />
                                <p className="text-lg font-semibold capitalize">
                                  Delete
                                </p>
                              </div>
                            </button>
                          </div> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default System;
