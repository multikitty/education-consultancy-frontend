import React from "react";
import { Card, CardHeader } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import saveIcon from "../../../public/img/saveIcon.svg";
import { NavLink } from "react-router-dom";
import AddField from "@/helpers/Addfield";

export function Create() {
  /*{ toAdd, setToAdd,  open,close,  setOpenAddModal,  formsData,  setFormsData,  handleFormsDataChange,  section,} */
  //   const [CurrencyCreateState, setCurrencyCreateState] = useState(true);
  //   const [openModal, setOpenModal] = useState(false);
  const [openCurrencyCreateAddModal, setOpenCurrencyCreateAddModal] =
    useState(false);
  const [CurrencyCreateNewFields, setCurrencyCreateNewFields] = useState([]);
  const [allFormsData, setAllFormsData] = useState({});
  const handleAllFormsDataChange = (e) => {
    let { name, value } = e.target;
    setAllFormsData({ ...allFormsData, [name]: value });
  };

  return (
    <div className="my-20 mt-12 flex w-full flex-col gap-8 bg-[#E8E9EB] px-14">
      <div className="flex justify-between">
        <div className="mb-7 flex-col">
          <h3 className="text-left text-4xl font-bold text-[#280559]">
            Create or edit Currency
          </h3>
          <p className="text-left text-lg text-[#9898A3]">
            Create or edit Currency
          </p>
        </div>
        <Button className="h-[60px]  w-[206px] rounded-[15px] bg-[#280559]">
          <div className="flex flex-row items-center justify-center">
            <img src={saveIcon} alt="..." />
            <p className="px-[11px] text-base font-medium normal-case text-white ">
              Save Changes
            </p>
          </div>
        </Button>
      </div>
      <Card>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 w-full flex-col items-center justify-between p-4"
        >
          <div className="mb-3 flex w-full items-center px-4">
            <h3 className="text-left text-2xl font-semibold text-[#333333]">
              Currency Details
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3 px-4 laptop:grid-cols-3">
            <div className="mb-10">
              <p className="mb-4 text-base font-medium">
                Currency Name (ISO code)
              </p>
              <div className=" h-[57px]">
                <Select label="USD">
                  <Option>USD</Option>
                  <Option>COIN</Option>
                  <Option>BTN</Option>
                </Select>
              </div>
            </div>
            <div className="mb-10 h-[57px]">
              <p className="mb-4 text-base font-medium">Currency Name</p>
              <div className="">
                <Input label="US dollar" />
              </div>
            </div>
            <div className=" mb-10 h-[57px]">
              <p className="mb-4 text-base font-medium">Exchange Rate</p>
              <div className="">
                <Input label="1" />
              </div>
            </div>
          </div>
          <div className="mb-16 flex px-4">
            <div className="h-[57px]">
              <p className="mb-4 text-lg font-semibold">Status</p>
              <Select label="Default">
                <Option>USD</Option>
                <Option>COIN</Option>
                <Option>BTN</Option>
              </Select>
            </div>
          </div>
          {/* <div className="px-4 flex">
                <div className="w-[420px] h-[57px] mb-3">
                    <p className="mb-4 font-medium text-base">Add Field</p>
                    <div className="">
                        <Input disabled label="Click to add more field" className=" outline-none"/>
                    </div>
                </div>
            </div> */}
          <AddField
            open={openCurrencyCreateAddModal}
            close={() => setOpenCurrencyCreateAddModal(false)}
            toAdd={CurrencyCreateNewFields}
            setOpenAddModal={setOpenCurrencyCreateAddModal}
            setToAdd={setCurrencyCreateNewFields}
            formsData={allFormsData}
            setFormsData={setAllFormsData}
            handleFormsDataChange={handleAllFormsDataChange}
            section={"Accounting-CurrencyCreate"}
          />
        </CardHeader>
      </Card>
      <NavLink to="Currency">
        <Button className="h-[60px] w-[206px] rounded-[15px] bg-[#280559] px-4">
          <div className="flex flex-row items-center justify-center">
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

export default Create;
