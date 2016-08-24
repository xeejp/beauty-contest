import React from 'react'

import Highcharts from 'react-highcharts'

const Chart1 = ({data,re}) => {
  var min_data = new Array( 10 )
  for(let i = 0;i < 10;i++) min_data[i] = 0
  for(let i = 0;i < 100;i++) {
	min_data[Math.floor(i/10)] += data[i]
  }
  min_data[9] += data[100]
  console.log(min_data)
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
	    categories: ['0-9', '10-19', '20-29', '30-39', '40-49','50-59','60-69','70-79','80-89','90-100'],
	    plotLines: [{
                color: '#FF0000',
                width: 2,
                value: re/10-0.5,
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
            data: min_data
	  }]
        }} />)
}

export default Chart1
