import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import PageButtons from './PageButtons'
import Users from './Users'

const mapStateToProps = ({ loading }) => ({
  loading
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchContents())
  }

  render() {
      const { loading } = this.props
    if (loading) {
      return <p>ÉçÅ[ÉhíÜÇ≈Ç∑ÅB</p>
    } else {
      return (
        <div>
          <PageButtons />
          <Users />
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)
