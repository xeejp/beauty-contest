import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

import Chip from 'material-ui/Chip'
import Divider from 'material-ui/Divider'
import PageButtons from './PageButtons'
import Users from './Users'
import Result from './Result'
import Option from './Option'
import DownloadButton from './DownloadButton'


const mapStateToProps = ({ loading ,round ,maxround, results, participants, page}) => ({
  loading ,round ,maxround, results, participants, page
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchContents())
  }

  render() {
      const { loading ,round ,maxround, results, participants, page} = this.props
    if (loading) {
      return (
        <Card style={{padding: '20px'}}>
          <CardTitle title="接続中" style={{padding: '0px', marginTop: '7px', marginBottom: '14px'}}/>
          <CardText style={{padding: '0px', margin: '0px'}}>
            <div style={{textAlign: 'center'}}>
              <CircularProgress style={{margin: '0px', padding: '0px' }} />
            </div>
            <p style={{margin: '0px', padding: '0px'}}>サーバーに接続しています。<br/>このまましばらくお待ちください。</p>
          </CardText>
        </Card>
      )
    } else {
      return (
        <div>
          <Chip
        		style = {{
             		float:"right"
           		}}
      		>
       			 {((round>0)?round:"-") + "/" +  maxround + "ラウンド"}
      		</Chip>
          <PageButtons />
              <Divider
                style={{
                  marginTop: "5%",
		  marginBottom: "5%",
                }}
              />
	        <Users />
          <br />
          <Result />
          <br />
          <Option />
          <DownloadButton
            fileName={"beauty_contest.csv"}
            list={[
              ["美人投票ゲーム"],
              ["実験日", new Date()],
              ["登録者数", Object.keys(participants).length],
              ["ID"].concat(results.map(result => result.round + "ラウンド")),
            ].concat(
              Object.keys(participants).map(id => [id].concat(results.map(result => (id in result.participants)? result.participants[id].number : "未回答")))
            ).concat([
              ["平均値"].concat(results.map(result => Math.round(result.sum / result.inputs * 10) / 10))
            ]).concat([
              ["報酬基準値"].concat(results.map(result => Math.round(result.sum * 2 / result.inputs / 3 * 10) / 10))
            ])}
            style={{marginLeft: '2%'}}
            disabled={page != "result"}
          />
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)
