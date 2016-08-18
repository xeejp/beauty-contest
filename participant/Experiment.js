import React, { Component } from 'react'
import { connect } from 'react-redux'

import Input from './Input'

const mapStateToProps = ({ inputed }) => ({
 inputed
})

const Experiment = ({ inputed }) => (() => {
	return(
		<div>
			<Input />
		</div>
		)})()

export default connect(mapStateToProps)(Experiment)
