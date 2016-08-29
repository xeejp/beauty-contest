import React, { Component } from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Step, Stepper, StepButton } from 'material-ui/Stepper'

import { submitPage, nextPage , backPage} from './actions'

import { getPage } from 'util/index'

const pages = ["waiting", "description", "experiment", "result"]

const mapStateToProps = ({ page, inputs , actives , maxround , round}) => ({
 page, inputs , actives , round , maxround
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

  nextPage() {
    const { dispatch } = this.props
    const { page, maxround , round} = this.props
    let next = pages[0]
    if(page != "experiment" && page != "result"){
      for (let i = 0; i < pages.length; i ++) {
        if (page == pages[i]) {
          next = pages[(i + 1) % pages.length]
          break
        }
      }
    }else if(maxround > round){
        if(page == "experiment") next = "result"
        else next = "experiment"
    }else {
      if(page == "experiment") next = "result"
      else next = "waiting"
    }
    dispatch(submitPage(next))
  }

  backPage(page) {
    const { dispatch } = this.props
    dispatch(backPage())
  }


  render() {
    const { page, inputs , actives ,round , maxround} = this.props
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
        <RaisedButton onClick={this.backPage.bind(this)} style={{ marginLeft: '3%' }}>戻る</RaisedButton>
        <RaisedButton onClick={this.nextPage.bind(this)} primary={true}>次へ</RaisedButton>
        <RaisedButton onClick={this.changePage.bind(this,"experiment")} primary={true} style={{ marginLeft: '3%' }} disabled = {maxround <= round} >次のラウンドへ</RaisedButton>
      </span>
    )
  }
}

export default connect(mapStateToProps)(PageButtons)
