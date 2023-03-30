import {Card, CardBody} from "@material-tailwind/react";
import ReactRingChart from "react-apexcharts";
import React from "react";

class RingChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        series: [73],
        options: {
          chart: {
            height: 300,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '60%',
              }
            },
          },
          labels: [''],
        },
      
      
      };
    }

  

    render() {
      return (
        
                <div id="chart">
                    <ReactRingChart options={this.state.options} series={this.state.series} type="radialBar" height={300} />
                </div>
        
        );
    }
}
export default RingChart
