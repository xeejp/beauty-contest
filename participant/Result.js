import React, { Component } from 'react'
import { connect } from 'react-redux'

import Result_info from './Result_info'

import IconButton from 'material-ui/IconButton'
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'


const mapStateToProps = ({results,number,inputed,id,round}) => ({
	results,number,inputed,id,round
})

class Result extends Component { 
  constructor(props) {
		super(props)
		this.state = {
			page: 0
		}
	}

	handleClickPrev(){
    const { page } = this.state
		const { round } = this.props
		if(page < round-1) {
			this.setState({
				page: page+1
			})
		}
  }
  
	handleClickNext(){
    const { page } = this.state
		if(page > 0) {
			this.setState({
				page: page-1
			})
		}
  }

  render(){

    const {results,number,inputed,id,round} = this.props
		const {page} = this.state
		console.log(page)
		console.log(round)
		console.log(!(page < round-1))
		console.log(!(page > 0))
   return (
    <div>
      <h2>実験結果</h2>
      {(results.length > 0)
				?
				<span>
				<IconButton 
          tooltip="Prev Result" 
          disabled = {!(page < round-1)}
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
				<p>第{results[page].round}ラウンドの結果</p>
				{(results[page].inputs == 0)
          ? (<p>一人も投票していないので、結果を表示することができません</p>)
    			: <Result_info 
        			results = {results[page]}
        			id = {id}
      			/>
				}
				</span>
    		: (<p>一回も実験を実施していないので、結果を表示することができません</p>)
				
  }
  </div>
)
  }
}

export default connect(mapStateToProps)(Result)