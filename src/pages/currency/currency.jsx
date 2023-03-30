// // const Cur = [
// //   {
// //     iso: "AED",
// //     currency: "Arabic dirham",
// //     rate: "3.67",
// //     status: "Active",
// //     color: "#0263FF",
// //   },
// //   {
// //     iso: "AUD",
// //     currency: "Australian dollar",
// //     rate: "1.45",
// //     status: "Active",
// //     color: "#0263FF",
// //   },
// //   {
// //     iso: "RM",
// //     currency: "Ringgit Malaysia",
// //     rate: "4.1",
// //     status: "Active",
// //     color: "#0263FF",
// //   },
// //   {
// //     iso: "CNY",
// //     currency: "Renminbi yuan",
// //     Rate: "6.76",
// //     status: "Active",
// //     color: "#0263FF",
// //   },
// //   {
// //     iso: "GBP",
// //     currency: "Sterling pound",
// //     rate: "0.75",
// //     status: "Default",
// //     color: "#449E3C",
// //   },
// // ];

// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
// } from "@material-tailwind/react";
// import plus from "../../../public/img/plus.svg";
// import saveIcon from "../../../public/img/saveIcon.svg";
// import StatusData from "@/data/status-props";
// // import AddField from "./AddField";
// import { NavLink } from "react-router-dom";
// import DatePicker from "@/components/DatePicker";
// import dropdown from "../../../public/img/dropdown.svg";
// import AddField from "./Addfield";
// import { useSelector, useDispatch } from "react-redux";
// import { listCurrencies } from "@/redux/actions/actions";
// import axios from "axios";
// import { ENV } from "@/config";
// import FullPageLoader from "@/FullPageLoader/FullPageLoader";
// import { viewCurrency } from "@/redux/actions/actions";
// import { useParams, useNavigate } from "react-router-dom";

// export function Currency() {
//   const [curstate, setCurstate] = useState(true);
//   const [openModal, setOpenModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const params = useParams();
//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(listCurrencies());
//   }, []);

//   useEffect(() => {
//     if (params.action == 2) {
//       dispatch(viewCurrency(params.id));
//       setCurstate(false);
//     }
//   }, [params.id]);

//   const currencyData = useSelector(
//     (state) => state?.universitiesReducer?.currency
//   );
// console.log("currency data in currency module ==>", currencyData);

//   const initialValue = {
//     iso: "",
//     name: "",
//     exRate: "",
//     status: "",
//   };
//   const [formValues, setFormValues] = useState(initialValue);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
// console.log("formValues ==>", formValues);
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
// console.log("submit function");
//     const { iso, name, exRate, status } = formValues;

//     const payload = {
//       iso,
//       name,
//       exRate,
//       status,
//     };

//     const apiCall = await axios.post(
//       `${ENV.baseUrl}/currencies/create`,
//       payload
//     );
// console.log("created Currency ==>", apiCall);
//   };
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const id = params.id;
//   console.log("academic handle submit", formValues);
//   //   setIsLoading(true);
//   //   const {
//   //     name,
//   //     selectUniversity,
//   //     programmeLevel,
//   //     programmeIntake,
//   //     programmeDuration,
//   //     programmeCategory,
//   //     tutionFee,
//   //     otherFee,
//   //     engRequirement,
//   //     entryRequirement,
//   //   } = formValues;

//   //   let payload = {
//   //     name,
//   //     selectUniversity,
//   //     programmeLevel,
//   //     programmeIntake,
//   //     programmeDuration,
//   //     programmeCategory,
//   //     tutionFee,
//   //     otherFee,
//   //     engRequirement,
//   //     entryRequirement,
//   //     id,
//   //   };

//   //   // const apiCall = await axios.post(
//   //   //   `${ENV.baseUrl}/programme/createProgramme`,
//   //   //   payload
//   //   // );
//   //   const apiCall = await axios[params.action == 2 ? "put" : "post"](
//   //     `${ENV.baseUrl}/programme/${
//   //       params.action == 2 ? "edit" : "createProgramme"
//   //     }`,
//   //     payload
//   //   );
//   console.log("apiCall");

//   //   setIsLoading(false);
//   //   if (apiCall.data?.success) {
//   //     let { message } = apiCall.data;
//   //     toast.success(message, {
//   //       position: toast.POSITION.TOP_RIGHT,
//   //       hideProgressBar: false,
//   //       autoClose: 3000,
//   //     });
//   //   }
//   // };

//   return (
//     <>
//       {isLoading && <FullPageLoader />}
//       <div className="mt-12 w-full bg-[#E8E9EB] font-display">
//         <div
//           className={` flex w-full flex-col gap-8 bg-[#E8E9EB] font-display ${
//             curstate ? "" : "hidden"
//           }`}
//         >
//           <div className="mb-12">
//             <div className="mb-10">
//               <div className="flex items-center justify-between">
//                 <p className=" text-4xl font-semibold text-[#280559]">
//                   Currency Management
//                 </p>
//                 <div className="hidden md:block">
//                   <NavLink to="">
//                     <Button className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6">
//                       <div className="flex flex-row items-center justify-center">
//                         <img src={saveIcon} alt="..." />
//                         <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
//                           Save Changes
//                         </p>
//                       </div>
//                     </Button>
//                   </NavLink>
//                 </div>
//               </div>
//               <p className=" font text-base text-[#9898A3]">
//                 Currency Management
//               </p>
//               <div className="ml-auto mt-6 block w-full md:hidden">
//                 <NavLink to="">
//                   <Button className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6">
//                     <div className="flex flex-row items-center justify-center">
//                       <img src={saveIcon} alt="..." />
//                       <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
//                         Save Changes
//                       </p>
//                     </div>
//                   </Button>
//                 </NavLink>
//               </div>
//             </div>
//             <div className="rounded-[34px] bg-white p-6 md:p-12">
//               <div className="my-0 flex w-full flex-col justify-between gap-3 pt-0 pb-5 sm:flex-row sm:items-center">
//                 <p className=" text-2xl font-semibold text-black">
//                   Default Currency
//                 </p>
//                 <NavLink to="">
//                   <Button className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6">
//                     <div className="flex flex-row items-center justify-center">
//                       <img src={saveIcon} alt="..." />
//                       <p className="m-1 text-sm font-medium normal-case text-white sm:text-base">
//                         Save Changes
//                       </p>
//                     </div>
//                   </Button>
//                 </NavLink>
//               </div>
//               <div className="rounded-[34px] bg-white">
//                 <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                   <div>
//                     <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                       Currency
//                     </label>
//                     <select className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500">
//                       <option selected>USD</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                       Exchange Rate
//                     </label>
//                     <input
//                       type="text"
//                       className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                       placeholder="Exchange Rate"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-8 rounded-[34px] bg-white p-6 md:p-12">
//               <div className="my-0 flex w-full flex-col justify-between gap-3 pt-0 pb-5 sm:flex-row sm:items-center">
//                 <p className=" text-2xl font-semibold text-black">
//                   Currency List
//                 </p>
//                 <Button
//                   onClick={() => setCurstate(false)}
//                   className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6"
//                 >
//                   <img className="m-1 w-[20px]" src={plus} alt="..." />
//                   <p className="m-1 text-sm font-medium normal-case text-white sm:text-base">
//                     Add New Currency
//                   </p>
//                 </Button>
//               </div>
//               <div className="rounded-[34px] bg-white">
//                 <div className="flex flex-col overflow-x-auto">
//                   <table className="w-full border-none">
//                     <thead>
//                       <tr>
//                         <th
//                           scope="col"
//                           className="w-1/5 py-3 px-8 text-left text-base font-medium text-[#92929D]"
//                         >
//                           ISO Codes
//                         </th>
//                         <th
//                           scope="col"
//                           className="w-1/5 py-3 px-8 text-left text-base font-medium text-[#92929D]"
//                         >
//                           Currency
//                         </th>
//                         <th
//                           scope="col"
//                           className="w-1/5 py-3 px-8 text-left text-base font-medium text-[#92929D]"
//                         >
//                           Rate
//                         </th>
//                         <th
//                           scope="col"
//                           className="w-1/5 py-3 px-8 text-center text-base font-medium text-[#92929D]"
//                         >
//                           Status
//                         </th>
//                         <th
//                           scope="col"
//                           className="py-3 px-8 text-center text-base font-medium text-[#92929D]"
//                         >
//                           Action
//                         </th>
//                         <th
//                           scope="col"
//                           className="py-3 px-8 text-center text-base font-medium text-[#92929D]"
//                         >
//                           Option
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="border-none">
//                       {currencyData?.data?.faqs?.map((ele, ind, color) => (
//                         <tr key={ind}>
//                           <td
//                             className={`whitespace-nowrap py-4 px-8 text-lg font-semibold text-[#333]`}
//                           >
//                             {/* {iso} */}
//                             {ele?.iso}
//                           </td>
//                           <td
//                             className={`whitespace-nowrap py-4 px-8 text-lg font-semibold text-[#333]`}
//                           >
//                             {ele?.name}
//                           </td>
//                           <td
//                             className={`whitespace-nowrap py-4 px-8 text-lg font-normal text-[#333]`}
//                           >
//                             {ele?.exRate}
//                           </td>
//                           <td className="px-8">
//                             <p
//                               className="mx-auto w-fit rounded-2xl px-5 py-2 text-center text-xs font-medium normal-case"
//                               style={{
//                                 color,
//                                 backgroundColor: `${color}10`,
//                               }}
//                             >
//                               {ele?.status}
//                             </p>
//                           </td>
//                           <td className="px-8">
//                             <Button
//                               variant="outlined"
//                               className="mx-auto h-[28px] w-[78px] rounded-[15px] border border-[#280559] p-0 text-[#280559] ease-in hover:bg-[#280559] hover:text-white hover:opacity-100"
//                               fullWidthnew currency
//                             >
//                               <p className="text-center text-xs font-medium capitalize">
//                                 view
//                               </p>
//                             </Button>
//                           </td>
//                           {/* <td className="whitespace-nowrap px-6 py-4 text-center text-lg font-medium">
//                             <button className="rounded-full text-[#636363]/50 hover:text-[#7a7a7a]">
//                               <svg
//                                 className="h-8 w-8 fill-current"
//                                 viewBox="0 0 32 32"
//                               >
//                                 <circle cx="16" cy="10" r="2" />
//                                 <circle cx="16" cy="16" r="2" />
//                                 <circle cx="16" cy="22" r="2" />
//                               </svg>
//                             </button>
//                           </td> */}
//                           <td className="whitespace-nowrap px-6 py-4 text-center text-lg font-medium">
//                             <button
//                               className="rounded-full text-[#636363]/50 hover:text-[#7a7a7a]"
//                               id="dropdownDefaultButton"
//                               data-dropdown-toggle="dropdown"
//                               type="button"
//                             >
//                               <svg
//                                 className="h-8 w-8 fill-current"
//                                 viewBox="0 0 32 32"
//                               >
//                                 <circle cx="16" cy="10" r="2" />
//                                 <circle cx="16" cy="16" r="2" />
//                                 <circle cx="16" cy="22" r="2" />
//                               </svg>
//                             </button>

//                             <div
//                               id="dropdown"
//                               className="z-10 hidden w-24 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
//                             >
//                               <ul
//                                 className="py-2 text-sm text-gray-700 dark:text-gray-200"
//                                 aria-labelledby="dropdownDefaultButton"
//                               >
//                                 {/* <li>
//                                 <button
//                                   onClick={() =>
//                                     navigate(
//                                       `/dashboard/Leadsmodule/1/${ele?.id}`
//                                     )
//                                   }
//                                 >
//                                   View
//                                 </button>
//                               </li> */}
//                                 <li>
//                                   <button
//                                     className="btn btn-primary"
//                                     onClick={() =>
//                                       navigate(
//                                         `/dashboard/CurrencyManagement/2/${ele?.id}`
//                                       )
//                                     }
//                                   >
//                                     Edit
//                                   </button>
//                                 </li>
//                                 <li>
//                                   <button
//                                     onClick={
//                                       () => setShowModal(true)
//                                       // navigate(
//                                       //   `/dashboard/Leadsmodule/${ele?.id}`
//                                       // )
//                                     }
//                                   >
//                                     Delete
//                                   </button>
//                                 </li>
//                               </ul>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[20px] bg-[#F8F9FB] py-4 px-6 md:flex-row md:gap-0">
//                   <p className="px-5 text-base text-[#92929D]">
//                     <span className="text-[#280559]">1</span>-5 of 56
//                   </p>
//                   <div className="flex flex-row items-center justify-center">
//                     <p className="mr-3 text-base text-[#92929D]">
//                       The page you’re on
//                     </p>
//                     <div className=" mr-2 w-[77px]">
//                       <Menu>
//                         <MenuHandler>
//                           <button className="flex h-[40px] w-[77px] flex-row items-center justify-center rounded-2xl border-[1px] border-[#cbd2dc]/50 bg-white shadow-md">
//                             <p className="mx-3 font-medium text-[#280559]">1</p>
//                             <img src={dropdown} />
//                           </button>
//                         </MenuHandler>
//                         <MenuList>
//                           <MenuItem>1</MenuItem>
//                           <MenuItem>2</MenuItem>
//                           <MenuItem>3</MenuItem>
//                           <MenuItem>4</MenuItem>
//                           <MenuItem>5</MenuItem>
//                         </MenuList>
//                       </Menu>
//                     </div>
//                     <button className="mr-2 flex h-10 w-10 items-center justify-center rounded-xl border-[1px] border-[#cbd2dc]/50 shadow-md">
//                       <svg
//                         width={24}
//                         height={24}
//                         stroke="#280559"
//                         strokeWidth={1.5}
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                         aria-hidden="true"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
//                         />
//                       </svg>
//                     </button>
//                     <button className="flex h-10 w-10 items-center justify-center rounded-xl border-[1px] border-[#cbd2dc]/50 shadow-md">
//                       <svg
//                         width={24}
//                         height={24}
//                         stroke="#280559"
//                         strokeWidth={1.5}
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                         aria-hidden="true"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ----------------------------------------- */}

//         <div
//           className={`mb-10 flex w-full flex-col gap-8 bg-[#E8E9EB] font-display ${
//             curstate ? "hidden" : ""
//           }`}
//         >
//           <div className="my-5">
//             <div>
//               <div className="flex items-center justify-between">
//                 <p className=" text-4xl font-semibold text-[#280559]">
//                   Create or edit Currency
//                 </p>
//                 <div className="hidden md:block">
//                   <NavLink to="">
//                     <Button className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6">
//                       <div className="flex flex-row items-center justify-center">
//                         <img src={saveIcon} alt="..." />
//                         <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
//                           Save Changes
//                         </p>
//                       </div>
//                     </Button>
//                   </NavLink>
//                 </div>
//               </div>
//               <p className=" font text-base text-[#9898A3]">
//                 Create or edit Currency
//               </p>
//               <div className="ml-auto mt-6 block w-full md:hidden">
//                 <NavLink to="">
//                   <Button className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6">
//                     <div className="flex flex-row items-center justify-center">
//                       <img src={saveIcon} alt="..." />
//                       <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
//                         Save Changes
//                       </p>
//                     </div>
//                   </Button>
//                 </NavLink>
//               </div>
//             </div>
//           </div>
//           <div className="rounded-[34px] bg-white p-[39px]">
//             <p className="mb-8 text-2xl font-semibold text-[#333333]">
//               Currency Details
//             </p>
//             <form onSubmit={handleSubmit}>
//               <div className="mt-4 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                     Currency Name (ISO code)jj
//                   </label>
//                   <input
//                     type="text"
//                     className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                     placeholder="USD"
//                     name="iso"
//                     value={formValues.iso}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                     Currency Name
//                   </label>
//                   <input
//                     type="text"
//                     className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                     placeholder="US Dollar"
//                     name="name"
//                     value={formValues.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                     Exchange Rate
//                   </label>
//                   <input
//                     type="text"
//                     className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                     placeholder="1"
//                     name="exRate"
//                     value={formValues.exRate}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                     Status
//                   </label>
//                   <select
//                     className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                     name="status"
//                     value={formValues.status}
//                     onChange={handleChange}
//                   >
//                     <option selected>Select Status</option>
//                     <option>1</option>
//                     <option>2</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="mt-4 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                     Add Field
//                   </label>
//                   <button
//                     onClick={() => setOpenModal(true)}
//                     type="button"
//                     className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
//                   >
//                     Click to add more field
//                   </button>
//                   <AddField
//                     open={openModal}
//                     close={() => setOpenModal(false)}
//                   />
//                 </div>
//               </div>

//               {/* <NavLink to=""> */}
//               <Button className="rounded-[15px]  bg-[#280559]">
//                 <div className="flex flex-row items-center justify-center">
//                   <img src={saveIcon} alt="..." />
//                   <button
//                     className="p-1 px-[11px] text-base font-medium normal-case text-white"
//                     type="submit"
//                   >
//                     Save Changes
//                   </button>
//                 </div>
//               </Button>
//               {/* </NavLink> */}
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Currency;

// const Cur = [
//   {
//     iso: "AED",
//     currency: "Arabic dirham",
//     rate: "3.67",
//     status: "Active",
//     color: "#0263FF",
//   },
//   {
//     iso: "AUD",
//     currency: "Australian dollar",
//     rate: "1.45",
//     status: "Active",
//     color: "#0263FF",
//   },
//   {
//     iso: "RM",
//     currency: "Ringgit Malaysia",
//     rate: "4.1",
//     status: "Active",
//     color: "#0263FF",
//   },
//   {
//     iso: "CNY",
//     currency: "Renminbi yuan",
//     Rate: "6.76",
//     status: "Active",
//     color: "#0263FF",
//   },
//   {
//     iso: "GBP",
//     currency: "Sterling pound",
//     rate: "0.75",
//     status: "Default",
//     color: "#449E3C",
//   },
// ];

import React, { useEffect, useState } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import plus from "../../../public/img/plus.svg";
import saveIcon from "../../../public/img/saveIcon.svg";
import StatusData from "@/data/status-props";
// import AddField from "./AddField";
import { NavLink } from "react-router-dom";
import DatePicker from "@/components/DatePicker";
import dropdown from "../../../public/img/dropdown.svg";
import AddField from "@/helpers/Addfield";
import { useSelector, useDispatch } from "react-redux";
import { listCurrencies } from "@/redux/actions/actions";
import axios from "axios";
import { ENV } from "@/config";
import FullPageLoader from "@/FullPageLoader/FullPageLoader";
import { viewCurrency, listAllCurrencies } from "@/redux/actions/actions";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Paginate from "@/paginate";
import Modal from "../universitymodule/Modal";

export function Currency() {
  const [curstate, setCurstate] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isViewMode, setIsViewMode] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viewCur = useSelector(
    (state) => state?.universitiesReducer?.viewCurrency
  );

  /*{ toAdd, setToAdd,  open,close,  setOpenAddModal,  formsData,  setFormsData,  handleFormsDataChange,  section,} */
  // const [openModal, setOpenModal] = useState(false);
  // const [costState, setCostState] = useState(true);
  const [openCostAddModal, setOpenCostAddModal] = useState(false);
  const [costNewFields, setCostNewFields] = useState([]);
  const [allFormsData, setAllFormsData] = useState({});
  const handleAllFormsDataChange = (e) => {
    let { name, value } = e.target;
    setAllFormsData({ ...allFormsData, [name]: value });
  };

  const pagination = useSelector(
    (state) => state?.universitiesReducer?.currency?.data?.pagination
  );
  // console.log("data of view curr for view,edit ==>", viewCur);

  useEffect(() => {
    dispatch(listCurrencies(""));
    dispatch(listAllCurrencies("limit=100000"));
  }, []);

  useEffect(() => {
    if (!params.action || !params.id) return;

    if (viewCur?.currency) setFormValues(viewCur?.currency);
  }, [viewCur.currency]);
  useEffect(() => {
    if (params.id && params.id !== "*") dispatch(viewCurrency(params.id));

    if (params.action == 1) {
      // dispatch(viewCurrency(params.id));
      setCurstate(false);
      setIsViewMode(true);
    } else if (params.action == 2) {
      setCurstate(false);
      setIsViewMode(false);
    } else {
      setCurstate(true);
      setIsViewMode(false);
    }
  }, [params.id, params.action]);

  const currencyData = useSelector(
    (state) => state?.universitiesReducer?.currency
  );

  const allCurrencyData = useSelector(
    (state) => state?.universitiesReducer?.allcurrency
  );
  // console.log("currency data in currency module ==>", currencyData);

  // Anaiste - Edits: default currency

  const initialValue = {
    iso: "",
    name: "",
    exRate: "",
    status: "",
    index: ''
  };
  const [defaultCurrency, setDefaultCurrency] = useState({ ...initialValue });
  const [formValues, setFormValues] = useState(initialValue);
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log("formValues ==>", formValues);
    setFormValues({ ...formValues, [name]: value });
  };

  React.useEffect(() => {
    let state = 0;
    allCurrencyData?.data?.faqs && 
    allCurrencyData?.data?.faqs.map(item => {
      if(item.status !== 0 && state === 0){
        setDefaultCurrency(item);
        state ++;
    } });
  }, [allCurrencyData]);

  const handleDefaultCurrecyChange = (e) => {
    let newDefaultCurrency = { ...defaultCurrency };
    Object.keys(defaultCurrency).forEach((key) => {
      newDefaultCurrency[key] = allCurrencyData?.data?.faqs
        ? allCurrencyData?.data?.faqs[e.target.value][key]
        : "";
    });
    newDefaultCurrency["index"] = e.target.value;
    setDefaultCurrency(newDefaultCurrency);
    // console.log("ojojoiwwwwwwwwj", newDefaultCurrency);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log("submit function");
    const { iso, name, exRate, status } = formValues;
    const id = params.id;

    const payload = {
      iso,
      name,
      exRate,
      status,
      id,
      Uname: localStorage.name,
      role: localStorage.access,
    };

    const apiCall = await axios[params.action == 2 ? "put" : "post"](
      `${ENV.baseUrl}/currencies/${params.action == 2 ? "edit" : "create"}`,
      payload
    );
    // console.log("apiCall", apiCall);

    setIsLoading(false);
    if (apiCall.data?.success) {
      console.log("sdfsf", apiCall.data);
      let { message } = apiCall.data;
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 3000,
      });
      // setCurstate(true);
      dispatch(listCurrencies());
      dispatch(listAllCurrencies("limit=100000"));
      setAllFormsData({});
      setFormValues({});
      setDropdownID(0);
      setCurstate(true);
      navigate("/dashboard/CurrencyManagement/*");
    }
  };

  const [idToDelete, setIdToDelete] = useState("");
  const [dropdownID, setDropdownID] = useState("");
  const [showModal, setShowModal] = useState(false);

  const onConfirmation = async () => {
    // here we will delete call
    console.log("User deleted");
    console.log(params.id);
    const data = await axios.delete(
      `${ENV.baseUrl}/currencies/delete/${idToDelete}`,
      { Uname: localStorage.name, role: localStorage.access }
    );
    console.log("deleted data", data);
    // // alert("whppp");
    // here we will delete call
    // dispatch(list(pagination));
    dispatch(listCurrencies(""));
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
  return (
    <>
      {isLoading && <FullPageLoader />}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        onConfirmation={onConfirmation}
      />
      <div className="mt-12 w-full bg-[#E8E9EB] font-display">
        <div
          className={` flex w-full flex-col gap-8 bg-[#E8E9EB] font-display ${
            curstate ? "" : "hidden"
          }`}
        >
          <div className="mb-12">
            <div className="mb-10">
              <div className="flex items-center justify-between">
                <p className=" text-4xl font-semibold text-[#280559]">
                  Currency Management
                </p>
                {/* {isViewMode ? (
                  <Button
                    onClick={() => navigate(-1)}
                    className="rounded-[15px]  bg-[#280559]"
                  >
                    <div className="flex flex-row items-center justify-center">
                      <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                        Back
                      </p>
                    </div>
                  </Button>
                ) : (
                  <div className="hidden md:block">
                    <NavLink to="">
                      <Button className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6">
                        <div className="flex flex-row items-center justify-center">
                          <img src={saveIcon} alt="..." />
                          <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                            Save Changes
                          </p>
                        </div>
                      </Button>
                    </NavLink>
                  </div>
                )} */}
              </div>
              <p className=" font text-base text-[#9898A3]">
                Currency Management
              </p>
              {/* {isViewMode ? (
                <Button
                  onClick={() => navigate(-1)}
                  className="rounded-[15px]  bg-[#280559]"
                >
                  <div className="flex flex-row items-center justify-center">
                    <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                      Back
                    </p>
                  </div>
                </Button>
              ) : (
                <div className="ml-auto mt-6 block w-full md:hidden">
                  <NavLink to="">
                    <Button className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6">
                      <div className="flex flex-row items-center justify-center">
                        <img src={saveIcon} alt="..." />
                        <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                          Save Changes
                        </p>
                      </div>
                    </Button>
                  </NavLink>
                </div>
              )} */}
            </div>
            {
              <div className="rounded-[34px] bg-white p-6 md:p-12">
                <div className="my-0 flex w-full flex-col justify-between gap-3 pt-0 pb-5 sm:flex-row sm:items-center">
                  <p className=" text-2xl font-semibold text-black">
                    Default Currency
                  </p>
                  {isViewMode ? (
                    <Button
                      onClick={() => setCurstate(true)}
                      className="rounded-[15px]  bg-[#280559]"
                    >
                      <div className="flex flex-row items-center justify-center">
                        <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                          Back
                        </p>
                      </div>
                    </Button>
                  ) : (
                    <NavLink to="">
                      <Button className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6">
                        <div className="flex flex-row items-center justify-center">
                          <img src={saveIcon} alt="..." />
                          <p className="m-1 text-sm font-medium normal-case text-white sm:text-base">
                            Save Changes
                          </p>
                        </div>
                      </Button>
                    </NavLink>
                  )}
                </div>
                <div className="rounded-[34px] bg-white">
                  <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#333333]">
                        Currency
                      </label>
                      <select
                        className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                        value={`${defaultCurrency.index}`}
                        name={"defaultcurrency"}
                        onChange={handleDefaultCurrecyChange}
                      >
                        {/* <option name={"defaultcurrency"}
                              key={
                                currency.id + currency.iso + index + currency.name
                              }
                              data-exrate={currency.exRate}
                              value={index}>{currencyData?.data?.faqs[0].name}</option> */}
                        {/* Anasite - Edits: fetching Currencies and Ex Rates
                      <option selected>USD</option>
                       */}
                        {allCurrencyData &&
                          allCurrencyData?.data?.faqs.map((currency, index) => {
                            if(currency.status !== 0)
                            return (
                              <option
                                name={"defaultcurrency"}
                                key={
                                  currency.id +
                                  currency.iso +
                                  index +
                                  currency.name
                                }
                                data-exrate={currency.exRate}
                                value={index}
                              >
                                {currency.name + " (" + currency.iso + ")"}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#333333]">
                        Exchange Rate
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Exchange Rate"
                        value={parseFloat(defaultCurrency.exRate).toFixed(2)}
                        disabled
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            }
            {(localStorage.access === "superAdmin" ||
              localStorage.access === "admin") && (
              <div className="mt-8 rounded-[34px] bg-white p-6 md:p-12">
                <div className="my-0 flex w-full flex-col justify-between gap-3 pt-0 pb-5 sm:flex-row sm:items-center">
                  <p className=" text-2xl font-semibold text-black">
                    Currency List
                  </p>
                  <Button
                    onClick={() => {
                      setAllFormsData({});
                      setFormValues({});
                      setCurstate(false);
                    }}
                    className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6"
                  >
                    <img className="m-1 w-[20px]" src={plus} alt="..." />
                    <p className="m-1 text-sm font-medium normal-case text-white sm:text-base">
                      Add New Currency
                    </p>
                  </Button>
                </div>
                <div className="rounded-[34px] bg-white">
                  <div className="flex flex-col overflow-x-auto">
                    <table className="w-full border-none">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="w-1/5 py-3 px-8 text-left text-base font-medium text-[#92929D]"
                          >
                            ISO Codes
                          </th>
                          <th
                            scope="col"
                            className="w-1/5 py-3 px-8 text-left text-base font-medium text-[#92929D]"
                          >
                            Currency
                          </th>
                          <th
                            scope="col"
                            className="w-1/5 py-3 px-8 text-left text-base font-medium text-[#92929D]"
                          >
                            Rate
                          </th>
                          <th
                            scope="col"
                            className="w-1/5 py-3 px-8 text-center text-base font-medium text-[#92929D]"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-8 text-center text-base font-medium text-[#92929D]"
                          >
                            Action
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-8 text-center text-base font-medium text-[#92929D]"
                          >
                            Option
                          </th>
                        </tr>
                      </thead>
                      <tbody className="border-none">
                        {currencyData?.data?.faqs?.map((ele, ind, color) => (
                          <tr key={ind}>
                            <td
                              className={`whitespace-nowrap py-4 px-8 text-lg font-semibold text-[#333]`}
                            >
                              {/* {iso} */}
                              {ele?.iso}
                            </td>
                            <td
                              className={`whitespace-nowrap py-4 px-8 text-lg font-semibold text-[#333]`}
                            >
                              {ele?.name}
                            </td>
                            <td
                              className={`whitespace-nowrap py-4 px-8 text-lg font-normal text-[#333]`}
                            >
                              {parseFloat(ele?.exRate).toFixed(2)}
                            </td>
                            <td className="px-8">
                              <p
                                className="mx-auto w-fit rounded-2xl px-5 py-2 text-center text-xs font-medium normal-case"
                                style={{
                                  color,
                                  backgroundColor: `${color}10`,
                                }}
                              >
                                {/* {console.log(ele)} */}
                                {ele?.status === 0 ? "Inactive" : "Active"}
                              </p>
                            </td>
                            <td className="px-8">
                              <Button
                                variant="outlined"
                                className="mx-auto h-[28px] w-[78px] rounded-[15px] border border-[#280559] p-0 text-[#280559] ease-in hover:bg-[#280559] hover:text-white hover:opacity-100"
                                fullWidth
                                onClick={() =>
                                  navigate(
                                    `/dashboard/CurrencyManagement/1/${ele?.id}`
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
                                onClick={toggleDropdown(ele?.id)}
                                type="button"
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
                                      onClick={() =>
                                        navigate(
                                          `/dashboard/CurrencyManagement/2/${ele?.id}`
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
                                          setIdToDelete(ele?.id);
                                          setShowModal(true);
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
                  {/* {console.log("pagination", pagination)} */}
                  <Paginate pagination={pagination} method={listCurrencies} />

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
            )}
          </div>
        </div>

        {/* ----------------------------------------- */}

        <div
          className={`mb-10 flex w-full flex-col gap-8 bg-[#E8E9EB] font-display ${
            curstate ? "hidden" : ""
          }`}
        >
          <div className="my-5">
            <div>
              <div className="flex items-center justify-between">
                <p className=" text-4xl font-semibold text-[#280559]">
                  {/* Create or edit Currency */}
                  {params.action == 1
                    ? "View Currency"
                    : params.action == 2
                    ? "Edit Currency"
                    : "Create Currency"}
                </p>
                {isViewMode ? (
                  <Button
                    onClick={() => {
                      setAllFormsData({});
                      setFormValues({});
                      setDropdownID(0);
                      setCurstate(true);
                      navigate("/dashboard/CurrencyManagement/*");
                    }}
                    className="rounded-[15px]  bg-[#280559]"
                  >
                    <div className="flex flex-row items-center justify-center">
                      <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                        Back
                      </p>
                    </div>
                  </Button>
                ) : (
                  <div className="hidden md:block">
                    <NavLink to="">
                      <Button className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6">
                        <div className="flex flex-row items-center justify-center">
                          <img src={saveIcon} alt="..." />
                          <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                            Save Changes
                          </p>
                        </div>
                      </Button>
                    </NavLink>
                  </div>
                )}
              </div>
              <p className=" font text-base text-[#9898A3]">
                {/* Create or edit Currency */}
                {params.action == 1
                  ? "View Currency"
                  : params.action == 2
                  ? "Edit Currency"
                  : "Create Currency"}
              </p>
              {isViewMode ? (
                ""
              ) : (
                <div className="ml-auto mt-6 block w-full md:hidden">
                  <NavLink to="">
                    <Button className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6">
                      <div className="flex flex-row items-center justify-center">
                        <img src={saveIcon} alt="..." />
                        <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                          Save Changes
                        </p>
                      </div>
                    </Button>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
          <div className="rounded-[34px] bg-white p-[39px]">
            <p className="mb-8 text-2xl font-semibold text-[#333333]">
              Currency Details
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mt-4 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#333333]">
                    Currency Name (ISO code)
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                    placeholder="USD"
                    name="iso"
                    value={formValues.iso}
                    onChange={handleChange}
                    disabled={isViewMode}
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#333333]">
                    Currency Name
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                    placeholder="US Dollar"
                    name="name"
                    value={formValues.name}
                    disabled={isViewMode}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#333333]">
                    Exchange Rate
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Exchange Rate"
                    name="exRate"
                    value={formValues.exRate}
                    disabled={isViewMode}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#333333]">
                    Status
                  </label>
                  <select
                    className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                    name="status"
                    value={formValues.status}
                    onChange={handleChange}
                    disabled={isViewMode}
                  >
                    <option>Select Status</option>
                    <option value={1}>Active</option>
                    <option
                      value={0}
                      style={{ color: "red", border: "1px solid red" }}
                    >
                      Inactive
                    </option>
                  </select>
                </div>
              </div>
              {isViewMode ? (
                ""
              ) : (
                <div className="mt-4 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* // <div className="mt-4 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                //   <div>
                //     <label className="mb-2 block text-sm font-semibold text-[#333333]">
                //       Add Field
                //     </label>
                //     <button
                //       onClick={() => setOpenModal(true)}
                //       type="button"
                //       className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
                //     >
                //       Click to add more field
                //     </button>
                //     <AddField
                //       open={openModal}
                //       close={() => setOpenModal(false)}
                //     />
                //   </div>
                // </div> */}
                  <AddField
                    open={openCostAddModal}
                    close={() => setOpenCostAddModal(false)}
                    toAdd={costNewFields}
                    setOpenAddModal={setOpenCostAddModal}
                    setToAdd={setCostNewFields}
                    formsData={allFormsData}
                    setFormsData={setAllFormsData}
                    handleFormsDataChange={handleAllFormsDataChange}
                    section={"Accounting-Cost"}
                  />
                </div>
              )}
              {isViewMode ? (
                ""
              ) : (
                <>
                  {/* <NavLink to=""> */}
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
                  {/* </NavLink> */}
                </>
              )}{" "}
              <Button
                onClick={() => {
                  setAllFormsData({});
                  setFormValues({});
                  setDropdownID(0);
                  setCurstate(true);
                  navigate("/dashboard/CurrencyManagement/*");
                }}
                // onClick={() => {
                //   setFormValues({});
                //   setAllFormsData({});
                //   navigate(-1);
                // }}
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
        </div>
      </div>
    </>
  );
}

export default Currency;
