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
			<p>0～100の整数を投票して、その平均値に3分の2を掛けた値に近い整数を投票してる人に報酬を与えます。</p>
		</CardText>
	</Card>
)
export default connect()(Description)
