import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import { changeRound } from './actions'

const mapStateToProps = ({ maxround , page }) => ({
        maxround , page
})

class Option extends Component {

  constructor(props) {
		super(props)
	}

  minusRound() {
    const { maxround } = this.props
    const { dispatch } = this.props
    dispatch(changeRound(maxround - 1))
  }

  plusRound(){
    const { maxround } = this.props
    const { dispatch } = this.props
    dispatch(changeRound(maxround + 1))
  }

  render() {
    const { maxround , page} = this.props
    return (<Card>
          <CardHeader
            title={"オプション"}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
          <p> 現在の最大ラウンド数:{maxround} </p>
          {
          (page == "waiting")
          ?(<span>
          <RaisedButton onClick={this.minusRound.bind(this)} style={{ marginLeft: '3%' }} disabled = {!(maxround > 1)}>-</RaisedButton>
          <RaisedButton onClick={this.plusRound.bind(this)} style={{ marginLeft: '3%' }} >+</RaisedButton>
          </span>
          )
          :<span></span>
          }
          </CardText>
    </Card>)
  }
}

export default connect(mapStateToProps)(Option)
