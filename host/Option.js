import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

import { changeRound, visit, fetchContents } from './actions'

const mapStateToProps = ({ maxround , page, is_first_visit }) => ({
        maxround , page, is_first_visit
})

class Option extends Component {
  constructor(props) {
    super(props)

    const { is_first_visit } = props
    const isFirst = is_first_visit
    if (is_first_visit) {
      const { dispatch } = props
      dispatch(visit())
    }
    this.state = {
      open: isFirst,
    }
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
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
    const actions = [
      <RaisedButton
        label={"適用"}
        primary={true}
        onClick={this.handleClose.bind(this)}
      />
    ]
    return (
      <span>
        <FloatingActionButton
          onClick={this.handleOpen.bind(this)}
          disabled={page != "waiting"}
        >
          <ActionSettings />
        </FloatingActionButton>
        <Dialog
          title={"オプション"}
          actions={actions}
          model={false}
          open={this.state.open}
          autoScrollBodyContent={true}
        >
          <p> 現在の最大ラウンド数:{maxround} </p>
          <RaisedButton onClick={this.minusRound.bind(this)} style={{ marginLeft: '3%' }} disabled = {!(maxround > 1)}>-</RaisedButton>
          <RaisedButton onClick={this.plusRound.bind(this)} style={{ marginLeft: '3%' }} >+</RaisedButton>
        </Dialog>
      </span>
    )
  }
}

export default connect(mapStateToProps)(Option)
