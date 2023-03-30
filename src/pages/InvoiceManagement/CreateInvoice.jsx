import React, { useState, useEffect, Fragment } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react/components/Button";
import saveIcon from "../../../public/img/saveIcon.svg";
import print from "../../../public/img/print.svg";
// import AddField from "./AddField";
import PreviewInvoice from "./PreviewInvoice";
import AddField from "@/helpers/Addfield";
import axios from "axios";
import { ENV } from "@/config";
import { toast } from "react-toastify";
import {
  listInvoiceModuleStatuss,
  listUniversities,
  listBranches,
  viewCommissionInvoice,
  viewGeneralInvoice,
} from "@/redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import FullPageLoader from "@/FullPageLoader/FullPageLoader";

export function CreateInvoice() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let {
    universities,
    invoiceModuleStatuss,
    branch,
    viewCommissionInvoice: singleCommissionInvoice,
    viewGeneralInvoice: singleGeneralInvoice,
  } = useSelector((state) => state?.universitiesReducer);
  // console.log("universities on invoice", universities);
  // console.log("invoiceModuleStatuss on invoice", invoiceModuleStatuss);
  // console.log("branch on invoice", branch);
  console.log(
    "invoice on view invoice",
    singleCommissionInvoice,
    ">>\n\n",
    singleGeneralInvoice
  );
  useEffect(() => {
    dispatch(listUniversities("limit=10000"));
    dispatch(listInvoiceModuleStatuss("limit=10000"));
    dispatch(listBranches("limit=10000"));
  }, []);
  const [isLoading, setLoading] = useState(false);
  const [allFormsData, setAllFormsData] = useState({});
  const [openInvoiceAddModal, setOpenInvoiceAddModal] = useState(false);
  const [openBillingAddModal, setOpenBillingAddModal] = useState(false);
  const [openInvoiceListAddModal, setOpenInvoiceListAddModal] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [invoiceMailingInfoNewFields, setInvoiceMailingInfoNewFields] =
    useState([]);
  const [billToAddField, setBillToAddField] = useState([]);
  const [invoiceItemAddField, setInvoiceItemAddField] = useState([]);
  const params = useParams();

  // console.log("localstorag: ", localStorage);
  const handleAllFormsDataChange = (e) => {
    let { name, value } = e.target;
    console.log("new Value", { [name]: value });
    setAllFormsData({ ...allFormsData, [name]: value });
  };
  const handleMailingInfoChange = (e) => {
    let { name, value } = e.target;
    setAllFormsData({
      ...allFormsData,
      mailing: { ...allFormsData?.mailing, [name]: value },
    });
  };
  const handleBillingInfoChange = (e) => {
    let { name, value } = e.target;
    setAllFormsData({
      ...allFormsData,
      billing: { ...allFormsData?.billing, [name]: value },
    });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      const toasOptions = {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 3000,
      };
      let type = params?.type || "";
      let action = params?.action || "";
      let id = params?.id || "";
      // console.log("all forms data:", allFormsData);
      e.preventDefault();

      console.log("all forms data >>>", allFormsData);
      let mailing = await axios[params.action == 2 ? "put" : "post"](
        `${ENV.baseUrl}/mailinginfo/${params.action == 2 ? "edit" : "create"}`,
        {
          mailing: {
            ...allFormsData?.mailing,
            Uname: localStorage.name,
            role: localStorage.access,
          },
          Uname: localStorage.name,
          role: localStorage.access,
        }
      );
      if (mailing?.data?.success === true) {
        toast.success(mailing?.data?.message, toasOptions);
        setAllFormsData({ ...allFormsData, mailing: {} });
      }
      // await axios.post(`${ENV.baseUrl}/mailinginfo/create`, {
      //   mailing: {
      //     ...allFormsData?.mailing,
      //     Uname: localStorage.name,
      //     role: localStorage.access,
      //   },
      // });
      // console.log("create mailing", mailing);

      let billing = await axios[params.action == 2 ? "put" : "post"](
        `${ENV.baseUrl}/billinginfo/${params.action == 2 ? "edit" : "create"}`,
        {
          billing: {
            ...allFormsData?.billing,
            Uname: localStorage.name,
            role: localStorage.access,
          },
          Uname: localStorage.name,
          role: localStorage.access,
        }
      );
      // console.log("create billing", billing);
      if (billing?.data?.success === true) {
        toast.success(billing?.data?.message, toasOptions);
        setAllFormsData({ ...allFormsData, billing: {} });
      }
      let invoice = await axios[params.action == 2 ? "put" : "post"](
        `${ENV.baseUrl}/${
          type === "general" ? "generalinvoice" : "commissioninvoice"
        }/${params.action == 2 ? "edit" : "create"}`,
        {
          ...allFormsData,
          type: type === "general" ? "general" : "commission",
          billingID: billing?.data?.data?.ID,
          mailingID: mailing?.data?.data?.ID,
          Uname: localStorage.name,
          role: localStorage.access,
        }
      );
      if (invoice?.data?.success === true) {
        toast.success(invoice?.data?.message, toasOptions);
        setAllFormsData({});
        setLoading(false);
        navigate(-1);
      }
      items?.map(async (invoiceItem, index) => {
        let item = await axios[params.action == 2 ? "put" : "post"](
          `${ENV.baseUrl}/${
            type === "general" ? "generalinvoiceitem" : "commissioninvoiceitem"
          }/${params.action == 2 ? "edit" : "create"}`,
          {
            item: {
              ...invoiceItem,
              invoiceID: invoice.data?.data?.ID,
              Uname: localStorage.name,
              role: localStorage.access,
            },
            Uname: localStorage.name,
            role: localStorage.access,
          }
        );
        if (item?.data?.success === true) {
          toast.success(item?.data?.message, toasOptions);
          // setAllFormsData({ ...allFormsData, item: {} });
          // if(index===items.length-1){
          // setLoading(false)
          // }
        }
      });
      //  await axios.post(
      //   `${ENV.baseUrl}/${
      //     type === "general" ? "generalinvoice" : "commissioninvoice"
      //   }/create`,
      //   {
      //     ...allFormsData,
      //     type: type === "general" ? "general" : "commission",
      //     billingID: billing?.data?.data?.ID,
      //     mailingID: mailing?.data?.data?.ID,
      //     Uname: localStorage.name,
      //     role: localStorage.access,
      //   }
      // );
      // console.log(
      // "create " + (type === "general" ? "general" : "commission") + " invoice",
      // invoice
      // );
    } catch (error) {
      console.log("Create Invoice: ", error);
    }
  };
  const initialSingleItem = { name: "", price: "", quantity: "", total: "" };
  const [items, setItems] = useState([{ ...initialSingleItem }]);
  const handleItemsChange = (index, event) => {
    const values = [...items];
    values[index][event.target.name.split("-")[0]] = event.target.value;

    if (event.target.name === "price" || event.target.name === "quantity") {
      values[index].total = values[index].price * values[index].quantity;
    }

    setItems(values);
  };

  const handleAddItem = () => {
    const values = [...items];
    values.push({
      name: "",
      price: "",
      quantity: "",
      total: "",
    });
    setItems(values);
  };

  // Edit/View
  const [isViewMode, setIsViewMode] = useState(true);

  useEffect(() => {
    console.log("paramssssss>>>>", params);
    if (params?.type === "general") {
      if (params.id) dispatch(viewGeneralInvoice(params.id));
      if (params.action == 1) {
        setIsViewMode(true);
      } else {
        setIsViewMode(false);
      }
      if (!params.action) {
        setIsViewMode(false);
      }
      return;
    }
    if (params.id) dispatch(viewCommissionInvoice(params.id));
    if (params.action == 1) {
      setIsViewMode(true);
    } else {
      setIsViewMode(false);
    }
    if (!params.action) {
      setIsViewMode(false);
    }
    return;
  }, [params.id]);

  useEffect(() => {
    if (!params.action || !params.id) return;
    if (singleGeneralInvoice?.generalInvoices)
      console.log("new values", {
        ...singleGeneralInvoice?.generalInvoices,
        mailing: singleGeneralInvoice?.MailingInfo,
        billing: singleGeneralInvoice?.BillingInfo,
      });
    setAllFormsData({
      ...singleGeneralInvoice?.generalInvoices,
      mailing: singleGeneralInvoice?.generalInvoices?.MailingInfo,
      billing: singleGeneralInvoice?.generalInvoices?.BillingInfo,
    });
    console.log("Single Commission >>@@>> ", singleGeneralInvoice);
    let invoiceItems = singleGeneralInvoice?.generalInvoices
      ?.GeneralInvoiceItems
      ? [...singleGeneralInvoice?.generalInvoices?.GeneralInvoiceItems]
      : [{ initialSingleItem }];
    setItems(invoiceItems);
  }, [singleGeneralInvoice?.generalInvoices]);
  useEffect(() => {
    if (!params.action || !params.id) return;
    if (singleCommissionInvoice?.commissionInvoice)
      console.log("new values", {
        ...singleCommissionInvoice?.commissionInvoice,
        mailing: singleCommissionInvoice?.commissionInvoice?.MailingInfo,
        billing: singleCommissionInvoice?.commissionInvoice?.BillingInfo,
      });
    setAllFormsData({
      ...singleCommissionInvoice?.commissionInvoice,
      mailing: singleCommissionInvoice?.commissionInvoice?.MailingInfo,
      billing: singleCommissionInvoice?.commissionInvoice?.BillingInfo,
    });
    console.log("Single Commission >>@@>> ", singleCommissionInvoice);
    let invoiceItems = singleCommissionInvoice?.commissionInvoice
      ?.CommissionInvoiceItems
      ? [...singleCommissionInvoice?.commissionInvoice?.CommissionInvoiceItems]
      : [{ initialSingleItem }];
    setItems(invoiceItems);
  }, [singleCommissionInvoice?.commissionInvoice]);
  return (
    <>
      {isLoading ? <FullPageLoader /> : ""}
      <div className="mt-12 w-full bg-[#E8E9EB] font-display">
        <div className="my-10">
          <div className="mr-8 flex items-center justify-between gap-4">
            <p className=" text-4xl font-semibold text-[#280559]">
              Create Invoice
            </p>
            <div className="hidden items-center justify-center gap-6 md:flex">
              <div>
                <Button
                  className="rounded-[15px]  bg-[#280559]"
                  onClick={() => setOpenPreviewModal(true)}
                >
                  <div className="flex items-center justify-center">
                    <img src={print} alt="..." />
                    <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                      Print / Preview
                    </p>
                  </div>
                </Button>
                <PreviewInvoice
                  open={openPreviewModal}
                  close={() => setOpenPreviewModal(false)}
                />
              </div>
              <NavLink to="commission">
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
          </div>
          <p className=" font text-base text-[#9898A3]">
            Create or edit invoice
          </p>
          <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-6 pr-8 md:hidden">
            <div>
              <Button
                className="mr-auto rounded-[15px] bg-[#280559]"
                onClick={() => setOpenPreviewModal(true)}
              >
                <div className="flex items-center justify-center">
                  <img src={print} alt="..." />
                  <p className="p-1 px-[11px] text-sm font-medium normal-case text-white">
                    Print / Preview
                  </p>
                </div>
              </Button>
              <PreviewInvoice
                open={openPreviewModal}
                close={() => setOpenPreviewModal(false)}
              />
            </div>
            <NavLink to="commission">
              <Button className="rounded-[15px]  bg-[#280559]">
                <div className="flex items-center justify-center">
                  <img src={saveIcon} alt="..." />
                  <p className="p-1 px-[11px] text-sm font-medium normal-case text-white">
                    Save Changes
                  </p>
                </div>
              </Button>
            </NavLink>
          </div>
        </div>
        <div className="mr-8 rounded-[34px] bg-white p-[39px]">
          <p className="mb-8 text-2xl font-semibold text-[#333333]">
            Invoice Mailing Info
          </p>

          <form>
            <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Address (line 1)
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Address line 1"
                  name={"addressOne"}
                  value={allFormsData?.mailing?.addressOne || ""}
                  onChange={handleMailingInfoChange}
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
                  name={"addressTwo"}
                  value={allFormsData?.mailing?.addressTwo || ""}
                  disabled={isViewMode}
                  onChange={handleMailingInfoChange}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Country
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="country"
                  value={allFormsData?.mailing?.country || ""}
                  disabled={isViewMode}
                  onChange={handleMailingInfoChange}
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
                  <option value="Malaysia">Malaysia</option>
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
                {/* <select
                className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                value={allFormsData?.mailing?.country || ""}
                onChange={handleMailingInfoChange}
              >
                <option value={""}>Select Country</option>
              </select> */}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="+91 0123 456 789"
                  name={"phone"}
                  value={allFormsData?.mailing?.phone || ""}
                  disabled={isViewMode}
                  onChange={handleMailingInfoChange}
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
                  name={"email"}
                  value={allFormsData?.mailing?.email || ""}
                  disabled={isViewMode}
                  onChange={handleMailingInfoChange}
                  required
                />
              </div>
              {isViewMode ? (
                ""
              ) : (
                <AddField
                  open={openInvoiceAddModal}
                  close={() => setOpenInvoiceAddModal(false)}
                  toAdd={invoiceMailingInfoNewFields}
                  setOpenAddModal={setOpenInvoiceAddModal}
                  setToAdd={setInvoiceMailingInfoNewFields}
                  formsData={allFormsData}
                  setFormsData={setAllFormsData}
                  handleFormsDataChange={handleAllFormsDataChange}
                  section={"Invoice Mailing"}
                />
              )}
            </div>
          </form>
        </div>
        <div className="my-[30px] mr-8 rounded-[34px] bg-white p-[39px]">
          <p className="mb-8 text-2xl font-semibold text-[#333333]">Bill To</p>

          <form>
            <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Address (line 1)
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Address line 1"
                  name={"addressOne"}
                  value={allFormsData?.billing?.addressOne || ""}
                  disabled={isViewMode}
                  onChange={handleBillingInfoChange}
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
                  name={"addressTwo"}
                  value={allFormsData?.billing?.addressTwo || ""}
                  disabled={isViewMode}
                  onChange={handleBillingInfoChange}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Country
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="country"
                  value={allFormsData?.billing?.country || ""}
                  disabled={isViewMode}
                  onChange={handleBillingInfoChange}
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
                  <option value="Malaysia">Malaysia</option>
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
                {/* <select
                className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                value={allFormsData?.mailing?.country || ""}
                onChange={handleMailingInfoChange}
              >
                <option value={""}>Select Country</option>
              </select> */}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="+91 0123 456 789"
                  name={"phone"}
                  value={allFormsData?.billing?.phone || ""}
                  disabled={isViewMode}
                  onChange={handleBillingInfoChange}
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
                  name={"email"}
                  value={allFormsData?.billing?.email || ""}
                  disabled={isViewMode}
                  onChange={handleBillingInfoChange}
                  required
                />
              </div>
              {/* <div>
              <label className="mb-2 block text-sm font-semibold text-[#333333]">
                Add Field
              </label>
              <button
                onClick={() => setOpenBillingAddModal(true)}
                type="button"
                className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
              >
                Click to add more field
              </button>
            </div> */}
              {isViewMode ? (
                ""
              ) : (
                <AddField
                  open={openBillingAddModal}
                  close={() => setOpenBillingAddModal(false)}
                  toAdd={billToAddField}
                  setToAdd={setBillToAddField}
                  setOpenAddModal={setOpenBillingAddModal}
                  formsData={allFormsData}
                  setFormsData={setAllFormsData}
                  handleFormsDataChange={handleAllFormsDataChange}
                  section={"Bill To Middle"}
                />
              )}
            </div>
          </form>
        </div>
        <div className="my-[30px] mr-8 rounded-[34px] bg-white p-[39px]">
          <p className="mb-8 text-2xl font-semibold text-[#333333]">
            Invoice Item List
          </p>

          <form>
            <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Recipient
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Item Name"
                  name={"recipient"}
                  value={allFormsData["recipient"] || ""}
                  disabled={isViewMode}
                  onChange={handleAllFormsDataChange}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Univeristy
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  // value={""}
                  name={"universityID"}
                  value={allFormsData?.universityID || ""}
                  disabled={isViewMode}
                  onChange={handleAllFormsDataChange}
                >
                  <option value={""}>Select University</option>
                  {universities?.data?.faqs.map((university) => {
                    return (
                      <option
                        key={
                          university?.id +
                          "any for a key" +
                          university?.createdAt +
                          university?.name +
                          university?.createdAt
                        }
                        value={university?.id}
                      >
                        {university?.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Branch
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  // value={""}
                  name={"branchID"}
                  value={allFormsData?.branchID || ""}
                  disabled={isViewMode}
                  onChange={handleAllFormsDataChange}
                >
                  <option value={""}>Select Branch</option>
                  {branch?.data?.faqs.map((singleBranch) => {
                    return (
                      <option
                        key={
                          singleBranch?.createdAt +
                          singleBranch?.id +
                          "any for a key" +
                          singleBranch?.name +
                          singleBranch?.createdAt
                        }
                        value={singleBranch?.id}
                      >
                        {singleBranch?.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Status
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  // value={""}
                  name={"statusID"}
                  value={allFormsData?.statusID || ""}
                  disabled={isViewMode}
                  onChange={handleAllFormsDataChange}
                >
                  <option value={""}>Select Status</option>
                  {invoiceModuleStatuss?.data?.faqs.map((status) => {
                    return (
                      <option
                        key={
                          status?.ID +
                          status?.createdAt +
                          "any for a status" +
                          status?.name +
                          status?.createdAt
                        }
                        value={status?.ID}
                      >
                        {status?.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-6 grid grid-cols-1 gap-6">
                {/* <div>
              <label className="mb-2 block text-sm font-semibold text-[#333333]">
                Add Field
              </label>
              <button
                onClick={() => setOpenInvoiceListAddModal(true)}
                type="button"
                className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
              >
                Click to add more field
              </button>
            </div> */}
                {isViewMode ? (
                  ""
                ) : (
                  <AddField
                    open={openInvoiceListAddModal}
                    close={() => setOpenInvoiceListAddModal(false)}
                    toAdd={invoiceItemAddField}
                    setToAdd={setInvoiceItemAddField}
                    setOpenAddModal={setOpenInvoiceListAddModal}
                    formsData={allFormsData}
                    setFormsData={setAllFormsData}
                    handleFormsDataChange={handleAllFormsDataChange}
                    section={"Invoice Item Last"}
                  />
                )}
              </div>
            </div>

            {items?.map((item, index) => (
              <Fragment key={index + "lloollS"}>
                <div className="my-[30px] mr-8 rounded-[34px] bg-white p-[39px]">
                  <p className="mb-8 text-2xl font-semibold text-[#333333]">
                    {item.name ? item.name : "Item " + (index + 1)}
                  </p>
                  <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#333333]">
                        Item Name
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Item Name"
                        name={`name-${index}`}
                        value={item.name || ""}
                        disabled={isViewMode}
                        onChange={(e) => handleItemsChange(index, e)}
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#333333]">
                        Item Price
                      </label>
                      <input
                        type="number"
                        className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Item Price"
                        name={`price-${index}`}
                        value={item.price || ""}
                        disabled={isViewMode}
                        onChange={(e) => handleItemsChange(index, e)}
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#333333]">
                        Item Quantity
                      </label>
                      <input
                        type="number"
                        className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Item Quantity"
                        name={`quantity-${index}`}
                        value={item.quantity || ""}
                        disabled={isViewMode}
                        onChange={(e) => handleItemsChange(index, e)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
            {isViewMode || params.action == 1 || params.action == 2 ? (
              ""
            ) : (
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Add Item
                </label>
                <button
                  onClick={() => handleAddItem()}
                  type="button"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
                >
                  Click to add more items
                </button>
              </div>
            )}
          </form>
        </div>
        {/* <NavLink to="commission"> */}
        {isViewMode ? (
          ""
        ) : (
          <Button
            className="rounded-[15px]  bg-[#280559]"
            onClick={handleSubmit}
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
            setAllFormsData({});
            setItems([{ ...initialSingleItem }]);
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
      </div>
    </>
  );
}

export default CreateInvoice;
