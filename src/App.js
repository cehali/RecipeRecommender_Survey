import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Header from './components/Header'
import Start from './components/Start'
import Survey from './components/Survey'
import SurveyEverything from './components/SurveyEverything'
import SurveyWithoutMeat from './components/SurveyWithoutMeat'
import SurveyWithoutFish from './components/SurveyWithoutFish'
import SurveyWithoutDiary from './components/SurveyWithoutDiary'
import SurveyVegetarian from './components/SurveyVegetarian'
import SurveyVegan from './components/SurveyVegan'
import End from './components/End'

class App extends Component {
  render() {
    return (
      <div style={{maxWidth: '1160px', margin: '0 auto'}}>
        <BrowserRouter>
          <div className='header'>
            <Header/>
              <div className='main-content' style={{padding: '1em'}}>
                <Route exact path='/' render={() => (
                    <Redirect to="/start"/>)}/>
                <Route exact path='/start' component={Start} />
                <Route exact path='/survey' component={Survey} />
                <Route exact path='/end' component={End} /> 
              </div>
            </div>
          </BrowserRouter>
      </div>
    )
  }
}

export default App;

/*                 <Route exact path='/surveyeverything' component={SurveyEverything} />
                <Route exact path='/surveywithoutmeat' component={SurveyWithoutMeat} />
                <Route exact path='/surveywithoutfish' component={SurveyWithoutFish} />
                <Route exact path='/surveywithoutdiary' component={SurveyWithoutDiary} />
                <Route exact path='/surveyvegetarian' component={SurveyVegetarian} />
                <Route exact path='/surveyvegan' component={SurveyVegan} />
                <Route exact path='/end' component={End} /> */