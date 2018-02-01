import React, { Component } from 'react'
import { Paper } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { app } from '../base'


const loginStyle = {
	width: '70%',
	margin: '20px auto',
	padding: '10px',
}

class Start extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<MuiThemeProvider>
				<Paper style={loginStyle} zDepth={2}>
					<h3>Thank you</h3>					
				</Paper>
			</MuiThemeProvider>
		)
	}
}

export default Start