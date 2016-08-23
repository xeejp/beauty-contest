import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'

const mapStateToProps = ({results,number,inputed,id}) => ({
	results,number,inputed,id
})

const Print = ({print_data,color}) => (
	<tr>
	   <td><font color={color}>{print_data.rank}</font></td>
	   <td><font color={color}>{print_data.id}</font></td>
	   <td><font color={color}>{print_data.number}</font></td>
	</tr>
)

const My_data = ({my_data}) => {
	console.log(my_data)
	if(my_data.rank <= 10) return (<tr><td></td></tr>)
	else return(		   
		<Print
		     print_data = {my_data}
		     color = {"#FF0000"}
		/>
		)
}

const Rank = ({data,id,my_data}) => (
<table>
    <thead><tr><th>rank</th><th>id</th><th>number</th></tr></thead>
    <tbody>
      {
	data.map( value => {
		var color = "#000000"
		if(value.id == id) color = "#FF0000"
		console.log(value)
		return(		
		<Print
		  print_data = {value}
		  color = {color}
		/>
		)
	
	})
       }
       <My_data
         my_data = { my_data }
 	/>
    </tbody>
  </table>
)

const Reward = ({results,number,inputed,id}) => {
	var data = [],key
	var Re_number = Math.round(results.sum * 2 / results.inputs / 3 * 10) / 10
	for(key in results.participants){
		if(results.participants[key].inputed){
			var dis = Math.abs(results.participants[key].number - Re_number)
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
	var plus = 0,my_data = {rank:0}
	for(let i = 1 ,len = data.length; i < len;i++){
		if(data[i-1].dis != data[i].dis) plus++
		data[i].rank += plus
		if(data[i].id == id) my_data = data[i]
		console.log(plus)
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
