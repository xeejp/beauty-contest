import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const mapStateToProps = () => {
    return {
    }
}

const Input = () => 
<div>  
		<p>数字を入力してください</p>
		<TextField
      		 hintText="0～100までの整数を入力してください"
    		/>
		<RaisedButton label = "送信" />
</div>

export default connect(mapStateToProps)(Input)
