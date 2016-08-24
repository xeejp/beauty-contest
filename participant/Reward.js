import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


const mapStateToProps = ({results,number,inputed,id}) => ({
	results,number,inputed,id
})

const Print = ({print_data,color}) => (
	<TableRow>
	   <TableRowColumn><font color={color}>{print_data.rank}位</font></TableRowColumn>
	   <TableRowColumn><font color={color}>{print_data.number}</font></TableRowColumn>
	   <TableRowColumn><font color={color}>{print_data.dis}</font></TableRowColumn>
	</TableRow>
)

const Rank = ({data,id,my_data}) => (
<Table>
    <TableHeader
      displaySelectAll = {false}
    >
       <TableRow>
          <TableHeaderColumn>順位</TableHeaderColumn>
	  <TableHeaderColumn>入力数字</TableHeaderColumn>
	  <TableHeaderColumn>差分</TableHeaderColumn>
       </TableRow>
    </TableHeader>
    <TableBody
     displayRowCheckbox = {false}
    >
      {
	data.map( value => {
		var color = "#000000"
		if(value.id == id) color = "#FF0000"
		console.log(value)
		return(		
		<Print
		  key={value.id}
		  print_data = {value}
		  color = {color}
		/>
		)
	
	})
       }
       {(() => {
		if(my_data.rank > 10){
		   return (		   
		      <Print
		         print_data = {my_data}
		         color = {"#FF0000"}
		      />
		    )
		} else return null

	})()}
    </TableBody>
  </Table>
)

const Reward = ({results,number,inputed,id}) => {
	var data = [],key
	var Re_number = Math.round(results.sum * 2 / results.inputs / 3 * 10) / 10
	for(key in results.participants){
		if(results.participants[key].inputed){
			var dis = Math.round(Math.abs(results.participants[key].number - Re_number)*10)/10
			data.push({id: key, number: results.participants[key].number, dis: dis, rank: 1})
		}
	}

	console.log(data)

	data.sort(
		function(a,b){
			if(a.dis < b.dis) return -1
			if(a.dis > b.dis) return  1
			if(a.id > b.id) return -1
			if(a.id < b.id) return  1
			return 0
		}
	)

	console.log(data)
	var my_data = {rank:0}
	for(let i = 1 ,len = data.length; i < len;i++){
		if(data[i-1].dis == data[i].dis) data[i].rank = data[i-1].rank
		else data[i].rank = i+1 
		if(data[i].id == id) my_data = data[i]
	}
	var rank_data = data.filter(function(value){
		return value.rank <= 10	
	})
	
	return(
		<div>
		   <Card>
		   <CardHeader
                      title={"ランキング"}
                      actAsExpander={true}
                      showExpandableButton={true}
                   />
		      <CardText expandable={true}>
		         <Rank
		            data = {rank_data}
		            id = {id}
		            my_data = {my_data}
		         />
		      </CardText>
		   </Card>
		</div>
	)
	
}

export default connect(mapStateToProps)(Reward)
