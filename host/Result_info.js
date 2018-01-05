import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import Chart from '../components/Chart'

const Result_info = ({ results }) => {
  const sum = results.sum
  const inputs = results.inputs
  const participants = results.participants
  const round = results.round
return  (
 <span>
    <p>平均値: {Math.round(sum/inputs*10)/10} 報酬基準値: {Math.round(sum*2/inputs/3*10)/10}</p>
    <Chart
      participants = {participants}
      />
 </span>
)
}

export default Result_info