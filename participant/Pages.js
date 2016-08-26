import React, { Component } from 'react'
import { connect } from 'react-redux'

import Waiting from './Waiting'
import Description from './Description'
import Experiment from './Experiment'
import Result from './Result'
import WaitPage from './WaitPage'

const mapStateToProps = ({ page , active}) => ({
  page , active
})

const Pages = ({ page ,active}) => (() => {
	  switch (page) {
	    case "waiting":
	      return <Waiting />
	    case "description":
	      return <Description />
	    case "experiment":
	      return <Experiment />
	    case "result":
	      return <Result />
	    default:
	      return <span></span>
	  }
})()

export default connect(mapStateToProps)(Pages)
