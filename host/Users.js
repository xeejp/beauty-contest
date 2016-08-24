import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'

const User = ({ id, number , inputed , state}) => (
  <tr><td>{id}</td><td>{number}</td><td>{inputed}</td><td>{state}</td></tr>
)

const UsersList = ({participants}) => (
  <table>
    <thead><tr><th>id</th><th>number</th><th>inputed</th><th>state</th></tr></thead>
    <tbody>
      {
        Object.keys(participants).map(id => (
          <User
            key={id}
            id={id}
            number ={participants[id].active && participants[id].inputed ? participants[id].number:" - "}
            inputed={participants[id].active ? (participants[id].inputed ? "投票済" : "未投票") : " - "}
	    state = {participants[id].active ? "参加中" : "待機中"}
          />
        ))
      }
    </tbody>
  </table>
)

const mapStateToProps = ({ participants ,inputs, actives}) => ({ participants ,inputs, actives})

const Users = ({ participants ,inputs, actives}) => (
  <div>
    <Card>
      <CardHeader
        title={"ユーザ数 " + Object.keys(participants).length + "人 ,参加人数 " +  actives + "人," + inputs + "人投票済み"}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <UsersList
          participants={participants}
        />
      </CardText>
    </Card>
   </div>
)

export default connect(mapStateToProps)(Users)
