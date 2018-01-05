import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Chart from '../components/Chart'
import Reward from './Reward'

class Result_info extends Component {
  constructor(props) {
		super(props)
		this.state = {
			expanded: true
		}
	}

  changeExpanded(expanded){
    this.setState({expanded: expanded})
  }
  
  render(){
    const {results , id} = this.props
    const { expanded } = this.state
  const sum = results.sum
  const inputs = results.inputs
  const participants = results.participants
  const round = results.round
  const number = (id in participants)?participants[id].number:0
  const inputed = (id in participants)?participants[id].inputed:false
  return (
  <div>
     <p>全員の投票の平均値は{Math.round(sum/inputs*10)/10}でした。<br/>
     報酬の基準値は{Math.round(sum*2/inputs/3)}({Math.round(sum*2/inputs/3*10)/10}を四捨五入)です。</p>
     {
      inputed
	  ? <span><p>あなたが入力した値は{number}でした。</p></span>
	  : <span></span>
     }
     <Card
     expanded = {expanded}
     onExpandChange = {this.changeExpanded.bind(this)}
     >
      	<CardHeader
	   title={"グラフ"}
           actAsExpander={true}
           showExpandableButton={true}
      	/>
      	<CardText expandable={true}>
    	   <Chart
     	      participants = {participants}
     	   />
	</CardText>
    </Card>
    <br/>
    <Reward 
      results = {results}
      number = {number}
      inputed = {inputed}
      id = {id}
    />
  </div>
)
  }
}

export default Result_info