import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'

const mapStateToProps = ({}) => ({
})

const Description = ({}) => (
	<Card>
		<CardTitle title="美人投票ゲーム" subtitle="ルールの説明" />
		<CardText>
			<p>説明を入力</p>
		</CardText>
	</Card>
)
export default connect()(Description)
