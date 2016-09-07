import React, { Component }  from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ inputs , joined }) => ({
	inputs,joined
})

class Input_info extends Component {
  	constructor(props) {
		super(props)
	}
	
	render() {
		const { inputs,joined } = this.props
		return(
			<div>
			<p>{joined}人中、{inputs}人が投票しました。</p>
			</div>
		)
	}
}

export default connect(mapStateToProps)(Input_info)
