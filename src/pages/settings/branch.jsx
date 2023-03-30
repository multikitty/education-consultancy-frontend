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
import BranchProps from "@/data/branch-props";
import AddField from "@/helpers/Addfield";
import { NavLink } from "react-router-dom";
import dropdown from "../../../public/img/dropdown.svg";
import { useSelector, useDispatch } from "react-redux";
import { listBranches, filterListBranches } from "@/redux/actions/actions";
import { viewBranch } from "@/redux/actions/actions";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import Modal from "../universitymodule/Modal";
import FullPageLoader from "@/FullPageLoader/FullPageLoader";
import { ENV } from "@/config";
// import { Toast } from "react-toastify/dist/types";
import { toast } from "react-toastify";
import Paginate from "@/paginate";
import Modal from "../universitymodule/Modal";

export function Branch() {
  const [branchstate, setBranchstate] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [isViewMode, setIsViewMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  /*{ toAdd, setToAdd,  open,close,  setOpenAddModal,  formsData,  setFormsData,  handleFormsDataChange,  section,} */
  // const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  // const [BranchState, setBranchstate] = useState(true);
  const [openBranchAddModal, setOpenBranchAddModal] = useState(false);
  const [BranchNewFields, setBranchNewFields] = useState([]);
  // const [allFormsData, setAllFormsData] = useState({});
  // const handleAllFormsDataChange = (e) => {
  //   let { name, value } = e.target;
  //   setAllFormsData({ ...allFormsData, [name]: value });
  // };
  // End
  const branchDate = useSelector((state) => state?.universitiesReducer?.branch);

  const pagination = useSelector(
    (state) => state?.universitiesReducer?.branch?.data?.pagination
  );

  console.log("branch data branch module", branchDate);
  // viewBranch

  const viewBranches = useSelector(
    (state) => state?.universitiesReducer?.viewBranch
  );
  console.log("view branch data in branch module", viewBranches);

  const initialValues = {
    name: "",
    email: "",
    address: "",
    phone: "",
    country: "",
    manager: "",
    // phone: ""
  };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("formValues ===>", formValues);
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("handle submit function");
    setIsLoading(true);
    const id = params.id;
    const { name, email, address, phone, country, manager } = formValues;
    let payload = {
      name,
      email,
      address,
      phone,
      country,
      manager,
      Uname: localStorage.name,
      role: localStorage.access,
    };
    if(params.action == 2) { payload.id = params.id }

    const apiCall = await axios[params.action == 2 ? "put" : "post"](
      `${ENV.baseUrl}/branch/${params.action == 2 ? "edit" : "create"}`,
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
      setBranchstate(true);
      dispatch(listBranches());
      navigate("/dashboard/settingsManagement/*");
    }
  };

  useEffect(() => {
    dispatch(listBranches());
  }, []);

  // useEffect(() => {
  //   dispatch(viewBranch(params.id));
  // }, [params.id]);

  useEffect(() => {
    if (viewBranches?.branch) setFormValues(viewBranches?.branch);
  }, [viewBranches.branch]);
  useEffect(() => {
    if (params.id && params.id !== "*") dispatch(viewBranch(params.id));

    if (params.action == 1) {
      // dispatch(viewCurrency(params.id));
      setBranchstate(false);
      setIsViewMode(true);
    } else if (params.action == 2) {
      setBranchstate(false);
      setIsViewMode(false);
    } else {
      setBranchstate(true);
      setIsViewMode(false);
      setFormValues("");
    }
  }, [params.id, params.action]);

  const countryArr = ["pakistan", "India", "China"];

  // Anasite - Edits: for 'edit'/'delete'

  const [idToDelete, setIdToDelete] = useState("");
  const [dropdownID, setDropdownID] = useState("");
  const [showModal, setShowModal] = useState(false);

  const onConfirmation = async () => {
    // here we will delete call
    console.log("User deleted");
    console.log(params.id);
    const data = await axios.delete(
      `${ENV.baseUrl}/branch/delete/${idToDelete}`,
      { Uname: localStorage.name, role: localStorage.access }
    );
    console.log("deleted data", data);
    // // alert("whppp");
    // here we will delete call
    dispatch(listBranches(pagination));
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
      {isLoading && <FullPageLoader />}
      <div
        className={` flex w-full flex-col gap-8 bg-[#E8E9EB] font-display ${
          branchstate ? "" : "hidden"
        }`}
      >
        <div className="mb-12">
          <div className="mb-10">
            <div className="flex items-center justify-between">
              <p className=" text-4xl font-semibold text-[#280559]">Branch</p>
              <div className="hidden md:block">
                <NavLink to="">
                  <Button
                    onClick={() => setBranchstate(false)}
                    className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6"
                  >
                    <img className="m-1 w-[20px]" src={plus} alt="..." />
                    <p className="m-1 text-sm font-medium normal-case text-white sm:text-base">
                      Add New Branch
                    </p>
                  </Button>
                </NavLink>
              </div>
            </div>
            <p className=" font text-base text-[#9898A3]">Manage Branch</p>
            <div className="ml-auto mt-6 block w-full md:hidden">
              <NavLink to="">
                <Button
                  onClick={() => setBranchstate(false)}
                  className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6"
                >
                  <img className="m-1 w-[20px]" src={plus} alt="..." />
                  <p className="m-1 text-sm font-medium normal-case text-white sm:text-base">
                    Add New Branch
                  </p>
                </Button>
              </NavLink>
            </div>
          </div>
          <div className=" rounded-[34px] bg-white p-6 md:p-12">
            <p className="pb-5 text-3xl font-semibold text-[#333333]">
              List of Branch
            </p>
            <div className="mb-3 mt-12 flex flex-col items-center justify-between gap-3 rounded-[20px] bg-[#F8F9FB] p-5 md:flex-row">
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
                        disptach(filterListBranches({ name: search }));
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
                      Branch Name
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
                      Branch Manager
                    </th>
                    <th
                      scope="col"
                      className="w-[115px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                    >
                      Country
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
                  {branchDate?.data?.faqs?.map((ele, ind) => (
                    <tr key={ind}>
                      <td className="whitespace-nowrap py-3 pr-6">
                        <Checkbox />
                      </td>
                      <td className="whitespace-nowrap py-4 text-lg font-semibold text-[#333]">
                        {ele?.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-lg font-medium text-[#333]">
                        {ele?.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-lg font-normal text-[#333] underline">
                        {ele?.manager}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-lg font-normal text-[#333]">
                        {ele?.country}
                      </td>
                      <td>
                        <Button
                          variant="outlined"
                          className="mx-auto h-[28px] w-[78px] rounded-[15px] border border-[#280559] p-0 text-[#280559] ease-in hover:bg-[#280559] hover:text-white hover:opacity-100"
                          fullWidth
                          onClick={() =>
                            navigate(
                              `/dashboard/settingsManagement/branch/1/${ele?.id}`
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
                      <td className="whitespace-nowrap px-6 py-4 text-center text-lg font-medium">
                        <button
                          className="rounded-full text-[#636363]/50 hover:text-[#7a7a7a]"
                          // id="dropdownDefaultButton"
                          // data-dropdown-toggle="dropdown"
                          // type="button"
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
                          // class="z-10 hidden w-24 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
                          id={`dropdown${ind}`}
                          className={
                            "z-10 w-24 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" +
                            (dropdownID === ele?.id ? "" : " hidden ")
                          }
                        >
                          <ul
                            class="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby={`dropdownDefaultButton${ind}`}
                            // aria-labelledby="dropdownDefaultButton"
                          >
                            <li>
                              <button
                                className="btn btn-primary"
                                onClick={() =>
                                  navigate(
                                    `/dashboard/settingsManagement/branch/2/${ele?.id}`
                                  )
                                }
                              >
                                Edit
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={
                                  () => {
                                    setShowModal(true);
                                    setIdToDelete(ele?.id);
                                  }
                                  // navigate(
                                  //   `/dashboard/Leadsmodule/${ele?.id}`
                                  // )
                                }
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
            <Paginate pagination={pagination} method={listBranches} />

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

      <div
        className={`flex w-full flex-col gap-8 bg-[#E8E9EB] font-display ${
          branchstate ? "hidden" : ""
        }`}
      >
        <div className="mb-5">
          <p className=" mb-2 text-4xl font-semibold text-[#280559]">
            {/* Create Branch */}
            {params.action == 1
              ? "View Branch"
              : params.action == 2
              ? "Edit Branch"
              : "Create Branch"}
          </p>
          <p className=" font text-base text-[#9898A3]">
            {/* Create or edit Branch */}
            {params.action == 1
              ? "View Branch"
              : params.action == 2
              ? "Edit Branch"
              : "Create Branch"}
          </p>
        </div>
        <div className="rounded-[34px] bg-white p-[39px]">
          <p className="mb-8 text-2xl font-semibold text-[#333333]">
            Branch Details
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mt-4 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Branch Name
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Branch Name"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Address
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="360 Huntington Ave. Boston, MA 02115"
                  required
                  name="address"
                  value={formValues.address}
                  disabled={isViewMode}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Country
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="country"
                  value={formValues.country}
                  disabled={isViewMode}
                  onChange={handleChange}
                >
                  <option>Select Country</option>
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="Aland Islands">Åland Islands</option>
                  <option value="Albania">Albania</option>
                  <option value="Algeria">Algeria</option>
                  <option value="American Samoa">American Samoa</option>
                  <option value="Andorra">Andorra</option>
                  <option value="Angola">Angola</option>
                  <option value="Anguilla">Anguilla</option>
                  <option value="Antarctica">Antarctica</option>
                  <option value="Antigua and Barbuda">Antigua & Barbuda</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Armenia">Armenia</option>
                  <option value="Aruba">Aruba</option>
                  <option value="Australia">Australia</option>
                  <option value="Austria">Austria</option>
                  <option value="Azerbaijan">Azerbaijan</option>
                  <option value="Bahamas">Bahamas</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Barbados">Barbados</option>
                  <option value="Belarus">Belarus</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Belize">Belize</option>
                  <option value="Benin">Benin</option>
                  <option value="Bermuda">Bermuda</option>
                  <option value="Bhutan">Bhutan</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Bonaire, Sint Eustatius and Saba">
                    Caribbean Netherlands
                  </option>
                  <option value="Bosnia and Herzegovina">
                    Bosnia & Herzegovina
                  </option>
                  <option value="Botswana">Botswana</option>
                  <option value="Bouvet Island">Bouvet Island</option>
                  <option value="Brazil">Brazil</option>
                  <option value="British Indian Ocean Territory">
                    British Indian Ocean Territory
                  </option>
                  <option value="Brunei Darussalam">Brunei</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Burkina Faso">Burkina Faso</option>
                  <option value="Burundi">Burundi</option>
                  <option value="Cambodia">Cambodia</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Canada">Canada</option>
                  <option value="Cape Verde">Cape Verde</option>
                  <option value="Cayman Islands">Cayman Islands</option>
                  <option value="Central African Republic">
                    Central African Republic
                  </option>
                  <option value="Chad">Chad</option>
                  <option value="Chile">Chile</option>
                  <option value="China">China</option>
                  <option value="Christmas Island">Christmas Island</option>
                  <option value="Cocos (Keeling) Islands">
                    Cocos (Keeling) Islands
                  </option>
                  <option value="Colombia">Colombia</option>
                  <option value="Comoros">Comoros</option>
                  <option value="Congo">Congo - Brazzaville</option>
                  <option value="Congo, Democratic Republic of the Congo">
                    Congo - Kinshasa
                  </option>
                  <option value="Cook Islands">Cook Islands</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Cote D'Ivoire">Côte d’Ivoire</option>
                  <option value="Croatia">Croatia</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Curacao">Curaçao</option>
                  <option value="Cyprus">Cyprus</option>
                  <option value="Czech Republic">Czechia</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Djibouti">Djibouti</option>
                  <option value="Dominica">Dominica</option>
                  <option value="Dominican Republic">Dominican Republic</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Egypt">Egypt</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Equatorial Guinea">Equatorial Guinea</option>
                  <option value="Eritrea">Eritrea</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Falkland Islands (Malvinas)">
                    Falkland Islands (Islas Malvinas)
                  </option>
                  <option value="Faroe Islands">Faroe Islands</option>
                  <option value="Fiji">Fiji</option>
                  <option value="Finland">Finland</option>
                  <option value="France">France</option>
                  <option value="French Guiana">French Guiana</option>
                  <option value="French Polynesia">French Polynesia</option>
                  <option value="French Southern Territories">
                    French Southern Territories
                  </option>
                  <option value="Gabon">Gabon</option>
                  <option value="Gambia">Gambia</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Germany">Germany</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Gibraltar">Gibraltar</option>
                  <option value="Greece">Greece</option>
                  <option value="Greenland">Greenland</option>
                  <option value="Grenada">Grenada</option>
                  <option value="Guadeloupe">Guadeloupe</option>
                  <option value="Guam">Guam</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Guernsey">Guernsey</option>
                  <option value="Guinea">Guinea</option>
                  <option value="Guinea-Bissau">Guinea-Bissau</option>
                  <option value="Guyana">Guyana</option>
                  <option value="Haiti">Haiti</option>
                  <option value="Heard Island and Mcdonald Islands">
                    Heard & McDonald Islands
                  </option>
                  <option value="Holy See (Vatican City State)">
                    Vatican City
                  </option>
                  <option value="Honduras">Honduras</option>
                  <option value="Hong Kong">Hong Kong</option>
                  <option value="Hungary">Hungary</option>
                  <option value="Iceland">Iceland</option>
                  <option value="India">India</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Iran, Islamic Republic of">Iran</option>
                  <option value="Iraq">Iraq</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Isle of Man">Isle of Man</option>
                  <option value="Israel">Israel</option>
                  <option value="Italy">Italy</option>
                  <option value="Jamaica">Jamaica</option>
                  <option value="Japan">Japan</option>
                  <option value="Jersey">Jersey</option>
                  <option value="Jordan">Jordan</option>
                  <option value="Kazakhstan">Kazakhstan</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Kiribati">Kiribati</option>
                  <option value="Korea, Democratic People's Republic of">
                    North Korea
                  </option>
                  <option value="Korea, Republic of">South Korea</option>
                  <option value="Kosovo">Kosovo</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                  <option value="Lao People's Democratic Republic">Laos</option>
                  <option value="Latvia">Latvia</option>
                  <option value="Lebanon">Lebanon</option>
                  <option value="Lesotho">Lesotho</option>
                  <option value="Liberia">Liberia</option>
                  <option value="Libyan Arab Jamahiriya">Libya</option>
                  <option value="Liechtenstein">Liechtenstein</option>
                  <option value="Lithuania">Lithuania</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Macao">Macao</option>
                  <option value="Macedonia, the Former Yugoslav Republic of">
                    North Macedonia
                  </option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Malawi">Malawi</option>
                  <option value="Malaysia" selected={true}>
                    Malaysia
                  </option>
                  <option value="Maldives">Maldives</option>
                  <option value="Mali">Mali</option>
                  <option value="Malta">Malta</option>
                  <option value="Marshall Islands">Marshall Islands</option>
                  <option value="Martinique">Martinique</option>
                  <option value="Mauritania">Mauritania</option>
                  <option value="Mauritius">Mauritius</option>
                  <option value="Mayotte">Mayotte</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Micronesia, Federated States of">
                    Micronesia
                  </option>
                  <option value="Moldova, Republic of">Moldova</option>
                  <option value="Monaco">Monaco</option>
                  <option value="Mongolia">Mongolia</option>
                  <option value="Montenegro">Montenegro</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="Myanmar">Myanmar (Burma)</option>
                  <option value="Namibia">Namibia</option>
                  <option value="Nauru">Nauru</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Netherlands Antilles">Curaçao</option>
                  <option value="New Caledonia">New Caledonia</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Niger">Niger</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Niue">Niue</option>
                  <option value="Norfolk Island">Norfolk Island</option>
                  <option value="Northern Mariana Islands">
                    Northern Mariana Islands
                  </option>
                  <option value="Norway">Norway</option>
                  <option value="Oman">Oman</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Palau">Palau</option>
                  <option value="Palestinian Territory, Occupied">
                    Palestine
                  </option>
                  <option value="Panama">Panama</option>
                  <option value="Papua New Guinea">Papua New Guinea</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Peru">Peru</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Pitcairn">Pitcairn Islands</option>
                  <option value="Poland">Poland</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Puerto Rico">Puerto Rico</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Reunion">Réunion</option>
                  <option value="Romania">Romania</option>
                  <option value="Russian Federation">Russia</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Saint Barthelemy">St. Barthélemy</option>
                  <option value="Saint Helena">St. Helena</option>
                  <option value="Saint Kitts and Nevis">
                    St. Kitts & Nevis
                  </option>
                  <option value="Saint Lucia">St. Lucia</option>
                  <option value="Saint Martin">St. Martin</option>
                  <option value="Saint Pierre and Miquelon">
                    St. Pierre & Miquelon
                  </option>
                  <option value="Saint Vincent and the Grenadines">
                    St. Vincent & Grenadines
                  </option>
                  <option value="Samoa">Samoa</option>
                  <option value="San Marino">San Marino</option>
                  <option value="Sao Tome and Principe">
                    São Tomé & Príncipe
                  </option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Serbia">Serbia</option>
                  <option value="Serbia and Montenegro">Serbia</option>
                  <option value="Seychelles">Seychelles</option>
                  <option value="Sierra Leone">Sierra Leone</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Sint Maarten">Sint Maarten</option>
                  <option value="Slovakia">Slovakia</option>
                  <option value="Slovenia">Slovenia</option>
                  <option value="Solomon Islands">Solomon Islands</option>
                  <option value="Somalia">Somalia</option>
                  <option value="South Africa">South Africa</option>
                  <option value="South Georgia and the South Sandwich Islands">
                    South Georgia & South Sandwich Islands
                  </option>
                  <option value="South Sudan">South Sudan</option>
                  <option value="Spain">Spain</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Sudan">Sudan</option>
                  <option value="Suriname">Suriname</option>
                  <option value="Svalbard and Jan Mayen">
                    Svalbard & Jan Mayen
                  </option>
                  <option value="Swaziland">Eswatini</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Syrian Arab Republic">Syria</option>
                  <option value="Taiwan, Province of China">Taiwan</option>
                  <option value="Tajikistan">Tajikistan</option>
                  <option value="Tanzania, United Republic of">Tanzania</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Timor-Leste">Timor-Leste</option>
                  <option value="Togo">Togo</option>
                  <option value="Tokelau">Tokelau</option>
                  <option value="Tonga">Tonga</option>
                  <option value="Trinidad and Tobago">Trinidad & Tobago</option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Turkmenistan">Turkmenistan</option>
                  <option value="Turks and Caicos Islands">
                    Turks & Caicos Islands
                  </option>
                  <option value="Tuvalu">Tuvalu</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="United Arab Emirates">
                    United Arab Emirates
                  </option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="United States Minor Outlying Islands">
                    U.S. Outlying Islands
                  </option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="Vanuatu">Vanuatu</option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Viet Nam">Vietnam</option>
                  <option value="Virgin Islands, British">
                    British Virgin Islands
                  </option>
                  <option value="Virgin Islands, U.s.">
                    U.S. Virgin Islands
                  </option>
                  <option value="Wallis and Futuna">Wallis & Futuna</option>
                  <option value="Western Sahara">Western Sahara</option>
                  <option value="Yemen">Yemen</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                  {/* <option selected>Select Country</option> */}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Branch Manager
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="+60123456789"
                  required
                  name="manager"
                  value={formValues.manager}
                  disabled={isViewMode}
                  onChange={handleChange}
                />
              </div>

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
                  disabled={isViewMode}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="+60123456789"
                  required
                  name="phone"
                  value={formValues.phone}
                  disabled={isViewMode}
                  onChange={handleChange}
                />
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
                <Addfield open={openModal} close={() => setOpenModal(false)} />
              </div> */}
              {isViewMode ? (
                ""
              ) : (
                <AddField
                  open={openBranchAddModal}
                  close={() => setOpenBranchAddModal(false)}
                  toAdd={BranchNewFields}
                  setOpenAddModal={setOpenBranchAddModal}
                  setToAdd={setBranchNewFields}
                  formsData={formValues}
                  setFormsData={setFormValues}
                  handleFormsDataChange={handleChange}
                  section={"Settings-Branch"}
                />
              )}
            </div>
            {/* <NavLink to=""> */}
            {isViewMode ? (
              ""
            ) : (
              <Button
                className="rounded-[15px]  bg-[#280559]"
                type="submit"
                disabled={isViewMode}
              >
                <div className="flex flex-row items-center justify-center">
                  <img src={saveIcon} alt="..." />
                  <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                    Save Changes
                  </p>
                </div>
              </Button>
            )}{" "}
            <Button
              onClick={() => {
                // setAllFormsData({});
                setFormValues({});
                setBranchstate(true);
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
            {/* </NavLink> */}
          </form>
        </div>
      </div>
    </>
  );
}

export default Branch;
