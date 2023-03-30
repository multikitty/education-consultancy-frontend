//import universityCardData from "@/data/university-card-data"
import {
    Button,
  } from "@material-tailwind/react";

export function UniversityCard({tableName, data}){
    return(
        <div className="w-[470px]">
            <div className="flex flex-row justify-between items-center mx-4">
                <p className=" text-xl text-black font-medium">{tableName}</p>
                <Button className=" w-[115px] h-[46px] bg-[#0263FF] rounded-[15px] justify-center p-0" fullWidth>
                <p className=" text-base text-white normal-case text-center">View All</p>
                </Button>
            </div>
            <div className="flex flex-row justify-between items-center mx-4">
                <p className=" text-xl text-[#92929D] font-medium">University name</p>
                <p className=" text-base text-[#92929D] normal-case text-center px-4">Action</p>
            </div>
            <div className="flex flex-row justify-between items-center mx-4 mt-2">
                <p className=" text-xl text-black font-medium">{data}</p>
                <Button className=" w-[78px] h-[28px] bg-[#0263FF] rounded-[15px] justify-center items-center p-0"  fullWidth>
                <p className="text-base text-white normal-case text-center">view</p>
                </Button>
            </div>
        </div>

    )
}
export default UniversityCard