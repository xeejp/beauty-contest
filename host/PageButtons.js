import React, { Component } from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import { Step, Stepper, StepButton } from 'material-ui/Stepper'

import { submitPage, nextPage } from './actions'

import { getPage } from 'util/index'

const pages = ["waiting", "description", "experiment", "result"]

const mapStateToProps = ({ page, inputs , actives}) => ({
 page, inputs , actives
})

class PageButtons extends Component {

  constructor(props) {
		super(props)
		this.state = {
			open: false
		}
	}

  handleOpen() {
    this.setState({open: true});
  }

  handleClose(){
    this.setState({open: false});
  }

  changePage(page) {
    const { dispatch } = this.props
    this.setState({open: false});
    dispatch(submitPage(page))
  }

  nextPage(page) {
    const { dispatch } = this.props
    dispatch(nextPage())
  }

  render() {
    const { page, inputs , actives } = this.props
    const { open } = this.state
    const buttons = []
    
    const actions = [
      <FlatButton
        label="いいえ"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="はい"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.changePage.bind(this, "experiment")}
      />
    ]

    for (let i = 0; i < pages.length; i ++) {
      buttons[i] = (
        <Step key={i}>
          <StepButton
            onClick={(page == "experiment" && pages[i] == "experiment")? this.handleOpen.bind(this) : this.changePage.bind(this, pages[i])}
          >
            <Dialog
              title="新ラウンド確認"
              actions={actions}
              modal={false}
              open={open}
              onRequestClose={this.handleClose.bind(this)}
            >
              現在の状態でこのラウンドを終わらせ、次のラウンドへ進みます<br/>よろしいですか？
            </Dialog>
            {getPage(pages[i])}
          </StepButton>
        </Step>
      )
    }
    return (
      <span>
        <Stepper activeStep={pages.indexOf(page)} linear={false}>
          {buttons}
        </Stepper>
        <RaisedButton onClick={this.nextPage.bind(this)} primary={true} style={{ marginLeft: '3%' }}>次へ</RaisedButton>
      </span>
    )
  }
}

export default connect(mapStateToProps)(PageButtons)
