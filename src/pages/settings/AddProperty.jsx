import React from "react";
import { useState } from "react";
import { Button } from "@material-tailwind/react/components/Button";
import plus from "../../../public/img/plus.svg";
import saveIcon from "../../../public/img/saveIcon.svg";
import StatusData from "@/data/status-props";

import { useNavigate, NavLink } from "react-router-dom";

import axios from "axios";
import { ENV } from "../../config";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { SketchPicker } from "react-color";
import { useEffect } from "react";

export function AddProperty() {
  const params = useParams();
  const navigate = useNavigate();
  // Anasite - Edits:

  const [currentProperty, setCurrentProperty] = useState("");
  const [isStatus, setIsStatus] = useState(false);
  useEffect(() => {
    switch (params.id) {
      case "applicationmodulestatus":
        setCurrentProperty("Application Module Status ");
        setIsStatus(true);
        break;
      case "leadsmanagmentmodulestatus":
        setCurrentProperty("Leads Managment Status ");
        setIsStatus(true);
        break;
      case "invoicemodulestatus":
        setCurrentProperty("Invoice Module Status ");
        setIsStatus(true);
        break;
      case "programlevel":
        setCurrentProperty("Program Level ");
        setIsStatus(false);
        break;
      case "programcategory":
        setCurrentProperty("Program Category ");
        setIsStatus(false);
        break;
      case "qualificationtype":
        setCurrentProperty("Qualification Type ");
        setIsStatus(false);
        break;
      case "universitytype":
        setCurrentProperty("University Type ");
        setIsStatus(false);
        break;
      case "leadgroup":
        setCurrentProperty("Lead Group ");
        setIsStatus(false);
        break;
      case "interestedprogram":
        setCurrentProperty("Interested Program ");
        setIsStatus(false);
        break;

      default:
        setCurrentProperty(params.id);
        setIsStatus(false);
        break;
    }
  }, [params.id]);
  // END
  const [statusstate, setStatusstate] = useState(false);
  const [property, setProperty] = useState("");
  const [type, setType] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const [color, setColor] = useState("#000000");

  // const params = useParams();
  // const navigate = useNavigate()
  // var browserHistory = ReactRouter.browserHistory;

  const handleSubmit = async (e) => {
    console.log("submit", e);
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", property);
    formData.append("Color", color);
    formData.append("Uname", localStorage.name);
    formData.append("role", localStorage.access);
    // formData.append("username", "John");
    // formData.append("email", "john@example.com");
    // formData.append("Color", "#000");

    // formData.append("type", params.id);
    // console.log("Please, HELP ME", formData.entries());
    for (const pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const url0 = params.id.split("_")
    const url = `${url0[0]}${url0[1]}`
    const apiCall = await axios[params.action == 2 ? "put" : "post"](
      `${ENV.baseUrl}/${params.id}/${params.action == 2 ? "edit" : "create"}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    setIsLoading(false);
    if (apiCall.data?.success) {
      let { message } = apiCall.data;
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 3000,
      });
      // setIsLoading(true);
      const module = params.title.split(" ")
      const isStatus = module[1]
      if (isStatus == 'Module') {
        navigate("/dashboard/settingsManagement/3")
      } else {
        navigate("/dashboard/settingsManagement/4")
      }
      // browserHistory.goBack
    }

    navigate(-1);

  };

  return (
    <>
      <form>
        <div
          className={`mb-10 flex w-full flex-col gap-8 bg-[#E8E9EB] font-display ${statusstate ? "hidden" : ""
            }`}
        >
          <div className="my-5">
            <p className=" mb-2 text-4xl font-semibold text-[#280559]">


         {/*     Create {params.title}
            </p>
            <p className=" font text-base text-[#9898A3]">
              Create or edit {params.title}
              /*}

              Create {currentProperty}
            </p>
            <p className=" font text-base text-[#9898A3]">
              Create or edit {currentProperty}

            </p>
          </div>
          <div className="rounded-[34px] bg-white p-[39px]">
            <p className="mb-8 text-2xl font-semibold text-[#333333]">

             {/* {params.title} Details */}

              {currentProperty} Details

            </p>

            <div className="mt-4 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">

               {/*   {params.title} Name */}

                  {currentProperty} Name

                </label>
                <input
                  onChange={(e) => setProperty(e.target.value)}
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"

                // {/*  placeholder={params.title + " Name"} */}

                  placeholder={currentProperty + " Name"}

                  required
                />
              </div>
            </div>
            {isStatus ? (
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  {currentProperty} Color
                </label>
                <SketchPicker
                  color={color}
                  disableAlpha={true}
                  onChange={(c) => setColor(c.hex)}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <NavLink>
            <Button
              className="rounded-[15px]  bg-[#280559]"
              type="submit"
              onClick={handleSubmit}
            >
              <div className="flex flex-row items-center justify-center">
                <img src={saveIcon} alt="..." />
                <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                  Save Changes
                </p>
              </div>
            </Button>{" "}
            <Button
              className="rounded-[15px]  bg-[#280559]"
              type="submit"
              onClick={() => {
                navigate(-1);
              }}
            >
              <div className="flex flex-row items-center justify-center">
                <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                  Back
                </p>
              </div>
            </Button>
          </NavLink>
        </div>
      </form>
    </>
  );
}

export default AddProperty;
