import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
import Axios from "axios";
import {useEffect, useState} from "react";
import moment from "moment";
// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Team A',
    type: 'area',
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
  },
  {
    name: 'Team B',
    type: 'line',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
  },
  {
    name: 'Team C',
    type: 'line',
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
  }
];

export default function AppTemperature() {

  const [temperature,setTemperature]=useState([])
  const [date,setDate]=useState([])

  useEffect(()=>{
      getTemperature()

  },[])


  const getTemperature = async () => {
    var url = 'http://localhost:5000/temperature'

    var config = {
      method: 'get',
      url: url,
      headers: {
      },

    };

    var response = await Axios(config)


    var dataTemp = Array.from(response.data.data, x=>x.value)

    console.log(dataTemp)

    await setTemperature(
        [
                {
                  name: 'Temperature',
                  type: 'area',
                  data: dataTemp
                },

             ]
    )

    /*await setDate(
      Array.from(response.data.data, x=>moment(x.timestamp).format('h:mm:ss'))
    )*/

    await setDate(
        Array.from(response.data.data, x=>x.timestamp)
    )

  }

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid'] },
    labels: date,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} °C`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Temperature"/>
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={temperature} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
