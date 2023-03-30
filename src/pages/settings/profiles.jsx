import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react/components/Button";
import universityLogo from "../../../public/img/universityLogo.svg";
import saveIcon from "../../../public/img/saveIcon.svg";
import { FileUploader } from "react-drag-drop-files";
import {
  listUsers,
  listBranches,
  listLeadGroups,
  EditUsers,
  GetCurrentUser,
} from "@/redux/actions/actions";
import { useState, useEffect } from "react";
import AddField from "@/helpers/Addfield";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ENV } from "@/config";
import axios from "axios";

export function Profiles() {
  // let [personalDataNewFields, setPersonalDataNewFields] = useState([]);
  // const [openAddModal, setOpenAddModal] = useState(false);

  /*{ toAdd, setToAdd,  open,close,  setOpenAddModal,  formsData,  setFormsData,  handleFormsDataChange,  section,} */
  // const [openModal, setOpenModal] = useState(false);
  const [openProfileAddModal, setOpenProfileAddModal] = useState(false);
  const [ProfileNewFields, setProfileNewFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allFormsData, setAllFormsData] = useState({});
  const params = useParams();
  const [isViewMode, setIsViewMode] = useState(true);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [documentFile, setDocumentFile] = useState({});

  const allUsers = useSelector((state) => state?.universitiesReducer?.users);

  const viewUsers = useSelector(
    (state) => state?.universitiesReducer?.current_users?.data?.dataValues
  );

  const allLeadGroup = useSelector(
    (state) => state?.universitiesReducer?.leadGroups
  );

  React.useEffect(() => {
    dispatch(listBranches());
    dispatch(listUsers());
    dispatch(listLeadGroups());
    dispatch(
      GetCurrentUser({
        name: localStorage.name,
        role: localStorage.access,
        state: 0,
      })
    );
    // dis
  }, []);

  const handleAllFormsDataChange = (e) => {
    let { name, value } = e.target;
    setAllFormsData({ ...allFormsData, [name]: value });
  };

  const initialValues = {
    name: viewUsers && viewUsers.name,
    email: viewUsers && viewUsers.email,
    number: viewUsers && viewUsers.number,
    position: viewUsers && viewUsers.position,
    passportNo: "",
    password: "",
    id: viewUsers && viewUsers.id,
    image: viewUsers && viewUsers.image,
    //
  };
  const [formValues, setFormValues] = useState(initialValues);

  React.useEffect(() => {
    console.log("user", viewUsers);
    setFormValues({ ...viewUsers, password: "" });
  }, [viewUsers]);

  useEffect(() => {
    if (params.id) dispatch(viewApplication(params.id));
    if (params.action != 1) {
      setIsViewMode(true);
    } else {
      setIsViewMode(false);
    }
    if (!params.action) {
      setIsViewMode(false);
    }
  }, [params.id]);

  const handlefileChange = (file) => {
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

  // useEffect(() => {
  //   if (applicationsData?.applicant) setFormValues(applicationsData?.applicant);
  // }, [applicationsData.applicant]);

  // useEffect(() => {
  //   if (applicationsData?.applicant?.programmeDetails)
  //     setAppDetailValue(applicationsData?.applicant?.programmeDetails);
  // }, [applicationsData?.applicant?.programmeDetails]);

  // ApplicationDetails

  const handleSubmit = async (e) => {
    console.log("submittin the main form");
    e.preventDefault();
    // setIsLoading(true);
    const {
      name,
      email,
      phoneNumber,
      id,
      password,
      country,
      passportNo,
      image
      //
      // applicantsId,
    } = formValues;

    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if(phoneNumber) formData.append("phoneNumber", phoneNumber);
    if(password) formData.append("password", password);
    if(country) formData.append("country", country);
    if(passportNo) formData.append("passportNo", passportNo);
    if(file) formData.append("logo", file[0]);
    formData.append("id", id);
    formData.append("Uname", localStorage.name);
    formData.append("role", localStorage.access);
    formValues.Uname = localStorage.name;
    formValues.role = localStorage.access;

    const apiCall = await dispatch(EditUsers(formData));

    setIsLoading(false);
    console.log("applicant created successfully ", apiCall);

    if (apiCall.data?.success) {
      let { message } = apiCall.data;
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 3000,
      });
      localStorage.setItem("name", name);
    }
    navigate(-1);
  };

  // End

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log("formValues ===>", formValues);
    setFormValues({ ...formValues, [name]: value });
    // console.log("appDetailValues ===>", appDetailValues);
  };
  const fileTypes = ["JPEG", "PNG", "GIF"];

  return (
    <div className="w-full bg-[#E8E9EB] font-display">
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <p className=" text-4xl font-semibold text-[#280559]">Profile</p>
          <div className="hidden md:block">
            <NavLink to="">
              <Button className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6">
                <div className="flex items-center justify-center">
                  <img src={saveIcon} alt="..." />
                  <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                    Save Changes
                  </p>
                </div>
              </Button>
            </NavLink>
          </div>
        </div>
        <p className=" font text-base text-[#9898A3]">Manage Profile</p>
        <div className="ml-auto mt-6 block w-full md:hidden">
          <NavLink to="">
            <Button className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6">
              <div className="flex items-center justify-center">
                <img src={saveIcon} alt="..." />
                <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                  Save Changes
                </p>
              </div>
            </Button>
          </NavLink>
        </div>
      </div>
      <div className="rounded-[34px] bg-white p-[39px]">
        <p className="mb-8 text-2xl font-semibold text-[#333333]">
          Personal Details
        </p>
        <div className="flex flex-col gap-12 sm:flex-row sm:gap-20">
          <p className="mr-[70px] text-base font-semibold text-[#333333]">
            Photo
          </p>
          <div className="flex flex-col items-center justify-center">
            <img
              id="university-logo"
              className="width:156px mb-3 rounded-2xl"
              style={{ width: "156px" }}
              src={
                preview ||
                (formValues?.image && `${ENV.imageUrl}${formValues?.image}`) ||
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
        <form>
          <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#333333]">
                Full Name
              </label>

              <input
                list="browsers"
                className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                name="name"
                id="browser"
                placeholder="Full Name"
                value={formValues?.name}
                onChange={handleChange}
              />

              <datalist id="browsers">
                {allUsers &&
                  allUsers?.data?.faqs?.map((ele, ind) => (
                    <option key={ind} value={ele.name}>
                      {ele.name}
                    </option>
                  ))}
              </datalist>
            </div>
            {
              localStorage.access === "leads" &&
              <>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#333333]">
                    Passport No
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                    placeholder="0123 456 789"
                    name="passportNo"
                    onChange={handleChange}
                    value={formValues?.passportNo}
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#333333]">
                    Lead Group
                  </label>
                  <select
                    className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                    name="leadgroup"
                    value={formValues?.leadgroup}
                    onChange={handleChange}
                  >
                    {allLeadGroup &&
                      allLeadGroup?.data?.faqs.map((item, id) => (
                        <option key={id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#333333]">
                    Nationality/Country
                  </label>
                  <select
                    className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                    name="position"
                    onChange={handleChange}
                    value={formValues?.position}
                  // value={""}
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
                    <option value="Saint Kitts and Nevis">St. Kitts & Nevis</option>
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
              </>
            }
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#333333]">
                Phone Number
              </label>
              <input
                list="numbers"
                className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                name="number"
                id="number"
                onChange={handleChange}
                value={formValues?.number}
              />

              <datalist id="numbers">
                {allUsers &&
                  allUsers?.data?.faqs?.map((ele, ind) => (
                    <option key={ind}>{ele.number}</option>
                  ))}
              </datalist>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#333333]">
                Email Address
              </label>
              <input
                list="emails"
                className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                name="email"
                id="email"
                value={formValues?.email}
                onChange={handleChange}
              />

              <datalist id="emails">
                {allUsers &&
                  allUsers?.data?.faqs?.map((ele, ind) => (
                    <option key={ind} value={ele?.email}>
                      {ele.email}
                    </option>
                  ))}
              </datalist>
            </div>
            {/* {personalDataNewFields.map()} */}

            <AddField
              open={openProfileAddModal}
              close={() => setOpenProfileAddModal(false)}
              toAdd={ProfileNewFields}
              setOpenAddModal={setOpenProfileAddModal}
              setToAdd={setProfileNewFields}
              formsData={allFormsData}
              setFormsData={setAllFormsData}
              handleFormsDataChange={handleAllFormsDataChange}
              section={"Settings-Profile"}
            />
          </div>
        </form>
      </div>
      <div className="my-[30px] mr-8 rounded-[34px] bg-white p-[39px]">
        <p className="mb-8 text-2xl font-semibold text-[#333333]">Password</p>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}>
          <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#333333]">
                Current Password
              </label>
              <input
                type="password"
                className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                name="cur_password"
                value={formValues.cur_password}
                onChange={handleChange}
                placeholder="***********"
                disabled={isViewMode}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#333333]">
                New Password
              </label>
              <input
                type="password"
                className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                placeholder="***********"
                name="password"
                onChange={handleChange}
                value={formValues?.password}
                required
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
                required
              />
            </div>
          </div>
          <Button
            className="rounded-[15px] bg-[#280559]"
            type="submit"
            onClick={handleSubmit}
          >
            <div className="flex flex-row items-center justify-center">
              <img src={saveIcon} alt="..." />
              <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                Save Changes
              </p>
            </div>
          </Button>
        </form>

      </div>

      <NavLink to=""></NavLink>
    </div>
  );
}

export default Profiles;
