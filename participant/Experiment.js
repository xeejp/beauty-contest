import React, { Component } from 'react'
import { connect } from 'react-redux'

import Input from './Input'
import Input_info from './Input_info'

const mapStateToProps = ({ inputed }) => ({
 inputed
})

const Experiment = ({ inputed }) => (() => {
	return(
		<div>
			<Input />
			<Input_info />
		</div>
		)})()

export default connect(mapStateToProps)(Experiment)
