import React from 'react'

import Chart1 from './Chart1'
import Chart2 from './Chart2'

const Chart = ({participants}) => {
  var data = new Array( 101 ),inputs=0,sum=0
  for(var i = 0;i < 101;i++) data[i] = 0
  for (var key in participants){
	  if(participants[key].inputed) {
		  data[participants[key].number]++
		  inputs++
		  sum += participants[key].number
	  }
  }

  sum = sum / inputs * 2 / 3

  console.log(data)
  return (inputs < 100 
	   ? <Chart1
	       data={data}
	       re={sum}
	     />
	   :<Chart2
	       data={data}
	       re={sum}
	     />
	 )
}

export default Chart
