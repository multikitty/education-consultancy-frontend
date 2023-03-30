import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react/components/Button";
import plus from "../../../public/img/plus.svg";
import saveIcon from "../../../public/img/saveIcon.svg";
import PropData from "@/data/Prop-data";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  listProperties,
  // Anasite - Edits
  listProgramLevels,
  listProgramCategorys,
  listQualificationTypes,
  listUniversityTypes,
  listInterestedPrograms,
  listLeadGroups,
  // End
} from "@/redux/actions/actions";
import PropertyCard from "./PropertyCard";

export function Properties() {
  const [propsstate, setPropsstate] = useState(true);
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const propertiesData = useSelector(
    (state) => state?.universitiesReducer?.properties
  );
  // Anasite - Edits
  const programLevels = useSelector(
    (state) => state?.universitiesReducer?.programLevels
  );
  //
  const programCategorys = useSelector(
    (state) => state?.universitiesReducer?.programCategorys
  );
  //
  const qualificationTypes = useSelector(
    (state) => state?.universitiesReducer?.qualificationTypes
  );
  //
  const universityTypes = useSelector(
    (state) => state?.universitiesReducer?.universityTypes
  );
  //
  const leadGroup = useSelector(
    (state) => state?.universitiesReducer?.leadGroups
  );
  //
  const interestedPrograms = useSelector(
    (state) => state?.universitiesReducer?.interestedPrograms
  );
  //

  // End

  console.log("properties data in properties module 0==>", propertiesData);

  useEffect(() => {
    dispatch(listProperties("limit=5"));
    // Anasite - Edits
    dispatch(listProgramLevels("limit=5"));
    dispatch(listProgramCategorys("limit=5"));
    dispatch(listQualificationTypes("limit=5"));
    dispatch(listUniversityTypes("limit=5"));
    dispatch(listLeadGroups("limit=5"));
    dispatch(listInterestedPrograms("limit=5"));
    // End
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("formValues --->", formValues);
    setFormValues({ ...formValues, [name]: value, Uname: localStorage.name, role: localStorage.access });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit clicked");
  };
  return (
    <>
      <div
        className={` flex w-full flex-col gap-8 bg-[#E8E9EB] font-display ${
          propsstate ? "" : "hidden"
        }`}
      >
        <div className="mb-12">
          <div className="mb-10">
            <div className="flex items-center justify-between gap-4">
              <p className=" text-4xl font-semibold text-[#280559]">
                Property Management
              </p>
    {/* ** See This */}
             <div className="hidden md:block">
                <NavLink to="">
                  {/* <Button className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6">
                    <div className="flex flex-row items-center justify-center">
                      <img src={saveIcon} alt="..." />
                      <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                        Save Changes
                      </p>
                    </div>
                  </Button> */}
                </NavLink>
              </div>

            </div>
            <p className=" font text-base text-[#9898A3]">
              Property Management
            </p>
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
          </div>

          <PropertyCard
            title={"Program Level"}
            toView={programLevels}
            method={listProgramLevels}
            type={"programlevel"}
          />
          <PropertyCard
            title={"Program Category"}
            toView={programCategorys}
            method={listProgramCategorys}
            type={"programcategory"}
          />
          <PropertyCard
            title={"Qualification Type"}
            toView={qualificationTypes}
            method={listQualificationTypes}
            type={"qualificationtype"}
          />
          <PropertyCard
            title={"University Type"}
            toView={universityTypes}
            method={listUniversityTypes}
            type={"universitytype"}
          />
          <PropertyCard
            title={"Lead Group"}
            toView={leadGroup}
            type={"leadgroup"}
          />
          <PropertyCard
            title={"Interested Program"}
            toView={interestedPrograms}
            type={"interestedprogram"}
          />
        </div>
      </div>

      {/* ----------------------------------------- */}

      {/* <div
        className={`mb-10 flex w-full flex-col gap-8 bg-[#E8E9EB] font-display ${
          propsstate ? "hidden" : ""
        }`}
      >
        <div className="my-5">
          <p className=" mb-2 text-4xl font-semibold text-[#280559]">
            Create Status
          </p>
          <p className=" font text-base text-[#9898A3]">
            Create or edit Status
          </p>
        </div>
        <div className="rounded-[34px] bg-white p-[39px]">
          <p className="mb-8 text-2xl font-semibold text-[#333333]">
            Status Details
          </p>
          <form>
            <div className="mt-4 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Status Name
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Status Name"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <NavLink to="">
              <Button
                className="rounded-[15px]  bg-[#280559]"
                onClick={handleSubmit}
                type="submit"
              >
                <div className="flex flex-row items-center justify-center">
                  <img src={saveIcon} alt="..." />
                  <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                    Save Changes
                  </p>
                </div>
              </Button>
            </NavLink>
          </form>
        </div>
      </div> */}
    </>
  );
}

export default Properties;
