import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react/components/Button";
import universityLogo from "../../../public/img/universityLogo.svg";
import saveIcon from "../../../public/img/saveIcon.svg";
import { FileUploader } from "react-drag-drop-files";
// import {createUniversities} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
// import Loader from "@/loader";
import FullPageLoader from "@/FullPageLoader/FullPageLoader";
import { ENV } from "@/config";
import { useNavigate, useParams } from "react-router-dom";
// import { viewUniversity } from "@/redux/actions/actions";
import { viewUniversity, listUniversityTypes } from "@/redux/actions/actions";
import AddField from "@/helpers/Addfield";
import AddCampus from "@/helpers/AddCampus";

export function CreateUniversity() {
  /*{ toAdd, setToAdd,  open,close,  setOpenAddModal,  formsData,  setFormsData,  handleFormsDataChange,  section,} */
  // const [openModal, setOpenModal] = useState(false);
  // const [CreateUniversityState, setCreateUniversityState] = useState(true);
  const [openCreateUniversityAddModal, setOpenCreateUniversityAddModal] =
    useState(false);
  const [CreateUniversityNewFields, setCreateUniversityNewFields] = useState(
    []
  );

  const [
    openSecondCreateUniversityAddModal,
    setOpenSecondCreateUniversityAddModal,
  ] = useState(false);
  const [SecondCreateUniversityNewFields, setSecondCreateUniversityNewFields] =
    useState([]);

  const [list, setList] = useState([]);

  const [
    openThirdCreateUniversityAddModal,
    setOpenThirdCreateUniversityAddModal,
  ] = useState(false);
  const [ThirdCreateUniversityNewFields, setThirdCreateUniversityNewFields] =
    useState([]);

  const [
    openFourthCreateUniversityAddModal,
    setOpenFourthCreateUniversityAddModal,
  ] = useState(false);
  const [FourthCreateUniversityNewFields, setFourthCreateUniversityNewFields] =
    useState([]);

  const [
    openFifthCreateUniversityAddModal,
    setOpenFifthCreateUniversityAddModal,
  ] = useState(false);
  const [FifthCreateUniversityNewFields, setFifthCreateUniversityNewFields] =
    useState([]);

  const [
    openCampusCreateUniversityAddModal,
    setOpenCampusCreateUniversityAddModal,
  ] = useState(false);
  const [CampusCreateUniversityNewFields, setCampusCreateUniversityNewFields] =
    useState([]);
  /*
  const [allFormsData, setAllFormsData] = useState({});
  const handleAllFormsDataChange = (e) => {
    let { name, value } = e.target;
    setAllFormsData({ ...allFormsData, [name]: value });
  };
  */
  // End
  // End
  const fileTypes = ["JPEG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  // const [preview, setPreview] = useState("");
  const universitieData = useSelector(
    (state) => state?.universitiesReducer?.viewsUniversity
  );
  const universityTypes = useSelector(
    (state) => state?.universitiesReducer?.universityTypes
  );
  useEffect(() => {
    dispatch(listUniversityTypes("limit=100000"));
  }, []);

  useEffect(() => console.log("dsfdsf", universityTypes), [universityTypes]);
  //
  // console.log(
  //   "university data for view form in view Universities component",
  //   universitieData
  // );

  const initialValues = {
    name: "",
    type: "",
    counserllerName: "",
    phone: "",
    email: "",
    visaAppFee: "",
    addmissionFee: "",
    qetcFee: "",
    commisionDuration: "",
  };
  const campusInitialValues = {
    campus_name: "",
    campus_address1: "",
    campus_address2: "",
    campus_phone: "",
    campus_email: "",
  };
  const [formValues, setFormValues] = useState({
    ...initialValues,
    ...campusInitialValues,
  });

  const [campusValues, setCampusValues] = useState([
    {
      name: "",
      address1: "",
      address2: "",
      phone: "",
      email: "",
    }
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  // view product using redux
  useEffect(() => {
    if (params.id) dispatch(viewUniversity(params.id));
    if (params.action == 1) {
      setIsViewMode(true);
    } else {
      setIsViewMode(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (!params.action || !params.id) return;
    // console.log("params >>", params);
    if (universitieData?.university) setFormValues(universitieData?.university);
    if (universitieData?.university?.campuses?.length > 0)
      setCampusValues(universitieData?.university?.campuses);
  }, [universitieData.university, params?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log("formValues =======>", formValues);
    setFormValues({ ...formValues, [name]: value });
  };
  const handeCampusChange = (e) => {
    let { name, value } = e.target;
    let index = name.substr(-1);
    let key = name.substring(0, name.length - 1);
    let campusVal = campusValues;
    campusVal[index][key] = value;

    console.log("campusVal", key, index, campusVal);
    setCampusValues([...campusVal]);
  };

  const handlefileChange = (file) => {
    // console.log("file image", file);
    setFile(file);

    let reader = new FileReader();
    reader.onload = function () {
      let output = document.getElementById("university-logo");
      output.src = reader.result;
    };
    // if (event.target.files[0]) {
    //   reader.readAsDataURL(event.target.files[0]);
    // }
    if (file[0]) {
      reader.readAsDataURL(file[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log("handle submit", formValues);
    const {
      name,
      type,
      counserllerName,
      phone,
      email,
      visaAppFee,
      addmissionFee,
      qetcFee,
      commisionDuration,
    } = formValues;

    let formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("counserllerName", counserllerName);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("Uname", localStorage.name);
    formData.append("role", localStorage.access);
    // formData.append("Uname", localStorage.name);
    // formData.append("role", localStorage.access);
    if (params.id) formData.append("id", params.id);
    console.log("sdfsf", campusValues, JSON.stringify(campusValues));
    formData.append("campuses", JSON.stringify(campusValues));
    formData.append("visaAppFee", visaAppFee);
    formData.append("addmissionFee", addmissionFee);
    formData.append("qetcFee", qetcFee);
    formData.append("commisionDuration", commisionDuration);
    formData.append("logo", file && file[0] ? file[0] : "");

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    const apiCall = await axios[params.action == 2 ? "put" : "post"](
      `${ENV.baseUrl}/university/${params.action == 2 ? "edit" : "create"}`,
      formData,
      config
    );

    setIsLoading(false);
    if (apiCall.data?.success) {
      let { message } = apiCall.data;
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 3000,
        key: "_" + Math.random() * 1000000 + "_" + Math.random() * 1000000,
      });
      setFormValues(initialValues);
    }
    navigate(-1);
  };

  // console.log(formValues);

  return (
    <>
      {isLoading && <FullPageLoader />}
      <div className="mt-12 w-full bg-[#E8E9EB] font-display">
        {/* {console.log("campusValues", campusValues)} */}
        <div className="my-10">
          <div className="mr-8 flex items-center justify-between">
            <div className="my-10 grid grid-cols-1">
              <p className=" mb-2 text-4xl font-semibold text-[#280559]">
                {params.action == 1
                  ? "View University"
                  : params.action == 2
                    ? "Edit University"
                    : "Create University"}
              </p>
              <p className="font block text-base text-[#9898A3]">
                {/* Create or edit university */}
                {params.action == 1
                  ? "View University"
                  : params.action == 2
                    ? "Edit University"
                    : "Create University"}
              </p>
            </div>
            {/* <NavLink to="university"> */}
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
              <Button className="rounded-[15px]  bg-[#280559]">
                <div className="flex flex-row items-center justify-center">
                  <img src={saveIcon} alt="..." />
                  <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                    Save Changes
                  </p>
                </div>
              </Button>
            )}
            {/* <Button
              onClick={() => navigate(-1)}
              className="rounded-[15px]  bg-[#280559]"
            >
              <div className="flex flex-row items-center justify-center">
                <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                  Back
                </p>
              </div>
            </Button> */}
            {/* </NavLink> */}
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mr-8 rounded-[34px] bg-white p-[39px]">
          <p className="mb-8 text-2xl font-semibold text-[#333333]">
            University Details
          </p>
          <div className=" my-[30px] mr-8 flex flex-row gap-4 rounded-[34px] bg-white p-[39px]">
            <p className="mr-[70px] text-base font-semibold text-[#333333]">
              University Logo
            </p>
            <div className="flex flex-col items-center justify-center">
              <img
                id="university-logo"
                className="width:156px mb-3 rounded-2xl"
                style={{ width: "156px" }}
                src={
                  formValues?.logo
                    ? `${ENV.imageUrl}${formValues?.logo}`
                    : universityLogo
                }
                onError={(e) => {
                  // console.log("aowiefoafmn", e.target, "ojoij", this);
                  e.target.src = universityLogo;
                }}
                // src={
                //   preview ||
                //   (formValues?.logo && `${ENV.imageUrl}${formValues?.logo}`) ||
                //   universityLogo
                // }
                alt="..."
              />
              {/* Anasite - Edits: removeing the "upload file" */}
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
              {/* <FileUploader
                multiple={true}
                handleChange={handlefileChange}
                name="file"
                // types={fileTypes}
                // disabled={isViewMode}
              >
                <button className="w-[150px]">
                  <p className="rounded-2xl border-[1px] border-[#cbd2dc]/50 py-3 text-sm font-medium text-[#333333] shadow-md ">
                    Upload Logo
                  </p>
                </button>
              </FileUploader> */}
            </div>
          </div>
          {/* <div> */}
          {/* <form > */}
          <div className="my-[30px] mt-12 mb-6 mr-8 grid gap-6 rounded-[34px] bg-white p-[39px] md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#333333]">
                University Name
              </label>
              <input
                type="text"
                className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                placeholder="University Name"
                name="name" //
                value={formValues?.name}
                onChange={handleChange}
                disabled={isViewMode}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#333333]">
                University Type
              </label>
              <select
                className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                name="type" //
                value={formValues?.type}
                onChange={handleChange}
                disabled={isViewMode}
              // required
              >
                <option value={""}>Select Type</option>
                {universityTypes?.data?.faqs.map((type) => {
                  // console.log(type);
                  return (
                    <option
                      value={type.ID}
                      key={type.ID + type.name + "from create uni"}
                    >
                      {type.name}
                    </option>
                  );
                })}
                {/* <option value={"public"}>Public</option>
                <option value={"private"}>Private</option> */}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#333333]">
                Counsellor
              </label>
              <input
                type="text"
                className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                placeholder="Counsellor Name"
                // onKeyDown={(e) => ENV.integerNumberValidator(e)}
                name="counserllerName" //
                value={formValues?.counserllerName}
                onChange={handleChange}
                disabled={isViewMode}
                required
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
                name="phone" //
                value={formValues?.phone}
                onChange={handleChange}
                disabled={isViewMode}
                required
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
                name="email" //
                value={formValues?.email}
                onChange={handleChange}
                disabled={isViewMode}
                required
              />
            </div>
            {isViewMode ? (
              ""
            ) : (
              <AddField
                open={openCreateUniversityAddModal}
                close={() => setOpenCreateUniversityAddModal(false)}
                toAdd={CreateUniversityNewFields}
                setOpenAddModal={setOpenCreateUniversityAddModal}
                setToAdd={setCreateUniversityNewFields}
                formsData={formValues}
                setFormsData={setFormValues}
                handleFormsDataChange={handleChange}
                section={"university-CreateUniversity"}
              />
            )}
            {/* <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Add Field
                </label>
                <button
                  type="button"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
                >
                  Click to add more field
                </button>
              </div> */}
          </div>
          {/* </form> */}
          {/* </div> */}
          {
            campusValues &&
            campusValues.map((ele, id) => (
              <div>
                <div className="my-[30px] mr-8 rounded-[34px] bg-white p-[39px]">
                  <p className="mb-8 text-2xl font-semibold text-[#333333]">
                    {
                      id === 0 ? "Main Campus" : `Campus ${id}`
                    }
                  </p>
                  {/* <form onSubmit={handleSubmit}> */}
                  <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#333333]">
                        Campus Name
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Campus Name"
                        name={`name${id}`} //
                        value={ele?.name}
                        onChange={handeCampusChange}
                        disabled={isViewMode}
                        required
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
                        name={`address1${id}`} //
                        value={ele.address1}
                        onChange={handeCampusChange}
                        disabled={isViewMode}
                        required
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
                        name={`address2${id}`}  //
                        value={ele.address2}
                        onChange={handeCampusChange}
                        disabled={isViewMode}
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#333333]">
                        Campus Phone Number
                      </label>
                      <input
                        type="tel"
                        className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                        placeholder="+60123456789"
                        // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        name={`phone${id}`}  //
                        value={ele.phone}
                        onChange={handeCampusChange}
                        disabled={isViewMode}
                        required
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
                        name={`email${id}`} //
                        value={ele.email}
                        onChange={handeCampusChange}
                        disabled={isViewMode}
                        required
                      />
                    </div>
                    {isViewMode ? (
                      ""
                    ) : (
                      <AddField
                        open={openSecondCreateUniversityAddModal}
                        close={() => setOpenSecondCreateUniversityAddModal(false)}
                        toAdd={SecondCreateUniversityNewFields}
                        setOpenAddModal={setOpenSecondCreateUniversityAddModal}
                        setToAdd={setSecondCreateUniversityNewFields}
                        formsData={formValues}
                        setFormsData={setFormValues}
                        handleFormsDataChange={handleChange}
                        section={"university-SecondCreateUniversity"}
                      />
                    )}


                  </div>
                </div>
              </div>
            ))
          }
          {
            (campusValues.length > 1 && !isViewMode ) &&
            <div>
              <span
                className="border-slate-300 m-[10px] ml-[39px] w-[150px] cursor-pointer rounded-2xl border border-solid p-[10px]"
                onClick={() => {
                  campusValues.length > 1 &&
                    setCampusValues(
                      campusValues.filter((ite, id) => (id < campusValues.length - 1))
                    );
                }}
              >
                Remove
              </span>
            </div>
          }

          {isViewMode ? (
            ""
          ) : (
            <div className="my-[30px] mr-8 rounded-[34px] bg-white p-[39px]">
              {/* <AddCampus
                open={openFourthCreateUniversityAddModal}
                close={() => setOpenFourthCreateUniversityAddModal(false)}
                toAdd={FourthCreateUniversityNewFields}
                setOpenAddModal={setOpenFourthCreateUniversityAddModal}
                setToAdd={setFourthCreateUniversityNewFields}
                formsData={formValues}
                setFormsData={setFormValues}
                handleFormsDataChange={handleChange}
                section={"university-FourthCreateUniversity"}
              /> */}
              <div
                className="border-slate-300 w-full cursor-pointer  rounded-2xl border border-solid p-[10px] text-center font-display"
                toAdd={FourthCreateUniversityNewFields}
                setOpenAddModal={setOpenFourthCreateUniversityAddModal}
                setToAdd={setFourthCreateUniversityNewFields}
                formsData={formValues}
                setFormsData={setFormValues}
                handleFormsDataChange={handleChange}
                section={"university-FourthCreateUniversity"}
                onClick={() => {
                  setCampusValues([...campusValues, {
                    name: "",
                    address1: "",
                    address2: "",
                    phone: "",
                    email: "",
                  },])
                }}
              >
                click to add more field
              </div>
            </div>
          )}
          {/* <div className="my-[30px] mr-8 rounded-[34px] bg-white p-[39px]">
              <p className="mb-8 text-2xl font-semibold text-[#333333]">
                Add Campus
              </p>
              <button
                type="button"
                className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
              >
                Click to add more campus
              </button>
            </div> */}
          <div className="my-[30px] mr-8 rounded-[34px] bg-white p-[39px]">
            <p className="mb-8 text-2xl font-semibold text-[#333333]">
              Fees and Commissions
            </p>
            <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Visa Application Fee
                </label>
                <div className="relative">
                  <span className="absolute left-0 top-0 flex h-full items-center rounded-xl bg-[#E5E8ED] p-3 text-base font-medium uppercase text-[#333]">
                    usd:
                  </span>
                  <input
                    type="text"
                    className="block h-full w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 pl-16 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                    placeholder="0.00"
                    name="visaAppFee" //
                    value={formValues?.visaAppFee}
                    onChange={handleChange}
                    disabled={isViewMode}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Admission Fee
                </label>
                <div className="relative">
                  <span className="absolute left-0 top-0 flex h-full items-center rounded-xl bg-[#E5E8ED] p-3 text-base font-medium uppercase text-[#333]">
                    usd:
                  </span>
                  <input
                    type="text"
                    className="block h-full w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 pl-16 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                    placeholder="0.00"
                    name="addmissionFee" //
                    value={formValues?.addmissionFee}
                    onChange={handleChange}
                    disabled={isViewMode}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  QETC Service Charges
                </label>
                <div className="relative">
                  <span className="absolute left-0 top-0 flex h-full items-center rounded-xl bg-[#E5E8ED] p-3 text-base font-medium uppercase text-[#333]">
                    usd:
                  </span>
                  <input
                    type="text"
                    className="block h-full w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 pl-16 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                    placeholder="0.00"
                    name="qetcFee" //
                    value={formValues?.qetcFee}
                    onChange={handleChange}
                    disabled={isViewMode}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Commission Duration
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="commisionDuration" //
                  value={formValues?.commisionDuration}
                  onChange={handleChange}
                  disabled={isViewMode}
                >
                  <option>Select Duration</option>
                  <option value={"_30days"}>30 Days</option>
                  <option value={"_45days"}>45 Days</option>
                  <option value={"_60days"}>60 Days</option>
                </select>
              </div>
              {isViewMode ? (
                ""
              ) : (
                <AddField
                  open={openFifthCreateUniversityAddModal}
                  close={() => setOpenFifthCreateUniversityAddModal(false)}
                  toAdd={FifthCreateUniversityNewFields}
                  setOpenAddModal={setOpenFifthCreateUniversityAddModal}
                  setToAdd={setFifthCreateUniversityNewFields}
                  formsData={formValues}
                  setFormsData={setFormValues}
                  handleFormsDataChange={handleChange}
                  section={"university-FifthCreateUniversity"}
                />
              )}
              {/* <div>
                  <label className="mb-2 block text-sm font-semibold text-[#333333]">
                    Add More Field
                  </label>
                  <button
                    type="button"
                    className="w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
                  >
                    Click to add more field
                  </button>
                </div> */}
            </div>
          </div>
          {/* <NavLink to="university"> */}
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
              setFormValues(initialValues);
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
        </div>
      </form>
      {/* </NavLink> */}
    </>
  );
}

export default CreateUniversity;
