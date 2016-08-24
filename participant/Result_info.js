import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Chart from 'components/Chart'
import Reward from './Reward'

const mapStateToProps = ({results,number,inputed}) => ({
	results,number,inputed
})

const Result_info = ({results,number,inputed}) => (
  <div>
     <p>平均値: {Math.round(results.sum/results.inputs*10)/10} 報酬基準値: {Math.round(results.sum*2/results.inputs/3*10)/10} </p>
     {
      inputed
	  ? <span><p>あなたが入力した値: {number}</p></span>
	  : <span></span>
     }
     <Card>
      	<CardHeader
	   title={"グラフ"}
           actAsExpander={true}
           showExpandableButton={true}
      	/>
      	<CardText expandable={true}>
    	   <Chart
     	      participants = {results.participants}
     	   />
	</CardText>
    </Card>
    <Reward />
  </div>
)

export default connect(mapStateToProps)(Result_info)
