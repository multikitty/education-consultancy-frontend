import React from "react";
import { NavLink } from "react-router-dom";
import { Select, Option, Button, Input } from "@material-tailwind/react";
import saveIcon from "../../../public/img/saveIcon.svg";
import AddField from "@/helpers/Addfield";

export function CreateMailing() {
  const [openAddModal, setOpenAddModal] = useState(false);
  /*{ toAdd, setToAdd,  open,close,  setOpenAddModal,  formsData,  setFormsData,  handleFormsDataChange,  section,} */
  // const [openModal, setOpenModal] = useState(false);
  const [CreateMailingState, setCreateMailingState] = useState(true);
  const [openCreateMailingAddModal, setOpenCreateMailingAddModal] =
    useState(false);
  const [CreateMailingNewFields, setCreateMailingNewFields] = useState([]);
  const [allFormsData, setAllFormsData] = useState({});
  const handleAllFormsDataChange = (e) => {
    let { name, value } = e.target;
    setAllFormsData({ ...allFormsData, [name]: value });
  };
  return (
    <div className="mt-[30px] w-full bg-[#E8E9EB]">
      <div className="my-10  grid justify-between md:grid-cols-2">
        <div>
          <p className=" text-4xl font-semibold text-[#280559]">
            Create Invoice
          </p>
          <p className=" font text-base text-[#9898A3]">
            Create or edit invoice
          </p>
        </div>
        <div className="flex gap-6">
          <NavLink to="commission">
            <Button className="rounded-[15px]  bg-[#280559]">
              <div className="flex flex-row items-center justify-center px-[10px] py-[10px]">
                <img src={saveIcon} alt="..." />
                <p className="px-[11px] text-base font-medium normal-case text-white ">
                  Print / Preview
                </p>
              </div>
            </Button>
          </NavLink>
          <NavLink to="commission">
            <Button className="rounded-[15px]  bg-[#280559]">
              <div className="flex flex-row items-center justify-center px-[10px] py-[10px]">
                <img src={saveIcon} alt="..." />
                <p className="px-[11px] text-base font-medium normal-case text-white ">
                  Save Changes
                </p>
              </div>
            </Button>
          </NavLink>
        </div>
      </div>
      <div className="rounded-[34px] bg-white p-[39px]">
        <p className="my-8 text-2xl font-semibold text-[#333333]">
          Invoice Mailing Infoo
        </p>

        <div className="grid grid-cols-1  gap-[30px] laptop:grid-cols-2">
          <div>
            <p className=" my-4 text-base font-semibold">Address (line 1)</p>
            <Input className="h-[57px]" label="University Name"></Input>
          </div>
          <div>
            <p className=" my-4 text-base font-semibold">Address (line 2)</p>
            <Input className="h-[57px]" label="Address"></Input>
          </div>
          <div>
            <p className=" my-4 text-base font-semibold">University Type</p>
            <Select className="h-[57px]" label="Select Country">
              <Option>Country</Option>
              <Option>Country</Option>
              <Option>Country</Option>
              <Option>Country</Option>
              <Option>Country</Option>
            </Select>
          </div>
          <div>
            <p className=" my-4 text-base font-semibold">Phone</p>
            <Select className="h-[57px]" label="Select Country">
              <Option>Country</Option>
              <Option>Country</Option>
              <Option>Country</Option>
              <Option>Country</Option>
              <Option>Country</Option>
            </Select>
          </div>

          <div>
            <p className=" my-4 text-base font-semibold">Email Address</p>
            <Input className="h-[57px]" label="Email"></Input>
          </div>

          {/* <div>
            <p className=" my-4 text-base font-semibold">Add Field</p>
            <button
              onClick={() => setOpenAddModal(true)}
              // data-modal-target="defaultModal1"
              // data-modal-toggle="defaultModal"
              className="block w-full justify-center text-[#BEBFC3]"
              type="button"
            >
              Click to add more field
            </button>
            <AddField
              open={openAddModal}
              close={() => setOpenAddModal(false)}
            />
          </div> */}
          <AddField
            open={openCreateMailingAddModal}
            close={() => setOpenCreateMailingAddModal(false)}
            toAdd={CreateMailingNewFields}
            setOpenAddModal={setOpenCreateMailingAddModal}
            setToAdd={setCreateMailingNewFields}
            formsData={allFormsData}
            setFormsData={setAllFormsData}
            handleFormsDataChange={handleAllFormsDataChange}
            section={"Accounting-CreateMailing"}
          />
        </div>
      </div>
      <div className="rounded-[34px] bg-white p-[39px]">
        <p className="my-8 text-2xl font-semibold text-[#333333]">Bill To</p>

        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 laptop:grid-cols-3">
          <div>
            <p className=" my-4 text-base font-semibold">Address (line 1)</p>
            <Input className="h-[57px]" label="University Name"></Input>
          </div>
          <div>
            <p className=" my-4 text-base font-semibold">Address (line 2)</p>
            <Input className="h-[57px]" label="Address"></Input>
          </div>
          <div>
            <p className=" my-4 text-base font-semibold">University Type</p>
            <Select className="h-[57px]" label="Select Country">
              <Option>Country</Option>
              <Option>Country</Option>
              <Option>Country</Option>
              <Option>Country</Option>
              <Option>Country</Option>
            </Select>
          </div>
          <div>
            <p className=" my-4 text-base font-semibold">Phone</p>
            <Select className="h-[57px]" label="Select Country">
              <Option>Country</Option>
              <Option>Country</Option>
              <Option>Country</Option>
              <Option>Country</Option>
              <Option>Country</Option>
            </Select>
          </div>

          <div>
            <p className=" my-4 text-base font-semibold">Email Address</p>
            <Input className="h-[57px]" label="Email"></Input>
          </div>

          {/* <div>
            <p className=" my-4 text-base font-semibold">Add Field</p>
            <button
              onClick={() => setOpenAddModal(true)}
              // data-modal-target="defaultModall"
              // data-modal-toggle="defaultModal"
              className="block w-full justify-center text-[#BEBFC3]"
              type="button"
            >
              Click to add more field
            </button>
            <AddField
              open={openAddModal}
              close={() => setOpenAddModal(false)}
            />
          </div> */}
          <AddField
            open={openCreateMailingAddModal}
            close={() => setOpenCreateMailingAddModal(false)}
            toAdd={CreateMailingNewFields}
            setOpenAddModal={setOpenCreateMailingAddModal}
            setToAdd={setCreateMailingNewFields}
            formsData={allFormsData}
            setFormsData={setAllFormsData}
            handleFormsDataChange={handleAllFormsDataChange}
            section={"Accounting-CreateMailing"}
          />
        </div>
      </div>
      <div className="rounded-[34px] bg-white p-[39px]">
        <p className="my-8 text-2xl font-semibold text-[#333333]">
          Invoice Item List
        </p>

        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 laptop:grid-cols-3">
          <div>
            <p className=" my-4 text-base font-semibold">Item Name</p>
            <Input className="h-[57px]" label="Name"></Input>
          </div>
          <div>
            <p className=" my-4 text-base font-semibold">Item Quantity</p>
            <Input className="h-[57px]" label="Quantity"></Input>
          </div>
          <div>
            <p className=" my-4 text-base font-semibold">Price</p>
            <Input className="h-[57px]" label="USD"></Input>
          </div>
        </div>
        {/* <div className="my-10">
          <p className=" my-4 text-base font-semibold">Add row</p>
          <button
            onClick={() => setOpenAddModal(true)}
            className="block w-full justify-center text-[#BEBFC3]"
            type="button"
          >
            Click to add more field
          </button>
          <AddField open={openAddModal} close={() => setOpenAddModal(false)} />
        </div> */}
        <AddField
          open={openCreateMailingAddModal}
          close={() => setOpenCreateMailingAddModal(false)}
          toAdd={CreateMailingNewFields}
          setOpenAddModal={setOpenCreateMailingAddModal}
          setToAdd={setCreateMailingNewFields}
          formsData={allFormsData}
          setFormsData={setAllFormsData}
          handleFormsDataChange={handleAllFormsDataChange}
          section={"Accounting-CreateMailing"}
        />
      </div>

      <NavLink to="commission">
        <Button className="mt-5  rounded-[15px] bg-[#280559]">
          <div className="flex flex-row items-center justify-center px-[33px] py-[10px]">
            <img src={saveIcon} alt="..." />
            <p className="px-[11px] text-base font-medium normal-case text-white ">
              Save Changes
            </p>
          </div>
        </Button>
      </NavLink>
    </div>
  );
}

export default CreateMailing;
