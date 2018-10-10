import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import CircularProgress from 'material-ui/CircularProgress'

const mapStateToProps = ({joined,inputs,round,maxround}) => ({
	joined,inputs,round,maxround
})

const Inputedpage = ({joined,inputs,round,maxround}) => (
<Card>
	<CardText>
		<Chip
        	style = {{
            	float:"right"
           	}}
      	>
       		{round + "/" + maxround +"ラウンド"}
      	</Chip>
		<p>投票を受け付けました。</p>
		<p>実験が終了するまでこの画面のまましばらくお待ち下さい。</p>
		<p>{joined}人中、{inputs}人が投票しました。</p>
	</CardText>
	<div style={{textAlign: "center"}}>
	<CircularProgress size={140} thickness={5.0}/>
	</div>
</Card>
)

export default connect(mapStateToProps)(Inputedpage)
