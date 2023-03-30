import React from "react";
import filterIcon from '../../../public/img/filterIcon.svg';
import Currency  from "@/data/assets-props";
import print from '../../../public/img/print.svg'



export function Reports() {
   
  return (
      
    <div className="mt-[30px] w-full bg-[#E8E9EB] font-display">
      <div className="mb-5">
        <div className=" rounded-[34px] bg-white p-6 md:p-12">
        <p className=" text-2xl font-bold text-black">Balance Sheet</p>
        <div className="mb-3 mt-12 grid grid-cols-1 2xl:grid-cols-2 gap-3 rounded-[20px] bg-[#F8F9FB] p-5">
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
                  className="w-full rounded-[15px] shadow-md border-[#cbd2dc]/50 border-[1px] bg-white py-3 pt-4 pl-12 pr-4 text-gray-500 focus:bg-white"
                />
              </div>
            </form>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-full">
          <input type="text" className="placeholder:text-[#BEBFC3] rounded-xl bg-white border-2 border-[#CBD2DC80] p-2.5 text-gray-900 focus:ring-blue-500 focus:border-blue-500" placeholder="From Date" required/>
          <input type="text" className="placeholder:text-[#BEBFC3] rounded-xl bg-white border-2 border-[#CBD2DC80] p-2.5 text-gray-900 focus:ring-blue-500 focus:border-blue-500" placeholder="To Date" required/>
          <button className="bg-white flex items-center justify-center rounded-2xl shadow-md border-[#cbd2dc]/50 border-[1px]">
                <img className="w-[20px]" src={filterIcon} alt="..." />
                <p className="mx-3 text-[16px] ">Apply</p>
              </button>
              <button className="bg-white flex h-[57px] flex-row items-center justify-center rounded-2xl shadow-md border-[#cbd2dc]/50 border-[1px]">
              <img src={print}/>
                <p className="mx-3 ">Print</p>
              </button>
            </div>
          </div>
        </div>
        <div className=" mt-[30px] rounded-[34px] bg-white p-6 md:p-12">
        <p className=" text-2xl font-bold text-black">Assets</p>
          <div className="mb-3 mt-12 rounded-[20px]">
          <div className="flex flex-col overflow-x-auto">
            <table className="relative w-full border-none">
            <span className="absolute bottom-0 w-full h-[1px] bg-[#D9D9D9]"/>
              <thead>
              <tr>
                  <th
                    scope="col"
                    className="w-[200px] py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    Name
                  </th>
                  <th scope="col" className="w-full px-6 py-3"/>
                  <th
                    scope="col"
                    className="w-[113px] px-6 py-3 text-center text-base font-medium text-[#92929D]"
                  >
                    Currency
                  </th>
                  <th
                    scope="col"
                    className="w-[113px] px-6 py-3 text-center text-base font-medium text-[#92929D]"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="border-none">
                <tr>
                    <td className="font-bold text-lg py-5">Current assets</td>
                </tr>
                {Currency.map(({name, currency, amount, color}, i) => (
                  <tr key={name}>
                  <td className={`whitespace-nowrap ${i === Currency.length - 1 ? 'font-bold' : 'pl-4 font-normal'} py-4 text-lg text-[#333]`}>
                    {name}
                  </td>
                  <td className="px-6 py-4"/>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-lg font-medium text-[#333]">
                    {currency}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-lg font-semibold text-[#333]" style={{color}}>
                    {amount}
                  </td>
                 
                </tr>
                ))}
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
          <div className="text-[#333] font-bold mt-6 flex items-center justify-between rounded-[20px] py-4 px-6 gap-4">
           <p className="text-[22px] capitalize">total cost</p>
            <p className="text-2xl ml-auto">$1,217.00</p>
          </div>
            
          </div>
        </div>
        <div className=" mt-[30px] rounded-[34px] bg-white p-6 md:p-12">
        <p className=" text-2xl font-bold text-black">Equity</p>
          <div className="mb-3 mt-12 rounded-[20px]">
          <div className="flex flex-col overflow-x-auto">
            <table className="relative w-full border-none">
            <span className="absolute bottom-0 w-full h-[1px] bg-[#D9D9D9]"/>
              <thead>
              <tr>
                  <th
                    scope="col"
                    className="w-[200px] py-3 text-left text-base font-medium text-[#92929D]"
                  >
                    Name
                  </th>
                  <th scope="col" className="w-full px-6 py-3"/>
                  <th
                    scope="col"
                    className="w-[113px] px-6 py-3 text-center text-base font-medium text-[#92929D]"
                  >
                    Currency
                  </th>
                  <th
                    scope="col"
                    className="w-[113px] px-6 py-3 text-center text-base font-medium text-[#92929D]"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="border-none">
                <tr>
                    <td className="font-bold text-lg py-5">Current assets</td>
                </tr>
                {Currency.map(({name, currency, amount, color}, i) => (
                  <tr key={name}>
                  <td className={`whitespace-nowrap ${i === Currency.length - 1 ? 'font-bold' : 'pl-4 font-normal'} py-4 text-lg text-[#333]`}>
                    {name}
                  </td>
                  <td className="px-6 py-4"/>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-lg font-medium text-[#333]">
                    {currency}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-lg font-semibold text-[#333]" style={{color}}>
                    {amount}
                  </td>
                 
                </tr>
                ))}
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
          <div className="text-[#333] font-bold mt-6 flex items-center justify-between rounded-[20px] py-4 px-6 gap-4">
           <p className="text-[22px] capitalize">total cost</p>
            <p className="text-2xl ml-auto">$1,217.00</p>
          </div>
            
          </div>
        </div>
        <div className=" mt-[30px] rounded-[34px] bg-white p-6 md:p-12">
        <p className=" text-2xl font-bold text-black">Balance</p>
          <div className="mb-3 mt-12 rounded-[20px]">
                <div className="flex justify-between items-center text-2xl font-semibold gap-4">
                    <p className="text-[#333]">Total Balance</p>
                    <p className="text-[#449E3C]">$208.00</p>
                </div>
          </div>
          </div>
    </div>
    </div>
  )
}

export default Reports;