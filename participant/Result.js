import React, { Component } from 'react'
import { connect } from 'react-redux'

import Result_info from './Result_info'

const mapStateToProps = ({results}) => ({
	results
})

const Result = ({results}) => (
  <div>
    <p>実験結果</p>
    {(results.inputs == 0)
    ? (<p>誰一人、投票することがありませんでした…</p>)
    : <Result_info />}
  </div>
)

export default connect(mapStateToProps)(Result)