
import { Card, CardBody } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import ReactPie01 from 'react-apexcharts'
import React from "react";
const Pie02 = () => {

  const applicationsData = useSelector(
    (state) => state?.universitiesReducer?.applications
  );


  const [data, setData] = React.useState({

    series: [33, 33, 33],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['item1', 'item2', 'ite3'],
      legend: {
        markers: {
          strokeColor: ['#56BA6C', '#0263FF', '#DB0D4B'],
          fillColors: ['#56BA6C', '#0263FF', '#DB0D4B'],
        }
      },

      fill: {
        opacity: 1,
        colors: ['#56BA6C', '#0263FF', '#DB0D4B'],
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom',

          }
        }
      }]
    },

  });

  React.useEffect(() => {
    let state_list = [];
    let name_list = [];
    if(applicationsData) {
      applicationsData?.data?.faqs.map(item => {
        state_list[item.ApplicationDetail.status] ? state_list[item.ApplicationDetail.status] += 1 : state_list[item.ApplicationDetail.status] = 1;
        name_list[item.ApplicationDetail.status] = item?.ApplicationDetail?.schoolName;
      });
      setData({
        series: state_list.map(item => item && parseInt(100 / applicationsData?.data?.faqs?.length) * item).filter(item => item),
        options: {
          // labels: name_list.map(i => i).filter(i => i),
          labels: name_list.map(i => i.slice(0,6)).filter(i => i),
        }
      });
    }
  }, [applicationsData]);

  return (
    <div className=' bg-white rounded-xl h-[275px] justify-center items-center'>
      <h4 className='text-black text-xl font-medium text-left ml-3 mb-8 mt-4 '>Application status</h4>
      <div className="flex justify-center items-center" id="chart">
        <ReactPie01 options={data.options} series={data.series} type="pie" width={300} />
      </div>
    </div>

  );
}
export default Pie02