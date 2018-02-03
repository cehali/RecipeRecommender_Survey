import React, { Component } from 'react'
import { Card, CardTitle, CardMedia, CardActions, RefreshIndicator, RaisedButton } from 'material-ui'
import StarRatingComponent from 'react-star-rating-component'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { app } from '../base'


const buttonStyle = {
    width: '100%'
}

const dishTypesStages = ['Main Dishes', 'Salads']

const randomizeArray = (arr) => {
    let i = arr.length - 1;
    let j;
    while (i >= 1) {
        j = Math.floor( Math.random() * ( i + 1 ) );
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i--;
    }
    return arr.slice(0,4)
}

const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length)
        return false;
    for (var i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

class SurveyWithoutFish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            loading: true,
            nrStage: 0,
            recipesChosen: [],
            ratings: [],
            rateStars: [0, 0, 0, 0],
            dietType: this.props.location.state.dietType,
            canSubmit: false,
            allrecipesKeys: []
        }
        this.goToNextStage = this.goToNextStage.bind(this)
        this.saveRates = this.saveRates.bind(this)
    }

    getItems = () => {
        let recipesFiltered = []
        let ref = app.database().ref('/recipes')
        ref.once('value', function(snapshot) {
            for (let n=0; n<dishTypesStages.length; n++) {
                var recipesReceived = []
          	    snapshot.forEach(function(child) {
                    if (child.val().attributes.course.includes(dishTypesStages[n]) && child.val().dietType.includes('withoutFish')) {  
                        recipesReceived.push({
                            name: child.val().name,
                            photo: child.val().images[0].imageUrlsBySize[360],
                            dishType: child.val().attributes.course,
                            _key: child.key
                        });
                    }
                });
                recipesFiltered.push(randomizeArray(recipesReceived))
            }
        }).catch((error) => {
            console.log("The read failed: " + error.message);
        }).then(() => {
            let recipesKeysFiltered = [...new Set(recipesFiltered[0].map(a => a._key))]
			this.setState({
                recipes: recipesFiltered,
                loading: false,
                allrecipesKeys: recipesKeysFiltered
            });
        }); 
    }
    
    componentDidMount = () => {
    	this.getItems();
    }
    
    goToNextStage = () => {
        if (this.state.nrStage < (dishTypesStages.length - 1)){
            let rateNextStage = [0, 0, 0, 0]
            let recipesKeys = this.state.recipes[this.state.nrStage+1].map(a => a._key)
            let concatedKeys = [...new Set(this.state.allrecipesKeys.concat(recipesKeys))]
            this.setState(({nrStage}) => ({
                nrStage: nrStage + 1,
                rateStars: rateNextStage,
                canSubmit: false,
                allrecipesKeys: concatedKeys
            }));
        } else {
            let d = new Date();
            let now = d.getTime();
            app.database().ref('users/' + now).set({
                dietType: this.state.dietType,
                ratings: this.state.ratings
            })
            this.props.history.push('/end')
        }
    }

    saveRates = (value, index, name) => {
        let rate2Save = {_key: name, rating: value}
        this.state.ratings.push(rate2Save)
        let rate = this.state.rateStars.slice()
        rate[index] = value
        this.setState({
            ratings: this.state.ratings,
            rateStars : rate
        })
        let ratingsKeys = []
        ratingsKeys = this.state.ratings.map(a => a._key)
        let ratingsKeysSet = [...new Set(ratingsKeys)]
        console.log(ratingsKeysSet)
        console.log(this.state.allrecipesKeys)
        if (arraysEqual(ratingsKeysSet.sort(), this.state.allrecipesKeys.sort())) {
            this.setState({canSubmit: true})
        }
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
                    <div>
                    {this.state.recipes[this.state.nrStage].map((tile, index) => (
                        <Card style={{width:'50%', display: 'inline-block', padding: '10px'}}>
                        <CardMedia
                            overlay={<CardTitle title={tile.name}/>}
                            >
                            <img src={tile.photo} alt="" />
                        </CardMedia>
                        <CardActions>
                            <div style={{fontSize: '30px', textAlign: 'center'}}>
                                <StarRatingComponent 
                                name={tile._key}
                                starCount={5}
                                value={this.state.rateStars[index]}
                                onStarClick={(value, privValue, nm) => this.saveRates(value, index, nm)}
                                />
                            </div>
                        </CardActions>
                    </Card>
                    ))}{this.state.canSubmit ? <RaisedButton label='NEXT' primary={true} onClick={this.goToNextStage} style={buttonStyle} disabled={false}/> 
                    : <RaisedButton label='NEXT' primary={true} onClick={this.goToNextStage} style={buttonStyle} disabled={true}/>}
                    
                    </div>
                </MuiThemeProvider>
            )
        }
    }
}

export default SurveyWithoutFish