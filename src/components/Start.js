import React, { Component } from 'react'
import { Paper, RadioButtonGroup, RadioButton, RaisedButton } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


const loginStyle = {
	width: '70%',
	margin: '20px auto',
	padding: '10px',
}

const InputStyle = {
	width: '100%',
}

const radioButton = {
    marginBottom: 16
}


class Start extends Component {
	constructor(props) {
		super(props);
		this.state = {
			valueDietType: null
		}
		this.handleChangeDietType = this.handleChangeDietType.bind(this)
		this.Submit = this.Submit.bind(this)
	}

	handleChangeDietType = (event, value) => this.setState({valueDietType: value})
	
	Submit = () => {
		this.props.history.push('/survey', {dietType: this.state.valueDietType})
	}

	render() {
		return (
			<MuiThemeProvider>
				<Paper style={loginStyle} zDepth={2}>
					<p>This survey has been designed to gather information about meal preferences based only on recipes' titles and photos of prepared plates. This data will be used for comparison with algorithms used for recommendation or calculating meals similarities. Survey consist of two steps:</p>
					<p>1. Choose your diet preferences.</p>
					<p>2. Rate presented meals from 1 star (less likely to eat) to 5 stars (most likely to eat).</p>
					<br/>
					<p>Thank you for your attention and i hope this survey will not be too much engaging and time consuming.</p>
					<br/>
					<RadioButtonGroup
							name='Diet Type'
							value={this.state.valueDietType}
							onChange={this.handleChangeDietType}
							style = {InputStyle}
							>
							<RadioButton value='withoutMeat' label='Without Meat' style={radioButton}/>
							<RadioButton value='withoutFish' label='Without Fishes' style={radioButton}/>
							<RadioButton value='withoutDiary' label='Without Diary' style={radioButton}/>
							<RadioButton value='vegetarian' label='Vegetarian (without meat and fishes)' style={radioButton}/>
							<RadioButton value='vegan' label='Vegan (without meat, fishes and diary)' style={radioButton}/>
							<RadioButton value='everything' label='I eat everything' style={radioButton}/>
					</RadioButtonGroup>
					{this.state.valueDietType ? <RaisedButton label="Submit" primary={true} style={InputStyle} onClick={this.Submit}/>
					: <RaisedButton label="Submit" primary={true} style={InputStyle} onClick={this.Submit} disabled={true}/>}
				</Paper>
			</MuiThemeProvider>
		)
	}
}

export default Start