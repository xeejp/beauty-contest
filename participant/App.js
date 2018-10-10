import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from '../shared/actions'

import Pages from './Pages'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import CircularProgress from 'material-ui/CircularProgress'
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'

const actionCreators = {
  fetchContents
}

const mapStateToProps = ({id}) => ({id})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchContents();
  }
  render() {
    const { id } = this.props
    if (!id) {
      return (
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <Card style={{padding: '20px'}}>
            <CardTitle title="接続中" style={{padding: '0px', marginTop: '7px', marginBottom: '14px'}}/>
            <CardText style={{padding: '0px', margin: '0px'}}>
              <div style={{textAlign: 'center'}}>
                <CircularProgress style={{margin: '0px', padding: '0px' }} />
              </div>
              <p style={{margin: '0px', padding: '0px'}}>サーバーに接続しています。<br/>このまましばらくお待ちください。</p>
            </CardText>
          </Card>
        </MuiThemeProvider>
      )
    }	else {
      return (
        <div>
          <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <Pages />
          </MuiThemeProvider>            
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, actionCreators)(App)
