import React, { useState, useEffect } from "react";
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
import saveIcon from "../../../public/img/saveIcon.svg";
import Userprops from "@/data/user-props";
// import AddField from "./AddField";
import { NavLink } from "react-router-dom";
import DatePicker from "@/components/DatePicker";
import AddField from "@/helpers/Addfield";
import dropdown from "../../../public/img/dropdown.svg";
import { useSelector, useDispatch } from "react-redux";
import FullPageLoader from "@/FullPageLoader/FullPageLoader";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { listUsers, listBranches } from "@/redux/actions/actions";
import { viewUser, viewBranch, filterViewUser } from "@/redux/actions/actions";
import { ENV } from "@/config";
import Paginate from "@/paginate";
import Modal from "../universitymodule/Modal";
export function User() {
  /*{ toAdd, setToAdd,  open,close,  setOpenAddModal,  formsData,  setFormsData,  handleFormsDataChange,  section,} */
  // const [openModal, setOpenModal] = useState(false);
  // const [SettingUserState, setSettingUserState] = useState(true);
  const [openSettingUserAddModal, setOpenSettingUserAddModal] = useState(false);
  const [SettingUserNewFields, setSettingUserNewFields] = useState([]);
  const [allFormsData, setAllFormsData] = useState({});
  const handleAllFormsDataChange = (e) => {
    let { name, value } = e.target;
    setAllFormsData({ ...allFormsData, [name]: value });
  };

  // End
  const [userstate, setUserstate] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [isViewMode, setIsViewMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const initialValue = {
    name: "",
    email: "",
    number: "",
    role: "",
    branch: "",
    position: "",
    date: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValue);

  const branchData = useSelector(
    (state) => state?.universitiesReducer?.branch?.data?.faqs
  );

  const allUsers = useSelector((state) => state?.universitiesReducer?.users);

  const [allUser, setAllUser] = useState([]);

  console.log("all users in users module ===>", allUsers);
  console.log("all branches in users module ===>", branchData);

  useEffect(() => {
    if (
      localStorage.access === "adminBranch" ||
      localStorage.access === "counselorBranch" ||
      localStorage.access === "accountantBranch"
    ) {
      setAllUser({
        ...allUsers?.data?.faqs?.filter(
          (item) => item.role === localStorage.access
        ),
      });
    } else {
      setAllUser({ ...allUsers });
    }
  }, [allUsers]);

  const viewUsers = useSelector(
    (state) => state?.universitiesReducer?.viewUser
  );

  const pagination = useSelector(
    (state) => state?.universitiesReducer?.users?.data?.pagination
  );

  console.log(" view all users in users module ===>", viewUsers);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("formValues ===>", formValues);
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { name, email, number, role, branch, position, date, password } = formValues;

    const payload = {
      name: name,
      email: email,
      number: number,
      role: role,
      branch: branch,
      position: position,
      date: date,
      password: password,
      Uname: localStorage.name,
      Urole: localStorage.access,
      // role,
    };
    if (params.action == 2) { payload.id = params.id }

    if (payload) {
      console.log("*****************", payload);
      const apiCall = await axios[params.action == 2 ? "put" : "post"](
        `${ENV.baseUrl}/users/${params.action == 2 ? "edit" : "create"}`,
        payload
      );
      console.log("apiCall");

      setIsLoading(false);
      if (apiCall.data?.success) {
        let { message } = apiCall.data;
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: false,
          autoClose: 3000,
        });
        setUserstate(true);
        dispatch(listUsers());
      }
    }
  };
  useEffect(() => {
    dispatch(listBranches());
    dispatch(listUsers());
  }, []);

  // useEffect(() => {
  //   dispatch(viewUser(params.id));
  // }, [params.id]);

  useEffect(() => {
    if (!params.action || !params.id) return;
    console.log("paramssss>>", params);

    if (viewUsers?.user)
      setFormValues({
        ...viewUsers?.user,
        date: new Date(viewUsers?.user.date).toISOString().slice(0, 10),
        password: "",
      });
  }, [viewUsers.user]);
  useEffect(() => {
    if (params.id && params.id !== "*") dispatch(viewUser(params.id));

    if (params.action == 1) {
      setUserstate(false);
      setIsViewMode(true);
    } else if (params.action == 2) {
      setUserstate(false);
      setIsViewMode(false);
    } else {
      setUserstate(true);
      setIsViewMode(false);
      // setFormValues("");
    }
  }, [params.id, params.action]);

  // Anasite - Edits: for 'edit'/'delete'

  const [idToDelete, setIdToDelete] = useState("");
  const [dropdownID, setDropdownID] = useState("");
  const [showModal, setShowModal] = useState(false);

  const onConfirmation = async () => {
    // here we will delete call
    console.log("User deleted");
    console.log(params.id);
    const data = await axios.delete(
      `${ENV.baseUrl}/users/delete/${idToDelete}`,
      { Uname: localStorage.name, role: localStorage.access }
    );
    console.log("deleted data", data);
    // // alert("whppp");
    // here we will delete call
    dispatch(listUsers(pagination));
    setDropdownID("");
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
  return (
    <>
      {isLoading && <FullPageLoader />}

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        onConfirmation={onConfirmation}
      />
      <div
        className={`mt-[30px] flex w-full flex-col gap-8 bg-[#E8E9EB] font-display ${userstate ? "" : "hidden"
          }`}
      >
        <div>
          <div className=" rounded-[34px] bg-white p-6 md:p-12">
            <div className="my-0 flex w-full flex-col justify-between gap-3 pt-0 pb-5 sm:flex-row sm:items-center">
              <p className=" text-3xl font-semibold text-[#280559]">Users</p>
              <Button
                onClick={() => {
                  setAllFormsData({});
                  setFormValues({});
                  return setUserstate(false);
                }}
                className="rounded-[15px]  bg-[#280559]"
              >
                <div className="flex flex-row items-center justify-center">
                  <img className="m-1 w-[20px]" src={plus} alt="..." />
                  <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                    Create New User
                  </p>
                </div>
              </Button>
            </div>
            <div className="my-3 flex flex-col items-center justify-between gap-3 rounded-[20px] bg-[#F8F9FB] p-5 md:flex-row">
              <form className="h-full w-full">
                <div className="relative h-full w-full">
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
                        disptach(filterViewUser({ name: search }));
                      }
                    }
                    }
                    value={search}
                    placeholder="Search"
                    className="w-full rounded-[15px] border-[1px] border-[#cbd2dc]/50 bg-white py-3 pt-4 pl-12 pr-4 text-gray-500 shadow-md focus:bg-white"
                  />
                </div>
              </form>

              <button
                className="flex h-[57px] w-[135px] items-center justify-center rounded-2xl border-[1px] border-[#cbd2dc]/50 bg-white shadow-md"
                onClick={() => dispatch()}
              >
                <img className="w-[20px]" src={filterIcon} alt="..." />
                <p className="mx-3 text-[16px] ">Filters</p>
              </button>
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
                      className="w-[100px] py-3 text-left text-base font-medium text-[#92929D]"
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
                      className="w-[220px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="w-[115px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="w-[113px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                    >
                      Number
                    </th>
                    <th
                      scope="col"
                      className="w-[200px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                    >
                      Position
                    </th>
                    <th
                      scope="col"
                      className="w-[100px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      className="w-[100px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                    >
                      Option
                    </th>
                  </tr>
                </thead>
                <tbody className="border-none">
                  {allUser &&
                    allUser?.data?.faqs?.map((ele, ind) => (
                      <tr key={ind}>
                        <td className="whitespace-nowrap py-3 pr-6">
                          <Checkbox />
                        </td>
                        <td className="whitespace-nowrap py-4 text-lg font-normal text-[#333]">
                          {/* {id} */}
                          {ele?.id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-lg font-semibold text-[#333]">
                          {/* {name} */}
                          {ele?.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-lg font-normal text-[#333] underline">
                          {/* {email} */}
                          {ele?.email}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-lg font-normal text-[#333]">
                          {/* {role} */}
                          {ele?.role}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-lg font-semibold text-[#333]">
                          {/* {number} */}
                          {ele?.number}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-lg font-normal text-[#333]">
                          {/* {position} */}
                          {ele?.position}
                        </td>
                        <td>
                          <Button
                            variant="outlined"
                            className="mx-auto h-[28px] w-[78px] rounded-[15px] border border-[#280559] p-0 text-[#280559] ease-in hover:bg-[#280559] hover:text-white hover:opacity-100"
                            fullWidth
                            onClick={() =>
                              navigate(
                                `/dashboard/settingsManagement/user/1/${ele?.id}`
                              )
                            }
                          >
                            <p className="text-center text-xs font-medium capitalize">
                              view
                            </p>
                          </Button>
                        </td>
                        {/* <td className="whitespace-nowrap px-6 py-4 text-center text-lg font-medium">
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
                        {/* id={`dropdownDefaultButton${ind}`}
                            data-dropdown-toggle={`dropdown${ind}`}
                            id={`dropdown${ind}`}
                            aria-labelledby={`dropdownDefaultButton${ind}`} */}
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
                            className={
                              "z-10 w-24 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" +
                              (dropdownID === ele?.id ? "" : " hidden ")
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
                                      `/dashboard/settingsManagement/user/2/${ele?.id}`
                                    )
                                  }
                                >
                                  Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => {
                                    setShowModal(true);
                                    setIdToDelete(ele?.id);
                                  }}
                                // onClick={
                                //   // () => setShowModal(true)
                                //   // navigate(
                                //   //   `/dashboard/Leadsmodule/${ele?.id}`
                                //   // )
                                // }
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <Paginate pagination={pagination} method={listUsers} />

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

      {/* ----------------------------------------- */}

      <div
        className={`flex w-full flex-col gap-8 bg-[#E8E9EB] font-display ${userstate ? "hidden" : ""
          }`}
      >
        <div className="mb-5">
          <p className=" mb-2 text-4xl font-semibold text-[#280559]">
            {isViewMode ? "View User" : "Add New User"}
          </p>
          <p className=" font text-base text-[#9898A3]">
            {isViewMode ? "View User" : "Add New User"}
          </p>
        </div>
        <div className="rounded-[34px] bg-white p-[39px]">
          <p className="mb-8 text-2xl font-semibold text-[#333333]">
            User Details
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mt-4 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {
                !isViewMode &&
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#333333]">
                    Name
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    disabled={isViewMode}
                  />
                  {console.log("Is View Mode", ">>", isViewMode)}
                </div>
              }
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Email Address
                </label>
                <input
                  type="email"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="example@email.com"
                  required
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  disabled={isViewMode}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="+91 0123 456 789"
                  name="number"
                  value={formValues.number}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Role
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="role"
                  value={formValues.role}
                  onChange={handleChange}
                  disabled={isViewMode}
                >
                  <option value={""}>Select Role</option>

                  <option value={"superAdmin"}>Super Admin</option>
                  <option value={"admin"}>Admin HQ</option>
                  <option value={"counselor"}>Counselor HQ</option>
                  <option value={"accountant"}>Accountant HQ</option>
                  <option value={"adminBranch"}>Admin Branch</option>
                  <option value={"counselorBranch"}>Counselor Branch</option>
                  <option value={"accountantBranch"}>Accountant Branch</option>

                  {/*     <option value={"superAdmin"}>Super Admin</option>
                  <option value={"admin"}>Admin HQ</option>
                  <option value={"counselor"}>Counselor HQ</option>
                  <option value={"accountant"}>Accountant HQ</option>
                  <option value={"adminBranch"}>Admin Branch</option>
                  <option value={"accountantBranch"}>Counselor Branch</option>
                  <option value={"applicant"}>Accountant Branch</option>
                  */}
                </select>
              </div>
              {formValues?.role?.split(" ").join("").toLowerCase() ===
                "superadminhq" ||
                formValues?.role?.split(" ").join("").toLowerCase() ===
                "superadmin" ||
                formValues?.role?.split(" ").join("").toLowerCase() ===
                "adminhq" ||
                formValues?.role?.split(" ").join("").toLowerCase() ===
                "counselorHQ".toLowerCase() ||
                formValues?.role?.split(" ").join("").toLowerCase() ===
                "accountanthq".toLowerCase() ||
                formValues?.role?.split(" ").join("").toLowerCase() === "admin" ||
                formValues?.role?.split(" ").join("").toLowerCase() ===
                "counselor".toLowerCase() ||
                formValues?.role?.split(" ").join("").toLowerCase() ===
                "accountant".toLowerCase() ? (
                ""
              ) : (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#333333]">
                    Branch
                  </label>
                  <select
                    className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                    name="branch"
                    value={formValues.branch}
                    onChange={handleChange}
                    disabled={isViewMode}
                  >
                    {/* <option>Mdk</option>
                      <option>Lahore</option> */}
                    {branchData?.map(({ id, name }) => {
                      return (
                        <option value={name} key={id + name}>
                          {name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Position
                </label>
                {/* Anasite - Edits: Turn Position input required into "text" instead of "select" & Adding Calender to "Date" Input required */}
                <input
                  required
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Position"
                  name="position"
                  value={formValues.position}
                  onChange={handleChange}
                  disabled={isViewMode}
                />
                {/* <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="position"
                  value={formValues.position}
                  onChange={handleChange}
                  disabled={isViewMode}
                >
                  <option>Select Position</option>
                  <option>First Position</option>
                  <option>Second Position</option>
                  <option>Third Position</option>
                </select> */}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Date
                </label>
                <input
                  required
                  type="date"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="DD/MM/YYYY"
                  name="date"
                  value={formValues.date}
                  onChange={handleChange}
                  disabled={isViewMode}
                  min="1997-01-01"
                  max="2030-12-31"
                />
              </div>
              {isViewMode ? (
                ""
              ) : (
                <AddField
                  open={openSettingUserAddModal}
                  close={() => setOpenSettingUserAddModal(false)}
                  toAdd={SettingUserNewFields}
                  setOpenAddModal={setOpenSettingUserAddModal}
                  setToAdd={setSettingUserNewFields}
                  formsData={formValues}
                  setFormsData={setFormValues}
                  handleFormsDataChange={handleChange}
                  section={"Settings-User"}
                />
              )}
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
            </div>
            {isViewMode ? (
              ""
            ) : (
              <>
                <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* {
                    params.action == 2 &&
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#333333]">
                        Current Password
                      </label>
                      <input
                        required
                        type="password"
                        className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                        name="cur_password"
                        value={formValues.cur_password}
                        onChange={handleChange}
                        placeholder="***********"
                        disabled={isViewMode}
                      />
                    </div>
                  } */}
                  {
                    !isViewMode &&
                    <>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-[#333333]">
                          New Password
                        </label>
                        <input
                          required
                          type="password"
                          className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                          name="password"
                          value={formValues.password}
                          onChange={handleChange}
                          placeholder="***********"
                          disabled={isViewMode}
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-[#333333]">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                          placeholder="***********"
                        />
                      </div>
                    </>
                  }
                </div>
                {/* <NavLink to=""> */}
                <Button
                  className="rounded-[15px]  bg-[#280559]"
                  type="submit"
                  // onClick={(e) => {
                  //   handleSubmit(e);
                  // }}
                  disabled={isViewMode}
                >
                  <div className="flex flex-row items-center justify-center">
                    <img src={saveIcon} alt="..." />
                    {/* <button
                  className="p-1 px-[11px] text-base font-medium normal-case text-white"
                  type="submit"
                  disabled={isViewMode}
                > */}
                    <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                      Save Changes
                    </p>
                    {/* </button> */}
                  </div>
                </Button>
                {/* </NavLink> */}
              </>
            )}{" "}
            <Button
              onClick={() => {
                setAllFormsData({});
                setFormValues({});
                setUserstate(true);
                navigate("/dashboard/settingsManagement/*");
                return;
              }}
              className="rounded-[15px]  bg-[#280559]"
            >
              <div className="flex flex-row items-center justify-center">
                <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                  Back
                </p>
              </div>
            </Button>
          </form>
        </div>
        {/* <div className="my-[30px] mr-8 rounded-[34px] bg-white p-[39px]">
          <p className="mb-8 text-2xl font-semibold text-[#333333]">Password</p>
          <form>
            <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Password
                </label>
                <input
                  required
                  type="password"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder=""
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  disabled={isViewMode}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="***********"
                />
              </div>
            </div>
          </form>
        </div> */}
        {/* <div className="my-[30px] mr-8 rounded-[34px] bg-white p-[39px]"> */}
      </div>
      {/* </form> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
}

export default User;
