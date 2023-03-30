import React from "react";

const NewForm = ({
  formsData,
  onChange,
  label,
  placeholder,
  appDetailValues,
  name,
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#333333]">
        {label}
      </label>
      <input
        type="text"
        className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
        placeholder={placeholder}
        value={formsData[name]}
        onChange={onChange}
        required
        name={name}
        // value={
        //   appDetailValues
        //     ? appDetailValues[label]
        //       ? appDetailValues[label]
        //       : ""
        //     : ""
        // }
        // onChange={handleChange}
      />
    </div>
  );
};

export default NewForm;
