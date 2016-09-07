import React, { Component } from 'react'
import { connect } from 'react-redux'

import SwipeableViews from 'react-swipeable-views'
import Input from './Input'
import Input_info from './Input_info'
import Inputedpage from './Inputedpage'

const mapStateToProps = ({ inputed }) => ({
 inputed
})

const Experiment = ({ inputed }) => (() => {
	return(
			<SwipeableViews index={(inputed)?1:0} disabled={true}>          		
            	<div style={{overflow: 'hidden'}}>
					<Input />
					<Input_info />
				</div>
				<div style={{overflow: 'hidden'}}>
					<Inputedpage />
				</div>
        	</SwipeableViews>
)})()

export default connect(mapStateToProps)(Experiment)
