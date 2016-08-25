import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'
import Result from './Result'

const mapStateToProps = ({actives,inputs,page}) => ({
	actives,inputs,page
})

const WaitPage = ({actives,inputs,page}) => (()=>{
   switch (page) {
	case "result":
		return <Result />
	case "description":
	case "experiment":
		return(
	   	   <Card>
	  	      <CardTitle title="美人投票ゲーム" subtitle="待機画面" />
		      <CardText>
			 <p>実験の終了を待っています。</p>
			 <p>この画面のまましばらくお待ち下さい。</p>
			 <p>現在{actives}人中{inputs}人が投票しています。 </p>
		      </CardText>
		      <div style={{textAlign: "center"}}>
			 <CircularProgress size={2}/>
		      </div>
	       	   </Card>
		)
   	default:
		return <span></span>
   }
})()

export default connect(mapStateToProps)(WaitPage)
