
import { Card, CardBody } from "@material-tailwind/react";
import ReactApexChart from 'react-apexcharts'
import React from "react";
class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [ 
      {
        name: 'Medium',
        data: [44, 55, 41, 37, 22]
      },{
        name: 'Critical',
        data: [25, 12, 19, 32, 25]
      },{
        name: 'Low',
        data: [12, 17, 11, 9, 15]
      }, {
      name: 'High',
      data: [53, 32, 33, 52, 13 ]
      },],
      options: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          stackType: '100%'
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + "K"
            }
          }
        },
        fill: {
          opacity: 1,
          colors:['#56BA6C', '#DB0D4B', '#F99746', '#0263FF']
        
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40
        }
      },
    
    
    };
  }



  render() {
    return (
      <div className=' bg-white rounded-xl '>
      <h4 className='text-black text-xl font-medium text-left ml-3 mt-4'>Invoice status</h4>
      <div className='rounded-2xl items-center justify-center flex'>
      <div className="w-full" id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
      </div>
      </div>
      </div>
        
    );
  }
}
export default ApexChart