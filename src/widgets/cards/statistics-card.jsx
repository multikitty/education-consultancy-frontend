import React, { useState } from 'react';
import { string } from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export function StatisticsCard({ title, value }) {
  const [acount, setAcount] = useState(0);

  const programmsData = useSelector(
    (state) => state?.universitiesReducer?.programms
  );

  const applicationsData = useSelector(
    (state) => state?.universitiesReducer?.applications
  );

  const universitiesData = useSelector(
    (state) => state?.universitiesReducer?.universities
  );

  const leadsData = useSelector((state) => state?.universitiesReducer?.allLeads);

  const { sales } = useSelector((state) => state?.universitiesReducer);

  React.useEffect(() => {
    if (title === "Total Leads")
      setAcount(leadsData?.data?.pagination.total);
    else if (title === "Total Applications")
      setAcount(applicationsData?.data?.pagination.total)
    else if (title === "Number of Universities")
      setAcount(universitiesData?.data?.pagination.total)
    else if (title === "Annual revenue"){
      let total = 0;
      sales?.data?.faqs.map((item, id) => total += parseFloat(item.amount) );
      setAcount("$" + total );
    }
  }, [applicationsData, universitiesData, leadsData, sales]);

  return (
    <div className='bg-white rounded-xl py-12'>
      <div className="  flex flex-col justify-center items-center" key={`${title}-${value}-scard`}>
        <p className=" text-[43px] text-[#280559] text-center font-medium" key={`${title}-${value}-scard1`}>{acount}</p>
        <p className=" text-[16px] text-[#92929D] text-center font-medium" key={`${title}-${value}-scard2`}>{title}</p>
      </div>
    </div>
  );
}

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;
