import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardText } from 'material-ui/Card'
import SwipeableViews from 'react-swipeable-views'
import Input from './Input'
import Input_info from './Input_info'
import Inputedpage from './Inputedpage'

const mapStateToProps = ({ inputed }) => ({
 inputed
})

const Experiment = ({ inputed }) => (() => {
	return(
		<Card><CardText>
			<SwipeableViews index={(inputed)?1:0} disabled={true}>          		
            	<div style={{overflow: 'hidden'}}>
					<Input />
					<Input_info />
				</div>
				<div style={{overflow: 'hidden'}}>
					<Inputedpage />
				</div>
        	</SwipeableViews>
		</CardText></Card>
)})()

export default connect(mapStateToProps)(Experiment)
