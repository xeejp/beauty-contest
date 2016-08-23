import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import Result_info from './Result_info'

const mapStateToProps = ({page,inputs}) => ({page,inputs})

const Result = ({page,inputs}) => (
  <div>
    <Card>
      <CardHeader
        title={"実験結果"}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        {(inputs == 0)
	? <p>投票者がいません</p>	
	: <Result_info />
	}
      </CardText>
    </Card>
   </div>
)

export default connect(mapStateToProps)(Result)
