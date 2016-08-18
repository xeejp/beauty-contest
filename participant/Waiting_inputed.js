import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

const mapStateToProps = ({}) => ({
})

const Waiting_inputed = ({}) => (
	<Card>
		<CardTitle title="美人投票ゲーム" subtitle="待機画面" />
		<CardText>
			<p>参加者の投票を待っています。</p>
			<p>この画面のまましばらくお待ち下さい。</p>
		</CardText>
		<div style={{textAlign: "center"}}>
			<CircularProgress size={2}/>
		</div>
	</Card>
)

export default connect()(Waiting_inputed)
