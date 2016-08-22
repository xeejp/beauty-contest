import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'

const mapStateToProps = ({ sum ,inputs , participants}) => ({ sum ,inputs , participants})

const Result_info = ({ sum,inputs,participants}) => (
 <span>
    <p>平均値: {Math.round(sum/inputs)} 報酬基準値: {Math.round(sum*2/inputs/3)}</p>
 </span>
)

export default connect(mapStateToProps)(Result_info)
