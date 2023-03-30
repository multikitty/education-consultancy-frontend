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
import { useEffect } from "react";
import Paginate from "@/paginate";
import { useDispatch } from "react-redux";
import {
  EditProgramLevels,
  EditProgramCategorys,
  EditQualificationTypes,
  EditInterestedPrograms,
  EditApplicationmodulestatus,
  EditLeadsmanagmentmodulestatus,
  EditInvoicemodulestatus,
  EditLeadGroups,
  EditUniversityTypes,
  DeleteProgramLevels,
  DeleteProgramCategorys,
  DeleteQualificationTypes,
  DeleteInterestedPrograms,
  DeleteLeadGroups,
  DeleteUniversityTypes,
  DeleteApplicationmodulestatus,
  DeleteLeadsmanagmentmodulestatus,
  DeleteInvoicemodulestatus
} from '../../redux/actions/actions';

export function PropertyCard({ title, type = 0, toView, method }) {
  const dispatch = useDispatch();
  const [statusstate, setStatusstate] = useState(true);
  const [property, setProperty] = useState([]);
  //   const [type, setType] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const [action, setAction] = useState({});

  useEffect(() => {
    setProperty(toView?.data?.faqs);
  }, [toView, toView?.data?.faqs]);

  useEffect(() => {
    console.log(property);
    property && setAction(property.map(i => ({state: false, name: i.name})));
  }, [property]);

  useEffect(() => {
    console.log(action);
  }, [action]);

  // const handleEdit = (e) => {
  //   setAction();
  // }


  const handleEdit = (e) => {
    switch (type) {
      case "applicationmodulestatus":
        dispatch(EditApplicationmodulestatus(e));
        break;
      case "leadsmanagmentmodulestatus":
        dispatch(EditLeadsmanagmentmodulestatus(e));
        break;
      case "invoicemodulestatus":
        dispatch(EditInvoicemodulestatus(e));
        break;
      case "programlevel":
        dispatch(EditProgramLevels(e));
        break;
      case "programcategory":
        dispatch(EditProgramCategorys(e));
        break;
      case "qualificationtype":
        dispatch(EditQualificationTypes(e));
        break;
      case "universitytype":
        dispatch(EditUniversityTypes(e));
        break;
      case "leadgroup":
        dispatch(EditLeadGroups(e));
        break;
      case "interestedprogram":
        dispatch(EditInterestedPrograms(e));
        break;

      default:
        break;
    }
  }

  const handleDelete = (e) => {
    switch (type) {
      case "applicationmodulestatus":
        dispatch(DeleteApplicationmodulestatus(e));
        break;
      case "leadsmanagmentmodulestatus":
        dispatch(DeleteLeadsmanagmentmodulestatus(e));
        break;
      case "invoicemodulestatus":
        dispatch(DeleteInvoicemodulestatus(e));
        break;
      case "programlevel":
        dispatch(DeleteProgramLevels(e));
        break;
      case "programcategory":
        dispatch(DeleteProgramCategorys(e));
        break;
      case "qualificationtype":
        dispatch(DeleteQualificationTypes(e));
        break;
      case "universitytype":
        dispatch(DeleteUniversityTypes(e));
        break;
      case "leadgroup":
        dispatch(DeleteLeadGroups(e));
        break;
      case "interestedprogram":
        dispatch(DeleteInterestedPrograms(e));
        break;

      default:
        break;
    }
  }
  //
  const [currentProperty, setCurrentProperty] = useState("");
  const [isStatus, setIsStatus] = useState(false);
  useEffect(() => {
    switch (type) {
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
        setCurrentProperty(type);
        setIsStatus(false);
        break;
    }
  }, [type]);
  //

  return (
    <>
      {/* Leads Managemente Modulueee */}
      <div className="mt-8 rounded-[34px] bg-white p-6 md:p-12">
        <div className="my-0 flex w-full flex-col justify-between gap-3 pt-0 pb-5 sm:flex-row sm:items-center">
          <p className=" text-2xl font-semibold text-black">{title}</p>
          <Button
            onClick={() => {
              setStatusstate(false);
              //   setType(2);
            }}
            className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6"
          >
            <img className="m-1 w-[20px]" src={plus} alt="..." />
            <Link
              className="m-1 text-sm font-medium normal-case text-white sm:text-base"
              to={`/dashboard/settingsManagement/property/1/${type}/${title}`}
              title={title}
            >
              Add New Status
            </Link>
          </Button>
        </div>
        <div className="rounded-[34px] bg-white">
          <div className="grid grid-cols-1 rounded-[20px] xl:grid-cols-1">
            <div className="flex flex-col overflow-x-auto">
              <table className="w-full border-none">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="w-[125px] whitespace-nowrap py-3 text-left text-base font-medium text-[#92929D]"
                    >
                      Status Name
                    </th>
                    <th scope="col" className="w-full px-6 py-3" />
                    {isStatus ? (
                      <th
                        scope="col"
                        className="w-[75px] py-3 text-center text-base font-medium text-[#92929D]"
                      >
                        Color
                      </th>
                    ) : (
                      ""
                    )}
                    <th
                      scope="col"
                      className="w-[75px] py-3 text-center text-base font-medium text-[#92929D]"
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      className="w-[50px] py-3 text-center text-base font-medium text-[#92929D]"
                    >
                      Option
                    </th>
                  </tr>
                </thead>
                <tbody className="border-none">
                  {/* {console.log("><><><><><><><><><><><><<><><><><><", property)} */}
                  {property?.length > 0 ? (
                    property.map(({ ID, name, Color }, id) => (
                      <tr key={ID + name}>
                        {
                          action[id] && (
                          !action[id].state ?
                            <td
                              className={`whitespace-nowrap py-4 text-lg font-semibold text-[#333]`}
                            >
                              {name}
                            </td> :
                            <td
                              className={`whitespace-nowrap py-4 text-lg font-semibold text-[#333]`}
                            >
                              <input type="text" onChange={e => {setAction(action.map((i,ids) => ids === id ? {...i, name: e.target.value}: i))}} value={action[id].name}/>
                            </td>
                          )
                        }
                        <td className="px-6 py-4" />
                        {isStatus ? (
                          <td
                            className={`whitespace-nowrap px-6 py-4 text-center text-lg font-medium`}
                          >
                            <p
                              className="neumorphism mx-auto w-fit rounded-2xl rounded-lg bg-gray-100 p-6 px-5 py-2 text-center text-xs font-medium normal-case text-gray-700 shadow-lg dark:bg-gray-800 dark:text-gray-400"
                              style={{
                                color: Color,
                                backgroundColor: `${Color}10`,
                              }}
                            >
                              Color
                            </p>
                          </td>
                        ) : (
                          ""
                        )}
                        <td>
                          {
                            action[id] && (
                            !action[id].state ?
                              <Button
                                variant="outlined"
                                className="mx-auto h-[28px] w-[78px] rounded-[15px] border border-[#280559] p-0 text-[#280559] ease-in hover:bg-[#280559] hover:text-white hover:opacity-100"
                                fullWidth
                                onClick={() => setAction(action.map((i,ids) => ids === id ? {...i, state: true}: i))}
                              >
                                <p className="text-center text-xs font-medium capitalize">
                                  Edit
                                </p>
                              </Button> :
                              <Button
                                variant="outlined"
                                className="mx-auto h-[28px] w-[78px] rounded-[15px] border border-[#280559] p-0 text-[#280559] ease-in hover:bg-[#280559] hover:text-white hover:opacity-100"
                                fullWidth
                                onClick={() => {handleEdit({ ID, name: action[id].name, Color }); setAction(action.map((i,ids) => ids === id ? {...i, state: false}: i))}}
                              >
                                <p className="text-center text-xs font-medium capitalize">
                                  Save
                                </p>
                              </Button>
                            )
                          }
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center text-lg font-medium">
                          <Button
                            variant="outlined"
                            className="mx-auto h-[28px] w-[78px] rounded-[15px] border border-[#280559] p-0 text-[#280559] ease-in hover:bg-[#280559] hover:text-white hover:opacity-100"
                            fullWidth
                            onClick={() => handleDelete({ ID })}
                          >
                            <p className="text-center text-xs font-medium capitalize">
                              Delete
                            </p>
                          </Button>
                          {/* <button className="rounded-full text-[#636363]/50 hover:text-[#7a7a7a]">
                            <svg
                              className="h-8 w-8 fill-current"
                              viewBox="0 0 32 32"
                            >
                              <circle cx="16" cy="10" r="2" />
                              <circle cx="16" cy="16" r="2" />
                              <circle cx="16" cy="22" r="2" />
                            </svg>
                          </button> */}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className={`whitespace-nowrap py-4 text-lg font-semibold text-[#333]`}
                      >
                        No Data
                      </td>
                      <td className="px-6 py-4" />
                      <td
                        className={`whitespace-nowrap px-6 py-4 text-center text-lg font-medium`}
                      >
                        <p className="neumorphism mx-auto w-fit rounded-2xl rounded-lg bg-gray-100 p-6 px-5 py-2 text-center text-xs font-medium normal-case text-gray-700 shadow-lg dark:bg-gray-800 dark:text-gray-400">
                          No Data
                        </p>
                      </td>
                      <td>
                        {/* <Button
                            variant="outlined"
                            className="mx-auto h-[28px] w-[78px] rounded-[15px] border border-[#280559] p-0 text-[#280559] ease-in hover:bg-[#280559] hover:text-white hover:opacity-100"
                            fullWidth
                          >
                            <p className="text-center text-xs font-medium capitalize">
                              view
                            </p>
                          </Button> */}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center text-lg font-medium">
                        No Data
                        {/* <button className="rounded-full text-[#636363]/50 hover:text-[#7a7a7a]">
                          <svg
                            className="h-8 w-8 fill-current"
                            viewBox="0 0 32 32"
                          >
                            <circle cx="16" cy="10" r="2" />
                            <circle cx="16" cy="16" r="2" />
                            <circle cx="16" cy="22" r="2" />
                          </svg>
                        </button> */}
                      </td>
                    </tr>
                  )}
                  {/* {StatusData.Lead_Management_Module.statusNames.map((name) => (
                    <tr key={name}>
                      <td
                        className={`whitespace-nowrap py-4 text-lg font-semibold text-[#333]`}
                      >
                        {name}
                      </td>
                      <td className="px-6 py-4" />
                      <td>
                        <Button
                          variant="outlined"
                          className="mx-auto h-[28px] w-[78px] rounded-[15px] border border-[#280559] p-0 text-[#280559] ease-in hover:bg-[#280559] hover:text-white hover:opacity-100"
                          fullWidth
                        >
                          <p className="text-center text-xs font-medium capitalize">
                            view
                          </p>
                        </Button>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center text-lg font-medium">
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
                      </td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </div>
            <Paginate pagination={toView?.data?.pagination} method={method}>
              List
            </Paginate>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyCard;
