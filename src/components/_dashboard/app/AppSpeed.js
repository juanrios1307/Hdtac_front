import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';
import {useEffect, useState} from "react";
import Axios from "axios";
import moment from 'moment';
// ----------------------------------------------------------------------

const CHART_DATA = [{ data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380] }];

export default function AppSpeed() {

  const [speed,setSpeed]=useState([])
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


    var data = Array.from(response.data.data, x=>x.value)

    console.log(data)

    await setSpeed(
        [
          {
            name: 'Speed',
            type: 'area',
            data: data
          },

        ]
    )

    await setDate(
        Array.from(response.data.data, x=>moment(x.timestamp).format('h:mm:ss a'))
    )

  }

  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName} m/s`
        }
      }
    },
    plotOptions: {
      bar: { horizontal: false, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: date
    }
  });

  return (
    <Card>
      <CardHeader title="Speed"/>
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={speed} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
