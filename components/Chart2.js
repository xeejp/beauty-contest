import React from 'react'

import Highcharts from 'react-highcharts'

const Chart2 = ({data,re}) => {
   console.log(data)
  return (<Highcharts 
  config = {{
          chart: {
            type: 'column'
          },
          title: {
            text: null
          },
	  plotOptions: {
            series: {
                pointPadding: 0,
                groupPadding: 0,
                borderWidth: 0,
                shadow: false
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
                   text:"報酬基準値",
               	   verticalAlign: 'bottom',
                   rotation: 0,
                   y:-8
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
