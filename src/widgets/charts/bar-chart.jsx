import { Card, CardBody } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import ReactApexChartBar from 'react-apexcharts'
import React from "react";
const ApexChartBar = () => {

  const applicationsData = useSelector(
    (state) => state?.universitiesReducer?.applications
  );

  const [data, setData] = React.useState({
    series: [{
      data: [40, 88, 60]
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },

      colors: ["#0263FF", "#DB0D4B", "#56BA6C"],
      plotOptions: {
        bar: {
          columnWidth: '25%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [

          ['Branch 1'],
          ['Branch 2'],
          ['Branch 3'],
        ],
        labels: {
          style: {
            colors: ['#333333'],
            fontSize: '12px'
          }
        }
      }
    },
  });

  React.useEffect(() => {
    let state_list = [];
    let name_list = [];
    applicationsData?.data?.faqs.map(item => {
      state_list[item.ApplicationDetail.Branch.id] ? state_list[item.ApplicationDetail.Branch.id] += 1 : state_list[item.ApplicationDetail.Branch.id] = 1;
      name_list[item.ApplicationDetail.Branch.id] = item.ApplicationDetail.Branch.id;
    });
    setData({
      ...data,
      series: [{data:state_list.map(item => item && parseInt(100 / applicationsData?.data?.faqs?.length) * item).filter(item => item)}],
      options: {
        xaxis:{
          categories: name_list.filter(i => i)
        }
      }
    });
  }, [applicationsData]);


  return (
    <div className=' bg-white rounded-xl h-[275px] justify-center items-center'>
      <h4 className='text-black text-xl font-medium text-left mb-5 ml-3 mt-5 '>Application by branch</h4>
      <div className="flex justify-center items-center" id="chart">
        <ReactApexChartBar className='text-black' options={data.options} series={data.series} type="bar" height={150} />
      </div>
    </div>

  );
}
export default ApexChartBar;