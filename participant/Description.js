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
			<p>これから実験参加者全員で、数字当てゲームをします。</p>
			<p>あなたは、0～100の整数を投票してください。<br />
			他の参加者も同様に0～100の整数を投票します。<br />
			0や100を投票することもできます。</p>
			<p>全員が投票し終わた後に、投票された数の平均値を計算します。<br />
			その平均値に3分の2を掛けた値に最も近い整数を投票した人が優勝者です。<br />
			優勝者には報酬を与えます。</p>
			<p>実験開始まで、この画面のままお待ちください。</p>
		</CardText>
	</Card>
)
export default connect()(Description)