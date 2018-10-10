import React, { Component } from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Step, Stepper, StepButton } from 'material-ui/Stepper'

import { changePage } from './actions'

import { getPage } from '../util/index'

const pages = ["waiting", "description", "experiment", "result"]

const mapStateToProps = ({ page, inputs  , maxround , round}) => ({
 page, inputs  , round , maxround
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

  handleChangePage(page) {
    const { dispatch } = this.props
    this.setState({open: false});
    dispatch(changePage(page))
  }

  nextPage() {
    const { page, maxround , round} = this.props
    
    switch (page) {
      case "waiting":
        this.handleChangePage("description")
        break
      case "description":
        this.handleChangePage("experiment")
        break
      case "experiment":
        this.handleChangePage("result")
        break
      case "result":
        if (maxround > round) {
          this.handleChangePage("experiment")
        } else {
          this.handleChangePage("waiting")
        }
        break
    }
  }

  backPage() {
    const { page } = this.props
    
    switch (page) {
      case "waiting":
        this.handleChangePage("result")
        break
      case "description":
        this.handleChangePage("waiting")
        break
      case "experiment":
        this.handleChangePage("description")
        break
      case "result":
        this.handleChangePage("experiment")
        break
    }
  }


  render() {
    const { page, round, maxround } = this.props
    const { open } = this.state
    const buttons = []
    
    const actions = [
      <FlatButton
        label="いいえ"
        primary={true}
        onClick={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="はい"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleChangePage.bind(this, "experiment")}
      />
    ]

    for (let i = 0; i < pages.length; i ++) {
      buttons[i] = (
        <Step key={i}>
          <StepButton
            onClick={(page == "experiment" && pages[i] == "experiment")? this.handleOpen.bind(this) : this.handleChangePage.bind(this, pages[i])}
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
        <RaisedButton onClick={this.backPage.bind(this)} style={{ marginLeft: '3%' }} disabled={page == "waiting"}>戻る</RaisedButton>
        <RaisedButton onClick={this.nextPage.bind(this)} primary={true}>次へ</RaisedButton>
        <RaisedButton onClick={this.handleChangePage.bind(this,"experiment")} primary={true} style={{ marginLeft: '3%' }} disabled = {maxround <= round} >次のラウンドへ</RaisedButton>
      </span>
    )
  }
}

export default connect(mapStateToProps)(PageButtons)
