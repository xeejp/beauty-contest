import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import Chip from 'material-ui/Chip'
import Divider from 'material-ui/Divider'
import PageButtons from './PageButtons'
import Users from './Users'
import Result from './Result'
import Option from './Option'


const mapStateToProps = ({ loading ,round ,maxround}) => ({
  loading ,round ,maxround
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
      const { loading ,round ,maxround} = this.props
    if (loading) {
      return <div><p>ロード中です。</p></div>
    } else {
      return (
        <div>
          <Chip
        		style = {{
             		float:"right"
           		}}
      		>
       			 {((round>0)?round:"-") + "/" +  maxround + "ラウンド"}
      		</Chip>
          <PageButtons />
              <Divider
                style={{
                  marginTop: "5%",
		  marginBottom: "5%",
                }}
              />
	        <Users />
          <br />
          <Result />
          <br />
          <Option />
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)
