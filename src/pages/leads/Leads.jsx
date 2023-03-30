import { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { MenuItem, Checkbox, Button } from "@material-tailwind/react";
import { Menu, MenuHandler, MenuList } from "@material-tailwind/react";
import LeadData from "@/data/lead-table-props";
import plus from "../../../public/img/plus.svg";
import filterIcon from "../../../public/img/filterIcon.svg";
import down from "../../../public/img/downIcon.svg";
import dropdown from "../../../public/img/dropdown.svg";
import { useSelector, useDispatch } from "react-redux";
import { read, utils, writeFile } from "xlsx";
import {
  listLeads,
  viewLeadsManagmentModuleStatus,
  filterListLeads,
} from "@/redux/actions/actions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "../universitymodule/Modal";
import { useParams } from "react-router-dom";
import axios from "axios";
import Paginate from "@/paginate";
import { NavbarCtx } from "@/App";
import { ENV } from "@/config";
export function Leads() {
  // const { statusColor } = useContext(NavbarCtx);
  // console.log("ooooooooooooo", statusColor);
  const disptach = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const leadsData = useSelector((state) => state?.universitiesReducer?.leads);
  // Anasite - Edits: for 'edit'/'delete'
  const [idToDelete, setIdToDelete] = useState("");
  const [search, setSearch] = useState("");
  const [dropdownID, setDropdownID] = useState("");

  const handleExportXlsx = () => {
    const headings = [[...Object.keys(leadsData?.data?.faqs[0])]];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, leadsData?.data?.faqs, {
      origin: "A2",
      skipHeader: true,
    });
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, "Movie Report.xlsx");
  };

  const handleExportCsv = () => {
    const headings = [[...Object.keys(leadsData?.data?.faqs[0])]];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, leadsData?.data?.faqs, {
      origin: "A2",
      skipHeader: true,
    });
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, "Movie Report.csv");
  };

  const onConfirmation = async () => {
    // here we will delete call
    console.log("Lead deleted");
    console.log(params.id, "_", idToDelete);
    const data = await axios.delete(`${ENV.baseUrl}/lead/delete/${idToDelete}`);
    console.log("deleted data", data);
    disptach(listLeads(pagination));
    setDropdownID("");
    // // alert("whppp");
  };
  const toggleDropdown = (ind) => {
    // ***
    return () => {
      // const dropdown = document.getElementById(`dropdown${ind}`);
      // dropdown.classList.toggle("hidden");
      // dropdown.classList.toggle("block");
      if (ind === dropdownID) return setDropdownID("");
      setDropdownID(ind);
    };
  };
  // END
  // const status = useSelector(
  //   (state) => state?.universitiesReducer?.leads?.ProgrameDetail?.status
  // );

  // useEffect(() => {
  //   disptach(viewLeadsManagmentModuleStatus(ele?.ProgrameDetail?.status));
  // }, [ele?.ProgrameDetail?.status]);

  const pagination = useSelector(
    (state) => state?.universitiesReducer?.leads?.data?.pagination
  );

  console.log("leads data in leads module", leadsData);

  // const leadStatus = leadsData?.data?.programeTable[0].id;
  // console.log("leadStatus", leadStatus);

  const [showModal, setShowModal] = useState(false);
  // list all leads
  useEffect(() => {
    disptach(listLeads(""));

    // if (leadsData?.success == true) {
    //   let { message } = leadsData;
    //   toast.success(message, {
    //     position: toast.POSITION.TOP_RIGHT,
    //     hideProgressBar: false,
    //     autoClose: 3000,
    //   });
    // }
  }, []);

  // const handleDelete = () => {
  //   // console.log("delete click", id);
  //   // const id = leadsData?.data?.faqs?.id;
  //   console.log("delted idddd ===>", id);
  //   setShowModal(true);
  //   // navigate(`/dashboard/Leadsmodule/3/${id}`);
  // };

  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        onConfirmation={onConfirmation}
      />
      <div className="mt-12 w-full bg-[#E8E9EB] pr-8 font-display">
        <div className="my-10 grid grid-cols-1">
          <p className=" mb-2 text-4xl font-semibold text-[#280559]">
            Leads Module
          </p>
          <p className=" font text-base text-[#9898A3]">View all leads</p>
        </div>
        <div className="mt-[30px] w-full bg-[#E8E9EB] font-display">
          <div>
            <div className=" rounded-[34px] bg-white p-6 md:p-12">
              <div className="my-0 flex w-full flex-col justify-between gap-3 pt-0 pb-5 sm:flex-row sm:items-center">
                <p className="text-2xl font-bold text-black sm:text-3xl">
                  Leads
                </p>
                <NavLink to="createLead">
                  <Button className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6">
                    <img className="m-1 w-[20px]" src={plus} alt="..." />
                    <p className="m-1 text-sm font-medium normal-case text-white sm:text-base">
                      Add New Lead
                    </p>
                  </Button>
                </NavLink>
              </div>
              <div className="my-3 flex flex-col items-center justify-between gap-3 rounded-[20px] bg-[#F8F9FB] p-5 md:flex-row">
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
                      // onKeyDown={handleKeyDown}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      onKeyDown={e => {
                        if (e.keyCode == 13) {
                          e.preventDefault();
                          disptach(filterListLeads({ name: search }));
                        }
                      }
                      }
                      value={search}
                      placeholder="Search"
                      className="w-full rounded-[15px] border-[1px] border-[#cbd2dc]/50 bg-white py-3 pt-4 pl-12 pr-4 text-gray-500 shadow-md focus:bg-white"
                    />
                  </div>
                </form>
                <div className="flex h-full w-full justify-between gap-3 md:w-auto md:justify-start">
                  <Menu>
                    <MenuList>
                      <MenuItem
                        onClick={() => { }}
                        className="text-base font-medium text-[#280559] hover:bg-[#F2F4F8] hover:text-[#280559]"
                      >
                        Date
                      </MenuItem>
                      <MenuItem
                        onClick={() => { }}
                        className="text-base font-medium text-[#280559] hover:bg-[#F2F4F8] hover:text-[#280559]"
                      >
                        Name
                      </MenuItem>
                      <MenuItem
                        onClick={() => { }}
                        className="text-base font-medium text-[#280559] hover:bg-[#F2F4F8] hover:text-[#280559]"
                      >
                        Email
                      </MenuItem>
                    </MenuList>
                  </Menu>


                  <Menu>
                    <MenuHandler>
                      <button className="flex h-[57px] w-[135px] flex-row items-center justify-center rounded-2xl border-[1px] border-[#cbd2dc]/50 bg-white shadow-md">
                        <img className="w-[20px]" src={down} alt="..." />
                        <p className="mx-3 ">Export</p>
                      </button>
                    </MenuHandler>
                    <MenuList>
                      <MenuItem
                        onClick={() => handleExportCsv()}
                        className="text-base font-medium text-[#280559] hover:bg-[#F2F4F8] hover:text-[#280559]"
                      >
                        Export as .csv
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleExportXlsx()}
                        className="text-base font-medium text-[#280559] hover:bg-[#F2F4F8] hover:text-[#280559]"
                      >
                        Export as .xlsx
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              </div>
              <div className="flex flex-col overflow-x-auto">
                <table className=" w-full border-none">
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
                        className="w-[113px] px-6 py-3 text-center text-base font-medium text-[#92929D]"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="w-[78px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                      >
                        Action
                      </th>
                      <th
                        scope="col"
                        className="w-[115px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                      >
                        Option
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-none">
                    {leadsData?.data?.faqs.map((ele, ind) => {
                      if (
                        localStorage.access === "adminBranch" ||
                        localStorage.access === "counselorBranch" ||
                        localStorage.access === "accountantBranch"
                      ) {
                        if (ele?.Branch?.role === localStorage.access)
                          return (
                            <tr key={ind + ele?.createdAt + "serf" + ele?.name}>
                              <td className="whitespace-nowrap py-3 pr-6">
                                <Checkbox />
                              </td>
                              <td className="whitespace-nowrap py-4 text-lg font-normal text-[#333]">
                                {new Date(ele?.createdAt).toLocaleDateString(
                                  undefined,
                                  {
                                    dateStyle: "medium",
                                  }
                                )}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-lg font-medium text-[#333]">
                                {ele?.name}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-lg font-normal text-[#333] underline">
                                {ele?.email}
                              </td>
                              <td>
                                <p
                                  className="neumorphism mx-auto mx-auto w-fit w-fit rounded-2xl rounded-2xl rounded-lg bg-gray-100 p-6 px-5 px-5 py-2 py-2 text-center text-center text-xs text-xs font-medium font-medium normal-case normal-case text-gray-700 shadow-lg dark:bg-gray-800 dark:text-gray-400"
                                  style={{
                                    color:
                                      ele?.ProgrameDetail
                                        ?.LeadsManagmentModuleStatus?.Color ||
                                      "#333",
                                    backgroundColor: `${ele?.ProgrameDetail
                                      ?.LeadsManagmentModuleStatus?.Color ||
                                      "#333"
                                      }1a`,
                                  }}
                                // style={{
                                //   color:
                                //     ele?.ApplicationDetail
                                //       ?.ApplicationModuleStatus?.Color ||
                                //     "#333",
                                //   backgroundColor: `${
                                //     ele?.ApplicationDetail
                                //       ?.ApplicationModuleStatus?.Color ||
                                //     "#333"
                                //   }1a`,
                                // }}
                                >
                                  {/* {ele?.status} */}
                                  {/* {applicationsData?.data?.applicantDetail[0].status} */}
                                  {ele?.ProgrameDetail
                                    ?.LeadsManagmentModuleStatus?.name ||
                                    "STATUS"}
                                </p>
                              </td>
                              <td>
                                <Button
                                  variant="outlined"
                                  className="mx-auto h-[28px] w-[78px] rounded-[15px] border border-[#280559] p-0 text-[#280559] ease-in hover:bg-[#280559] hover:text-white hover:opacity-100"
                                  fullWidth
                                  onClick={
                                    () =>
                                      navigate(
                                        `/dashboard/Leadsmodule/1/${ele?.id}`
                                      )
                                    // /dashboard/university_module/${e.target.value}/${ele.id}
                                  }
                                >
                                  <p className="text-center text-xs font-medium capitalize">
                                    view
                                  </p>
                                </Button>
                              </td>
                              {/* <td className="whitespace-nowrap px-6 py-4 text-center text-lg font-medium">
                         
                          <select
                            className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
                            onChange={(e) => {
                              console.log("e", e.target.value);
                              if (["1", "2"].includes(e.target.value)) {
                                navigate(
                                  `/dashboard/Leadsmodule/${e.target.value}/${ele.id}`
                                );
                              } else if (e.target.value == "3") {
                                //open delete model here
                                setShowModal(true);
                                navigate(
                                  `/dashboard/Leadsmodule/${ele.id}`
                                );
                              }
                            }}
                          >
                            <option selected="true" disabled="disabled">
                              Choose action
                            </option>
                            <option value={"1"}>view</option>
                            <option value={"2"}>edit</option>
                            <option value={"3"}>delete</option>
                          </select>
                        </td> */}
                              <td className="whitespace-nowrap px-6 py-4 text-center text-lg font-medium">
                                <button
                                  className="rounded-full text-[#636363]/50 hover:text-[#7a7a7a]"
                                  // id="dropdownDefaultButton"
                                  // data-dropdown-toggle="dropdown"
                                  id={`dropdownDefaultButton${ind}`}
                                  data-dropdown-toggle={`dropdown${ind}`}
                                  type="button"
                                  onClick={toggleDropdown(ele?.id)}
                                >
                                  <svg
                                    className="h-8 w-8 fill-current"
                                    viewBox="0 0 32 32"
                                  >
                                    <circle cx="16" cy="10" r="2" />
                                    <circle cx="16" cy="16" r="2" />
                                    <circle cx="16" cy="22" r="2" />
                                  </svg>
                                </button>
                                <div
                                  // id="dropdown"
                                  id={`dropdown${ind}`}
                                  // className="z-10 hidden w-24 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
                                  className={
                                    "z-10 w-24 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" +
                                    (dropdownID === ele?.id
                                      ? " block "
                                      : " hidden ")
                                  }
                                >
                                  <ul
                                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                    // aria-labelledby="dropdownDefaultButton"
                                    aria-labelledby={`dropdownDefaultButton${ind}`}
                                  >
                                    <li>
                                      <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                          navigate(
                                            `/dashboard/Leadsmodule/2/${ele?.id}`
                                          )
                                        }
                                      >
                                        Edit
                                      </button>
                                    </li>
                                    {
                                      (localStorage.access !== "counselor" && localStorage.access !== "counselorBranch") &&
                                      <li>
                                        <button
                                          onClick={() => {
                                            setShowModal(true);
                                            setIdToDelete(ele?.id);
                                          }}
                                        >
                                          Delete
                                        </button>
                                      </li>
                                    }

                                  </ul>
                                </div>
                              </td>
                            </tr>
                          );
                      } else {
                        return (
                          <tr key={ind + ele?.createdAt + "serf" + ele?.name}>
                            <td className="whitespace-nowrap py-3 pr-6">
                              <Checkbox />
                            </td>
                            <td className="whitespace-nowrap py-4 text-lg font-normal text-[#333]">
                              {new Date(ele?.createdAt).toLocaleDateString(
                                undefined,
                                {
                                  dateStyle: "medium",
                                }
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-lg font-medium text-[#333]">
                              {ele?.name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-lg font-normal text-[#333] underline">
                              {ele?.email}
                            </td>
                            <td>
                              <p
                                className="neumorphism mx-auto mx-auto w-fit w-fit rounded-2xl rounded-2xl rounded-lg bg-gray-100 p-6 px-5 px-5 py-2 py-2 text-center text-center text-xs text-xs font-medium font-medium normal-case normal-case text-gray-700 shadow-lg dark:bg-gray-800 dark:text-gray-400"
                                // style={{
                                //   color:
                                //     ele?.ApplicationDetail
                                //       ?.ApplicationModuleStatus?.Color ||
                                //     "#333",
                                //   backgroundColor: `${
                                //     ele?.ApplicationDetail
                                //       ?.ApplicationModuleStatus?.Color || "#333"
                                //   }1a`,
                                // }}
                                style={{
                                  color:
                                    ele?.ProgrameDetail
                                      ?.LeadsManagmentModuleStatus?.Color ||
                                    "#333",
                                  backgroundColor: `${ele?.ProgrameDetail
                                    ?.LeadsManagmentModuleStatus?.Color ||
                                    "#333"
                                    }1a`,
                                }}
                              >
                                {/* {ele?.status} */}
                                {/* {applicationsData?.data?.applicantDetail[0].status} */}
                                {/* {ele?.ApplicationDetail?.ApplicationModuleStatus
                                  ?.name || "GD"} */}
                                {ele?.ProgrameDetail?.LeadsManagmentModuleStatus
                                  ?.name || "STATUS"}
                              </p>
                            </td>
                            <td>
                              <Button
                                variant="outlined"
                                className="mx-auto h-[28px] w-[78px] rounded-[15px] border border-[#280559] p-0 text-[#280559] ease-in hover:bg-[#280559] hover:text-white hover:opacity-100"
                                fullWidth
                                onClick={
                                  () =>
                                    navigate(
                                      `/dashboard/Leadsmodule/1/${ele?.id}`
                                    )
                                  // /dashboard/university_module/${e.target.value}/${ele.id}
                                }
                              >
                                <p className="text-center text-xs font-medium capitalize">
                                  view
                                </p>
                              </Button>
                            </td>
                            {/* <td className="whitespace-nowrap px-6 py-4 text-center text-lg font-medium">
                       
                        <select
                          className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
                          onChange={(e) => {
                            console.log("e", e.target.value);
                            if (["1", "2"].includes(e.target.value)) {
                              navigate(
                                `/dashboard/Leadsmodule/${e.target.value}/${ele.id}`
                              );
                            } else if (e.target.value == "3") {
                              //open delete model here
                              setShowModal(true);
                              navigate(
                                `/dashboard/Leadsmodule/${ele.id}`
                              );
                            }
                          }}
                        >
                          <option selected="true" disabled="disabled">
                            Choose action
                          </option>
                          <option value={"1"}>view</option>
                          <option value={"2"}>edit</option>
                          <option value={"3"}>delete</option>
                        </select>
                      </td> */}
                            <td className="whitespace-nowrap px-6 py-4 text-center text-lg font-medium">
                              <button
                                className="rounded-full text-[#636363]/50 hover:text-[#7a7a7a]"
                                // id="dropdownDefaultButton"
                                // data-dropdown-toggle="dropdown"
                                id={`dropdownDefaultButton${ind}`}
                                data-dropdown-toggle={`dropdown${ind}`}
                                type="button"
                                onClick={toggleDropdown(ele?.id)}
                              >
                                <svg
                                  className="h-8 w-8 fill-current"
                                  viewBox="0 0 32 32"
                                >
                                  <circle cx="16" cy="10" r="2" />
                                  <circle cx="16" cy="16" r="2" />
                                  <circle cx="16" cy="22" r="2" />
                                </svg>
                              </button>
                              <div
                                // id="dropdown"
                                id={`dropdown${ind}`}
                                // className="z-10 hidden w-24 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
                                className={
                                  "z-10 w-24 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" +
                                  (dropdownID === ele?.id
                                    ? " block "
                                    : " hidden ")
                                }
                              >
                                <ul
                                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                  // aria-labelledby="dropdownDefaultButton"
                                  aria-labelledby={`dropdownDefaultButton${ind}`}
                                >
                                  <li>
                                    <button
                                      className="btn btn-primary"
                                      onClick={() =>
                                        navigate(
                                          `/dashboard/Leadsmodule/2/${ele?.id}`
                                        )
                                      }
                                    >
                                      Edit
                                    </button>
                                  </li>
                                  {
                                      (localStorage.access !== "counselor" && localStorage.access !== "counselorBranch" ) &&
                                    <li>
                                      <button
                                        onClick={() => {
                                          setShowModal(true);
                                          setIdToDelete(ele?.id);
                                        }}
                                      >
                                        Delete
                                      </button>
                                    </li>
                                  }
                                </ul>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
              <Paginate pagination={pagination} method={listLeads} />

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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Leads;
