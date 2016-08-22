import React, { Component } from 'react'
import { connect } from 'react-redux'

import { nextPage } from './actions'

const mapStateToProps = ({ page , inputs , actives}) => ({
  page , inputs , actives
})

class finish extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render() {
      const {  page , inputs , actives } = this.props
      const { dispatch } = this.props
      
      if(page == "experiment" && inputs == actives) dispatch(nextPage())
	return <span><p>AAAPPPAAPP</p></span>
      }
}

export default connect(mapStateToProps)(finish)

