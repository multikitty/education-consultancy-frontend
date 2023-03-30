import React, { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Checkbox,
} from "@material-tailwind/react";
import plus from "../../../public/img/plus.svg";
import filterIcon from "../../../public/img/filterIcon.svg";
import print from "../../../public/img/print.svg";
import saveIcon from "../../../public/img/saveIcon.svg";
import Sales_recording_data from "@/data/Sales-recording-data";
import AddField from "@/helpers/Addfield";
// import { NavLink } from "react-router-dom";
import dropdown from "../../../public/img/dropdown.svg";
// Anasite - Edits
import { NavLink, useParams } from "react-router-dom";
import {
  listExpenses,
  listInvoiceModuleStatuss,
} from "@/redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { ENV } from "@/config";
import axios from "axios";
import { toast } from "react-toastify";
import Paginate from "@/paginate";
import Modal from "../universitymodule/Modal";
//

export function Expenses() {
  // Anasite - Edits
  const dispatch = useDispatch();
  const params = useParams();
  const [action, setAction] = useState(0); // 0: create, 1: view, 2: edit
  const [isViewMode, setIsViewMode] = useState(true);

  const { expenses, invoiceModuleStatuss: statuss } = useSelector(
    (state) => state?.universitiesReducer
  );
  console.log("expenses from accounting ====>", expenses);
  useEffect(() => {
    dispatch(listExpenses());
    dispatch(listInvoiceModuleStatuss("limit=100000"));
  }, []);
  const handleSubmit = async () => {
    // setExpstate(true);
    // console.log("handle submit", formValues);
    const { name, description, amount, date, statusID, ID } = allFormsData;
    let formData = new FormData();
    formData.append("name", name);
    formData.append("amount", amount);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("statusID", statusID);
    if (ID) formData.append("id", ID);
    if (params.id) formData.append("id", params.id);

    // console.log("Salllleee", sale);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    const expense = await axios[action == 2 ? "put" : "post"](
      `${ENV.baseUrl}/expenses/${action == 2 ? "edit" : "create"}`,
      formData,
      config
    );

    // setIsLoading(false);
    // console.log("Salllleee", sale);

    if (expense.data?.success) {
      let { message } = expense.data;
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 3000,
        // key: "_" + Math.random() * 1000000 + "_" + Math.random() * 1000000,
      });
      setExpstate(true);
      setAction(0);
      setAllFormsData({ date: Date.now() });
      setIdToDelete();
      setIdToView();
      setDropdownID();
      dispatch(listExpenses());
    }
    // navigate("university")
    // setExpstate(true);
    // // console.log("handle submit", formValues);
    // const { name, description, amount, date } = allFormsData;
    // let formData = new FormData();
    // formData.append("name", name);
    // formData.append("amount", amount);
    // formData.append("description", description);
    // formData.append("date", date);

    // if (params.id) formData.append("id", params.id);

    // const config = {
    //   headers: { "content-type": "multipart/form-data" },
    // };

    // const apiCall = await axios[params.action == 2 ? "put" : "post"](
    //   `${ENV.baseUrl}/expenses/${params.action == 2 ? "edit" : "create"}`,
    //   formData,
    //   config
    // );
    // dispatch(listExpenses());

    // // setIsLoading(false);

    // if (apiCall.data?.success) {
    //   let { message } = apiCall.data;
    //   toast.success(message, {
    //     position: toast.POSITION.TOP_RIGHT,
    //     hideProgressBar: false,
    //     autoClose: 3000,
    //     // key: "_" + Math.random() * 1000000 + "_" + Math.random() * 1000000,
    //   });
    // }
    // navigate("university")
  };
  // END

  /*{ toAdd, setToAdd,  open,close,  setOpenAddModal,  formsData,  setFormsData,  handleFormsDataChange,  section,} */
  // const [openModal, setOpenModal] = useState(false);
  // const [expState, setExpState] = useState(true);
  // const [openModal, setOpenModal] = useState(false);
  const [expstate, setExpstate] = useState(true);
  const [openExpAddModal, setOpenExpAddModal] = useState(false);
  const [ExpNewFields, setExpNewFields] = useState([]);
  const [allFormsData, setAllFormsData] = useState({ date: Date.now() });
  const handleAllFormsDataChange = (e) => {
    let { name, value } = e.target;
    setAllFormsData({ ...allFormsData, [name]: value });
  };

  // Anasite - Edits: for view on click
  useEffect(() => {
    if (action == 1) return setIsViewMode(true);
    setIsViewMode(false);
  }, [action]);
  const [idToView, setIdToView] = useState("");
  const viewOnClick = ({ ID, name, description, amount, date, statusID }) => {
    // console.log("view on click");
    return () => {
      // setAction(1);
      setExpstate(false);
      setAllFormsData({ name, description, amount, date, statusID, ID });
      setIdToView(ID);
    };
  };
  // Anasite - Edits: for 'edit'/'delete'
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [dropdownID, setDropdownID] = useState("");
  const [search, setSearch] = useState("");
  const onConfirmation = async () => {
    // here we will delete call
    // console.log("Sales deleted");
    // console.log("Sales delete", params.id);
    const data = await axios.delete(
      `${ENV.baseUrl}/expenses/delete/${idToDelete}`
    );
    if (data.data?.success) {
      let { message } = data.data;
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 3000,
        // key: "_" + Math.random() * 1000000 + "_" + Math.random() * 1000000,
      });
      setExpstate(true);
      setAction(0);
      setAllFormsData({ date: Date.now() });
      setIdToDelete();
      setIdToView();
    }
    // console.log("deleted data", data);
    dispatch(listExpenses(expenses?.data?.faqs.pagination));
    // // alert("whppp");
  };
  const toggleDropdown = (ind) => {
    // console.log("toggle dropdown ", dropdownID, " _ ", ind);

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
  // END

  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        onConfirmation={onConfirmation}
      />
      <div
        className={`mt-[30px] flex w-full flex-col gap-8 bg-[#E8E9EB] ${
          expstate ? "" : "hidden"
        }`}
      >
        <div>
          <div className=" rounded-[34px] bg-white p-6 md:p-12">
            <div className="my-0 flex w-full flex-col justify-between gap-3 pt-0 pb-5 sm:flex-row sm:items-center">
              <p className="text-2xl font-bold text-black sm:text-3xl">
                Expenses
              </p>
              <Button
                onClick={() => setExpstate(false)}
                className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6"
              >
                <img className="m-1 w-[20px]" src={plus} alt="..." />
                <p className="m-1 text-sm font-medium normal-case text-white sm:text-base">
                  Add New Expenses
                </p>
              </Button>
            </div>
            <div className="my-3 grid grid-cols-1 gap-3 rounded-[20px] bg-[#F8F9FB] p-5 2xl:grid-cols-2">
              <form className="h-full">
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
              <div className="grid h-full grid-cols-2 gap-3 md:grid-cols-4">
                <input
                  type="text"
                  className="rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="From Date"
                  required
                />
                <input
                  type="text"
                  className="rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="To Date"
                  required
                />
                <button className="flex items-center justify-center rounded-2xl border-[1px] border-[#cbd2dc]/50 bg-white shadow-md">
                  <img className="w-[20px]" src={filterIcon} alt="..." />
                  <p className="mx-3 text-[16px] ">Apply</p>
                </button>
                <button className="flex h-[57px] flex-row items-center justify-center rounded-2xl border-[1px] border-[#cbd2dc]/50 bg-white shadow-md">
                  <img src={print} />
                  <p className="mx-3">Print</p>
                </button>
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
                      Description
                    </th>
                    <th
                      scope="col"
                      className="w-[113px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="w-[115px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
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
                  {expenses?.data?.faqs.map(
                    (
                      {
                        ID,
                        date,
                        name,
                        description,
                        amount: costAmount,
                        costAmountColor,
                        statusID,
                      },
                      ind
                    ) => (
                      <tr key={name + ID + "lkj" + description}>
                        <td className="whitespace-nowrap py-3 pr-6">
                          <Checkbox />
                        </td>
                        <td className="whitespace-nowrap py-4 text-lg font-normal text-[#333]">
                          {new Date(date).toLocaleDateString(undefined, {
                            dateStyle: "medium",
                          })}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-lg font-semibold text-[#333]">
                          {name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-lg font-normal text-[#333]">
                          {description}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-lg font-semibold text-[#333]">
                          <span style={{ color: costAmountColor || "" }}>
                            ${costAmount}
                          </span>
                        </td>
                        <td>
                          <Button
                            variant="outlined"
                            className="mx-auto h-[28px] w-[78px] rounded-[15px] border border-[#280559] p-0 text-[#280559] ease-in hover:bg-[#280559] hover:text-white hover:opacity-100"
                            fullWidth
                            onClick={() => {
                              setAction(1);
                              return viewOnClick({
                                date,
                                ID,
                                amount: costAmount,
                                name,
                                description,
                                statusID,
                              })();
                            }}
                          >
                            <p className="text-center text-xs font-medium capitalize">
                              view
                            </p>
                          </Button>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center text-lg font-medium">
                          <button
                            className="rounded-full text-[#636363]/50 hover:text-[#7a7a7a]"
                            // id="dropdownDefaultButton"
                            // data-dropdown-toggle="dropdown"
                            id={`dropdownDefaultButton${ind}`}
                            data-dropdown-toggle={`dropdown${ind}`}
                            type="button"
                            onClick={toggleDropdown(ID)}
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
                              (dropdownID === ID ? "" : " hidden ")
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
                                  onClick={() => {
                                    // setShowModal(true);
                                    setAction(2); // Edit
                                    viewOnClick({
                                      ID,
                                      name,
                                      description,
                                      amount: costAmount,
                                      date,
                                      statusID,
                                    })();
                                    setExpstate(false);

                                    //   (navigate(
                                    //   `/dashboard/university_module/a/2/${ele?.id}`
                                    // ))
                                  }}
                                >
                                  Edit
                                </button>
                              </li>
                              {
                              (localStorage.access !== "accountant" && localStorage.access !== "adminBranch") &&
                                <li>
                                  <button
                                    onClick={() => {
                                      setShowModal(true);
                                      setIdToDelete(ID);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </li>
                              }
                            </ul>
                          </div>
                        </td>
                        {/* <td>
                          <Button
                            variant="outlined"
                            className="mx-auto h-[28px] w-[78px] rounded-[15px] border border-[#280559] p-0 text-[#280559] ease-in hover:bg-[#280559] hover:text-white hover:opacity-100"
                            fullWidth
                          >
                            <p className="text-center text-xs font-medium capitalize">
                              view
                            </p>
                          </Button>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center text-lg font-medium">
                          <button className="rounded-full text-[#636363]/50 hover:text-[#7a7a7a]">
                            <svg
                              className="h-8 w-8 fill-current"
                              viewBox="0 0 32 32"
                            >
                              <circle cx="16" cy="10" r="2" />
                              <circle cx="16" cy="16" r="2" />
                              <circle cx="16" cy="22" r="2" />
                            </svg>
                          </button>
                        </td> */}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
            {/* Anasit - Edits
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
            </div> */}
            <Paginate
              pagination={expenses?.data?.pagination}
              method={listExpenses}
            >
              List Expenses
            </Paginate>
          </div>
        </div>
      </div>

      {/* ----------------------------------------- */}

      <div
        className={`mt-[30px] flex w-full flex-col gap-8 bg-[#E8E9EB] font-display ${
          expstate ? "hidden" : ""
        }`}
      >
        <div className="my-5">
          <p className=" mb-2 text-4xl font-semibold text-[#280559]">
            {action === 2 ? "Edit" : action === 1 ? "View" : "Create"} Expenses
          </p>
          <p className=" font text-base text-[#9898A3]">
            {action === 2 ? "Edit" : action === 1 ? "View" : "Create"} Expenses
          </p>
        </div>
        <div className="rounded-[34px] bg-white p-[39px]">
          <p className="mb-8 text-2xl font-semibold text-[#333333]">
            Expenses Details
          </p>
          <form>
            <div className="mt-4 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Expenses Name
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Expenses Name"
                  name="name"
                  onChange={handleAllFormsDataChange}
                  value={allFormsData.name || ""}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Description
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Small Description"
                  name="description"
                  onChange={handleAllFormsDataChange}
                  value={allFormsData.description || ""}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-0 top-0 flex h-full items-center rounded-xl bg-[#E5E8ED] p-3 text-base font-medium uppercase text-[#333]">
                    usd:
                  </span>
                  <input
                    type="text"
                    className="block h-full w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 pl-16 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                    placeholder="0.00"
                    name="amount"
                    onChange={handleAllFormsDataChange}
                    value={allFormsData.amount || ""}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Date
                </label>
                <input
                  type="date"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="DD/MM/YYYY"
                  name="date"
                  onChange={handleAllFormsDataChange}
                  value={
                    new Date(allFormsData.date).toISOString().substr(0, 10) ||
                    ""
                  }
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#333333]">
                  Select Status
                </label>

                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="statusID" //
                  value={+allFormsData?.statusID}
                  disabled={isViewMode}
                  onChange={handleAllFormsDataChange}
                  onBlur={(e) => {
                    if (e.target.value === "") {
                      // setFormErrors({
                      //   ...formErrors,
                      //   selectUniversity: "please choose one first location",
                      // });
                    }
                  }}
                >
                  <option value="">Select Status</option>
                  {statuss?.data?.faqs.map((status) => {
                    return (
                      <option
                        value={+status?.ID}
                        key={
                          status?.createdAt +
                          "status of invoice on sale on accounting" +
                          status?.ID +
                          status?.name
                        }
                      >
                        {status?.name}
                      </option>
                    );
                  })}
                  {/* <option>Punjab University</option>
                  <option>Virtual University</option>
                  <option>Central punjab University</option> */}
                </select>
                {/* <p className="text-red-500">{formErrors.selectUniversity}</p> */}
              </div>
              {/* <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Add Field
                </label>
                <button
                  onClick={() => setOpenModal(true)}
                  type="button"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
                >
                  Click to add more field
                </button>
                <AddField open={openModal} close={() => setOpenModal(false)} />
              </div> */}
              {expstate || isViewMode ? (
                ""
              ) : (
                <AddField
                  open={openExpAddModal}
                  close={() => setOpenExpAddModal(false)}
                  toAdd={ExpNewFields}
                  setOpenAddModal={setOpenExpAddModal}
                  setToAdd={setExpNewFields}
                  formsData={allFormsData}
                  setFormsData={setAllFormsData}
                  handleFormsDataChange={handleAllFormsDataChange}
                  section={"Accounting-Exp"}
                />
              )}
            </div>
          </form>
        </div>
        <NavLink>
          {isViewMode ? (
            ""
          ) : (
            <Button
              onClick={handleSubmit}
              className="rounded-[15px]  bg-[#280559]"
            >
              <div className="flex flex-row items-center justify-center px-[33px] py-[10px]">
                <img src={saveIcon} alt="..." />
                <p className="px-[11px] text-base font-medium normal-case text-white ">
                  Save Changes
                </p>
              </div>
            </Button>
          )}
          {"   "}
          <Button
            onClick={() => setExpstate(true)}
            className="rounded-[15px]  bg-[#280559]"
          >
            <div className="flex flex-row items-center justify-center px-[33px] py-[10px]">
              <p className="px-[11px] text-base font-medium normal-case text-white ">
                Back
              </p>
            </div>
          </Button>
        </NavLink>
      </div>
    </>
  );
}

export default Expenses;
