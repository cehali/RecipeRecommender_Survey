import React, { Component } from 'react'
import { Card, CardTitle, CardMedia, CardActions, RefreshIndicator, RaisedButton } from 'material-ui'
import StarRatingComponent from 'react-star-rating-component'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { app } from '../base'


const buttonStyle = {
    width: '100%'
}

class SurveyEverything extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            loading: true,
            nrStage: 0,
            dishTypesStages: ['Main Dishes', 'Salads'],
            ratings: [],
            ratingStars: 3
        }
        this.goToNextStage = this.goToNextStage.bind(this)
        this.filterRecipes = this.filterRecipes.bind(this)
        this.saveResults = this.saveResults.bind(this)
    }

    getItems = () => {
        let recipesReceived = []
        let rated = []
        let ref = app.database().ref()
        ref.once('value', function(snapshot) {
          	snapshot.forEach(function(child) {
                recipesReceived.push({
                    name: child.val().name,
                    photo: child.val().images[0].imageUrlsBySize[360],
                    dishType: child.val().attributes.course,
                    _key: child.key
                })
			});
        }).catch((error) => {
            console.log('The read failed: ' + error.message);
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
    
    filterRecipes = (arr, value) => {
        var result = [];
        arr.forEach(function(o){if (o.dishType.includes(value)) result.push(o);} );
        return result 
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

    saveResults = (value, privValue, name) => {
        let temp = {_key: name, rating: value}
        this.state.ratings.push(temp)
        this.setState({ratings: this.state.ratings})
    };

    render() {
        if (this.state.loading === true) {
            return ( 
			<MuiThemeProvider>
				<div style={{ textAlign: 'center', position: 'absolute', top: '25%', left: '50%'}}>
					<h3>Loading</h3>
					<RefreshIndicator
						size={50}
						status='loading'
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
                    {this.filterRecipes(this.state.recipes, this.state.dishTypesStages[this.state.nrStage]).map((tile) => (
                        <Card style={{width:'50%', display: 'inline-block', padding: '10px'}}>
                        <CardMedia
                            overlay={<CardTitle title={tile.name}/>}
                            >
                            <img src={tile.photo} alt="" />
                        </CardMedia>
                        <CardActions>
                            <StarRatingComponent 
                            name={tile._key}
                            starCount={5}
                            onStarClick={(value, privValue, nm) => this.saveResults(value, privValue, nm)}
                            />
                        </CardActions>
                    </Card>
                    ))}
                    <RaisedButton label='NEXT' primary={true} onClick={this.goToNextStage} style={buttonStyle}/>
                </MuiThemeProvider>
            )
        }

    }
}

export default SurveyEverything