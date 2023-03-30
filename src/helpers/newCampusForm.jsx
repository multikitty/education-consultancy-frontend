import React from "react";
import AddField from "./Addfield";

const newCampusForm = ({
  formsData,
  onChange,
  label,
  placeholder,
  appDetailValues,
  name,
}) => {
  return (
    <div>
      <div className="my-[30px] mr-8 rounded-[34px] bg-white p-[39px]">
        <p className="mb-8 text-2xl font-semibold text-[#333333]">
          Campus 2
        </p>
        <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#333333]">
              Campus Name
            </label>
            <input
              type="text"
              className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
              placeholder="Campus Name"
              name="name1" //
              defaultValue={campusValues[1].name}
              onChange={handeCampusChange}
              disabled={isViewMode}

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
              name="Address11" //
              defaultValue={campusValues[1].address1}
              onChange={handeCampusChange}
              disabled={isViewMode}

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
              name="Address21" //
              defaultValue={campusValues[1].address2}
              onChange={handeCampusChange}
              disabled={isViewMode}

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
              name="phone1" //
              defaultValue={campusValues[1].phone}
              onChange={handeCampusChange}
              disabled={isViewMode}

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
              name="email1" //
              defaultValue={campusValues[1].email}
              onChange={handeCampusChange}
              disabled={isViewMode}

            />
          </div>
          {isViewMode ? (
            ""
          ) : (
            <AddField
              open={openThirdCreateUniversityAddModal}
              close={() => setOpenThirdCreateUniversityAddModal(false)}
              toAdd={ThirdCreateUniversityNewFields}
              setOpenAddModal={setOpenThirdCreateUniversityAddModal}
              setToAdd={setThirdCreateUniversityNewFields}
              formsData={formValues}
              setFormsData={setFormValues}
              handleFormsDataChange={handleChange}
              section={"university-ThirdCreateUniversity"}
            />
          )}
          {/* <div>
                  <label className="mb-2 block text-sm font-semibold">
                    &nbsp;
                  </label>
                  <button
                    type="button"
                    className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
                  >
                    Click to add more field
                  </button>
                </div> */}
        </div>
      </div>
    </div>
  );
};

export default newCampusForm;
