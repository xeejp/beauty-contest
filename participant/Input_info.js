import React, { Component }  from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ inputs , actives }) => ({
	inputs,actives
})

class Input_info extends Component {
  	constructor(props) {
		super(props)
	}
	
	render() {
		const { inputs,actives } = this.props
		return(
			<div>
			<p>現在{actives}人中、{inputs}人が投票しています</p>
			</div>
		)
	}
}

export default connect(mapStateToProps)(Input_info)
