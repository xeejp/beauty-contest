import React from 'react'

import Highcharts from 'react-highcharts'

const Chart2 = ({data,re}) => {
  return (<Highcharts 
    config = {{
      chart: {
        type: 'column'
      }, 
      credits: {
        enabled: false
      },
      title: {
        text: null
      },
      plotOptions: {
        series: {
          pointPadding: 0,
          groupPadding: 0,
          borderWidth: 0,
          shadow: false,
          pointPlacement: "between"
        }
      },
      xAxis: {
        title: {
          text: 'Number'
        },
        min: 0,
        plotLines: [{
          color: '#FF0000',
          width: 2,
          value: re,
          zIndex: 5,
          label: {
            useHTML:true,
            text: "報酬基準値<br>"+Math.round(re*10)/10,
            verticalAlign: 'top',
            rotation: 0,
            y:13
          }
        }]
      },
      yAxis: {
        title: {
          text: '人数'
        },
        min: 0,
        allowDecimals: false
      },
      series: [{
        name: '投票した人数',
        data: data
      }]
    }} />)
}

export default Chart2
