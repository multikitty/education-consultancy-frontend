
import { Card, CardBody } from "@material-tailwind/react";
import ReactHorizontal from 'react-apexcharts'
import React from "react";
class Horizontal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [{
        data: [100, 40, 88, 60, 6, 11, 71]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 380
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: 'bottom'
            },
          }
        },
        colors: ['#0263FF','#0263FF','#56BA6C','#B70D52','#B5DFD7','#ABF85E','#DB0D4B', ],
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
        },
        yaxis: {
          labels: {
            show: false
          }
        },
       
        subtitle: {
            text: '',
            align: 'center',
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function () {
                return ''
              }
            }
          }
        }
      },
    
    
    };
  }



  render() {
    return (
      <div className=' bg-white rounded-xl'>
      <h4 className='text-black text-xl font-medium text-left ml-3 mt-4'>Revenue</h4>
      <div className='rounded-2xl items-center justify-center flex'>
      <div className="w-full" id="chart">
          <ReactHorizontal options={this.state.options} series={this.state.series} type="bar" height={350} />
      </div>
      </div>
      </div>
        
    );
  }
}
export default Horizontal