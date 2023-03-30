import React from "react";
import { useState } from "react";
import { Button } from "@material-tailwind/react/components/Button";
import plus from "../../../public/img/plus.svg";
import saveIcon from "../../../public/img/saveIcon.svg";
import StatusData from "@/data/status-props";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { ENV } from "../../config";
import { toast } from "react-toastify";
import AddProperty from "./AddProperty";
import PropertyCard from "./PropertyCard";
import {
  listApplicationModuleStatuss,
  listLeadsManagmentModuleStatuss,
  listInvoiceModuleStatuss,
} from "@/redux/actions/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function StatusManagement() {
  // Anasite - Edits
  const dispatch = useDispatch();

  const {
    invoiceModuleStatuss,
    leadsManagmentModuleStatuss,
    applicationModuleStatuss,
  } = useSelector((state) =>
    state?.universitiesReducer ? state.universitiesReducer : {}
  );
  //

  useEffect(() => {
    dispatch(listApplicationModuleStatuss("limit=5"));
    dispatch(listLeadsManagmentModuleStatuss("limit=5"));
    dispatch(listInvoiceModuleStatuss("limit=5"));
  }, []);
  // END
  const [statusstate, setStatusstate] = useState(true);
  const [property, setProperty] = useState("");
  const [type, setType] = useState(0);
  const [loading, setIsLoading] = useState(false);

  return (
    <>
      <div
        className={` flex w-full flex-col gap-8 bg-[#E8E9EB] font-display ${
          statusstate ? "" : "hidden"
        }`}
      >
        <div className="mb-12">
          <div className="mb-10">
            <div className="flex items-center justify-between">
              <p className=" text-4xl font-semibold text-[#280559]">
                Status Management
              </p>

              {/* ** see This */}
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
            {/* <p className=" font text-base text-[#9898A3]">Status Management</p>
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
            </div> */}
          </div>
          <PropertyCard
            title={"Application Module"}
            toView={applicationModuleStatuss}
            method={listApplicationModuleStatuss}
            type={"applicationmodulestatus"}
          />

          <PropertyCard
            title={"Leads Managment Module"}
            toView={leadsManagmentModuleStatuss}
            method={listLeadsManagmentModuleStatuss}
            type={"leadsmanagmentmodulestatus"}
          />

          {/* Inovoice Module */}
          <PropertyCard
            title={"Invoice Module"}
            toView={invoiceModuleStatuss}
            method={listInvoiceModuleStatuss}
            type={"invoicemodulestatus"}
          />
        </div>
      </div>
    </>
  );
}

export default StatusManagement;
