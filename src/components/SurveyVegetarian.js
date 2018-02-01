import React, { Component } from 'react'
import { GridList, GridTile, RaisedButton, IconMenu, MenuItem, IconButton, RefreshIndicator } from 'material-ui'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { app } from '../base'


const buttonStyle = {
    width: '100%'
}

class SurveyVegetarian extends Component {
    constructor(props) {
        super(props);
        this.state = {
			recipes: [],
			loading: true,
			nrStage: 0,
			dishTypesStages: ['Main Dishes', 'Salads']
        }
        this.goToNextStage = this.goToNextStage.bind(this)
        this.filerRecipes = this.filerRecipes.bind(this)
    }

    getItems = () => {
        var recipesReceived = []
        let ref = app.database().ref()
        ref.once('value', function(snapshot) {
          	snapshot.forEach(function(child) {
				if (child.val().dietType.includes('vegetarian')) {  
					recipesReceived.push({
						name: child.val().name,
						photo: child.val().images[0].imageUrlsBySize[360],
						dishType: child.val().attributes.course,
						_key: child.key
					});
				}
			});
        }).catch((error) => {
            console.log("The read failed: " + error.message);
        }).then(() => {
			this.setState({
                recipes: recipesReceived,
                loading: false
            });
        }); 
    }
    
    componentDidMount = () => {
    	this.getItems();
    }
    
    goToNextStage = () => {
        if (this.state.nrStage < (this.state.dishTypesStages.length - 1)){
            this.setState(({nrStage}) => ({
                nrStage: nrStage + 1
            }));
        } else {
            this.props.history.push('/end')
        }
    }

	filerRecipes = (arr, value) => {
		var result = [];
		arr.forEach(function(o){if (o.dishType.includes(value)) result.push(o);} );
		return result 
	}
	  

	render() {
        if (this.state.loading === true) {
            return ( 
			<MuiThemeProvider>
				<div style={{ textAlign: 'center', position: 'absolute', top: '25%', left: '50%'}}>
					<h3>Loading</h3>
					<RefreshIndicator
						size={50}
						status="loading"
						left={0}
						top={0}
						style={{display: 'inline-block', position: 'relative'}}
					/>
				</div>
			</MuiThemeProvider>
            )
        } else {
            return (
                <MuiThemeProvider>
                        <GridList
                            cellHeight='100%'>
                            {this.filerRecipes(this.state.recipes, this.state.dishTypesStages[this.state.nrStage]).map((tile) => (
                                <GridTile
                                    title={tile.name}
                                    actionIcon={
                                        <IconMenu
                                            iconButtonElement={<IconButton><StarBorder color='white'/></IconButton>}
                                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                            targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                            onItemClick={(ev, obj, idx) => console.log(`${tile._key} ${obj.props.value}`)}>
                                            <MenuItem value='5' primaryText='5'/>
                                            <MenuItem value='4' primaryText='4'/>
                                            <MenuItem value='3' primaryText='3'/>
                                            <MenuItem value='2' primaryText='2'/>
                                            <MenuItem value='1' primaryText='1'/>
                                        </IconMenu>
                                    }>                        
                                <img src={tile.photo} alt='' translatex='0'/>
                                </GridTile>
                            ))}
                        </GridList>
                    <RaisedButton label="NEXT" primary={true} onClick={this.goToNextStage} style={buttonStyle}/>
                </MuiThemeProvider>
            )
        }
    }
}

export default SurveyVegetarian