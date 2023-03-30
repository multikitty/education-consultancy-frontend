import React, { useEffect, useState } from "react";
import { Checkbox } from "@material-tailwind/react/components/Checkbox";
import filterIcon from "../../../public/img/filterIcon.svg";
import print from "../../../public/img/print.svg";
import Sales_recording_data from "@/data/Sales-recording-data";
// Anasite - Edits
import { useParams } from "react-router-dom";
import { listDepitAndCredits } from "@/redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { ENV } from "@/config";
import axios from "axios";
import { toast } from "react-toastify";
//

export function Debit() {
  // Anasite - Edits
  const dispatch = useDispatch();
  const params = useParams();

  const { depitAndCredits } = useSelector(
    (state) => state?.universitiesReducer
  );
  console.log("depitAndCredits from accounting ====>", depitAndCredits);
  useEffect(() => {
    dispatch(listDepitAndCredits());
  }, []);
  const [totalDepit, setTotalDepit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  let depit = 0,
    credit = 0;
  // const handleSubmit = async () => {
  //   setDepitAndCreditsState(true);
  //   // console.log("handle submit", formValues);
  //   const { name, description, amount, date } = allFormsData;
  //   let formData = new FormData();
  //   formData.append("name", name);
  //   formData.append("amount", amount);
  //   formData.append("description", description);
  //   formData.append("date", date);

  //   if (params.id) formData.append("id", params.id);

  //   const config = {
  //     headers: { "content-type": "multipart/form-data" },
  //   };

  //   const apiCall = await axios[params.action == 2 ? "put" : "post"](
  //     `${ENV.baseUrl}/sales/${params.action == 2 ? "edit" : "create"}`,
  //     formData,
  //     config
  //   );
  //   dispatch(listSales());

  //   // setIsLoading(false);

  //   if (apiCall.data?.success) {
  //     let { message } = apiCall.data;
  //     toast.success(message, {
  //       position: toast.POSITION.TOP_RIGHT,
  //       hideProgressBar: false,
  //       autoClose: 3000,
  //       // key: "_" + Math.random() * 1000000 + "_" + Math.random() * 1000000,
  //     });
  //   }
  //   // navigate("university")
  // };
  // END
  // const [depitAndCreditsState, setDepitAndCreditsState] = useState(true);
  // const [openDepitAndCreditsAddModal, setOpenDepitAndCreditsAddModal] =
  //   useState(false);
  // const [DepitAndCreditsNewFields, setDepitAndCreditsNewFields] = useState([]);
  // const [allFormsData, setAllFormsData] = useState({});
  // const handleAllFormsDataChange = (e) => {
  //   let { name, value } = e.target;
  //   setAllFormsData({ ...allFormsData, [name]: value });
  // };

  return (
    <div className="mt-[30px] flex w-full flex-col gap-8 bg-[#E8E9EB] font-display">
      <div>
        <div className=" rounded-[34px] bg-white p-6 md:p-12">
          <p className="text-2xl font-bold text-black sm:text-3xl">
            Debit & Credit
          </p>
          <div className="mb-3 mt-12 grid grid-cols-1 gap-3 rounded-[20px] bg-[#F8F9FB] p-5 2xl:grid-cols-2">
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
                <p className="mx-3 ">Print</p>
              </button>
            </div>
          </div>
          <div className="flex flex-col overflow-x-auto">
            <table className="relative w-full border-none">
              {/* <span className="absolute bottom-0 w-full h-[1px] bg-[#D9D9D9]"/> */}
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
                  />

                  <th
                    scope="col"
                    className="w-[113px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    Debit
                  </th>
                  <th
                    scope="col"
                    className="w-[113px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    Credit
                  </th>
                </tr>
              </thead>
              <tbody className="border-none">
                {depitAndCredits?.data?.faqs.map(
                  ({ ID, date, name, description, amount, type }) => {
                    if (type === 0) {
                      // setTotalDepit(totalDepit + amount);
                      credit += +amount;
                    } else {
                      depit += +amount;
                      // setTotalCredit(0);
                    }

                    return (
                      <tr key={name + ID + "lkj-om998-" + description}>
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
                        <td className="px-6 py-4 text-lg" />
                        <td className="whitespace-nowrap px-6 py-4 text-lg font-semibold text-[#333]">
                          <span style={{ color: "#333" }}>
                            {type === 0 ? "" : "$" + amount}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-lg font-semibold text-[#333]">
                          <span style={{ color: "#449E3C" }}>
                            {type === 0 ? "$" + amount : ""}
                          </span>
                        </td>
                      </tr>
                    );
                  }
                )}
                <tr>
                  <td className="py-2">&nbsp;</td>
                  <td className="py-2">&nbsp;</td>
                  <td className="py-2">&nbsp;</td>
                  <td className="py-2">&nbsp;</td>
                  <td className="py-2">&nbsp;</td>
                  <td className="py-2">&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[20px] py-4 px-6 font-bold text-[#333] md:flex-row md:gap-0">
            <p className="text-[22px] capitalize">total cost</p>
            <div className="flex items-center justify-center gap-10 text-2xl md:ml-auto md:justify-start">
              <p>${depit}</p>
              <p>${credit}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Debit;
