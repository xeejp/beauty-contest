import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'
import { bindActionCreators } from 'redux'
import { openParticipantPage } from './actions'
import { Card, CardHeader, CardText } from 'material-ui/Card'

const User = ({ id, number , inputed, openParticipantPage}) => (
  <tr><td><a onClick={openParticipantPage(id)}>{id}</a></td><td>{number}</td><td>{inputed}</td></tr>
)

const mapDispatchToProps = (dispatch) => {
   const open = bindActionCreators(openParticipantPage, dispatch)
   return {
     openParticipantPage: (id) => () => open(id)
   }
 }

const UsersList = ({participants,openParticipantPage}) => (
  <table>
    <thead><tr><th>id</th><th>number</th><th>inputed</th></tr></thead>
    <tbody>
      {
        Object.keys(participants).map(id => (
          <User
            key={id}
            id={id}
            number ={participants[id].inputed ? participants[id].number:" - "}
            inputed={participants[id].inputed ? "投票済" : "未投票"}
            openParticipantPage = {openParticipantPage}
          />
        ))
      }
    </tbody>
  </table>
)

const mapStateToProps = ({ participants ,inputs}) => ({ participants ,inputs})

const Users = ({ participants ,inputs, openParticipantPage}) => (
  <div>
    <Card>
      <CardHeader
        title={"登録者 " + Object.keys(participants).length + "人, " + inputs + "人投票済み"}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <UsersList
          participants={participants}
          openParticipantPage = {openParticipantPage}
        />
      </CardText>
    </Card>
   </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(throttle(Users, 200))
