import React, { Component } from 'react'
import { Paper } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const loginStyle = {
	width: '70%',
	margin: '20px auto',
	padding: '10px',
}

class Start extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<Paper style={loginStyle} zDepth={2}>
					<h3>Thank you for your contribution</h3>					
				</Paper>
			</MuiThemeProvider>
		)
	}
}

export default Start