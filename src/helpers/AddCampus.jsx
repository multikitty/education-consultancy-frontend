import React from "react";
import {
  Select,
  Option,
  Button,
  Input,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import plus from "../../public/img/plus.svg";
import { useState } from "react";
import NewCampusForm from "@/helpers/newCampusForm";
import { ThemeAlert } from "@/helpers/alert";



const AddCampus = ({
  toAdd,
  setToAdd,
  open,
  close,
  setOpenAddModal,
  formsData,
  setFormsData,
  handleFormsDataChange,
  section,
}) => {
  let [label, setLabel] = useState("");
  let [name, setName] = useState("");
  let [placeholder, setPlaceholder] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  return (
    <>
      <Dialog className="rounded-[24px] font-display" size="sm" open={open}>
        <DialogBody>
          <div className="relative h-full w-full md:h-auto">
            <div className="relative bg-white dark:bg-gray-700">
              <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
                <h3 className=" text-2xl font-semibold text-[#333333] dark:text-white">
                  Add Field
                </h3>
                <button
                  value={label}
                  type="button"
                  className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    handleCloseAlert();
                    return close();
                  }}
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <form
                action=""
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="space-y-6 p-6">
                  {/* <div className="flex w-full flex-row  items-center">
                <div className="w-1/2">
                  <p className=" text-base font-semibold text-[#333333] ">
                    Select Field Type
                  </p>
                </div>
                <div className="w-1/2">
                  <Select className=" right-0 flex " label="Select Field Type">
                    <Option>Text</Option>
                    <Option>Select</Option>
                  </Select>
                </div>
              </div> */}
                  <div className="flex flex-row items-center justify-between">
                    {/* <div className="w-1/2">
                  <p className=" text-base font-semibold text-[#333333] ">
                    Label
                  </p>
                </div> */}
                    {/* <div className="w-1/2"> */}
                    <Input
                      name="name"
                      label="Name"
                      className=""
                      onChange={(e) => setName(e.target.value.trim())}
                      value={name}
                      required
                    ></Input>
                    {/* </div> */}
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    {/* <div className="w-1/2">
                  <p className=" text-base font-semibold text-[#333333] ">
                    Label
                  </p>
                </div> */}
                    {/* <div className="w-1/2"> */}
                    <Input
                      name="label"
                      label="Label"
                      className=""
                      onChange={(e) => setLabel(e.target.value.trim())}
                      value={label}
                      required
                    ></Input>
                    {/* </div> */}
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    {/* <div className="w-1/2">
                  <p className=" text-base font-semibold text-[#333333] ">
                    Label
                  </p>
                </div> */}
                    {/* <div className="w-1/2"> */}
                    <Input
                      name="placeholder"
                      label="Placeholder"
                      onChange={(e) => setPlaceholder(e.target.value.trim())}
                      value={placeholder}
                      className={"text-gray-400"}
                      required
                    ></Input>
                    {/* </div> */}
                  </div>
                </div>

                <div className="flex justify-end space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
                  <Button
                    className=" flex h-[60px] flex-row items-center justify-center rounded-2xl bg-[#280559]"
                    type="submit"
                    onClick={(e) => {
                      console.log('submitting the "add new field" form.');
                      e.preventDefault();
                      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", section);
                      // console.log(formsData);
                      // console.log(formsData[name]);
                      if (
                        label.trim() == "" ||
                        name.trim() == "" ||
                        placeholder.trim() == ""
                      )
                        return;
                      if (
                        !(
                          !formsData[name] &&
                          formsData[name] !== "" &&
                          formsData[name] !== 0
                        )
                      ) {
                        return handleShowAlert();
                      }
                      setFormsData({ ...formsData, [name]: "" });
                      let newToAdd = [...toAdd];
                      newToAdd.push({ label, placeholder, name });
                      // newToAdd.push({ label, placeholder, name });
                      setToAdd([...newToAdd]);
                      handleCloseAlert();
                      return close();
                    }}
                  >
                    <img className="m-1 w-[20px]" src={plus} alt="..." />
                    <span className="m-1 text-base font-medium normal-case text-white">
                      Add Field
                    </span>
                  </Button>
                </div>
              </form>
              <ThemeAlert
                message={
                  "Two Inputs Cannot Share the Same Name. Please, Use Another Name."
                }
                showAlert={showAlert}
                handleCloseAlert={handleCloseAlert}
                handleShowAlert={handleShowAlert}
              />
            </div>
          </div>
        </DialogBody>
      </Dialog>
      {toAdd?.map
        ? toAdd?.map(({ label, name, placeholder }) => {
            return (
              <newCampusForm
                name={name}
                label={label}
                formsData={formsData}
                onChange={handleFormsDataChange}
                placeholder={placeholder}
                key={label + placeholder + name}
              />
            );
          })
        : ""}
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#333333]">
          Add Field
        </label>
        <button
          onClick={() => setOpenAddModal(true)}
          type="button"
          className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
        >
          Click to add more field
        </button>
      </div>
    </>
  );
};

export default AddCampus;
