import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import universityLogo from "../../../public/img/universityLogo.svg";
import saveIcon from "../../../public/img/saveIcon.svg";
import upload from "../../../public/img/upload.svg";
import esc from "../../../public/img/esc.svg";
import deletee from "../../../public/img/delete.svg";
import up from "../../../public/img/up.svg";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
// import Loader from "@/loader";
import FullPageLoader from "@/FullPageLoader/FullPageLoader";
import { toast } from "react-toastify";
import { ENV } from "@/config";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  viewApplication,
  listApplicationModuleStatuss,
} from "@/redux/actions/actions";
import {
  listApplications,
  listLeads,
  listInterestedPrograms,
  listQualificationTypes,
  listUniversities,
  listProgramLevels,
} from "@/redux/actions/actions";
import { data } from "autoprefixer";
import AddField from "@/helpers/Addfield";

// import [useSelector]
export function AddNewApplication() {
  // Anasite - Edits
  const {
    programLevels,
    qualificationTypes,
    universities,
    interestedPrograms,
    applicationModuleStatuss,
    leads,
  } = useSelector((state) =>
    state?.universitiesReducer ? state?.universitiesReducer : {}
  );
  useEffect(() => {
    dispatch(listInterestedPrograms("limit=100000"));
    dispatch(listLeads("limit=100000"));
    dispatch(listQualificationTypes("limit=100000"));
    dispatch(listUniversities("limit=100000"));
    dispatch(listProgramLevels("limit=100000"));
    dispatch(listApplicationModuleStatuss("limit=100000"));
  }, []);
  // End
  const [openAddModal, setOpenAddModal] = useState(false);
  const [file, setFile] = useState(null);
  const [documentFile, setDocumentFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isViewMode, setIsViewMode] = useState(true);
  /*{ toAdd, setToAdd,  open,close,  setOpenAddModal,  formsData,  setFormsData,  handleFormsDataChange,  section,} */
  const [NewApplicantState, setNewApplicantState] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openNewApplicantAddModal, setOpenNewApplicantAddModal] =
    useState(false);
  const [NewApplicantNewFields, setNewApplicantNewFields] = useState([]);
  const [openSecondNewApplicantAddModal, setOpenSecondNewApplicantAddModal] =
    useState(false);
  const [SecondNewApplicantNewFields, setSecondNewApplicantNewFields] =
    useState([]);
  const [allFormsData, setAllFormsData] = useState({});
  const handleAllFormsDataChange = (e) => {
    let { name, value } = e.target;
    setAllFormsData({ ...allFormsData, [name]: value });
  };

  const applicationsData = useSelector(
    (state) => state?.universitiesReducer?.viewApplications
  );
  console.log(
    "applications datta in create application module",
    applicationsData
  );
  console.log("Leads datta in create application module", leads);
  // list all applications
  useEffect(() => {
    dispatch(listApplications());

    if (applicationsData?.success == true) {
      let { message } = applicationsData;
      // toast.success(message, {
      //   position: toast.POSITION.TOP_RIGHT,
      //   hideProgressBar: false,
      //   autoClose: 3000,
      // });
    }
  }, []);

  const applicantData = useSelector((state) => {
    return state?.universitiesReducer?.applications;
  });

  // console.log("applicantData ==>", applicantData);

  const handlefileChange = (file) => {
    console.log("file", file[0]);
    setFile(file);
    //
    let reader = new FileReader();
    reader.onload = function () {
      let output = document.getElementById("university-logo");
      output.src = reader.result;
    };
    // console.log("><><><><><><><><><><><><><><><><><><>", file);
    if (file[0]) {
      reader.readAsDataURL(file[0]);
    }
  };
  const fileTypes = ["JPEG", "PNG", "GIF"];

  const handleDocumentFileChange = (file) => {
    console.log("file", file);
    setDocumentFile((documentFile) => [file, ...documentFile]);
    console.log(documentFile.name);
  };
  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    address1: "",
    address2: "",
    country: "",
    passportNo: "",
    id: "",

    //
  };
  const [formValues, setFormValues] = useState(initialValues);
  const secondInitialValues = {
    applicationLevel: "",
    interestedProgramme: "",
    schoolName: "",
    qualificationType: "",
    selectUniversity: "",
    completionLetter: "",
    programmeLevel: "",
    healthForm: "",
    paymentReceipt: "",
    researchProposal: "",
    refreeForm: "",
    medium: "",
    scholorshipForm: "",
    otherDocuments: "",
    attestationLetter: "",
    releaseLetter: "",
    status: "",
    fileUpload: "",
    applicantsId: "",
    image: "",
  };
  const [appDetailValues, setAppDetailValue] = useState(secondInitialValues);

  useEffect(() => {
    if (params.id) dispatch(viewApplication(params.id));
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
    if (applicationsData?.applicant) setFormValues(applicationsData?.applicant);
  }, [applicationsData.applicant]);

  useEffect(() => {
    if (!params.action || !params.id) return;
    if (applicationsData?.applicant?.programmeDetails)
      setAppDetailValue(applicationsData?.applicant?.programmeDetails);
    applicationsData?.applicant?.fileUpload && setDocumentFile([applicationsData?.applicant?.fileUpload])
  }, [applicationsData?.applicant?.programmeDetails]);

  // ApplicationDetails

  const handleSubmit = async (e) => {
    console.log("submittin the main form");
    e.preventDefault();
    // setIsLoading(true);
    const {
      fullName,
      email,
      phoneNumber,
      address1,
      address2,
      country,
      passportNo,
      //

      // applicantsId,
    } = formValues;
    const {
      applicationLevel,
      interestedProgramme,
      schoolName,
      qualificationType,
      selectUniversity,
      completionLetter,
      programmeLevel,
      healthForm,
      paymentReceipt,
      researchProposal,
      refreeForm,
      medium,
      scholorshipForm,
      otherDocuments,
      attestationLetter,
      releaseLetter,
      status,
    } = appDetailValues;
    console.log("Front Image", file, programmeLevel);
    let formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address1", address1);
    formData.append("address2", address2);
    formData.append("country", country);
    formData.append("passportNo", passportNo);
    formData.append("applicationLevel", applicationLevel);
    formData.append("interestedProgramme", interestedProgramme);
    formData.append("schoolName", schoolName);
    formData.append("qualificationType", qualificationType);
    formData.append("selectUniversity", selectUniversity);
    formData.append("completionLetter", completionLetter);
    formData.append("programmeLevel", programmeLevel);
    formData.append("Uname", localStorage.name);
    formData.append("role", localStorage.access);
    if (params.id) formData.append("id", params.id);

    formData.append("healthForm", healthForm);
    formData.append("paymentReceipt", paymentReceipt);
    formData.append("researchProposal", researchProposal);
    formData.append("refreeForm", refreeForm);
    formData.append("medium", medium);
    formData.append("scholorshipForm", scholorshipForm);
    formData.append("otherDocuments", otherDocuments);
    formData.append("attestationLetter", attestationLetter);
    formData.append("releaseLetter", releaseLetter);
    formData.append("status", status);
    formData.append("image", file && file[0] ? file[0] : "");
    formData.append(
      "fileUpload",
      documentFile && documentFile[0] ? documentFile[0] : {}
    );

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    const apiCall = await axios[params.action == 2 ? "put" : "post"](
      `${ENV.baseUrl}/applicants/${params.action == 2 ? "edit" : "createApplicant"
      }`,
      formData,
      config
    );

    setIsLoading(false);
    console.log("applicant created successfully ", apiCall);

    if (apiCall.data?.success) {
      let { message } = apiCall.data;
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 3000,
      });
    }
    navigate(-1);
  };
  const handleFullNameChange = (e) => {
    const { name, value } = e.target;
    // console.log(">>>>>>>>>>>>>>>>>>>>>>", value);
    if (value === "" && name === "id") {
      setAppDetailValue(secondInitialValues);
      return setFormValues(initialValues);
    }
    // if (value === "") return;
    // Anasite - Edits: showing applicant info.
    let newFormValues = { ...formValues, [name]: value };
    let newAppDetailValues = { ...appDetailValues };
    fetch(`${ENV.baseUrl}/lead/get/${value}`)
      .then((res) => res.json())
      .then((data) => {
        const { lead } = data;
        console.log("dataaa", data);
        Object.keys(newFormValues).forEach((key) => {
          newFormValues[key] =
            lead[key] !== undefined && lead[key] !== null ? lead[key] : "";
        });
        setFormValues({
          ...newFormValues,
          fullName: lead["name"],
          phoneNumber: lead["phoneNo"],
        });
        Object.keys(newAppDetailValues).forEach((key) => {
          console.log("newAppDetailValues KEY", key);
          newAppDetailValues[key] =
            (lead["programmeDetails"][key] !== undefined) &
              (lead["programmeDetails"][key] !== null)
              ? lead["programmeDetails"][key]
              : "";
          // ** See This   (applicant["programmeDetails"][key] !== undefined) &
          //     (applicant["programmeDetails"][key] !== null)
          //   ? applicant["programmeDetails"][key]
        });

        setAppDetailValue({ ...newAppDetailValues, leadID: lead["id"] });
      })
      .catch((err) => {
        //
      });
    // newFormValues = { ...newFormValues, [name]: value };
    // console.log("ooooooookkkkkkkkmmmmmmm", newFormValues);
    // setFormValues(newFormValues);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log("formValues ===>", formValues);
    setFormValues({ ...formValues, [name]: value });
    // console.log("appDetailValues ===>", appDetailValues);
    setAppDetailValue({ ...appDetailValues, [name]: value });
  };

  return (
    <>
      {isLoading && <FullPageLoader />}
      <div className="mt-12 w-full bg-[#E8E9EB] pr-8 font-display">
        <div className="my-10 grid grid-cols-1">
          <p className=" text-4xl font-semibold text-[#280559]">
            {/* Add New Application */}
            {params.action == 1
              ? "View Application"
              : params.action == 2
                ? "Edit Application"
                : "Create Application"}
          </p>
          <p className=" font text-base text-[#9898A3]">
            {/* Create or edit application */}
            {params.action == 1
              ? "View Application"
              : params.action == 2
                ? "Edit Application"
                : "Create Application"}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="rounded-[34px] bg-white p-[39px]">
            <p className="mb-8 text-2xl font-semibold text-[#333333]">
              Applicants Personal Info
            </p>
            <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Full Name
                </label>

                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Full Name"
                  name="id"
                  value={formValues?.id || formValues?.fullName}
                  disabled={isViewMode}
                  onChange={handleFullNameChange}
                  data-index={formValues?.index}
                >
                  <option value={formValues?.fullName || ""}>{formValues?.fullName || "Select Name"}</option>
                  {leads?.data?.faqs?.map((ele, ind) => (
                    <option
                      key={ele?.name + ind + ele?.id}
                      value={ele?.id}
                      data-index={ind}
                    >
                      {ele?.name}
                    </option>
                  ))}
                </select>
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
                  // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
                  name="phoneNumber"
                  value={formValues?.phoneNumber}
                  onChange={handleChange}
                  disabled={isViewMode}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Address (line 1)
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Address line 1"
                  required
                  name="address1"
                  value={formValues?.address1}
                  disabled={isViewMode}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Address (line 2)
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Address line 2"
                  required
                  name="address2"
                  disabled={isViewMode}
                  value={formValues?.address2}
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
                  value={formValues?.country || ""}
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
            </div>

            <div className=" flex flex-row gap-4">
              <p className="mr-[50px] text-base font-semibold text-[#333333]">
                Full Passport Pages
              </p>
              <div className="flex flex-col items-center justify-center ">
                <img
                  id="university-logo"
                  className="width:156px mb-3 rounded-2xl"
                  style={{ width: "200px" }}
                  src={
                    preview ||
                    (formValues?.image &&
                      `${ENV.imageUrl}${formValues?.image}`) ||
                    universityLogo
                  }
                  onError={(e) => {
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
                    name="file"
                  // disabled={isViewMode }
                  // style={{border:"2px solid red"}}
                  // types={fileTypes}
                  >
                    <button className="w-[200px]">
                      <p
                        className="rounded-2xl border-[1px] border-[#cbd2dc]/50 py-3 text-sm font-semibold text-[#333333] shadow-md"
                      // style={{ border: "none" }}
                      >
                        Upload
                      </p>
                    </button>
                  </FileUploader>
                )}
              </div>
            </div>
            <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Passport No
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="0123 456 789"
                  name="passportNo"
                  value={formValues?.passportNo}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>
              {isViewMode ? (
                ""
              ) : (
                <AddField
                  open={openNewApplicantAddModal}
                  close={() => setOpenNewApplicantAddModal(false)}
                  toAdd={NewApplicantNewFields}
                  setOpenAddModal={setOpenNewApplicantAddModal}
                  setToAdd={setNewApplicantNewFields}
                  formsData={formValues}
                  setFormsData={setFormValues}
                  handleFormsDataChange={handleAllFormsDataChange}
                  section={"Accounting-NewApplicant"}
                />
              )}
            </div>
          </div>
          <div className="my-[30px] rounded-[34px] bg-white p-[39px]">
            <p className="mb-8 text-2xl font-semibold text-[#333333]">
              Application Details
            </p>
            <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Application Level
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="applicationLevel"
                  value={appDetailValues?.applicationLevel || ""}
                  disabled={isViewMode}
                  onChange={handleChange}
                >
                  <option value={""}>Select Type</option>
                  <option value={"Diploma"}>Diploma</option>
                  <option value={"Undergraduate"}>Undergraduate</option>
                  <option value={"Master"}>Master</option>
                  <option value={"PhD"}>PhD</option>
                  <option value={"Postdoc"}>Postdoc</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Interested Programme
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="interestedProgramme"
                  value={appDetailValues?.interestedProgramme || ""}
                  disabled={isViewMode}
                  onChange={handleChange}
                >
                  <option value={""}>Select Programme</option>
                  {interestedPrograms?.data?.faqs.map((signleProgram) => {
                    return (
                      <option
                        value={signleProgram.ID}
                        key={
                          signleProgram.ID +
                          signleProgram.createdAt +
                          signleProgram.name +
                          "create Applicaon t"
                        }
                      >
                        {signleProgram.name}
                      </option>
                    );
                  })}
                  {/* <option>Master</option>
                  <option>Becholars</option>
                  <option>Intermediate</option>
                  <option>IGSCE</option>
                  <option>KCSE Diploma</option> */}
                </select>
              </div>
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
                  disabled={isViewMode}
                  value={appDetailValues?.schoolName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Type of qualification
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="qualificationType"
                  value={appDetailValues?.qualificationType || ""}
                  disabled={isViewMode}
                  onChange={handleChange}
                >
                  <option value={""}>Select Type</option>
                  {qualificationTypes?.data?.faqs.map((qType) => {
                    return (
                      <option
                        value={qType.ID}
                        key={
                          qType.ID +
                          qType.createdAt +
                          qType.name +
                          "add new app"
                        }
                      >
                        {qType.name}
                      </option>
                    );
                  })}
                  {/* <option>Somali Cert</option>
                  <option>IGCSE</option>
                  <option>KCSE</option>
                  <option>Thanawiya</option>
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
                  name="selectUniversity"
                  value={appDetailValues?.selectUniversity}
                  disabled={isViewMode}
                  onChange={handleChange}
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
                          "add new app"
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
                  Cert and Transcript / Completion Letter
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Cert and Transcript / Completion Letter"
                  required
                  name="completionLetter"
                  value={appDetailValues?.completionLetter || ""}
                  disabled={isViewMode}
                  onChange={handleChange}
                />
              </div>
              {/* <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Selected University
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="selectUniversity"
                  value={appDetailValues?.selectUniversity || ""}
                  disabled={isViewMode}
                  onChange={handleChange}
                >
                  <option value={""}>Select University</option>
                  <option>punjab University</option>
                  <option>virtual University</option>
                </select>
              </div> */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Programme Level
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="programmeLevel"
                  value={appDetailValues?.programmeLevel}
                  disabled={isViewMode}
                  onChange={handleChange}
                >
                  <option value={""}>Select Programme</option>
                  {programLevels?.data?.faqs.map((level) => {
                    return (
                      <option
                        value={level.ID}
                        key={
                          level.ID +
                          level.createdAt +
                          level.name +
                          "add new app"
                        }
                      >
                        {level.name}
                      </option>
                    );
                  })}
                  {/* <option>Master</option>
                  <option>Becholars</option>
                  <option>Intermediate</option>
                  <option>IGSCE</option>
                  <option>KCSE Diploma</option> */}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Health Declaration Form
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Health Declaration Form"
                  required
                  name="healthForm"
                  value={appDetailValues?.healthForm}
                  disabled={isViewMode}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Payment receipt
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Payment receipt"
                  required
                  name="paymentReceipt"
                  value={appDetailValues?.paymentReceipt}
                  disabled={isViewMode}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Research Proposal
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Research Proposal"
                  required
                  name="researchProposal"
                  value={appDetailValues?.researchProposal}
                  disabled={isViewMode}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Referee Form / Recommendation
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Referee Form / Recommendation"
                  required
                  name="refreeForm"
                  value={appDetailValues?.refreeForm}
                  disabled={isViewMode}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Medium of Instruction
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Medium of Instruction"
                  required
                  name="medium"
                  value={appDetailValues?.medium}
                  disabled={isViewMode}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Scholarship Form
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Scholarship Form"
                  required
                  name="scholorshipForm"
                  value={appDetailValues?.scholorshipForm}
                  disabled={isViewMode}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Other Documents
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Other Documents"
                  required
                  name="otherDocuments"
                  value={appDetailValues?.otherDocuments}
                  disabled={isViewMode}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Attestation Letter
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Attestation Letter"
                  required
                  name="attestationLetter"
                  value={appDetailValues?.attestationLetter}
                  disabled={isViewMode}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Release Letter
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Release Letter"
                  required
                  name="releaseLetter"
                  value={appDetailValues?.releaseLetter}
                  disabled={isViewMode}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Status
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="status"
                  value={appDetailValues?.status}
                  disabled={isViewMode}
                  onChange={handleChange}
                >
                  <option value={""}>Select Status</option>
                  {applicationModuleStatuss?.data?.faqs.map((status) => {
                    return (
                      <option
                        value={status.ID}
                        key={
                          status.ID +
                          "hey" +
                          status.Color +
                          status.name +
                          "choose in application module"
                        }
                      >
                        {status.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {isViewMode ? (
                ""
              ) : (
                <AddField
                  open={openSecondNewApplicantAddModal}
                  close={() => setOpenSecondNewApplicantAddModal(false)}
                  toAdd={SecondNewApplicantNewFields}
                  setOpenAddModal={setOpenSecondNewApplicantAddModal}
                  setToAdd={setSecondNewApplicantNewFields}
                  formsData={appDetailValues}
                  setFormsData={setAppDetailValue}
                  handleFormsDataChange={handleAllFormsDataChange}
                  section={"Accounting-SecondNewApplicant"}
                />
              )}
            </div>
          </div>
          {(
            <div className="my-[30px] rounded-[34px] bg-white p-[39px] ">
              <p className="mb-8 text-2xl font-semibold text-[#333333]">
                Upload Document
              </p>
              <div className="grid grid-cols-1 gap-[20px] xl:grid-cols-2">
                <FileUploader
                  fileOrFiles
                  multiple={true}
                  handleChange={handleDocumentFileChange}
                  name="documentFile"
                  types={fileTypes}
                  disabled={isViewMode}

                >
                  <img
                    className="h-full w-auto rounded-lg object-cover"
                    src={upload}
                    alt="..."
                  // src={
                  //   preview ||
                  //   (formValues?.image &&
                  //     `${ENV.imageUrl}${formValues?.image}`) ||
                  //   universityLogo
                  // }
                  />
                </FileUploader>

                <div className="w-full items-center">
                  <div className="">
                    <p className=" text-sm font-semibold text-[#92929D]">
                      Uploading - {documentFile.length}/3 files
                    </p>
                  </div>
                  <div className="my-5">
                    {documentFile.length > 0 ? (
                      documentFile.map((files) => (
                        <div
                          className="my-7 flex flex-row items-center justify-between rounded-lg p-3 outline outline-1 outline-[#11AF22]"
                          
                        >
                          <p className="text-xs text-black ">{files[0].name}</p>
                          <input type="button" value={'X'} style={{height: 15, fontSize: 13}}
                            onClick={(e) => {
                              e.preventDefault();
                              !isViewMode &&
                                setDocumentFile(prev => prev.filter((ele, i) => {
                                  if (i < prev.length-1) {
                                    return ele;
                                  }
                                }
                                ))
                            }}
                          />
                        </div>
                      ))
                    ) : (
                      <p>Not Document Uploaded.</p>
                    )}
                  </div>
                  {isViewMode ? (
                    ""
                  ) : (
                    <Button
                      className="rounded-[15px]  bg-[#280559]"
                      disabled={isViewMode}
                    >
                      <div className="flex flex-row items-center justify-center">
                        <img src={up} alt="..." />
                        <FileUploader
                          multiple={true}
                          handleChange={handleDocumentFileChange}
                          name="documentFile"
                          types={fileTypes}
                        >
                          <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                            Upload Document
                          </p>
                        </FileUploader>
                      </div>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
          {isViewMode ? (
            ""
          ) : (
            <>
              {/* <NavLink to="leads"> */}
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
            </>
          )}{" "}
          <Button
            onClick={() => {
              setFormValues(initialValues);
              setAppDetailValue(secondInitialValues);
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
          {/* </NavLink> */}
        </form>
      </div>
    </>
  );
}

export default AddNewApplication;
