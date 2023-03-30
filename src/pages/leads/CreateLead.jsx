// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { Button } from "@material-tailwind/react/components/Button";
// import universityLogo from "../../../public/img/universityLogo.svg";
// import saveIcon from "../../../public/img/saveIcon.svg";
// import { FileUploader } from "react-drag-drop-files";
// // import { useState } from "react";
// import axios from "axios";
// // import Loader from "@/loader";
// import { toast } from "react-toastify";
// import { ENV } from "@/config";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { viewLead } from "@/redux/actions/actions";
// import { useDispatch, useSelector } from "react-redux";
// import FullPageLoader from "@/FullPageLoader/FullPageLoader";
// import { v4 as uuid } from "uuid";

// export function CreateLead() {
//   const [isViewMode, setIsViewMode] = useState(true);

//   const fileTypes = ["JPEG", "PNG", "GIF"];
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   const unique_id = uuid();
//   const only_numbers = unique_id.replace(/[^0-9]/g, "");
//   const first_9_digits = only_numbers.substring(0, 9);

// console.log(first_9_digits);
//   // const uuidFixedLength = unique_id.substring(0, 9);

// console.log("unique id ==>", uuidFixedLength);

//   const leadData = useSelector(
//     (state) => state?.universitiesReducer?.viewLeads
//   );
// console.log(
//     "lead data for update,view,delete in create lead compo",
//     leadData
//   );

//   const initialValues = {
//     // image: filename,

//     name: "",
//     passportNo: "",
//     leadGroup: "",
//     country: "",
//     phoneNo: "",
//     email: "",
//     refferalName: "",
//     refferalEmail: "",
//     //
//     schoolName: "",
//     qualificationType: "",
//     selectUniversity: "",
//     interestedProgramme: "",
//     status: "",
//     cert: "",
//     comments: "",
//     image: "",
//   };
//   const [formValues, setFormValues] = useState(initialValues);
//   // const [isViewMode, setIsViewMode] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const params = useParams();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (params.id) dispatch(viewLead(params.id));
//     if (params.action == 1) {
//       setIsViewMode(true);
//     } else {
//       setIsViewMode(false);
//     }
//   }, [params.id]);

//   useEffect(() => {
//     if (leadData?.lead) setFormValues(leadData?.lead);
//   }, [leadData.lead]);

//   // useEffect(() => {
//   //   if (leadData?.lead?.programmeDetails)
//   //     setFormValues(leadData?.lead?.programmeDetails);
//   // }, [leadData?.lead?.programmeDetails]);

//   // viewLeads

//   const handlefileChange = (file) => {
// console.log("file", file);
//     setFile(file);
//     //
//     let reader = new FileReader();
//     reader.onload = function () {
//       let output = document.getElementById("university-logo");
//       output.src = reader.result;
//     };
//     if (event.target.files[0]) {
//       reader.readAsDataURL(event.target.files[0]);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
// console.log("formValues ==>", formValues);
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
// console.log("handle submit", formValues);
//     const {
//       name,
//       passportNo,
//       leadGroup,
//       country,
//       phoneNo,
//       email,
//       refferalName,
//       refferalEmail,
//       schoolName,
//       qualificationType,
//       selectUniversity,
//       interestedProgramme,
//       status,
//       cert,
//       comments,
//     } = formValues;

// console.log("Front Image", file);
//     let formData = new FormData();
//     formData.append("name", name);
//     formData.append("passportNo", passportNo);
//     formData.append("leadGroup", leadGroup);
//     formData.append("country", country);
//     formData.append("phoneNo", phoneNo);

//     formData.append("email", email);
//     formData.append("refferalName", refferalName);
//     formData.append("refferalEmail", refferalEmail);
//     formData.append("schoolName", schoolName);
//     formData.append("qualificationType", qualificationType);
//     formData.append("selectUniversity", selectUniversity);
//     formData.append("interestedProgramme", interestedProgramme);
//     formData.append("status", status);
//     formData.append("cert", cert);
//     formData.append("comments", comments);
//     formData.append("logo", file[0]);

//     const config = {
//       headers: { "content-type": "multipart/form-data" },
//     };

//     // const apiCall = await axios.post(
//     //   `${ENV.baseUrl}/lead/createLead`,
//     //   formData,
//     //   config
//     // );
//     const apiCall = await axios[params.action == 2 ? "put" : "post"](
//       `${ENV.baseUrl}/lead/${params.action == 2 ? "edit" : "create"}`,
//       formData,
//       config
//     );

//     setIsLoading(false);
// console.log("lEAD created ", apiCall);

//     if (apiCall.data?.success) {
//       let { message } = apiCall.data;
//       toast.success(message, {
//         position: toast.POSITION.TOP_RIGHT,
//         hideProgressBar: false,
//         autoClose: 3000,
//       });
//     }
//     // navigate("")
//   };

//   return (
//     <>
//       {isLoading && <FullPageLoader />}
//       <div className="mt-12 w-full bg-[#E8E9EB] font-display">
//         <div className="my-10">
//           <div className="mr-8 flex items-center justify-between">
//             <p className=" text-4xl font-semibold text-[#280559]">
// {console.log("params ==>", params.action, params.id)}
//               {/* Create Lead */}
//               {params.action == 1
//                 ? "View Lead"
//                 : params.action == 2
//                 ? "Edit Lead"
//                 : "Create Lead"}
//             </p>
//             <div className="hidden sm:block">
//               <NavLink to="">
//                 <Button className="rounded-[15px]  bg-[#280559]">
//                   <div className="flex flex-row items-center justify-center">
//                     <img src={saveIcon} alt="..." />
//                     <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
//                       Save Changes
//                     </p>
//                   </div>
//                 </Button>
//               </NavLink>
//             </div>
//           </div>
//           <p className=" font text-base text-[#9898A3]">Create or edit lead</p>
//           <div className="ml-auto mr-8 mt-6 w-fit sm:hidden">
//             <NavLink to="">
//               <Button className="rounded-[15px]  bg-[#280559]">
//                 <div className="flex items-center justify-center">
//                   <img src={saveIcon} alt="..." />
//                   <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
//                     Save Changes
//                   </p>
//                 </div>
//               </Button>
//             </NavLink>
//           </div>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="mr-8 rounded-[34px] bg-white p-[39px]">
//             <p className="mb-8 text-2xl font-semibold text-[#333333]">
//               Lead Details
//             </p>
//             <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               <div className=" flex flex-col gap-12 sm:flex-row sm:gap-20">
//                 <p className="text-base font-semibold text-[#333333]">Photo</p>
//                 <div className="flex flex-col items-center justify-center">
//                   <img
//                     // className="mb-3 rounded-2xl"
//                     // src={universityLogo}
//                     id="university-logo"
//                     className="width:156px mb-3 rounded-2xl"
//                     style={{ width: "156px" }}
//                     src={
//                       preview ||
//                       (formValues?.logo &&
//                         `${ENV.imageUrl}${formValues?.logo}`) ||
//                       universityLogo
//                     }
//                     alt="..."
//                   />
//                   <FileUploader
//                     multiple={true}
//                     handleChange={handlefileChange}
//                     name="file" //
//                     // types={fileTypes}
//                   >
//                     <button className="w-[150px] ">
//                       <p className="rounded-2xl border-[1px] border-[#cbd2dc]/50 py-3 text-sm font-medium text-[#333333] shadow-md">
//                         Upload Logo
//                       </p>
//                     </button>
//                   </FileUploader>
//                 </div>
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                   Generated ID
//                 </label>
//                 <input
//                   type="text"
//                   className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                   placeholder="192192554"
//                   value={first_9_digits}
//                   disabled={isViewMode}
//                   // isViewMode={true}
//                   //  required
//                 />
//               </div>
//             </div>
//             {/* <form> */}
//             <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                   placeholder="Full Name"
//                   required
//                   name="name"
//                   value={formValues?.name}
//                   disabled={isViewMode}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                   Passport
//                 </label>
//                 <input
//                   type="text"
//                   className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                   placeholder="0123 456 789"
//                   required
//                   name="passportNo"
//                   value={formValues?.passportNo}
//                   disabled={isViewMode}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                   Lead Group
//                 </label>
//                 <select
//                   className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                   name="leadGroup" //
//                   value={formValues?.leadGroup}
//                   disabled={isViewMode}
//                   onChange={handleChange}
//                 >
//                   <option selected>Select Group</option>
//                   <option>Select Group 1</option>
//                   <option>Select Group 2</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                   Nationality/Country
//                 </label>
//                 <select
//                   className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                   name="country" //
//                   value={formValues?.country}
//                   onChange={handleChange}
//                   disabled={isViewMode}
//                 >
//                   <option selected>Select Country</option>
//                   <option>pakistan</option>
//                   <option>India</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                   placeholder="+60123456789"
//                   // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
//                   required
//                   name="phoneNo" //
//                   value={formValues?.phoneNo}
//                   disabled={isViewMode}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                   placeholder="example@email.com"
//                   required
//                   name="email"
//                   value={formValues?.email}
//                   onChange={handleChange}
//                   disabled={isViewMode}
//                 />
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                   Add Field
//                 </label>
//                 <button
//                   type="button"
//                   className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
//                 >
//                   Click to add more field
//                 </button>
//               </div>
//             </div>
//             {/* </form> */}
//           </div>
//           <div className="my-[30px] mr-8 rounded-[34px] bg-white p-[39px]">
//             <p className="mb-8 text-2xl font-semibold text-[#333333]">
//               Program Details
//             </p>
//             {/* <form> */}
//             <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                   School Name
//                 </label>
//                 <input
//                   type="text"
//                   className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                   placeholder="School Name"
//                   required
//                   name="schoolName"
//                   value={formValues?.schoolName}
//                   onChange={handleChange}
//                   disabled={isViewMode}
//                 />
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                   Type of Qualification
//                 </label>
//                 <select
//                   className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                   name="qualificationType" //
//                   value={formValues?.qualificationType}
//                   onChange={handleChange}
//                   disabled={isViewMode}
//                 >
//                   <option selected>Select Qualification</option>
//                   <option>Becholars</option>
//                   <option>Masters</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                   Selected University
//                 </label>
//                 <select
//                   className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                   name="selectUniversity" //
//                   value={formValues?.selectUniversity}
//                   onChange={handleChange}
//                   disabled={isViewMode}
//                 >
//                   <option selected>Select University</option>
//                   <option>punjab University</option>
//                   <option>virtual University</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                   Interested Program
//                 </label>
//                 <select
//                   className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                   name="interestedProgramme" //
//                   value={formValues?.interestedProgramme}
//                   onChange={handleChange}
//                   disabled={isViewMode}
//                 >
//                   <option selected>Select Program</option>
//                   <option>becholars</option>
//                   <option>masters</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                   Status
//                 </label>
//                 <select
//                   className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                   name="status" //
//                   value={formValues?.status}
//                   onChange={handleChange}
//                   disabled={isViewMode}
//                 >
//                   <option selected>Select Status</option>
//                   <option> Status one</option>
//                   <option> Status second</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                   Cert
//                 </label>
//                 <input
//                   type="text"
//                   className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                   placeholder="Cert"
//                   required
//                   name="cert"
//                   value={formValues?.cert}
//                   onChange={handleChange}
//                   disabled={isViewMode}
//                 />
//               </div>
//             </div>
//             <div className="mb-6 grid gap-6 md:grid-cols-2">
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-[#333]">
//                   Comments With Date
//                 </label>
//                 <textarea
//                   rows="6"
//                   className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-sm text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                   placeholder="Comments With Date"
//                   name="comments" //
//                   value={formValues?.comments}
//                   onChange={handleChange}
//                   disabled={isViewMode}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                   Add Field
//                 </label>
//                 <button
//                   type="button"
//                   className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
//                 >
//                   Click to add more field
//                 </button>
//               </div>
//             </div>
//             {/* </form> */}
//           </div>
//           <div className="my-[30px] mr-8 rounded-[34px] bg-white p-[39px]">
//             <p className="mb-8 text-2xl font-semibold text-[#333333]">
//               Referral Details
//             </p>
//             {/* <form> */}
//             <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                   Referral Name
//                 </label>
//                 <input
//                   type="text"
//                   className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                   placeholder="Referral Name"
//                   required
//                   name="refferalName" //
//                   value={formValues?.refferalName}
//                   onChange={handleChange}
//                   disabled={isViewMode}
//                 />
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                   {" "}
//                   Refferal Email
//                 </label>
//                 <input
//                   type="email"
//                   className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                   placeholder="example@email.com"
//                   required
//                   name="refferalEmail" //
//                   value={formValues?.refferalEmail}
//                   onChange={handleChange}
//                   disabled={isViewMode}
//                 />
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-[#333333]">
//                   Add Field
//                 </label>
//                 <button
//                   type="button"
//                   className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
//                 >
//                   Click to add more field
//                 </button>
//               </div>
//             </div>
//             {/* </form> */}
//           </div>
//           {/* <NavLink to="university"> */}
//           <Button className="rounded-[15px]  bg-[#280559]">
//             <div className="flex flex-row items-center justify-center">
//               <img src={saveIcon} alt="..." />
//               <button
//                 className="p-1 px-[11px] text-base font-medium normal-case text-white"
//                 type="submit"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </Button>
//           {/* </NavLink> */}
//         </form>
//       </div>
//     </>
//   );
// }

// export default CreateLead;

import React, { useState, useEffect, isValidElement } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react/components/Button";
import universityLogo from "../../../public/img/universityLogo.svg";
import saveIcon from "../../../public/img/saveIcon.svg";
import { FileUploader } from "react-drag-drop-files";
// import { useState } from "react";
import axios from "axios";
// import Loader from "@/loader";
import { toast } from "react-toastify";
import { ENV } from "@/config";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  viewLead,
  listUniversities,
  listInterestedPrograms,
  listLeadsManagmentModuleStatuss,
  listQualificationTypes,
  listLeadGroups,
  listLeads,
} from "@/redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import FullPageLoader from "@/FullPageLoader/FullPageLoader";
import { v4 as uuid } from "uuid";
import AddField from "@/helpers/Addfield";

export function CreateLead() {
  // Anasite - Edits: Add New Form
  // Anasite - Edits
  const {
    interestedPrograms,
    universities,
    leadsManagmentModuleStatuss,
    qualificationTypes,
    leadGroups,
  } = useSelector((state) =>
    state?.universitiesReducer ? state?.universitiesReducer : {}
  );
  useEffect(() => {
    dispatch(listUniversities("limit=100000"));
    dispatch(listInterestedPrograms("limit=100000"));
    dispatch(listLeadsManagmentModuleStatuss("limit=100000"));
    dispatch(listQualificationTypes("limit=100000"));
    dispatch(listLeadGroups("limit=100000"));
  }, []);
  // End
  /*{ toAdd, setToAdd,  open,close,  setOpenAddModal,  formsData,  setFormsData,  handleFormsDataChange,  section,} */
  // const [openModal, setOpenModal] = useState(false);
  // const [CreateLeadState, setCreateLeadState] = useState(true);
  const [openCreateLeadAddModal, setOpenCreateLeadAddModal] = useState(false);
  const [openProgramDetailsAddModal, setOpenProgramDetailsAddModal] =
    useState(false);
  const [openThirdAddModal, setOpenThirdAddModal] = useState(false);

  const [CreateLeadNewFields, setCreateLeadNewFields] = useState([]);
  const [ProgrameDetailNewForm, setProgrameDetailNewForm] = useState([]);
  const [thirdNewForm, setThirdNewForm] = useState([]);

  const [allFormsData, setAllFormsData] = useState({});
  const handleAllFormsDataChange = (e) => {
    let { name, value } = e.target;
    setAllFormsData({ ...allFormsData, [name]: value });
  };
  // End
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const fileTypes = ["JPEG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [newuid, setNewuid] = useState("");

  useEffect(() => {
    uidsd();
  }, []);

  const uidsd = () => {
    const unique_id = uuid();
    const only_numbers = unique_id.replace(/[^0-9]/g, "");
    const first_9_digits = only_numbers.substring(0, 9);
    console.log(first_9_digits);
    setNewuid(first_9_digits);
  };

  const leadData = useSelector(
    (state) => state?.universitiesReducer?.viewLeads
  );
  // console.log(
  // "lead data for update,view,delete in create lead compo",
  // leadData
  // );

  const initialValues = {
    // image: filename,
    name: "",
    passportNo: "",
    leadGroup: "",
    country: "",
    phoneNo: "",
    email: "",
    refferalName: "",
    refferalEmail: "",
    //
  };
  const [formValues, setFormValues] = useState(initialValues);
  const secondInitialValus = {
    schoolName: "",
    qualificationType: "",
    selectUniversity: "",
    interestedProgramme: "",
    status: "",
    cert: "",
    comments: "",
    image: "",
  };
  const [ProgrameDetailValues, setProgrameDetailsValues] =
    useState(secondInitialValus);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (params.id) dispatch(viewLead(params.id));
    if (params.action == 1) {
      setIsViewMode(true);
    } else {
      setIsViewMode(false);
    }
    if (!params.action) {
      setIsViewMode(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (!params.action || !params.id) return;
    if (leadData?.lead) {
      setFormValues(leadData?.lead);
      console.log("Load Data Lead >>> ", leadData?.lead);
      return setProgrameDetailsValues(leadData?.lead?.ProgrameDetail);
    }
  }, [leadData.lead]);

  useEffect(() => {
    if (!params.action || !params.id) return;
    if (leadData?.lead?.programmeDetails)
      setProgrameDetailsValues(leadData?.lead?.programmeDetails);
  }, [leadData?.lead?.programmeDetails]);

  const handlefileChange = (file) => {
    console.log("file", file);
    setFile(file);
    //
    let reader = new FileReader();
    reader.onload = function () {
      let output = document.getElementById("university-logo");
      output.src = reader.result;
      console.log("fileSRc", reader.result);
    };
    if (file[0]) {
      reader.readAsDataURL(file[0]);
      console.log("reader", reader);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log("formValues ==>", formValues);
    setFormValues({ ...formValues, [name]: value });
    // console.log("programeDetailsValues", ProgrameDetailValues);
    setProgrameDetailsValues({ ...ProgrameDetailValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    // console.log("handle submit", formValues);
    const {
      name,
      passportNo,
      leadGroup,
      country,
      phoneNo,
      email,
      refferalName,
      refferalEmail,
    } = formValues;
    const {
      schoolName,
      qualificationType,
      selectUniversity,
      interestedProgramme,
      status,
      cert,
      comments,
    } = ProgrameDetailValues;
    // console.log("Front Image", file);
    let formData = new FormData();
    formData.append("name", name);
    formData.append("passportNo", passportNo);
    formData.append("leadGroup", leadGroup);
    formData.append("country", country);
    formData.append("phoneNo", phoneNo);
    formData.append("Uname", localStorage.name);
    formData.append("role", localStorage.access);

    if (params.id) formData.append("id", params.id);
    formData.append("email", email);
    formData.append("refferalName", refferalName);
    formData.append("refferalEmail", refferalEmail);
    formData.append("schoolName", schoolName);
    formData.append("qualificationType", qualificationType);
    formData.append("selectUniversity", selectUniversity);
    formData.append("interestedProgramme", interestedProgramme);
    formData.append("status", status);
    formData.append("cert", cert);
    formData.append("comments", comments);
    formData.append("logo", file && file[0] ? file[0] : "");

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    const apiCall = await axios[params.action == 2 ? "put" : "post"](
      `${ENV.baseUrl}/lead/${params.action == 2 ? "edit" : "createLead"}`,
      formData,
      config
    );

    setIsLoading(false);
    // console.log("lEAD created ", apiCall);

    if (apiCall.data?.success) {
      let { message } = apiCall.data;
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 3000,
      });
      setFormValues(initialValues);
      setProgrameDetailsValues(secondInitialValus);
      dispatch(listLeads());
      navigate(-1);
    }
  };

  return (
    <>
      {isLoading && <FullPageLoader />}
      <div className="mt-12 w-full bg-[#E8E9EB] font-display">
        <div className="my-10">
          <div className="mr-8 flex items-center justify-between">
            <p className=" text-4xl font-semibold text-[#280559]">
              {/* {console.log("params ==>", params.action, params.id)} */}
              {/* Create Lead */}
              {params.action == 1
                ? "View Lead"
                : params.action == 2
                ? "Edit Lead"
                : "Create Lead"}
            </p>
            {isViewMode ? (
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
              <div className="hidden sm:block">
                <NavLink to="">
                  <Button className="rounded-[15px]  bg-[#280559]">
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
            {/* Create or edit lead */}
            {params.action == 1
              ? "View Lead"
              : params.action == 2
              ? "Edit Lead"
              : "Create Lead"}
          </p>
          {isViewMode ? (
            ""
          ) : (
            <div className="ml-auto mr-8 mt-6 w-fit sm:hidden">
              <NavLink to="">
                <Button className="rounded-[15px]  bg-[#280559]">
                  <div className="flex items-center justify-center">
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
        <form onSubmit={handleSubmit}>
          <div className="mr-8 rounded-[34px] bg-white p-[39px]">
            <p className="mb-8 text-2xl font-semibold text-[#333333]">
              Lead Details
            </p>
            <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className=" flex flex-col gap-12 sm:flex-row sm:gap-20">
                <p className="text-base font-semibold text-[#333333]">Photo</p>
                <div className="flex flex-col items-center justify-center">
                  <img
                    id="university-logo"
                    className="width:156px mb-3 rounded-2xl"
                    style={{ width: "156px" }}
                    src={
                      preview ||
                      (formValues?.image &&
                        `${ENV.imageUrl}${formValues?.image}`) ||
                      universityLogo
                    }
                    onError={function (e) {
                      e.target.src = universityLogo;
                    }}
                    alt="..."
                  />
                  {isViewMode ? (
                    ""
                  ) : (
                    <FileUploader
                      multiple={true}
                      handleChange={handlefileChange}
                      name="file" //
                      // types={fileTypes}
                    >
                      <button className="w-[150px] ">
                        <p className="rounded-2xl border-[1px] border-[#cbd2dc]/50 py-3 text-sm font-medium text-[#333333] shadow-md">
                          Upload Logo
                        </p>
                      </button>
                    </FileUploader>
                  )}
                </div>
              </div>
              {/* <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Generated ID
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="192192554"
                  value={newuid}
                  disabled={isViewMode}
                // isViewMode={true}
                //  required
                />
              </div> */}
            </div>
            {/* <form> */}
            <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Full Name
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Full Name"
                  required
                  name="name"
                  value={formValues?.name}
                  disabled={isViewMode}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Passport
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="0123 456 789"
                  required
                  name="passportNo"
                  value={formValues?.passportNo}
                  disabled={isViewMode}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Lead Group
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="leadGroup" //
                  value={formValues?.leadGroup}
                  disabled={isViewMode}
                  onChange={handleChange}
                >
                  <option>Select Group</option>
                  {/* ****** */}
                  {/* {console.log("leeeesssadsfwew", leadGroups)} */}
                  {leadGroups?.data?.faqs.map((group) => {
                    return (
                      <option
                        value={group.ID}
                        key={
                          group.ID +
                          "hey" +
                          group.Color +
                          group.name +
                          "choose in leed group"
                        }
                      >
                        {group.name}
                      </option>
                    );
                  })}
                  {/* <option>social media</option>
                  <option> Event</option>
                  <option> Walk In</option> */}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Nationality/Country
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="country" //
                  value={formValues?.country}
                  onChange={handleChange}
                  disabled={isViewMode}
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
                  <option value="Malaysia" selected>
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
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="+60123456789"
                  // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
                  name="phoneNo" //
                  value={formValues?.phoneNo}
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
                  value={formValues?.email}
                  onChange={handleChange}
                  disabled={isViewMode}
                />
              </div>
              {isViewMode ? (
                ""
              ) : (
                <AddField
                  open={openCreateLeadAddModal}
                  close={() => setOpenCreateLeadAddModal(false)}
                  toAdd={CreateLeadNewFields}
                  setOpenAddModal={setOpenCreateLeadAddModal}
                  setToAdd={setCreateLeadNewFields}
                  formsData={formValues}
                  setFormsData={setFormValues}
                  handleFormsDataChange={handleAllFormsDataChange}
                  section={"Lead-CreateLead"}
                />
              )}
              {/* <div>
                  <label className="mb-2 block text-sm font-semibold text-[#333333]">
                    Add Field
                  </label>
                  <button
                    onClick={() => setOpenAddModal(true)}
                    type="button"
                    className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
                  >
                    Click to add more field
                  </button>
                  <Addfield
                    open={openAddModal}
                    close={() => setOpenAddModal(false)}
                  />
                </div> */}
            </div>
            {/* </form> */}
          </div>
          <div className="my-[30px] mr-8 rounded-[34px] bg-white p-[39px]">
            <p className="mb-8 text-2xl font-semibold text-[#333333]">
              Program Details
            </p>
            {/* <form> */}
            <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  School Name
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="School Name"
                  required
                  name="schoolName"
                  value={ProgrameDetailValues?.schoolName}
                  onChange={handleChange}
                  disabled={isViewMode}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Type of Qualification
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="qualificationType" //
                  value={ProgrameDetailValues?.qualificationType}
                  onChange={handleChange}
                  disabled={isViewMode}
                >
                  <option value={""}>Select Qualification</option>
                  {qualificationTypes?.data?.faqs.map((type) => {
                    return (
                      <option
                        value={type.ID}
                        key={type.ID + "jj" + type.name + type.Color + "qType"}
                      >
                        {type.name}
                      </option>
                    );
                  })}
                  {/* <option>Somali Cert</option>
                  <option>IGCSE</option>
                  <option>KCSE</option>
                  <option>American Diploma</option>
                  <option>Bachelor degree</option>
                  <option>master degree</option> */}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Selected University
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="selectUniversity" //
                  value={ProgrameDetailValues?.selectUniversity}
                  onChange={handleChange}
                  disabled={isViewMode}
                >
                  <option value={""}>Select University</option>
                  {universities?.data?.faqs.map((university) => {
                    return (
                      <option
                        value={university.id}
                        key={
                          university.id +
                          university.createdAt +
                          university.name +
                          "creatLead"
                        }
                      >
                        {university.name}
                      </option>
                    );
                  })}
                  {/* <option>punjab University</option>
                  <option>virtual University</option> */}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Interested Program
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="interestedProgramme" //
                  value={ProgrameDetailValues?.interestedProgramme}
                  onChange={handleChange}
                  disabled={isViewMode}
                >
                  <option value={""}>Select Program</option>
                  {interestedPrograms?.data?.faqs.map((category) => {
                    return (
                      <option
                        value={category.ID}
                        key={
                          category.id +
                          category.createdAt +
                          category.name +
                          "createlead"
                        }
                      >
                        {category.name}
                      </option>
                    );
                  })}
                  {/* <option>becholars</option>
                  <option>masters</option> */}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Status
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="status" //
                  value={ProgrameDetailValues?.status}
                  onChange={handleChange}
                  disabled={isViewMode}
                >
                  <option value={""}>Select Status</option>
                  {leadsManagmentModuleStatuss?.data?.faqs.map((status) => {
                    return (
                      <option
                        value={status.ID}
                        key={
                          status.ID +
                          "hey" +
                          status.Color +
                          status.name +
                          "choose in leed"
                        }
                      >
                        {status.name}
                      </option>
                    );
                  })}
                  {/* <option> Warm </option>
                  <option> Hot</option>
                  <option> Qualified</option> */}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Cert
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Cert"
                  required
                  name="cert"
                  value={ProgrameDetailValues?.cert}
                  onChange={handleChange}
                  disabled={isViewMode}
                />
              </div>
            </div>
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333]">
                  Comments With Date
                </label>
                <textarea
                  rows="6"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-sm text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Comments With Date"
                  name="comments" //
                  value={ProgrameDetailValues?.comments}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>
            </div>
            {isViewMode ? (
              ""
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AddField
                  open={openProgramDetailsAddModal}
                  close={() => setOpenProgramDetailsAddModal(false)}
                  toAdd={ProgrameDetailNewForm}
                  setToAdd={setProgrameDetailNewForm}
                  setOpenAddModal={setOpenProgramDetailsAddModal}
                  formsData={ProgrameDetailValues}
                  setFormsData={setProgrameDetailsValues}
                  handleFormsDataChange={handleAllFormsDataChange}
                  section={"Lead-ProgramDetails"}
                />
              </div>
            )}
            {/* <div>
                  <label className="mb-2 block text-sm font-semibold text-[#333333]">
                    Add Field
                  </label>
                  <button
                    onClick={() => setOpenAddModal(true)}
                    type="button"
                    className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
                  >
                    Click to add more field
                  </button>
                  <Addfield
                    open={openAddModal}
                    close={() => setOpenAddModal(false)}
                  />
                </div> */}
            {/* </form> */}
          </div>
          <div className="my-[30px] mr-8 rounded-[34px] bg-white p-[39px]">
            <p className="mb-8 text-2xl font-semibold text-[#333333]">
              Referral Details
            </p>
            {/* <form> */}
            <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Referral Name
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Referral Name"
                  required
                  name="refferalName" //
                  value={formValues?.refferalName}
                  onChange={handleChange}
                  disabled={isViewMode}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  {" "}
                  Refferal Email
                </label>
                <input
                  type="email"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="example@email.com"
                  required
                  name="refferalEmail" //
                  value={formValues?.refferalEmail}
                  onChange={handleChange}
                  disabled={isViewMode}
                />
              </div>
              {isViewMode ? (
                ""
              ) : (
                <AddField
                  open={openThirdAddModal}
                  close={() => setOpenThirdAddModal(false)}
                  setOpenAddModal={setOpenThirdAddModal}
                  toAdd={thirdNewForm}
                  setToAdd={setThirdNewForm}
                  formsData={allFormsData}
                  setFormsData={setAllFormsData}
                  handleFormsDataChange={handleAllFormsDataChange}
                  section={"Lead-Third"}
                />
              )}
              {/* <div>
                  <label className="mb-2 block text-sm font-semibold text-[#333333]">
                    Add Field
                  </label>
                  <button
                    onClick={() => setOpenAddModal(true)}
                    type="button"
                    className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
                  >
                    Click to add more field
                  </button>
                  <Addfield
                    open={openAddModal}
                    close={() => setOpenAddModal(false)}
                  />
                </div> */}
            </div>
            {/* </form> */}
          </div>
          {isViewMode ? (
            ""
          ) : (
            <>
              {/* <NavLink to="university"> */}
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
              setFormValues(initialValues);
              setProgrameDetailsValues(secondInitialValus);
              return navigate(-1);
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
    </>
  );
}

export default CreateLead;
