import React, { Component } from 'react'
import { connect } from 'react-redux'

import IconButton from 'material-ui/IconButton';
import { Card, CardHeader, CardText } from 'material-ui/Card'
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

import Result_info from './Result_info'
import { changeResultPage } from './actions'

const mapStateToProps = ({inputs,round,results,result_page}) => ({inputs,round,results,result_page})

class Result extends Component { 
  constructor(props) {
		super(props)
	}

  handleClickPrev(){
    const { dispatch } = this.props
    const { result_page ,round,results} = this.props
    if(result_page < results.length-1) dispatch(changeResultPage(result_page+1))
  }
  
	handleClickNext(){
    const { dispatch } = this.props
    const { result_page } = this.props
		if(result_page > 0) dispatch(changeResultPage(result_page-1))
  }

  render(){
    const { inputs,round,results,result_page} = this.props
    const page = result_page
		console.log(page < results.length-1)
    console.log(page > 0)
    return (
      <div>
        <Card>
          <CardHeader
            title={"実験結果"}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
          {(results.length > 0)?
            (<span>
            <IconButton 
              tooltip="Prev Result" 
              disabled = {!(page < results.length-1)}
							onClick = {this.handleClickPrev.bind(this)}    
            >
              <KeyboardArrowLeft />
            </IconButton>

            <IconButton 
              tooltip="Next Result"
              style = {{
                float:"right"
              }}
              disabled = {!(page > 0)}
							onClick = {this.handleClickNext.bind(this)}
            >
              <KeyboardArrowRight />
            </IconButton>
            <p>ラウンド:{results[page].round} </p>
            {(results[page].inputs == 0)
	            ? <p>投票者がいません</p>	
	            : <Result_info 
                  results = {results[page]}
                />
						}
            </span>)
            : <p>一回も実験を実施していません</p>
          }
      </CardText>
      
        
    </Card>
   </div>
  )}
}
export default connect(mapStateToProps)(Result)
